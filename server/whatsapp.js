import dotenv from 'dotenv';
import { loadDatabase, saveDatabase } from './db.js';

dotenv.config();

const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || '';
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
const WHATSAPP_RECIPIENT_NUMBER = (process.env.WHATSAPP_RECIPIENT_NUMBER || '919791495418').replace(/[^0-9]/g, '');
const WHATSAPP_TEMPLATE_NAME = process.env.WHATSAPP_TEMPLATE_NAME || '';
const WHATSAPP_TEMPLATE_LANGUAGE = process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en';

/**
 * Log WhatsApp notification to audit history
 */
function logWhatsAppAttempt({ recipient, message, status, message_id, error_message, related_id }) {
  const db = loadDatabase();
  const logEntry = {
    id: `wa-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    recipient,
    message,
    status, // 'sent' | 'simulated_logged' | 'failed'
    provider: 'Meta WhatsApp Cloud API',
    message_id: message_id || null,
    error_message: error_message || null,
    related_id: related_id || null,
    created_at: new Date().toISOString()
  };

  if (!db.whatsapp_logs) {
    db.whatsapp_logs = [];
  }
  db.whatsapp_logs.unshift(logEntry);
  saveDatabase(db);
  return logEntry;
}

/**
 * Format enquiry notification text
 */
export function formatWhatsAppMessage(inquiry) {
  return [
    `🔔 *NEW WEBSITE ENQUIRY*`,
    `*Enquiry ID:* #${inquiry.id}`,
    `*Name:* ${inquiry.full_name}`,
    `*Phone:* ${inquiry.phone}`,
    `*Email:* ${inquiry.email}`,
    inquiry.company_name ? `*Company:* ${inquiry.company_name}` : null,
    `*Service:* ${inquiry.service}`,
    `*Budget:* ${inquiry.project_budget || 'Flexible'}`,
    ``,
    `*Message:*`,
    `${inquiry.message}`,
    ``,
    `👉 _Please check the SUDHARSHAN_TECH admin dashboard for full details._`
  ].filter(Boolean).join('\n');
}

/**
 * Dispatch WhatsApp notification via Meta WhatsApp Cloud API
 */
export async function sendWhatsAppEnquiryAlert(inquiry) {
  const messageText = formatWhatsAppMessage(inquiry);
  const to = WHATSAPP_RECIPIENT_NUMBER;

  // Check if Meta WhatsApp Cloud API credentials are provided
  if (WHATSAPP_ACCESS_TOKEN && WHATSAPP_PHONE_NUMBER_ID) {
    try {
      const url = `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

      let payload;

      // If approved template is specified
      if (WHATSAPP_TEMPLATE_NAME) {
        payload = {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          type: 'template',
          template: {
            name: WHATSAPP_TEMPLATE_NAME,
            language: { code: WHATSAPP_TEMPLATE_LANGUAGE },
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: String(inquiry.id) },
                  { type: 'text', text: inquiry.full_name },
                  { type: 'text', text: inquiry.phone },
                  { type: 'text', text: inquiry.email },
                  { type: 'text', text: inquiry.service },
                  { type: 'text', text: inquiry.project_budget || 'Flexible' },
                  { type: 'text', text: inquiry.message.slice(0, 150) }
                ]
              }
            ]
          }
        };
      } else {
        // Direct business text message
        payload = {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          type: 'text',
          text: {
            preview_url: false,
            body: messageText
          }
        };
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        const errMsg = data.error?.message || 'Meta WhatsApp Cloud API dispatch failed';
        console.error('[META WHATSAPP API ERROR]:', errMsg);
        logWhatsAppAttempt({
          recipient: to,
          message: messageText,
          status: 'failed',
          error_message: errMsg,
          related_id: inquiry.id
        });
        return { status: 'failed', error: errMsg };
      }

      const msgId = data.messages?.[0]?.id || 'meta-wa-ok';
      console.log(`[META WHATSAPP DISPATCHED] To: +${to} | Msg ID: ${msgId}`);
      logWhatsAppAttempt({
        recipient: to,
        message: messageText,
        status: 'sent',
        message_id: msgId,
        related_id: inquiry.id
      });
      return { status: 'sent', message_id: msgId };
    } catch (err) {
      console.error('[META WHATSAPP NETWORK ERROR]:', err.message);
      logWhatsAppAttempt({
        recipient: to,
        message: messageText,
        status: 'failed',
        error_message: err.message,
        related_id: inquiry.id
      });
      return { status: 'failed', error: err.message };
    }
  }

  // Safe simulated logging when credentials are not yet configured in .env
  console.log(`\n======================================================`);
  console.log(`[META WHATSAPP CLOUD API - SIMULATED / LOGGED]`);
  console.log(`To: +${to}`);
  console.log(`Enquiry ID: #${inquiry.id}`);
  console.log(`Content:\n${messageText}`);
  console.log(`Note: Configure WHATSAPP_ACCESS_TOKEN & WHATSAPP_PHONE_NUMBER_ID in .env for live Meta Cloud dispatch.`);
  console.log(`======================================================\n`);

  logWhatsAppAttempt({
    recipient: to,
    message: messageText,
    status: 'simulated_logged',
    error_message: 'Meta WhatsApp Cloud API credentials not yet set in .env. Logged safely to admin audit history.',
    related_id: inquiry.id
  });

  return { status: 'simulated_logged' };
}
