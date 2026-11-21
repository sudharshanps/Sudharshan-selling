import { loadDatabase, saveDatabase } from './db.js';

const COMPANY_PHONE = process.env.COMPANY_PHONE || '+919791495418';
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER || '';

/**
 * Log SMS dispatch attempt to database
 */
function logSmsAttempt({ recipient, message, status, provider, error_message, related_id }) {
  const db = loadDatabase();
  const logEntry = {
    id: `sms-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    recipient,
    message,
    status, // 'sent' | 'simulated_logged' | 'failed'
    provider: provider || 'System Logger',
    error_message: error_message || null,
    related_id: related_id || null,
    created_at: new Date().toISOString()
  };

  if (!db.sms_logs) {
    db.sms_logs = [];
  }
  db.sms_logs.unshift(logEntry);
  saveDatabase(db);
  return logEntry;
}

/**
 * Send SMS notification to company owner (+91 97914 95418)
 * Independent from email notifications.
 */
export async function sendSmsNotification({ to = COMPANY_PHONE, message, related_id }) {
  // If Twilio credentials are configured
  if (TWILIO_SID && TWILIO_AUTH && TWILIO_FROM) {
    try {
      const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_AUTH}`).toString('base64');
      const params = new URLSearchParams();
      params.append('To', to);
      params.append('From', TWILIO_FROM);
      params.append('Body', message);

      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Twilio SMS dispatch failed');
      }

      console.log(`[SMS DISPATCHED VIA TWILIO] To: ${to} | SID: ${data.sid}`);
      return logSmsAttempt({
        recipient: to,
        message,
        status: 'sent',
        provider: 'Twilio',
        related_id
      });
    } catch (err) {
      console.error("[SMS ERROR]:", err.message);
      return logSmsAttempt({
        recipient: to,
        message,
        status: 'failed',
        provider: 'Twilio',
        error_message: err.message,
        related_id
      });
    }
  }

  // Fallback: Safe simulated logging with audit trail (when credentials are not yet entered)
  console.log(`\n======================================================`);
  console.log(`[MOBILE SMS NOTIFICATION - SIMULATED / LOGGED]`);
  console.log(`Recipient: ${to}`);
  console.log(`Message: ${message}`);
  console.log(`Event ID: ${related_id}`);
  console.log(`======================================================\n`);

  return logSmsAttempt({
    recipient: to,
    message,
    status: 'simulated_logged',
    provider: 'Console Sandbox',
    error_message: 'Twilio/MSG91 SMS credentials not yet provided in .env. Logged safely to admin audit history.',
    related_id
  });
}

/**
 * Dispatch Order Alert SMS to Founder
 */
export async function notifyOwnerOrderSms(order) {
  const serviceNames = (order.items || []).map(i => i.service_title).join(', ');
  const message = `SUDHARSHAN_TECH: New order received. Order ID: ${order.id}. Customer: ${order.customer_name}. Services: ${serviceNames}. Amount: Rs.${order.total_amount}. Check your admin dashboard.`;
  
  return sendSmsNotification({
    to: COMPANY_PHONE,
    message,
    related_id: order.id
  });
}
