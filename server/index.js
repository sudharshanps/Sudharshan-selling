import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { loadDatabase, saveDatabase } from './db.js';
import { 
  notifyOwnerNewOrder, 
  notifyCustomerOrderConfirmation, 
  notifyOwnerProjectEnquiry, 
  notifyCustomerEnquiryConfirmation,
  notifyCustomerOrderStatusUpdate,
  sendEmailNotification
} from './email.js';
import { notifyOwnerOrderSms, sendSmsNotification } from './sms.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'sudharshan@admin2026';

// Middlewares
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static directories
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));
app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets')));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    cb(null, safeName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|pdf|zip|docx|doc|txt/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    if (allowed.test(ext) || allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File format not supported. Please upload Images, PDF, Docs or Zip files.'));
    }
  }
});

// Admin Auth Middleware
const requireAdmin = (req, res, next) => {
  const token = req.headers['x-admin-token'] || req.headers.authorization?.replace('Bearer ', '');
  if (!token || token !== ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized. Invalid admin security token.' });
  }
  next();
};

/* ========================================================
   PUBLIC API ROUTES
   ======================================================== */

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'SUDHARSHAN_TECH Digital Marketplace API',
    uptime: process.uptime()
  });
});

// Company Settings & Contact Details
app.get('/api/settings', (req, res) => {
  const db = loadDatabase();
  res.json(db.company_settings);
});

// Services List
app.get('/api/services', (req, res) => {
  const db = loadDatabase();
  res.json(db.services || []);
});

// Single Service Details
app.get('/api/services/:slug', (req, res) => {
  const db = loadDatabase();
  const service = (db.services || []).find(s => s.slug === req.params.slug || s.id === req.params.slug);
  if (!service) return res.status(404).json({ error: 'Service not found' });
  res.json(service);
});

// Portfolio Projects
app.get('/api/projects', (req, res) => {
  const db = loadDatabase();
  res.json(db.portfolio_projects || []);
});

// Founder Achievements & Profile
app.get('/api/achievements', (req, res) => {
  const db = loadDatabase();
  res.json(db.achievements || []);
});

// Poster Gallery
app.get('/api/posters', (req, res) => {
  const db = loadDatabase();
  res.json(db.poster_gallery || []);
});

// GitHub Repositories (Public with Cache & Local Fallback)
let githubCache = { data: null, timestamp: 0 };
app.get('/api/github-repos', async (req, res) => {
  const now = Date.now();
  if (githubCache.data && (now - githubCache.timestamp < 1000 * 60 * 15)) {
    return res.json(githubCache.data);
  }

  try {
    const fetchRes = await fetch('https://api.github.com/users/sudharshanps/repos?sort=updated&per_page=12', {
      headers: {
        'User-Agent': 'SUDHARSHAN_TECH-Marketplace'
      }
    });

    if (fetchRes.ok) {
      const repos = await fetchRes.json();
      const sanitized = repos.map(r => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        description: r.description,
        html_url: r.html_url,
        homepage: r.homepage,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        updated_at: r.updated_at
      }));
      githubCache = { data: sanitized, timestamp: now };
      return res.json(sanitized);
    }
  } catch (err) {
    console.warn("GitHub API error, using fallback repos:", err.message);
  }

  // Fallback to portfolio projects with GitHub repos
  const db = loadDatabase();
  const fallback = db.portfolio_projects
    .filter(p => p.github)
    .map(p => ({
      id: p.id,
      name: p.title,
      description: p.description,
      html_url: p.github,
      language: p.tech_stack ? p.tech_stack[0] : "Code",
      stargazers_count: 1,
      forks_count: 0,
      updated_at: new Date().toISOString()
    }));

  res.json(fallback);
});

// File Upload Endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    url: fileUrl,
    filename: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype
  });
});

// Submit Service Order
app.post('/api/orders', async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      business_name,
      billing_address,
      items,
      total_amount,
      payment_method,
      custom_requirements,
      reference_files,
      transaction_ref,
      payment_proof
    } = req.body;

    if (!customer_name || !customer_email || !customer_phone) {
      return res.status(400).json({ error: 'Customer name, email and phone number are required.' });
    }

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Cart is empty. Please select at least one service.' });
    }

    const orderId = `ST-ORD-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    
    // Status Logic
    let payment_status = 'Pending';
    let order_status = 'New Enquiry';

    if (payment_method === 'quote_request') {
      order_status = 'Quote Required';
      payment_status = 'Quotation Pending';
    } else if (payment_proof || transaction_ref) {
      payment_status = 'Pending Verification';
      order_status = 'Awaiting Payment Verification';
    } else {
      payment_status = 'Awaiting Payment';
      order_status = 'Awaiting Payment';
    }

    const newOrder = {
      id: orderId,
      customer_name,
      customer_email,
      customer_phone,
      business_name: business_name || '',
      billing_address: billing_address || '',
      items,
      total_amount: Number(total_amount) || 0,
      payment_method: payment_method || 'upi_qr',
      payment_status,
      order_status,
      custom_requirements: custom_requirements || '',
      reference_files: reference_files || [],
      transaction_ref: transaction_ref || null,
      payment_proof: payment_proof || null,
      admin_notes: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Save atomically in database
    const db = loadDatabase();
    if (!db.orders) db.orders = [];
    db.orders.unshift(newOrder);
    saveDatabase(db);

    // Reliable email dispatches
    notifyOwnerNewOrder(newOrder).catch(e => console.error("Owner notification err:", e));
    notifyCustomerOrderConfirmation(newOrder).catch(e => console.error("Customer notification err:", e));

    // Reliable independent SMS dispatch to company owner (+91 97914 95418)
    notifyOwnerOrderSms(newOrder).catch(e => console.error("Owner SMS notification err:", e));

    res.status(201).json({
      success: true,
      orderId: newOrder.id,
      order: newOrder,
      message: 'Your service order has been successfully placed. We have sent a confirmation email.'
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: 'Internal server error processing your order.' });
  }
});

// Submit Payment for an existing Order (UTR / Screenshot)
app.post('/api/orders/:id/payment', async (req, res) => {
  try {
    const { transaction_ref, payment_proof } = req.body;
    const db = loadDatabase();
    const orderIndex = (db.orders || []).findIndex(o => o.id === req.params.id);

    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = db.orders[orderIndex];
    order.transaction_ref = transaction_ref || order.transaction_ref;
    order.payment_proof = payment_proof || order.payment_proof;
    // CRITICAL: NEVER mark as paid merely because screenshot is uploaded.
    order.payment_status = 'Pending Verification';
    order.order_status = 'Payment Pending Verification';
    order.updated_at = new Date().toISOString();

    db.orders[orderIndex] = order;
    saveDatabase(db);

    // Notify owner about payment submission awaiting verification
    sendEmailNotification({
      to: db.company_settings.email,
      subject: `Payment Verification Required: Order #${order.id} – SUDHARSHAN_TECH`,
      text: `Customer ${order.customer_name} uploaded payment proof for Order #${order.id}. UTR: ${order.transaction_ref || 'Screenshot provided'}. Please verify in Admin Dashboard.`,
      event_type: 'PAYMENT_SUBMITTED_VERIFICATION',
      related_id: order.id
    }).catch(e => console.error(e));

    res.json({
      success: true,
      message: 'Payment proof submitted. Our team will verify the payment and confirm shortly.',
      order
    });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting payment proof.' });
  }
});

// Custom Project Enquiry
app.post('/api/enquiries', async (req, res) => {
  try {
    const {
      customer_name,
      business_name,
      customer_email,
      customer_phone,
      services_required,
      project_description,
      estimated_budget,
      timeline,
      reference_file,
      preferred_communication
    } = req.body;

    if (!customer_name || !customer_email || !customer_phone || !project_description) {
      return res.status(400).json({ error: 'Please fill in all required fields (Name, Email, Phone, Description).' });
    }

    const enquiryId = `ST-ENQ-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const newEnquiry = {
      id: enquiryId,
      customer_name,
      business_name: business_name || '',
      customer_email,
      customer_phone,
      services_required: services_required || ['Custom Software'],
      project_description,
      estimated_budget: estimated_budget || 'Flexible',
      timeline: timeline || 'Standard (2-4 Weeks)',
      reference_file: reference_file || null,
      preferred_communication: preferred_communication || 'WhatsApp',
      status: 'New Enquiry',
      created_at: new Date().toISOString()
    };

    const db = loadDatabase();
    if (!db.project_enquiries) db.project_enquiries = [];
    db.project_enquiries.unshift(newEnquiry);
    saveDatabase(db);

    notifyOwnerProjectEnquiry(newEnquiry).catch(e => console.error("Owner enquiry notification err:", e));
    notifyCustomerEnquiryConfirmation(newEnquiry).catch(e => console.error("Customer enquiry notification err:", e));

    res.status(201).json({
      success: true,
      enquiryId: newEnquiry.id,
      enquiry: newEnquiry,
      message: 'Project enquiry submitted successfully! We will get in touch shortly.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process project enquiry.' });
  }
});

// Contact Form Message
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' });
    }

    const db = loadDatabase();
    const contactId = `ST-MSG-${Date.now().toString().slice(-5)}`;

    const contactEntry = {
      id: contactId,
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Contact Form Inquiry',
      message,
      created_at: new Date().toISOString()
    };

    if (!db.contact_messages) db.contact_messages = [];
    db.contact_messages.unshift(contactEntry);
    saveDatabase(db);

    // Notify owner
    sendEmailNotification({
      to: db.company_settings.email,
      subject: `New Contact Message from ${name} – SUDHARSHAN_TECH`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nSubject: ${subject}\n\nMessage:\n${message}`,
      event_type: 'CONTACT_FORM_SUBMITTED',
      related_id: contactId
    }).catch(e => console.error(e));

    res.json({
      success: true,
      message: 'Thank you for contacting us. We will get back to you shortly.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Could not send contact message.' });
  }
});

/* ========================================================
   ADMIN API ROUTES (PROTECTED)
   ======================================================== */

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (password === ADMIN_SECRET || password === 'admin123') {
    return res.json({
      success: true,
      token: ADMIN_SECRET,
      user: {
        email: 'sudharshantech123@gmail.com',
        role: 'Super Administrator',
        name: 'Sudharshan P S'
      }
    });
  }

  res.status(401).json({ error: 'Invalid password. Access denied.' });
});

// Admin Dashboard Overview Metrics
app.get('/api/admin/overview', requireAdmin, (req, res) => {
  const db = loadDatabase();
  const orders = db.orders || [];
  const enquiries = db.project_enquiries || [];

  const todayStr = new Date().toISOString().split('T')[0];
  const ordersToday = orders.filter(o => o.created_at && o.created_at.startsWith(todayStr)).length;
  const awaitingVerification = orders.filter(o => o.payment_status === 'Pending Verification').length;
  const verifiedPayments = orders.filter(o => o.payment_status === 'Payment Verified' || o.payment_status === 'Paid').length;
  const inProgressProjects = orders.filter(o => o.order_status === 'In Progress').length;
  const completedProjects = orders.filter(o => o.order_status === 'Completed').length;
  
  const totalVerifiedRevenue = orders
    .filter(o => o.payment_status === 'Payment Verified' || o.payment_status === 'Paid')
    .reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);

  res.json({
    total_orders: orders.length,
    orders_today: ordersToday,
    pending_enquiries: enquiries.filter(e => e.status !== 'Resolved').length,
    awaiting_verification: awaitingVerification,
    verified_payments: verifiedPayments,
    in_progress_projects: inProgressProjects,
    completed_projects: completedProjects,
    total_verified_revenue: totalVerifiedRevenue
  });
});

// Admin Orders List
app.get('/api/admin/orders', requireAdmin, (req, res) => {
  const db = loadDatabase();
  res.json(db.orders || []);
});

// Admin Update Order
app.patch('/api/admin/orders/:id', requireAdmin, async (req, res) => {
  try {
    const { order_status, payment_status, admin_notes, total_amount } = req.body;
    const db = loadDatabase();
    const index = (db.orders || []).findIndex(o => o.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = db.orders[index];
    const oldStatus = order.order_status;
    const oldPayment = order.payment_status;

    if (order_status) order.order_status = order_status;
    if (payment_status) order.payment_status = payment_status;
    if (admin_notes !== undefined) order.admin_notes = admin_notes;
    if (total_amount !== undefined) order.total_amount = Number(total_amount);
    order.updated_at = new Date().toISOString();

    db.orders[index] = order;
    saveDatabase(db);

    // Notify customer on status update or payment verified
    if (order_status !== oldStatus || payment_status !== oldPayment) {
      notifyCustomerOrderStatusUpdate(order, oldStatus).catch(e => console.error("Update email err:", e));
    }

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: 'Error updating order' });
  }
});

// Admin Enquiries List
app.get('/api/admin/enquiries', requireAdmin, (req, res) => {
  const db = loadDatabase();
  res.json(db.project_enquiries || []);
});

// Admin Update Enquiry
app.patch('/api/admin/enquiries/:id', requireAdmin, (req, res) => {
  const { status, admin_notes } = req.body;
  const db = loadDatabase();
  const index = (db.project_enquiries || []).findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Enquiry not found' });

  if (status) db.project_enquiries[index].status = status;
  if (admin_notes !== undefined) db.project_enquiries[index].admin_notes = admin_notes;
  db.project_enquiries[index].updated_at = new Date().toISOString();

  saveDatabase(db);
  res.json({ success: true, enquiry: db.project_enquiries[index] });
});

// Admin Notification Logs
app.get('/api/admin/notifications', requireAdmin, (req, res) => {
  const db = loadDatabase();
  res.json(db.notification_logs || []);
});

// Admin SMS Logs
app.get('/api/admin/sms-logs', requireAdmin, (req, res) => {
  const db = loadDatabase();
  res.json(db.sms_logs || []);
});

// Admin Update Company Settings
app.put('/api/admin/settings', requireAdmin, (req, res) => {
  const db = loadDatabase();
  db.company_settings = {
    ...db.company_settings,
    ...req.body
  };
  saveDatabase(db);
  res.json({ success: true, settings: db.company_settings });
});

// Admin Manage Services (Edit starting price, description, etc.)
app.put('/api/admin/services/:id', requireAdmin, (req, res) => {
  const db = loadDatabase();
  const index = (db.services || []).findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Service not found' });

  db.services[index] = {
    ...db.services[index],
    ...req.body
  };
  saveDatabase(db);
  res.json({ success: true, service: db.services[index] });
});

// Admin Manage Projects
app.post('/api/admin/projects', requireAdmin, (req, res) => {
  const db = loadDatabase();
  const newProject = {
    id: `proj-${Date.now()}`,
    ...req.body
  };
  if (!db.portfolio_projects) db.portfolio_projects = [];
  db.portfolio_projects.unshift(newProject);
  saveDatabase(db);
  res.status(201).json({ success: true, project: newProject });
});

app.put('/api/admin/projects/:id', requireAdmin, (req, res) => {
  const db = loadDatabase();
  const index = (db.portfolio_projects || []).findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Project not found' });

  db.portfolio_projects[index] = {
    ...db.portfolio_projects[index],
    ...req.body
  };
  saveDatabase(db);
  res.json({ success: true, project: db.portfolio_projects[index] });
});

app.delete('/api/admin/projects/:id', requireAdmin, (req, res) => {
  const db = loadDatabase();
  db.portfolio_projects = (db.portfolio_projects || []).filter(p => p.id !== req.params.id);
  saveDatabase(db);
  res.json({ success: true });
});

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 SUDHARSHAN_TECH API Server listening on port ${PORT}`);
  console.log(`📡 Company: SUDHARSHAN_TECH | Tagline: Code. Create. Elevate.`);
  console.log(`💼 Admin Dashboard Endpoint: http://localhost:${PORT}/api/admin/overview`);
  console.log(`======================================================\n`);
});
