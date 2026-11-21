import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadDatabase, saveDatabase } from './db.js';
import { sendEmailNotification } from './email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APP_URL = process.env.APP_URL || 'http://localhost:5173';
const LOGO_PATH = path.join(__dirname, '..', 'public', 'assets', 'logo.jpg');
const QUOTES_DIR = path.join(__dirname, '..', 'uploads', 'quotations');

if (!fs.existsSync(QUOTES_DIR)) {
  fs.mkdirSync(QUOTES_DIR, { recursive: true });
}

/**
 * Format currency in Indian Rupees style
 */
export function formatINR(val) {
  const num = Number(val) || 0;
  return num.toLocaleString('en-IN');
}

/**
 * Create a new dynamic quotation record in database
 */
export function createQuotationRecord(data) {
  const db = loadDatabase();
  const quoteId = data.id || `ST-QTE-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  const now = new Date();
  const validity = new Date();
  validity.setDate(now.getDate() + (data.validity_days || 15));

  const baseAmount = Number(data.base_amount) || 0;
  const additionalAmount = Number(data.additional_amount) || 0;
  const discount = Number(data.discount) || 0;
  const tax = Number(data.tax) || 0;
  const finalAmount = Math.max(0, baseAmount + additionalAmount - discount + tax);

  const quotation = {
    id: quoteId,
    customer_name: data.customer_name || 'Valued Client',
    customer_email: data.customer_email || '',
    customer_phone: data.customer_phone || '+91 97914 95418',
    business_name: data.business_name || '',
    requested_services: Array.isArray(data.requested_services) ? data.requested_services : [data.requested_services || 'Web & Digital Services'],
    project_description: data.project_description || 'Custom software development and digital transformation as per requirement specifications.',
    timeline: data.timeline || '7 - 14 Business Days',
    validity_date: data.validity_date || validity.toISOString().split('T')[0],
    
    // Financial Breakdown
    base_amount: baseAmount,
    additional_amount: additionalAmount,
    discount: discount,
    tax: tax,
    final_amount: finalAmount,

    // Project Terms
    included_features: data.included_features || [
      'Production-ready responsive architecture',
      'Secure database & REST API integration',
      'Cross-platform testing on mobile and desktop',
      'SEO optimization & performance hardening',
      'Free SSL deployment & domain configuration'
    ],
    milestones: data.milestones || [
      'Phase 1: Architecture, UI/UX Wireframing & Scope Lock',
      'Phase 2: Core Development & Database Schema Setup',
      'Phase 3: Integration, Client Review & Revisions',
      'Phase 4: Production Deployment & Handover'
    ],
    revisions: data.revisions || '3 Major Review & Revision Cycles included',
    support_period: data.support_period || '30 Days complimentary post-deployment bug support',
    payment_milestones: data.payment_milestones || '50% Upfront Advance, 50% upon Final Testing & Handover',
    third_party_charges: data.third_party_charges || 'Client provides third-party hosting/API keys (e.g. AWS, SMS gateway, domain) or billed at actual cost.',
    additional_scope_terms: data.additional_scope_terms || 'Any work outside this agreed scope will be estimated separately as a revision addendum.',

    // Operational Status Tracking
    status: data.status || 'Draft', // Draft, Sent, Delivered, Accepted, Revision Requested, Expired, Rejected
    message_id: null,
    provider: null,
    pdf_path: null,
    created_at: now.toISOString(),
    sent_at: null,
    client_response_notes: null,
    updated_at: now.toISOString()
  };

  if (!db.quotations) db.quotations = [];
  const existingIdx = db.quotations.findIndex(q => q.id === quoteId);
  if (existingIdx >= 0) {
    db.quotations[existingIdx] = { ...db.quotations[existingIdx], ...quotation, updated_at: now.toISOString() };
  } else {
    db.quotations.unshift(quotation);
  }

  saveDatabase(db);
  return quotation;
}

/**
 * Generate Responsive HTML Email Template for Quotations
 */
export function generateQuotationHtml(quote) {
  const serviceList = Array.isArray(quote.requested_services) 
    ? quote.requested_services.join(', ') 
    : quote.requested_services;

  const featuresList = (quote.included_features || []).map(f => `
    <li style="margin-bottom: 6px; color: #334155;">${f}</li>
  `).join('');

  const milestonesList = (quote.milestones || []).map(m => `
    <li style="margin-bottom: 6px; color: #334155;">${m}</li>
  `).join('');

  const acceptUrl = `${APP_URL}/api/quotations/${quote.id}/accept`;
  const requestChangesUrl = `${APP_URL}/api/quotations/${quote.id}/request-changes`;
  const viewUrl = `${APP_URL}/api/quotations/${quote.id}/view`;
  const pdfUrl = `${APP_URL}/api/quotations/${quote.id}/pdf`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Project Quotation – SUDHARSHAN_TECH | Quote #${quote.id}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #172033;">
  
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; padding: 24px 12px;">
    <tr>
      <td align="center">
        
        <!-- Main Email Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Header Bar with Royal Blue Branding -->
          <tr>
            <td style="background-color: #FFFFFF; border-bottom: 2px solid #155EEF; padding: 24px 32px; text-align: left;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #172033; letter-spacing: -0.5px;">
                      SUDHARSHAN<span style="color: #155EEF;">_TECH</span>
                    </h1>
                    <p style="margin: 4px 0 0; font-size: 11px; font-weight: 700; color: #155EEF; letter-spacing: 1px; text-transform: uppercase;">
                      Code. Create. Elevate.
                    </p>
                  </td>
                  <td align="right">
                    <span style="background-color: #EFF4FF; border: 1px solid #BFDBFE; color: #155EEF; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 8px; text-transform: uppercase;">
                      Official Quotation
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 32px 24px;">
              
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px; color: #172033;">
                Dear <strong>${quote.customer_name}</strong>,
              </p>
              
              <p style="font-size: 14px; line-height: 1.6; margin: 0 0 24px; color: #475569;">
                Thank you for your interest in <strong>SUDHARSHAN_TECH</strong>. We are pleased to share the tailored quotation for your requested digital solution.
              </p>

              <!-- Quotation Details Table -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; margin-bottom: 24px; padding: 16px;">
                <tr>
                  <td colspan="2" style="padding-bottom: 12px; border-bottom: 1px solid #E2E8F0;">
                    <strong style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #155EEF;">
                      QUOTATION DETAILS
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0 4px; font-size: 13px; color: #64748B; width: 160px;">Quotation ID:</td>
                  <td style="padding: 8px 0 4px; font-size: 13px; font-weight: 700; color: #172033; font-family: monospace;">${quote.id}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-size: 13px; color: #64748B;">Customer Name:</td>
                  <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #172033;">${quote.customer_name}</td>
                </tr>
                ${quote.business_name ? `
                <tr>
                  <td style="padding: 4px 0; font-size: 13px; color: #64748B;">Business Name:</td>
                  <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #172033;">${quote.business_name}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 4px 0; font-size: 13px; color: #64748B;">Requested Services:</td>
                  <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #155EEF;">${serviceList}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-size: 13px; color: #64748B;">Delivery Timeline:</td>
                  <td style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #172033;">${quote.timeline}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0 0; font-size: 13px; color: #64748B;">Quotation Valid Until:</td>
                  <td style="padding: 4px 0 0; font-size: 13px; font-weight: 700; color: #E53935;">${quote.validity_date}</td>
                </tr>
              </table>

              <!-- Project Description -->
              <div style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                <strong style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; display: block; margin-bottom: 6px;">
                  Project Description:
                </strong>
                <p style="font-size: 13px; line-height: 1.6; color: #334155; margin: 0; white-space: pre-wrap;">${quote.project_description}</p>
              </div>

              <!-- Price Breakdown Table -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
                <tr style="background-color: #EFF4FF;">
                  <td colspan="2" style="padding: 12px 16px; border-bottom: 1px solid #BFDBFE;">
                    <strong style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #155EEF;">
                      PRICE BREAKDOWN
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #475569; border-bottom: 1px solid #F1F5F9;">Base Amount:</td>
                  <td align="right" style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #172033; border-bottom: 1px solid #F1F5F9;">₹${formatINR(quote.base_amount)}</td>
                </tr>
                ${quote.additional_amount > 0 ? `
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #475569; border-bottom: 1px solid #F1F5F9;">Additional Features:</td>
                  <td align="right" style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #172033; border-bottom: 1px solid #F1F5F9;">+ ₹${formatINR(quote.additional_amount)}</td>
                </tr>` : ''}
                ${quote.discount > 0 ? `
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #16A34A; border-bottom: 1px solid #F1F5F9;">Special Discount:</td>
                  <td align="right" style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #16A34A; border-bottom: 1px solid #F1F5F9;">- ₹${formatINR(quote.discount)}</td>
                </tr>` : ''}
                ${quote.tax > 0 ? `
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; color: #475569; border-bottom: 1px solid #F1F5F9;">Taxes (if applicable):</td>
                  <td align="right" style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #172033; border-bottom: 1px solid #F1F5F9;">+ ₹${formatINR(quote.tax)}</td>
                </tr>` : ''}
                <tr style="background-color: #F8FAFC;">
                  <td style="padding: 14px 16px; font-size: 14px; font-weight: 700; color: #172033;">Final Quoted Amount:</td>
                  <td align="right" style="padding: 14px 16px; font-size: 18px; font-weight: 900; color: #155EEF;">₹${formatINR(quote.final_amount)}</td>
                </tr>
              </table>

              <!-- Project Terms & Conditions -->
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-bottom: 28px;">
                <strong style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #172033; display: block; margin-bottom: 10px;">
                  PROJECT TERMS & INCLUSIONS:
                </strong>
                <ul style="margin: 0 0 12px; padding-left: 20px; font-size: 13px; line-height: 1.5;">
                  ${featuresList}
                </ul>
                <div style="font-size: 12px; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 10px;">
                  <p style="margin: 4px 0;">• <strong>Revisions:</strong> ${quote.revisions}</p>
                  <p style="margin: 4px 0;">• <strong>Support Period:</strong> ${quote.support_period}</p>
                  <p style="margin: 4px 0;">• <strong>Payment Milestones:</strong> ${quote.payment_milestones}</p>
                  <p style="margin: 4px 0;">• <strong>Third-Party:</strong> ${quote.third_party_charges}</p>
                </div>
              </div>

              <!-- Interactive Call-To-Action Buttons -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <a href="${pdfUrl}" target="_blank" style="background-color: #155EEF; color: #FFFFFF; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 10px; display: inline-block; box-shadow: 0 4px 8px rgba(21,94,239,0.25);">
                      📄 Download Official PDF Quotation
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 0 6px;">
                          <a href="${acceptUrl}" target="_blank" style="background-color: #16A34A; color: #FFFFFF; font-size: 12px; font-weight: 700; text-decoration: none; padding: 10px 18px; border-radius: 8px; display: inline-block;">
                            ✓ Accept Quotation
                          </a>
                        </td>
                        <td style="padding: 0 6px;">
                          <a href="${requestChangesUrl}" target="_blank" style="background-color: #F8FAFC; color: #334155; border: 1px solid #CBD5E1; font-size: 12px; font-weight: 700; text-decoration: none; padding: 9px 16px; border-radius: 8px; display: inline-block;">
                            Request Changes
                          </a>
                        </td>
                        <td style="padding: 0 6px;">
                          <a href="https://wa.me/919791495418?text=Hello%20SUDHARSHAN_TECH,%20inquiring%20about%20Quote%20${quote.id}" target="_blank" style="background-color: #EFF4FF; color: #155EEF; border: 1px solid #BFDBFE; font-size: 12px; font-weight: 700; text-decoration: none; padding: 9px 16px; border-radius: 8px; display: inline-block;">
                            WhatsApp Founder
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <p style="font-size: 13px; line-height: 1.6; margin: 0; color: #475569;">
                Regards,<br/>
                <strong style="color: #172033;">SUDHARSHAN_TECH Team</strong><br/>
                <span style="font-size: 12px; color: #155EEF;">Code. Create. Elevate.</span>
              </p>

            </td>
          </tr>

          <!-- Footer Information -->
          <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 20px 32px; font-size: 11px; color: #64748B; line-height: 1.6;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <strong>SUDHARSHAN_TECH</strong><br/>
                    No. 16A, Thendral Nagar, Veerakeralam, Coimbatore – 641007, Tamil Nadu, India<br/>
                    Phone: <a href="tel:+919791495418" style="color: #155EEF; text-decoration: none;">+91 97914 95418</a> | Email: <a href="mailto:sudharshantech123@gmail.com" style="color: #155EEF; text-decoration: none;">sudharshantech123@gmail.com</a><br/>
                    Website: <a href="https://sudharshan-tech.onrender.com/" style="color: #155EEF; text-decoration: none;">sudharshan-tech.onrender.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
}

/**
 * Generate Plain-Text Fallback Template for Quotations
 */
export function generateQuotationPlainText(quote) {
  const serviceList = Array.isArray(quote.requested_services) 
    ? quote.requested_services.join(', ') 
    : quote.requested_services;

  return `
Your Project Quotation – SUDHARSHAN_TECH | Quote #${quote.id}

Dear ${quote.customer_name},

Thank you for your interest in SUDHARSHAN_TECH.
We are pleased to share the quotation for your requested digital solution.

QUOTATION DETAILS:
Quotation ID: ${quote.id}
Customer Name: ${quote.customer_name}
Business Name: ${quote.business_name || 'N/A'}
Requested Services: ${serviceList}
Project Description: ${quote.project_description}
Estimated Delivery Timeline: ${quote.timeline}
Quotation Valid Until: ${quote.validity_date}

PRICE BREAKDOWN:
Service / Package: ${serviceList}
Base Amount: ₹${formatINR(quote.base_amount)}
Additional Features: ₹${formatINR(quote.additional_amount)}
Discount: ₹${formatINR(quote.discount)}
Taxes, if applicable: ₹${formatINR(quote.tax)}
Final Quoted Amount: ₹${formatINR(quote.final_amount)}

PROJECT TERMS & INCLUSIONS:
- Revisions: ${quote.revisions}
- Support Period: ${quote.support_period}
- Payment Milestones: ${quote.payment_milestones}
- Third-Party Charges: ${quote.third_party_charges}
- Scope Terms: ${quote.additional_scope_terms}

ONLINE ACTIONS:
- Download PDF: ${APP_URL}/api/quotations/${quote.id}/pdf
- Accept Quotation: ${APP_URL}/api/quotations/${quote.id}/accept
- Request Changes: ${APP_URL}/api/quotations/${quote.id}/request-changes
- Direct WhatsApp Discussion: https://wa.me/919791495418

Regards,
SUDHARSHAN_TECH
Code. Create. Elevate.
Phone: +91 97914 95418
Email: sudharshantech123@gmail.com
Website: https://sudharshan-tech.onrender.com/
Instagram: https://www.instagram.com/sudharshan_tech/
GitHub: https://github.com/sudharshanps
Address: No. 16A, Thendral Nagar, Veerakeralam, Coimbatore – 641007, Tamil Nadu, India.
  `.trim();
}

/**
 * Generate Printable A4 Quotation PDF with Royal Blue / Red Branding
 */
export function generateQuotationPdf(quote, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 40,
        info: {
          Title: `SUDHARSHAN_TECH Quotation - ${quote.id}`,
          Author: 'SUDHARSHAN_TECH',
          Subject: `Project Quotation for ${quote.customer_name}`
        }
      });

      const writeStream = fs.createWriteStream(outputPath);
      doc.pipe(writeStream);

      // Top Header with Logo
      if (fs.existsSync(LOGO_PATH)) {
        try {
          doc.image(LOGO_PATH, 40, 40, { width: 50, height: 50 });
        } catch (e) {
          // fallback if image read fails
        }
      }

      // Company Title & Info
      doc.fillColor('#172033').fontSize(18).font('Helvetica-Bold').text('SUDHARSHAN_TECH', 100, 42);
      doc.fillColor('#155EEF').fontSize(9).font('Helvetica-Bold').text('CODE. CREATE. ELEVATE.', 100, 62);
      doc.fillColor('#64748B').fontSize(8).font('Helvetica')
        .text('No. 16A, Thendral Nagar, Veerakeralam, Coimbatore – 641007, Tamil Nadu, India', 100, 74)
        .text('Phone: +91 97914 95418  |  Email: sudharshantech123@gmail.com  |  Web: sudharshan-tech.onrender.com', 100, 85);

      // Right Header Badge
      doc.rect(420, 40, 135, 45).fillAndStroke('#EFF4FF', '#BFDBFE');
      doc.fillColor('#155EEF').fontSize(11).font('Helvetica-Bold').text('OFFICIAL QUOTATION', 425, 48, { width: 125, align: 'center' });
      doc.fillColor('#475569').fontSize(8).font('Helvetica').text(`Quote #: ${quote.id}`, 425, 65, { width: 125, align: 'center' });

      doc.moveDown(3);
      const topY = 115;
      doc.strokeColor('#E2E8F0').lineWidth(1).moveTo(40, topY).lineTo(555, topY).stroke();

      // Two-column Details Box
      const boxY = topY + 15;
      doc.rect(40, boxY, 515, 80).fillAndStroke('#F8FAFC', '#E2E8F0');

      // Left Box Column: Client Info
      doc.fillColor('#155EEF').fontSize(9).font('Helvetica-Bold').text('CLIENT INFORMATION', 55, boxY + 12);
      doc.fillColor('#172033').fontSize(9).font('Helvetica-Bold').text(quote.customer_name, 55, boxY + 28);
      if (quote.business_name) {
        doc.fillColor('#64748B').fontSize(8).font('Helvetica').text(quote.business_name, 55, boxY + 40);
      }
      doc.fillColor('#475569').fontSize(8).font('Helvetica')
        .text(`Email: ${quote.customer_email || 'N/A'}`, 55, boxY + 52)
        .text(`Phone: ${quote.customer_phone || 'N/A'}`, 55, boxY + 63);

      // Right Box Column: Quotation Metadata
      doc.fillColor('#155EEF').fontSize(9).font('Helvetica-Bold').text('QUOTATION METADATA', 320, boxY + 12);
      doc.fillColor('#475569').fontSize(8).font('Helvetica')
        .text(`Issue Date: ${new Date(quote.created_at).toLocaleDateString('en-IN')}`, 320, boxY + 28)
        .text(`Valid Until: ${quote.validity_date}`, 320, boxY + 40)
        .text(`Est. Delivery: ${quote.timeline}`, 320, boxY + 52)
        .text(`Status: ${quote.status}`, 320, boxY + 63);

      // Project Description
      const descY = boxY + 95;
      doc.fillColor('#172033').fontSize(10).font('Helvetica-Bold').text('Project Scope & Overview:', 40, descY);
      doc.fillColor('#475569').fontSize(8.5).font('Helvetica').text(quote.project_description, 40, descY + 14, { width: 515, lineGap: 2 });

      // Price Breakdown Table
      const tableY = descY + 55;
      doc.rect(40, tableY, 515, 20).fillAndStroke('#155EEF', '#155EEF');
      doc.fillColor('#FFFFFF').fontSize(8.5).font('Helvetica-Bold')
        .text('ITEM / SERVICE SPECIFICATION', 50, tableY + 5)
        .text('AMOUNT (INR)', 460, tableY + 5, { width: 85, align: 'right' });

      let currentY = tableY + 20;

      // Line item 1: Base scope
      const serviceList = Array.isArray(quote.requested_services) ? quote.requested_services.join(', ') : quote.requested_services;
      doc.rect(40, currentY, 515, 24).fillAndStroke('#FFFFFF', '#E2E8F0');
      doc.fillColor('#172033').fontSize(8.5).font('Helvetica-Bold').text(serviceList, 50, currentY + 7);
      doc.fillColor('#172033').fontSize(8.5).font('Helvetica').text(`Rs. ${formatINR(quote.base_amount)}`, 460, currentY + 7, { width: 85, align: 'right' });
      currentY += 24;

      // Additional features if any
      if (quote.additional_amount > 0) {
        doc.rect(40, currentY, 515, 22).fillAndStroke('#FFFFFF', '#E2E8F0');
        doc.fillColor('#475569').fontSize(8).font('Helvetica').text('Additional Feature Integrations & Modules', 50, currentY + 6);
        doc.fillColor('#172033').fontSize(8).font('Helvetica').text(`Rs. ${formatINR(quote.additional_amount)}`, 460, currentY + 6, { width: 85, align: 'right' });
        currentY += 22;
      }

      // Discount if any
      if (quote.discount > 0) {
        doc.rect(40, currentY, 515, 22).fillAndStroke('#FFFFFF', '#E2E8F0');
        doc.fillColor('#16A34A').fontSize(8).font('Helvetica').text('Special Launch Discount Applied', 50, currentY + 6);
        doc.fillColor('#16A34A').fontSize(8).font('Helvetica').text(`- Rs. ${formatINR(quote.discount)}`, 460, currentY + 6, { width: 85, align: 'right' });
        currentY += 22;
      }

      // Taxes if any
      if (quote.tax > 0) {
        doc.rect(40, currentY, 515, 22).fillAndStroke('#FFFFFF', '#E2E8F0');
        doc.fillColor('#475569').fontSize(8).font('Helvetica').text('Applicable Taxes', 50, currentY + 6);
        doc.fillColor('#172033').fontSize(8).font('Helvetica').text(`Rs. ${formatINR(quote.tax)}`, 460, currentY + 6, { width: 85, align: 'right' });
        currentY += 22;
      }

      // Grand Total Highlight Bar
      doc.rect(40, currentY, 515, 28).fillAndStroke('#EFF4FF', '#BFDBFE');
      doc.fillColor('#155EEF').fontSize(10).font('Helvetica-Bold').text('FINAL QUOTED TOTAL AMOUNT:', 50, currentY + 8);
      doc.fillColor('#155EEF').fontSize(12).font('Helvetica-Bold').text(`Rs. ${formatINR(quote.final_amount)}`, 440, currentY + 7, { width: 105, align: 'right' });
      currentY += 38;

      // Terms & Conditions Block
      doc.rect(40, currentY, 515, 95).fillAndStroke('#F8FAFC', '#E2E8F0');
      doc.fillColor('#172033').fontSize(9).font('Helvetica-Bold').text('PROJECT TERMS, MILESTONES & POLICIES:', 50, currentY + 10);
      doc.fillColor('#475569').fontSize(7.5).font('Helvetica')
        .text(`1. Scope Inclusions: ${(quote.included_features || []).slice(0, 3).join(', ')}.`, 50, currentY + 25)
        .text(`2. Revisions Policy: ${quote.revisions}`, 50, currentY + 37)
        .text(`3. Warranty & Support: ${quote.support_period}`, 50, currentY + 49)
        .text(`4. Payment Structure: ${quote.payment_milestones}`, 50, currentY + 61)
        .text(`5. Third-Party Hosting & APIs: ${quote.third_party_charges}`, 50, currentY + 73);

      // Signatures Block
      const signY = currentY + 110;
      doc.fillColor('#172033').fontSize(8.5).font('Helvetica-Bold').text('Authorized Signatory:', 40, signY);
      doc.fillColor('#155EEF').fontSize(9).font('Helvetica-Bold').text('Sudharshan P S', 40, signY + 15);
      doc.fillColor('#64748B').fontSize(7.5).font('Helvetica').text('Founder & Principal Architect, SUDHARSHAN_TECH', 40, signY + 27);

      doc.fillColor('#172033').fontSize(8.5).font('Helvetica-Bold').text('Client Acceptance Signature:', 380, signY);
      doc.strokeColor('#CBD5E1').lineWidth(0.5).moveTo(380, signY + 28).lineTo(540, signY + 28).stroke();
      doc.fillColor('#94A3B8').fontSize(7).font('Helvetica').text('Name, Signature & Date', 380, signY + 32);

      // Footer
      doc.fontSize(7).font('Helvetica').fillColor('#94A3B8')
        .text('SUDHARSHAN_TECH • Code. Create. Elevate. • Document electronically generated & verifiable.', 40, 790, { width: 515, align: 'center' });

      doc.end();

      writeStream.on('finish', () => resolve(outputPath));
      writeStream.on('error', (err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Dispatch Quotation Email with PDF Attachment & Complete Status Tracking
 */
export async function sendQuotationEmail({ quotationId, testRecipient }) {
  const db = loadDatabase();
  const quotation = (db.quotations || []).find(q => q.id === quotationId);

  if (!quotation) {
    throw new Error(`Quotation #${quotationId} not found in database.`);
  }

  const recipient = testRecipient || quotation.customer_email;
  if (!recipient) {
    throw new Error(`No recipient email specified for quotation #${quotationId}.`);
  }

  // 1. Generate PDF
  const pdfFilename = `quote-${quotation.id}.pdf`;
  const pdfPath = path.join(QUOTES_DIR, pdfFilename);
  await generateQuotationPdf(quotation, pdfPath);
  quotation.pdf_path = `/uploads/quotations/${pdfFilename}`;

  // 2. Prepare HTML & Plain-Text Content
  const html = generateQuotationHtml(quotation);
  const text = generateQuotationPlainText(quotation);
  const subject = `Your Project Quotation – SUDHARSHAN_TECH | Quote #${quotation.id}`;

  // 3. Dispatch Email with PDF Attachment
  const emailResult = await sendEmailNotification({
    to: recipient,
    subject,
    html,
    text,
    event_type: 'QUOTATION_DISPATCHED',
    related_id: quotation.id,
    attachments: [
      {
        filename: `SUDHARSHAN_TECH_Quotation_${quotation.id}.pdf`,
        path: pdfPath
      }
    ]
  });

  // 4. Update Quotation Status
  quotation.status = emailResult.status === 'sent' ? 'Sent' : 'Draft';
  quotation.sent_at = new Date().toISOString();
  quotation.provider = emailResult.provider || (process.env.SMTP_USER ? 'smtp' : 'simulated_logged');
  quotation.message_id = emailResult.message_id || `msg-${Date.now()}`;
  quotation.updated_at = new Date().toISOString();

  // Save back to db
  const qIndex = db.quotations.findIndex(q => q.id === quotation.id);
  if (qIndex >= 0) db.quotations[qIndex] = quotation;
  saveDatabase(db);

  return {
    success: true,
    quotation,
    emailResult
  };
}
