# SUDHARSHAN_TECH — MySQL Database, Resend Email & Meta WhatsApp Setup Guide

**Platform:** SUDHARSHAN_TECH Digital Services Marketplace  
**Company:** SUDHARSHAN_TECH  
**Tagline:** Code. Create. Elevate.  
**Founder:** Sudharshan P S  
**Contact:** `+91 97914 95418` | `sudharshantech123@gmail.com`  

---

## 1. System Requirements

- **Operating System:** Windows 10/11, macOS, or Linux (Ubuntu 20.04+)
- **Node.js:** v18.0.0 or higher (`node -v`)
- **npm:** v9.0.0 or higher (`npm -v`)
- **MySQL Server:** MySQL Community Server 8.0 or higher (`mysql --version`)
- **Tools (Optional):** MySQL Workbench, DBeaver, or phpMyAdmin

---

## 2. MySQL Database Setup & Initialization

### Step 2.1 — Verify MySQL Service is Running
On Windows (PowerShell):
```powershell
Get-Service MySQL80
# If stopped, start it:
Start-Service MySQL80
```
On Linux/macOS:
```bash
sudo systemctl status mysql
sudo systemctl start mysql
```

### Step 2.2 — Execute Database Schema
Open your terminal or MySQL command line client and execute `database/schema.sql`:

```bash
# Using MySQL CLI directly:
mysql -u root -p < database/schema.sql
```

Alternatively, open **MySQL Workbench**:
1. Connect to your local MySQL instance (`localhost:3306`).
2. Go to **File &rarr; Open SQL Script...** and select `database/schema.sql`.
3. Click the **Execute (Lightning Bolt)** icon.
4. Verify the `sudharshan_tech` database and `inquiries` table are created.

### Database Schema Overview
- **Database Name:** `sudharshan_tech`
- **Table Name:** `inquiries`
- **Fields:**
  - `id`: Auto-incrementing Primary Key
  - `full_name`: Customer full name (VARCHAR 150)
  - `email`: Customer email address (VARCHAR 150)
  - `phone`: Customer contact phone (VARCHAR 50)
  - `company_name`: Business or organization name (VARCHAR 150, optional)
  - `service`: Requested domain/service (VARCHAR 100)
  - `project_budget`: Estimated budget range (VARCHAR 100)
  - `message`: Detailed project description (TEXT)
  - `source`: Lead acquisition channel (VARCHAR 50, e.g. `website`, `custom_project_modal`)
  - `status`: Lifecycle status (`New`, `Reviewing`, `Contacted`, `Quoted`, `In Progress`, `Completed`, `Rejected`)
  - `email_notification_status`: Delivery status (`Pending`, `sent`, `failed`)
  - `whatsapp_notification_status`: Delivery status (`Pending`, `sent`, `simulated_logged`, `failed`)
  - `admin_notes`: Internal follow-up notes (TEXT)
  - `created_at`: Automatic creation timestamp
  - `updated_at`: Automatic update timestamp
- **Indexes:** Indexed on `email`, `phone`, `status`, `service`, `source`, and `created_at` for rapid search and analytics.

---

## 3. Environment Variables Configuration (`.env`)

Create or update `.env` in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Set your credentials in `.env`:

```env
# Application Settings
NODE_ENV=development
PORT=5000
APP_URL=http://localhost:5173

# MySQL Relational Database Credentials
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_ROOT_PASSWORD_HERE
DB_NAME=sudharshan_tech

# Resend Email API (https://resend.com)
RESEND_API_KEY=re_1234567890abcdef
NOTIFICATION_EMAIL=sudharshantech123@gmail.com
RESEND_FROM_EMAIL="SUDHARSHAN_TECH" <onboarding@resend.dev>

# Meta WhatsApp Cloud API (https://developers.facebook.com)
WHATSAPP_ACCESS_TOKEN=EAA...
WHATSAPP_PHONE_NUMBER_ID=1029384756
WHATSAPP_RECIPIENT_NUMBER=919791495418
WHATSAPP_TEMPLATE_NAME=
WHATSAPP_TEMPLATE_LANGUAGE=en

# Admin Portal Security
ADMIN_SECRET=sudharshan@admin2026
ADMIN_EMAIL=sudharshantech123@gmail.com
SESSION_SECRET=sudharshan_tech_secure_session_key_2026
COMPANY_PHONE=+919791495418
```

---

## 4. Configuring Notifications

### 4.1 Resend Email Setup
1. Sign up for free at [https://resend.com](https://resend.com).
2. Go to **API Keys** &rarr; click **Create API Key**.
3. Copy your key (`re_...`) into `.env` as `RESEND_API_KEY`.
4. For initial testing, set `RESEND_FROM_EMAIL="SUDHARSHAN_TECH" <onboarding@resend.dev>`.
5. In production, verify your domain (e.g. `sudharshan-tech.com`) under **Domains** and set `RESEND_FROM_EMAIL="SUDHARSHAN_TECH" <contact@sudharshan-tech.com>`.

### 4.2 Meta WhatsApp Cloud API Setup
1. Visit [Meta for Developers](https://developers.facebook.com) and create an App under **Business**.
2. Add **WhatsApp** product to your app.
3. Under **WhatsApp &rarr; API Setup**:
   - Copy the **Temporary Access Token** (or generate a System User permanent token) into `WHATSAPP_ACCESS_TOKEN`.
   - Copy the **Phone Number ID** into `WHATSAPP_PHONE_NUMBER_ID`.
   - Add recipient number `+91 97914 95418` to the Allowed Recipients list for sandbox testing.
4. When credentials are not yet configured in development, the system automatically logs alerts into the Admin Audit Trail (`whatsapp_logs`) with status `simulated_logged` without failing or dropping the customer inquiry.

---

## 5. Starting the Application Locally

Install dependencies (if not already installed):
```bash
npm install
```

### Option A — Run Frontend & Backend Simultaneously:
```bash
npm run dev
```

### Option B — Run Separately in Dedicated Terminals:
Terminal 1 (Backend API):
```bash
npm run server
# Running on http://localhost:5000
```

Terminal 2 (Vite Frontend):
```bash
npm run client
# Running on http://localhost:5173
```

---

## 6. Accessing the Admin Dashboard

1. Open your browser and navigate to:
   ```
   http://localhost:5173/#admin
   ```
   (or click the **Shield Icon** on the right side of the desktop navigation bar).
2. Enter the Admin Security Key:
   ```
   sudharshan@admin2026
   ```
3. Inside the Admin Dashboard:
   - Go to the **Inquiries & Leads** tab to search, filter by service and status, inspect full customer project messages, update statuses, or delete inquiries.
   - Go to the **Alert Logs** tab &rarr; **Meta WhatsApp Logs** to audit every outgoing notification.
   - Go to **Quotations** to preview A4 PDFs or dispatch transactional email tests.

---

## 7. Production Deployment (e.g. Render / AWS / VPS)

### Deployment on Render.com:
1. Push your repository to GitHub.
2. In Render Dashboard, click **New &rarr; Web Service**.
3. Connect your repository `sudharshan-tech-marketplace`.
4. Configure service:
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node server/index.js`
5. In **Environment Variables**, add:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (pointing to your managed MySQL / PlanetScale / Aiven database)
   - `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NOTIFICATION_EMAIL`
   - `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_RECIPIENT_NUMBER`
   - `ADMIN_SECRET`

---

## 8. Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| `Access denied for user 'root'@'localhost'` | MySQL root password missing or incorrect in `.env` | Enter `DB_PASSWORD=your_password` in `.env` and restart backend. |
| `ECONNREFUSED 127.0.0.1:3306` | MySQL server service is not running | Run `Start-Service MySQL80` on Windows or `sudo systemctl start mysql` on Linux. |
| `Resend API error: API key invalid` | Missing or expired Resend key | Verify your key at [resend.com/api-keys](https://resend.com/api-keys) and update `RESEND_API_KEY`. |
| `Meta WhatsApp 401 Unauthorized` | Expired temporary token | Generate a Permanent System User token in Meta Business Manager. |
| Form says "Database service unavailable" | MySQL cannot be reached | Check `http://localhost:5000/api/health` to view the live database health status object. |
