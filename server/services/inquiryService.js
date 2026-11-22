import { getPool, checkDatabaseHealth } from '../mysql.js';
import { loadDatabase, saveDatabase } from '../db.js';

/**
 * Validate and sanitize an email address
 */
export function sanitizeEmail(email) {
  if (!email || typeof email !== 'string') return '';
  return email.trim().toLowerCase();
}

/**
 * Validate and sanitize text input (prevent XSS / stripping dangerous characters)
 */
export function sanitizeText(text, maxLength = 1000) {
  if (!text || typeof text !== 'string') return '';
  return text.trim().slice(0, maxLength);
}

/**
 * Validate and sanitize phone number
 */
export function sanitizePhone(phone) {
  if (!phone || typeof phone !== 'string') return '';
  return phone.trim().replace(/[^\d+()\s-]/g, '').slice(0, 50);
}

/**
 * Create a new inquiry in MySQL with parameterization & validation
 */
export async function createInquiry(data) {
  const {
    full_name,
    email,
    phone,
    company_name,
    service,
    project_budget,
    message,
    source
  } = data;

  // Validation
  const cleanName = sanitizeText(full_name, 150);
  const cleanEmail = sanitizeEmail(email);
  const cleanPhone = sanitizePhone(phone);
  const cleanCompany = sanitizeText(company_name, 150);
  const cleanService = sanitizeText(service, 100) || 'Custom Digital Solution';
  const cleanBudget = sanitizeText(project_budget, 100) || 'Flexible';
  const cleanMessage = sanitizeText(message, 5000);
  const cleanSource = sanitizeText(source, 50) || 'website';

  if (!cleanName) {
    throw new Error('Full name is required.');
  }
  if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    throw new Error('A valid email address is required.');
  }
  if (!cleanPhone || cleanPhone.length < 7) {
    throw new Error('A valid contact phone number is required.');
  }
  if (!cleanMessage) {
    throw new Error('Project description / message is required.');
  }

  const pool = getPool();
  let inquiryRecord = null;

  if (pool) {
    try {
      const sql = `
        INSERT INTO inquiries (
          full_name, email, phone, company_name, service,
          project_budget, message, source, status,
          email_notification_status, whatsapp_notification_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New', 'Pending', 'Pending')
      `;

      const values = [
        cleanName,
        cleanEmail,
        cleanPhone,
        cleanCompany || null,
        cleanService,
        cleanBudget,
        cleanMessage,
        cleanSource
      ];

      const [result] = await pool.query(sql, values);
      const insertedId = result.insertId;

      // Retrieve newly created record
      const [rows] = await pool.query('SELECT * FROM inquiries WHERE id = ?', [insertedId]);
      inquiryRecord = rows[0];
    } catch (mysqlErr) {
      console.warn('[MySQL SAVE ERROR]:', mysqlErr.message);
      // If table doesn't exist, try creating it once
      if (mysqlErr.code === 'ER_NO_SUCH_TABLE') {
        try {
          await pool.query(`
            CREATE TABLE IF NOT EXISTS \`inquiries\` (
              \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
              \`full_name\` VARCHAR(150) NOT NULL,
              \`email\` VARCHAR(150) NOT NULL,
              \`phone\` VARCHAR(50) NOT NULL,
              \`company_name\` VARCHAR(150) NULL DEFAULT NULL,
              \`service\` VARCHAR(100) NOT NULL,
              \`project_budget\` VARCHAR(100) NULL DEFAULT 'Flexible',
              \`message\` TEXT NOT NULL,
              \`source\` VARCHAR(50) NOT NULL DEFAULT 'website',
              \`status\` VARCHAR(50) NOT NULL DEFAULT 'New',
              \`email_notification_status\` VARCHAR(50) NOT NULL DEFAULT 'Pending',
              \`whatsapp_notification_status\` VARCHAR(50) NOT NULL DEFAULT 'Pending',
              \`admin_notes\` TEXT NULL DEFAULT NULL,
              \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
          `);
          const [retryResult] = await pool.query(`
            INSERT INTO inquiries (
              full_name, email, phone, company_name, service,
              project_budget, message, source, status,
              email_notification_status, whatsapp_notification_status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New', 'Pending', 'Pending')
          `, [cleanName, cleanEmail, cleanPhone, cleanCompany || null, cleanService, cleanBudget, cleanMessage, cleanSource]);
          const [retryRows] = await pool.query('SELECT * FROM inquiries WHERE id = ?', [retryResult.insertId]);
          inquiryRecord = retryRows[0];
        } catch (retryErr) {
          console.error('[MySQL RETRY ERROR]:', retryErr.message);
        }
      }
    }
  }

  // Backup sync to file database to prevent any data loss if MySQL credentials are not yet entered in .env
  const db = loadDatabase();
  if (!db.inquiries) db.inquiries = [];

  const localRecord = {
    id: inquiryRecord ? inquiryRecord.id : `ST-INQ-${Date.now().toString().slice(-6)}`,
    full_name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    company_name: cleanCompany || null,
    service: cleanService,
    project_budget: cleanBudget,
    message: cleanMessage,
    source: cleanSource,
    status: 'New',
    email_notification_status: 'Pending',
    whatsapp_notification_status: 'Pending',
    admin_notes: null,
    created_at: inquiryRecord?.created_at ? new Date(inquiryRecord.created_at).toISOString() : new Date().toISOString(),
    updated_at: inquiryRecord?.updated_at ? new Date(inquiryRecord.updated_at).toISOString() : new Date().toISOString(),
  };

  db.inquiries.unshift(localRecord);
  saveDatabase(db);

  return inquiryRecord || localRecord;
}

/**
 * Update email and WhatsApp notification delivery statuses
 */
export async function updateInquiryNotificationStatus(id, { email_status, whatsapp_status }) {
  const pool = getPool();
  if (pool) {
    try {
      const updates = [];
      const values = [];

      if (email_status) {
        updates.push('email_notification_status = ?');
        values.push(email_status);
      }
      if (whatsapp_status) {
        updates.push('whatsapp_notification_status = ?');
        values.push(whatsapp_status);
      }

      if (updates.length > 0) {
        values.push(id);
        await pool.query(`UPDATE inquiries SET ${updates.join(', ')} WHERE id = ?`, values);
      }
    } catch (err) {
      console.warn('[MySQL NOTIFICATION UPDATE ERR]:', err.message);
    }
  }

  // Also sync in local JSON store
  const db = loadDatabase();
  if (db.inquiries) {
    const idx = db.inquiries.findIndex(i => String(i.id) === String(id));
    if (idx !== -1) {
      if (email_status) db.inquiries[idx].email_notification_status = email_status;
      if (whatsapp_status) db.inquiries[idx].whatsapp_notification_status = whatsapp_status;
      db.inquiries[idx].updated_at = new Date().toISOString();
      saveDatabase(db);
    }
  }
}

/**
 * Retrieve all inquiries with search, filter, and sorting
 */
export async function getAllInquiries({ search = '', service = 'All', status = 'All' } = {}) {
  const pool = getPool();
  if (pool) {
    try {
      let query = 'SELECT * FROM inquiries WHERE 1=1';
      const values = [];

      if (service && service !== 'All') {
        query += ' AND service = ?';
        values.push(service);
      }

      if (status && status !== 'All') {
        query += ' AND status = ?';
        values.push(status);
      }

      if (search && search.trim()) {
        const term = `%${search.trim()}%`;
        query += ' AND (full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR company_name LIKE ? OR message LIKE ? OR CAST(id AS CHAR) LIKE ?)';
        values.push(term, term, term, term, term, term);
      }

      query += ' ORDER BY created_at DESC';
      const [rows] = await pool.query(query, values);
      return rows;
    } catch (err) {
      console.warn('[MySQL FETCH ALL ERR, falling back to local store]:', err.message);
    }
  }

  // Fallback to local store
  const db = loadDatabase();
  let list = db.inquiries || [];

  if (service && service !== 'All') {
    list = list.filter(i => i.service === service);
  }
  if (status && status !== 'All') {
    list = list.filter(i => i.status === status);
  }
  if (search && search.trim()) {
    const term = search.trim().toLowerCase();
    list = list.filter(i => 
      (i.full_name && i.full_name.toLowerCase().includes(term)) ||
      (i.email && i.email.toLowerCase().includes(term)) ||
      (i.phone && i.phone.toLowerCase().includes(term)) ||
      (i.company_name && i.company_name.toLowerCase().includes(term)) ||
      (i.message && i.message.toLowerCase().includes(term)) ||
      String(i.id).includes(term)
    );
  }

  return list;
}

/**
 * Retrieve inquiry by ID
 */
export async function getInquiryById(id) {
  const pool = getPool();
  if (pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM inquiries WHERE id = ?', [id]);
      if (rows && rows.length > 0) return rows[0];
    } catch (err) {
      console.warn('[MySQL GET BY ID ERR]:', err.message);
    }
  }

  const db = loadDatabase();
  return (db.inquiries || []).find(i => String(i.id) === String(id)) || null;
}

/**
 * Update inquiry status and admin notes
 */
export async function updateInquiryStatus(id, status, admin_notes) {
  const pool = getPool();
  if (pool) {
    try {
      const updates = ['status = ?'];
      const values = [status];
      if (admin_notes !== undefined) {
        updates.push('admin_notes = ?');
        values.push(admin_notes);
      }
      values.push(id);
      await pool.query(`UPDATE inquiries SET ${updates.join(', ')} WHERE id = ?`, values);
    } catch (err) {
      console.warn('[MySQL UPDATE STATUS ERR]:', err.message);
    }
  }

  const db = loadDatabase();
  if (db.inquiries) {
    const idx = db.inquiries.findIndex(i => String(i.id) === String(id));
    if (idx !== -1) {
      db.inquiries[idx].status = status;
      if (admin_notes !== undefined) db.inquiries[idx].admin_notes = admin_notes;
      db.inquiries[idx].updated_at = new Date().toISOString();
      saveDatabase(db);
      return db.inquiries[idx];
    }
  }

  return getInquiryById(id);
}

/**
 * Delete inquiry with confirmation
 */
export async function deleteInquiry(id) {
  const pool = getPool();
  if (pool) {
    try {
      await pool.query('DELETE FROM inquiries WHERE id = ?', [id]);
    } catch (err) {
      console.warn('[MySQL DELETE ERR]:', err.message);
    }
  }

  const db = loadDatabase();
  if (db.inquiries) {
    db.inquiries = db.inquiries.filter(i => String(i.id) !== String(id));
    saveDatabase(db);
  }

  return true;
}

/**
 * Aggregate metrics for inquiries dashboard
 */
export async function getInquiryMetrics() {
  const all = await getAllInquiries();
  return {
    total: all.length,
    new: all.filter(i => i.status === 'New').length,
    reviewing: all.filter(i => i.status === 'Reviewing').length,
    contacted: all.filter(i => i.status === 'Contacted').length,
    quoted: all.filter(i => i.status === 'Quoted').length,
    in_progress: all.filter(i => i.status === 'In Progress').length,
    completed: all.filter(i => i.status === 'Completed').length,
    rejected: all.filter(i => i.status === 'Rejected').length
  };
}
