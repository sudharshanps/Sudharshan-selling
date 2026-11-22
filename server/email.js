import nodemailer from 'nodemailer';
import { loadDatabase, saveDatabase } from './db.js';

// Configuration from environment variables
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'sudharshantech123@gmail.com';
const APP_URL = process.env.APP_URL || 'http://localhost:5173';

let transporter = null;

if (SMTP_USER && SMTP_PASS) {
  try {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });
  } catch (err) {
    console.warn("Could not initialize live SMTP transporter:", err.message);
  }
}

/**
 * Log notification attempt to database for complete auditability
 */
function logNotification({ event_type, recipient, subject, body_preview, status, error_message, related_id, message_id, provider }) {
  const db = loadDatabase();
  const logEntry = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    event_type,
    recipient,
    subject,
    body_preview,
    status, // 'sent' | 'simulated_logged' | 'failed'
    message_id: message_id || null,
    provider: provider || 'smtp',
    error_message: error_message || null,
    related_id: related_id || null,
    created_at: new Date().toISOString()
  };
  
  if (!db.notification_logs) {
    db.notification_logs = [];
  }
  db.notification_logs.unshift(logEntry);
  saveDatabase(db);
  return logEntry;
}

/**
 * Send an email notification with automatic fallback, reliable logging & attachment support
 */
export async function sendEmailNotification({ to, subject, html, text, event_type, related_id, reply_to, attachments = [] }) {
  const preview = text || (html ? html.replace(/<[^>]+>/g, ' ').substring(0, 150) : '');
  const fromAddress = process.env.RESEND_FROM_EMAIL || process.env.EMAIL_FROM || (SMTP_USER ? `"SUDHARSHAN_TECH" <${SMTP_USER}>` : `"SUDHARSHAN_TECH" <sudharshantech123@gmail.com>`);
  const replyToAddress = reply_to || process.env.REPLY_TO || 'sudharshantech123@gmail.com';

  // Support Resend HTTP API if RESEND_API_KEY is configured
  if (process.env.RESEND_API_KEY) {
    try {
      const resendPayload = {
        from: fromAddress,
        to: [to],
        reply_to: replyToAddress,
        subject,
        html,
        text: text || preview,
        attachments: attachments.map(a => ({
          filename: a.filename,
          content: fs.readFileSync(a.path).toString('base64')
        }))
      };

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resendPayload)
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || 'Resend API dispatch failed');

      return logNotification({
        event_type,
        recipient: to,
        subject,
        body_preview: preview.trim(),
        status: 'sent',
        message_id: resData.id,
        provider: 'resend',
        error_message: null,
        related_id
      });
    } catch (resendErr) {
      console.warn("Resend dispatch error, falling back to SMTP/simulated:", resendErr.message);
    }
  }
  
  if (!transporter) {
    console.log(`\n======================================================`);
    console.log(`[EMAIL NOTIFICATION LOGGED - SANDBOX / SIMULATED]`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Event: ${event_type} | ID: ${related_id}`);
    console.log(`Attachments: ${attachments.length} file(s)`);
    console.log(`Preview: ${preview.trim()}`);
    console.log(`======================================================\n`);
    
    return logNotification({
      event_type,
      recipient: to,
      subject,
      body_preview: preview.trim(),
      status: 'simulated_logged',
      message_id: `sim-${Date.now()}`,
      provider: 'simulation_audit',
      error_message: 'SMTP/Transactional API credentials not configured in environment. Logged securely to database audit trail.',
      related_id
    });
  }

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      replyTo: replyToAddress,
      to,
      subject,
      text: text || preview,
      html,
      attachments: attachments.map(a => ({
        filename: a.filename,
        path: a.path
      }))
    });

    return logNotification({
      event_type,
      recipient: to,
      subject,
      body_preview: preview.trim(),
      status: 'sent',
      message_id: info.messageId,
      provider: 'smtp',
      error_message: null,
      related_id
    });
  } catch (error) {
    console.error("Email dispatch failed:", error);
    return logNotification({
      event_type,
      recipient: to,
      subject,
      body_preview: preview.trim(),
      status: 'failed',
      message_id: null,
      provider: 'smtp',
      error_message: error.message,
      related_id
    });
  }
}

/**
 * Notify Owner of New Order
 */
export async function notifyOwnerNewOrder(order) {
  const subject = `New Service Order Received – SUDHARSHAN_TECH | Order #${order.id}`;
  
  const itemsHtml = (order.items || []).map(item => `
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px; font-weight: 600; color: #0f172a;">${item.service_title}</td>
      <td style="padding: 10px; color: #475569;">${item.package_name || 'Standard Service'}</td>
      <td style="padding: 10px; text-align: center; color: #475569;">${item.quantity || 1}</td>
      <td style="padding: 10px; text-align: right; font-weight: 600; color: #2563eb;">₹${(item.price || 0).toLocaleString('en-IN')}</td>
    </tr>
  `).join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background: #070c18; padding: 24px; text-align: center; border-bottom: 3px solid #2563eb;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;">SUDHARSHAN_TECH</h1>
        <p style="color: #38bdf8; margin: 4px 0 0; font-size: 13px;">Code. Create. Elevate.</p>
      </div>

      <div style="padding: 24px;">
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #166534; font-size: 16px; margin: 0 0 4px;">🚀 A new customer order has been placed!</h2>
          <p style="color: #15803d; font-size: 13px; margin: 0;">Order Reference: <strong>${order.id}</strong></p>
        </div>

        <h3 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 15px; margin-top: 0;">👤 Customer Information</h3>
        <table style="width: 100%; font-size: 14px; margin-bottom: 20px;">
          <tr><td style="width: 140px; color: #64748b; padding: 4px 0;">Customer Name:</td><td style="font-weight: 600; color: #0f172a;">${order.customer_name}</td></tr>
          ${order.business_name ? `<tr><td style="color: #64748b; padding: 4px 0;">Business Name:</td><td style="font-weight: 600; color: #0f172a;">${order.business_name}</td></tr>` : ''}
          <tr><td style="color: #64748b; padding: 4px 0;">Email:</td><td><a href="mailto:${order.customer_email}" style="color: #2563eb; text-decoration: none;">${order.customer_email}</a></td></tr>
          <tr><td style="color: #64748b; padding: 4px 0;">Phone:</td><td><a href="tel:${order.customer_phone}" style="color: #2563eb; text-decoration: none;">${order.customer_phone}</a> (<a href="https://wa.me/${order.customer_phone.replace(/[^0-9]/g,'')}" style="color: #16a34a; text-decoration: none;">WhatsApp</a>)</td></tr>
        </table>

        <h3 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 15px;">📦 Order Items</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <th style="padding: 8px 10px; text-align: left; color: #475569;">Service</th>
              <th style="padding: 8px 10px; text-align: left; color: #475569;">Package</th>
              <th style="padding: 8px 10px; text-align: center; color: #475569;">Qty</th>
              <th style="padding: 8px 10px; text-align: right; color: #475569;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 12px 10px; text-align: right; font-weight: 700; color: #0f172a;">Estimated Total:</td>
              <td style="padding: 12px 10px; text-align: right; font-weight: 800; font-size: 16px; color: #2563eb;">₹${(order.total_amount || 0).toLocaleString('en-IN')}</td>
            </tr>
          </tfoot>
        </table>

        <h3 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 15px;">💳 Payment Status</h3>
        <div style="background: #f8fafc; padding: 12px 16px; border-radius: 6px; font-size: 14px; margin-bottom: 20px;">
          <p style="margin: 4px 0;"><strong>Method:</strong> ${order.payment_method === 'upi_qr' ? 'Google Pay / UPI QR' : 'Quotation / Custom Invoice'}</p>
          <p style="margin: 4px 0;"><strong>Status:</strong> <span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${order.payment_status}</span></p>
          ${order.transaction_ref ? `<p style="margin: 4px 0;"><strong>UTR / Transaction Ref:</strong> <code>${order.transaction_ref}</code></p>` : ''}
          ${order.payment_proof ? `<p style="margin: 4px 0;"><strong>Screenshot Proof:</strong> <a href="${APP_URL}${order.payment_proof}" target="_blank" style="color: #2563eb;">View Uploaded Screenshot</a></p>` : ''}
        </div>

        ${order.custom_requirements ? `
          <h3 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 15px;">📝 Custom Requirements</h3>
          <p style="font-size: 14px; color: #334155; background: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 20px; white-space: pre-wrap;">${order.custom_requirements}</p>
        ` : ''}

        ${order.reference_files && order.reference_files.length ? `
          <h3 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 15px;">📎 Uploaded Project Files</h3>
          <ul style="font-size: 14px; color: #2563eb; margin-bottom: 20px;">
            ${order.reference_files.map(f => `<li><a href="${APP_URL}${f}" target="_blank" style="color: #2563eb;">Download Attached File (${f.split('/').pop()})</a></li>`).join('')}
          </ul>
        ` : ''}

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <a href="${APP_URL}/admin" style="background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; display: inline-block;">Open Admin Dashboard</a>
        </div>
      </div>

      <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
        SUDHARSHAN_TECH | No. 16A, Thendral Nagar, Veerakeralam, Coimbatore – 641007, Tamil Nadu | +91 97914 95418
      </div>
    </div>
  `;

  return sendEmailNotification({
    to: OWNER_EMAIL,
    subject,
    html,
    event_type: 'ORDER_PLACED_OWNER',
    related_id: order.id
  });
}

/**
 * Confirmation to Customer for New Order
 */
export async function notifyCustomerOrderConfirmation(order) {
  const subject = `Your Service Order Confirmation – SUDHARSHAN_TECH | #${order.id}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background: #070c18; padding: 24px; text-align: center; border-bottom: 3px solid #2563eb;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">SUDHARSHAN_TECH</h1>
        <p style="color: #38bdf8; margin: 4px 0 0; font-size: 12px;">Code. Create. Elevate.</p>
      </div>

      <div style="padding: 24px;">
        <h2 style="color: #0f172a; font-size: 18px; margin-top: 0;">Thank you for your order, ${order.customer_name}!</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.6;">
          We have successfully received your service request for <strong>Order #${order.id}</strong>. Our team led by founder Sudharshan P S will review your requirements and begin the onboarding process.
        </p>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px; font-size: 14px; font-weight: 600; color: #0f172a;">Summary of Requested Services:</p>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155;">
            ${(order.items || []).map(i => `<li><strong>${i.service_title}</strong> (${i.package_name || 'Standard'}) - ₹${(i.price || 0).toLocaleString('en-IN')}</li>`).join('')}
          </ul>
          <p style="margin: 12px 0 0; font-size: 14px; color: #0f172a;">Estimated Total: <strong>₹${(order.total_amount || 0).toLocaleString('en-IN')}</strong></p>
          <p style="margin: 6px 0 0; font-size: 13px; color: #64748b;">Payment Status: <span style="font-weight: 600; color: #2563eb;">${order.payment_status}</span></p>
        </div>

        <p style="color: #475569; font-size: 14px; line-height: 1.6;">
          <strong>Need immediate assistance or direct discussion?</strong><br/>
          You can reach out directly via WhatsApp at <a href="https://wa.me/919791495418?text=Hello%20SUDHARSHAN_TECH,%20I%20have%20placed%20Order%20${order.id}" style="color: #16a34a; font-weight: 600; text-decoration: none;">+91 97914 95418</a>.
        </p>
      </div>

      <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
        SUDHARSHAN_TECH | No. 16A, Thendral Nagar, Veerakeralam, Coimbatore – 641007, Tamil Nadu
      </div>
    </div>
  `;

  return sendEmailNotification({
    to: order.customer_email,
    subject,
    html,
    event_type: 'ORDER_PLACED_CUSTOMER',
    related_id: order.id
  });
}

/**
 * Notify Owner of Custom Project Enquiry
 */
export async function notifyOwnerProjectEnquiry(enquiry) {
  const subject = `New Project Enquiry: ${enquiry.id} – SUDHARSHAN_TECH`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background: #070c18; padding: 20px; text-align: center; border-bottom: 3px solid #06b6d4;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">SUDHARSHAN_TECH</h1>
        <p style="color: #38bdf8; margin: 4px 0 0; font-size: 12px;">Custom Project Enquiry</p>
      </div>
      <div style="padding: 24px; font-size: 14px; color: #334155;">
        <h2 style="color: #0f172a; font-size: 17px; margin-top: 0;">New Custom Project Request (#${enquiry.id})</h2>
        <p><strong>Customer Name:</strong> ${enquiry.customer_name}</p>
        <p><strong>Business / Company:</strong> ${enquiry.business_name || 'N/A'}</p>
        <p><strong>Email:</strong> <a href="mailto:${enquiry.customer_email}">${enquiry.customer_email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${enquiry.customer_phone}">${enquiry.customer_phone}</a></p>
        <p><strong>Services Required:</strong> ${Array.isArray(enquiry.services_required) ? enquiry.services_required.join(', ') : enquiry.services_required}</p>
        <p><strong>Estimated Budget:</strong> ${enquiry.estimated_budget || 'Flexible / To Be Quoted'}</p>
        <p><strong>Expected Timeline:</strong> ${enquiry.timeline || 'Standard'}</p>
        <p><strong>Preferred Contact:</strong> ${enquiry.preferred_communication || 'WhatsApp / Email'}</p>
        <div style="background: #f8fafc; padding: 12px; border-radius: 6px; margin: 16px 0;">
          <strong>Project Description:</strong>
          <p style="white-space: pre-wrap; margin-top: 6px;">${enquiry.project_description}</p>
        </div>
        ${enquiry.reference_file ? `<p><strong>Attachment:</strong> <a href="${APP_URL}${enquiry.reference_file}">View Uploaded File</a></p>` : ''}
      </div>
    </div>
  `;

  return sendEmailNotification({
    to: OWNER_EMAIL,
    subject,
    html,
    event_type: 'PROJECT_ENQUIRY_OWNER',
    related_id: enquiry.id
  });
}

/**
 * Customer Enquiry Confirmation Email
 */
export async function notifyCustomerEnquiryConfirmation(enquiry) {
  const subject = `We Received Your Project Enquiry – SUDHARSHAN_TECH | #${enquiry.id}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background: #070c18; padding: 20px; text-align: center; border-bottom: 3px solid #06b6d4;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">SUDHARSHAN_TECH</h1>
        <p style="color: #38bdf8; margin: 4px 0 0; font-size: 12px;">Code. Create. Elevate.</p>
      </div>
      <div style="padding: 24px; font-size: 14px; color: #334155; line-height: 1.6;">
        <h2 style="color: #0f172a; font-size: 18px; margin-top: 0;">We have received your custom project request!</h2>
        <p>Hello <strong>${enquiry.customer_name}</strong>,</p>
        <p>Thank you for reaching out to SUDHARSHAN_TECH. Your project enquiry ID is <strong>${enquiry.id}</strong>.</p>
        <p>Our founder and technical architects are reviewing your specifications. We will prepare an estimated timeline and proposal within 24 hours.</p>
        <p>If you'd like to chat right away, feel free to message us on WhatsApp at <a href="https://wa.me/919791495418?text=Hello%20SUDHARSHAN_TECH,%20inquiring%20about%20Enquiry%20${enquiry.id}" style="color: #16a34a; font-weight: 600;">+91 97914 95418</a>.</p>
      </div>
    </div>
  `;

  return sendEmailNotification({
    to: enquiry.customer_email,
    subject,
    html,
    event_type: 'PROJECT_ENQUIRY_CUSTOMER',
    related_id: enquiry.id
  });
}

/**
 * Notify Customer on Payment Verification / Status Update
 */
export async function notifyCustomerOrderStatusUpdate(order, previousStatus) {
  let subject = `Order #${order.id} Status Update: ${order.order_status} – SUDHARSHAN_TECH`;
  if (order.payment_status === 'Payment Verified') {
    subject = `Payment Confirmed – SUDHARSHAN_TECH | Order #${order.id}`;
  } else if (order.order_status === 'Completed') {
    subject = `Your Project Has Been Completed – SUDHARSHAN_TECH | Order #${order.id}`;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background: #070c18; padding: 20px; text-align: center; border-bottom: 3px solid #2563eb;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">SUDHARSHAN_TECH</h1>
        <p style="color: #38bdf8; margin: 4px 0 0; font-size: 12px;">Status Notification</p>
      </div>
      <div style="padding: 24px; font-size: 14px; color: #334155; line-height: 1.6;">
        <h2 style="color: #0f172a; font-size: 18px; margin-top: 0;">Order Status Update</h2>
        <p>Hello <strong>${order.customer_name}</strong>,</p>
        <p>Your order <strong>#${order.id}</strong> has been updated:</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Current Order Status:</strong> <span style="color: #2563eb; font-weight: 700;">${order.order_status}</span></p>
          <p style="margin: 4px 0;"><strong>Payment Status:</strong> <span style="color: #16a34a; font-weight: 700;">${order.payment_status}</span></p>
          ${order.admin_notes ? `<p style="margin: 8px 0 0; padding-top: 8px; border-top: 1px solid #e2e8f0; font-style: italic; color: #475569;">Admin Note: ${order.admin_notes}</p>` : ''}
        </div>
        <p>Thank you for partnering with SUDHARSHAN_TECH!</p>
      </div>
    </div>
  `;

  return sendEmailNotification({
    to: order.customer_email,
    subject,
    html,
    event_type: 'ORDER_STATUS_UPDATE',
    related_id: order.id
  });
}

/**
 * Notify Company Owner of New Customer Inquiry (via Resend / SMTP)
 * Automatically sets Reply-To to the customer's email.
 */
export async function notifyOwnerNewInquiry(inquiry) {
  const recipientEmail = process.env.NOTIFICATION_EMAIL || OWNER_EMAIL;
  const subject = `New Project Inquiry: ${inquiry.full_name} – SUDHARSHAN_TECH (ID: #${inquiry.id})`;
  const formattedDate = new Date(inquiry.created_at || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
      <!-- Header -->
      <div style="background: #0B1736; padding: 28px 24px; text-align: center; border-bottom: 3px solid #155EEF;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">
          SUDHARSHAN<span style="color: #155EEF;">_TECH</span>
        </h1>
        <p style="color: #94A3B8; margin: 6px 0 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">
          Code. Create. Elevate.
        </p>
      </div>

      <!-- Main Body -->
      <div style="padding: 28px 24px;">
        <!-- Alert Pill -->
        <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 14px 18px; margin-bottom: 24px;">
          <h2 style="color: #155EEF; font-size: 16px; font-weight: 700; margin: 0 0 4px;">
            🔔 New Customer Project Inquiry Received!
          </h2>
          <p style="color: #1E40AF; font-size: 13px; margin: 0;">
            Enquiry ID: <strong>#${inquiry.id}</strong> &bull; Status: <span style="background: #DCFCE7; color: #166534; padding: 2px 8px; border-radius: 9999px; font-weight: 700; font-size: 11px;">NEW</span>
          </p>
        </div>

        <!-- Customer Profile Table -->
        <h3 style="color: #0F172A; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px; padding-bottom: 8px; border-bottom: 1px solid #F1F5F9;">
          👤 Customer & Business Details
        </h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #64748B; width: 140px; font-weight: 600;">Customer Name:</td>
            <td style="padding: 8px 0; color: #0F172A; font-weight: 700;">${inquiry.full_name}</td>
          </tr>
          ${inquiry.company_name ? `
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Company / Org:</td>
            <td style="padding: 8px 0; color: #0F172A; font-weight: 600;">${inquiry.company_name}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Email Address:</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${inquiry.email}" style="color: #155EEF; text-decoration: none; font-weight: 600;">
                ${inquiry.email}
              </a>
              <span style="font-size: 11px; color: #64748B; margin-left: 6px;">(Click reply to email customer directly)</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Phone Number:</td>
            <td style="padding: 8px 0;">
              <a href="tel:${inquiry.phone}" style="color: #0F172A; text-decoration: none; font-weight: 700;">
                ${inquiry.phone}
              </a>
              <a href="https://wa.me/${String(inquiry.phone).replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inquiry.full_name)},%20thank%20you%20for%20contacting%20SUDHARSHAN_TECH%20regarding%20your%20inquiry%20%23${inquiry.id}." target="_blank" style="margin-left: 10px; display: inline-block; background: #DCFCE7; color: #15803D; padding: 2px 10px; border-radius: 6px; text-decoration: none; font-size: 11px; font-weight: 700;">
                Chat on WhatsApp &rarr;
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Submission Date:</td>
            <td style="padding: 8px 0; color: #475569;">${formattedDate} (IST)</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-weight: 600;">Acquisition Source:</td>
            <td style="padding: 8px 0; color: #475569; font-weight: 600;">${inquiry.source || 'website'}</td>
          </tr>
        </table>

        <!-- Service & Project Scope -->
        <h3 style="color: #0F172A; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px; padding-bottom: 8px; border-bottom: 1px solid #F1F5F9;">
          🎯 Requested Service & Budget
        </h3>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px; font-size: 13px;">
            <strong style="color: #64748B;">Requested Domain / Service:</strong>
            <span style="color: #155EEF; font-weight: 800; margin-left: 8px; font-size: 14px;">${inquiry.service}</span>
          </p>
          <p style="margin: 0; font-size: 13px;">
            <strong style="color: #64748B;">Estimated Budget:</strong>
            <span style="color: #0F172A; font-weight: 700; margin-left: 8px;">${inquiry.project_budget || 'Flexible / To Be Quoted'}</span>
          </p>
        </div>

        <!-- Project Description / Message -->
        <h3 style="color: #0F172A; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px; padding-bottom: 8px; border-bottom: 1px solid #F1F5F9;">
          📝 Project Description & Requirements
        </h3>
        <div style="background: #F8FAFC; border-left: 4px solid #155EEF; border-radius: 0 12px 12px 0; padding: 16px; margin-bottom: 28px;">
          <p style="margin: 0; font-size: 13px; line-height: 1.7; color: #334155; white-space: pre-wrap;">${inquiry.message}</p>
        </div>

        <!-- CTA Buttons -->
        <div style="text-align: center; padding-top: 10px;">
          <a href="${APP_URL}/admin" style="background: #155EEF; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 800; font-size: 13px; display: inline-block; box-shadow: 0 4px 14px rgba(21, 94, 239, 0.35);">
            Open Admin Dashboard &amp; Manage Inquiry &rarr;
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #F8FAFC; padding: 16px; text-align: center; font-size: 11px; color: #94A3B8; border-top: 1px solid #E2E8F0;">
        SUDHARSHAN_TECH &bull; No. 16A, Thendral Nagar, Veerakeralam, Coimbatore &ndash; 641007, Tamil Nadu, India &bull; Phone: +91 97914 95418
      </div>
    </div>
  `;

  return sendEmailNotification({
    to: recipientEmail,
    subject,
    html,
    reply_to: inquiry.email,
    event_type: 'NEW_INQUIRY_OWNER',
    related_id: String(inquiry.id)
  });
}
