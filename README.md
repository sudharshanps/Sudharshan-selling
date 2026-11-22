# SUDHARSHAN_TECH — Digital Services Marketplace Platform

> **"Code. Create. Elevate."**  
> Premium, interactive digital services marketplace where clients can browse, select, customize, order, and pay for digital solutions.

![SUDHARSHAN_TECH Brand Logo](/public/assets/logo.jpg)

---

## 🏢 Official Company Identity & Contact

- **Company:** SUDHARSHAN_TECH
- **Founder:** Sudharshan P S (Cyber Security Student | AI & Full-Stack Developer | Entrepreneur)
- **Tagline:** Code. Create. Elevate.
- **Phone / WhatsApp:** [+91 97914 95418](tel:+919791495418) | [Chat on WhatsApp](https://wa.me/919791495418)
- **Official Email:** [sudharshantech123@gmail.com](mailto:sudharshantech123@gmail.com)
- **UPI ID for GPay:** `sudharshanthemagnet@okaxis`
- **GitHub Profile:** [https://github.com/sudharshanps](https://github.com/sudharshanps)
- **Source Repository:** [https://github.com/sudharshanps/Sudharshan-selling](https://github.com/sudharshanps/Sudharshan-selling)
- **Live Web App (GitHub Pages):** [https://sudharshanps.github.io/Sudharshan-selling/](https://sudharshanps.github.io/Sudharshan-selling/)
- **Official Cloud Deployment (Render):** [https://sudharshan-tech.onrender.com/](https://sudharshan-tech.onrender.com/)
- **Instagram:** [https://www.instagram.com/sudharshan_tech/](https://www.instagram.com/sudharshan_tech/)
- **Office Address:**
  ```text
  No. 16A, Thendral Nagar,
  Veerakeralam, Coimbatore – 641007,
  Tamil Nadu, India.
  ```
- **Google Maps:** [Click here to view on Google Maps](https://www.google.com/maps/search/?api=1&query=No.+16A%2C+Thendral+Nagar%2C+Veerakeralam%2C+Coimbatore+641007%2C+Tamil+Nadu)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/sudharshanps/Sudharshan-selling)


---

## 🚀 Key Platform Features

1. **Swiggy-Inspired Service Ordering Experience:**
   - Instant search and category navigation across all 8 official company services.
   - Package tier selectors (Starter, Business, Enterprise) with transparent "Starting from" pricing.
   - Dynamic slide-over Cart Drawer with quantity counters, custom requirements, and file attachment uploads.
   - One-click checkout with estimated subtotal calculations.

2. **Official Services Marketplace (8 Core Disciplines):**
   - **Web Development** (Starting from ₹1,199)
   - **Mobile App Development** (Starting from ₹4,999)
   - **AI Solutions & Automation** (Starting from ₹2,999)
   - **Custom Software & ERP** (Starting from ₹2,999)
   - **Cybersecurity & Hardening** (Starting from ₹1,999)
   - **Cloud & DevOps** (Starting from ₹1,999)
   - **SaaS Development** (Starting from ₹8,999)
   - **IT Maintenance & Support** (Starting from ₹299/month)

3. **Secure Checkout & Google Pay / UPI QR Flow:**
   - Uses the official uploaded GPay QR code image (`/assets/gpay-qr.jpg`).
   - One-click copyable UPI ID (`sudharshanthemagnet@okaxis`) and copyable payable amount.
   - Transaction ID / UTR input field and payment screenshot upload.
   - Strict verification policy: Submissions are marked `Pending Verification` until confirmed by admin.
   - Alternative "Request Custom Quotation" path (₹0 upfront) for complex projects.

4. **Flagship Portfolio & Real GitHub Integration:**
   - Interactive horizontal carousel with category filters and case-study modals.
   - Showcases authentic projects: **Drishti 360**, **Nidhi Setu**, **AICTE Grievance Dashboard**, **TaskGuard**, **School Syllabus System**, **Sizora**, **Technico Website**, **AI Cyber Threat Detection**, and **Hackademia AI Exam Invigilation** (Top 50 National AI Hackathon Finalist).
   - Real-time GitHub API repo cards fetched dynamically from `@sudharshanps`.

5. **Founder Profile & Academic Credentials:**
   - Authentic profile sourced directly from founder Sudharshan P S's resume.
   - B.E. Computer Science & Engineering (Cyber Security) at SKCET, Coimbatore (CGPA 8.5/10.0).
   - Internships at Technico Laboratory Products, Future Interns, Yuva Intern, and XECUREONE.
   - Functional verified resume download button (`/assets/Sudharshan_PS_Resume.pdf`).

6. **Live Protected Admin Dashboard (`/admin`):**
   - Secured with server-side master PIN authorization (`sudharshan@admin2026`).
   - Real-time operational metrics (Total Orders, Today's Orders, Payments Awaiting Verification, Verified Revenue).
   - Searchable, filterable Orders Table with CSV export.
   - 1-Click Payment Verification / Rejection controls.
   - Live Service Pricing Editor (edit starting prices and turnaround times dynamically).
   - Notification Audit History center.
   - Company Contact Settings Editor (update phone, email, WhatsApp, address, and maps links).

7. **Email Notification Engine:**
   - Dispatches instant alerts to company owner (`sudharshantech123@gmail.com`) for orders, custom quotations, payment uploads, and contact forms.
   - Sends branded confirmation emails to customers with unique tracking IDs.
   - Fail-safe idempotency: If SMTP credentials are not yet configured, orders are never blocked; notification attempts are securely logged to the database audit trail.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Canvas-Confetti
- **Backend:** Node.js, Express.js, Multer (secure uploads), Nodemailer
- **Database:** Persistent SQL-compatible JSON database out-of-the-box, with production **Supabase PostgreSQL** migration script (`server/supabase_schema.sql`)
- **Hosting Targets:** Vercel (Frontend), Render (Backend), Supabase (PostgreSQL Database)

---

## 📦 Installation & Local Development

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Git

### 2. Clone and Install Dependencies
```bash
# Clone the repository
git clone https://github.com/sudharshanps/SUDHARSHAN-TECH-SERVICES.git
cd SUDHARSHAN-TECH-SERVICES

# Install all dependencies
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default `.env` configuration:
```env
PORT=5000
ADMIN_SECRET=sudharshan@admin2026
OWNER_EMAIL=sudharshantech123@gmail.com
COMPANY_PHONE=+919791495418
APP_URL=http://localhost:5173

# Optional: Live SMTP credentials (e.g. Gmail App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

### 4. Run Development Servers
To run both backend API server and frontend client concurrently:
```bash
npm run dev
```
- **Customer Marketplace:** [http://localhost:5173](http://localhost:5173)
- **Live Admin Dashboard:** [http://localhost:5173/admin](http://localhost:5173/admin)
- **Backend API Server:** [http://localhost:5000](http://localhost:5000)

### 5. Production Build
```bash
npm run build
```

---

## 🧪 Acceptance Test Suite

The platform includes an automated end-to-end acceptance test suite covering all 5 business scenarios:

1. **TEST 1:** Customer selects Web Development and submits order -> Order saved with ID `ST-ORD-XXXXXX-XXX`, initial status `Awaiting Payment`.
2. **TEST 2:** Customer submits custom quotation -> Enquiry saved with ID `ST-ENQ-XXXXXX-XXX`.
3. **TEST 3:** Customer uploads UTR & screenshot -> Payment status strictly marked `Pending Verification`.
4. **TEST 4:** Admin verifies payment -> Order updated to `In Progress` and payment marked `Payment Verified`.
5. **TEST 5:** Notification reliability -> Audit trail verifies logged notifications.

Run the test suite anytime:
```bash
node tests/acceptance.test.js
```

---

## 🗄️ Database & Supabase Migration

The full relational PostgreSQL schema is provided in `server/supabase_schema.sql`. It defines all required tables with primary keys, foreign keys, timestamps, indexes, and Row Level Security (RLS) policies:

- `company_settings`
- `service_categories`
- `services`
- `customers`
- `carts` & `cart_items`
- `orders` & `order_items`
- `project_enquiries`
- `quotations`
- `payments` & `payment_submissions`
- `uploaded_files`
- `portfolio_projects`
- `achievements`
- `admin_users`
- `notification_logs`

To apply directly to Supabase:
1. Open your [Supabase Dashboard](https://supabase.com).
2. Go to **SQL Editor**.
3. Paste the contents of `server/supabase_schema.sql` and click **Run**.

---

## 🌐 Production Deployment Guide

### 1. Continuous Deployment to GitHub Pages (Automated CI/CD)
The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`):
- **Trigger**: Every push or merge to the `main` branch, plus manual `workflow_dispatch`.
- **Pipeline**: Installs dependencies with `npm ci`, verifies TypeScript, builds with Vite configured for `/Sudharshan-selling/`, generates `404.html` for SPA routing, and deploys to GitHub Pages automatically.
- **Enabling GitHub Pages in Repo Settings**:
  1. Go to repository **Settings** > **Pages**.
  2. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
  3. Subsequent pushes to `main` deploy in ~60 seconds to `https://sudharshanps.github.io/Sudharshan-selling/`.

### 2. Full-Stack Cloud Deployment to Render (Automatic via `render.yaml`)
1. Create a **Blueprint / Web Service** on [Render](https://render.com).
2. Connect `https://github.com/sudharshanps/Sudharshan-selling`.
3. Render automatically reads `render.yaml` to configure the Node service, build command (`npm ci && npm run build`), and start command (`npm start`).
4. In production, Node serves the built React frontend while powering all REST API endpoints (`/api/projects`, `/api/services`, `/api/orders`, `/api/quotations`).

---

## 🔒 Security Best Practices

- Admin APIs are strictly protected with `x-admin-token` header validation.
- Master credentials and SMTP secrets are kept in server environment variables and never leaked to client bundles.
- File uploads are validated via Multer against safe mime types and a 15MB file size limit.
- All customer submissions maintain atomic database transactions and cannot be lost on server restart.

---

© 2026 **SUDHARSHAN_TECH**. All Rights Reserved.  
*Code. Create. Elevate.*
