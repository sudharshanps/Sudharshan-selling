-- ========================================================
-- SUDHARSHAN_TECH - PRODUCTION SUPABASE / POSTGRESQL SCHEMA
-- Tagline: Code. Create. Elevate.
-- Generated for Supabase & PostgreSQL Migration
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. COMPANY SETTINGS
CREATE TABLE IF NOT EXISTS company_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(150) NOT NULL DEFAULT 'SUDHARSHAN_TECH',
  tagline VARCHAR(255) NOT NULL DEFAULT 'Code. Create. Elevate.',
  phone VARCHAR(50) NOT NULL DEFAULT '+91 97914 95418',
  whatsapp VARCHAR(50) NOT NULL DEFAULT '+91 97914 95418',
  email VARCHAR(150) NOT NULL DEFAULT 'sudharshantech123@gmail.com',
  upi_id VARCHAR(100) NOT NULL DEFAULT 'sudharshanthemagnet@okaxis',
  website VARCHAR(255) NOT NULL DEFAULT 'https://sudharshan-tech.onrender.com/',
  instagram VARCHAR(255) NOT NULL DEFAULT 'https://www.instagram.com/sudharshan_tech/',
  github VARCHAR(255) NOT NULL DEFAULT 'https://github.com/sudharshanps',
  address TEXT NOT NULL DEFAULT 'No. 16A, Thendral Nagar, Veerakeralam, Coimbatore – 641007, Tamil Nadu, India',
  google_maps_url TEXT NOT NULL DEFAULT 'https://www.google.com/maps/search/?api=1&query=No.+16A%2C+Thendral+Nagar%2C+Veerakeralam%2C+Coimbatore+641007%2C+Tamil+Nadu',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SERVICE CATEGORIES
CREATE TABLE IF NOT EXISTS service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SERVICES
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(50) PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(100) NOT NULL,
  icon VARCHAR(50) NOT NULL DEFAULT 'Layers',
  badge VARCHAR(50),
  starting_price NUMERIC(10, 2) NOT NULL DEFAULT 1199.00,
  unit VARCHAR(50) DEFAULT 'starting project',
  turnaround VARCHAR(100) DEFAULT '3 - 7 Days',
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  deliverables JSONB DEFAULT '[]'::jsonb,
  packages JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CUSTOMERS
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(50) NOT NULL,
  business_name VARCHAR(150),
  billing_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CARTS & CART ITEMS
CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token VARCHAR(255) NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  service_id VARCHAR(50) NOT NULL REFERENCES services(id),
  package_name VARCHAR(100),
  price NUMERIC(10, 2) NOT NULL,
  quantity INT DEFAULT 1,
  custom_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(100) PRIMARY KEY,
  customer_name VARCHAR(150) NOT NULL,
  customer_email VARCHAR(150) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  business_name VARCHAR(150),
  billing_address TEXT,
  total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  payment_method VARCHAR(50) NOT NULL DEFAULT 'upi_qr',
  payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending Verification',
  order_status VARCHAR(50) NOT NULL DEFAULT 'New Enquiry',
  custom_requirements TEXT,
  reference_files JSONB DEFAULT '[]'::jsonb,
  transaction_ref VARCHAR(150),
  payment_proof TEXT,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. ORDER ITEMS
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id VARCHAR(100) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  service_id VARCHAR(50) NOT NULL REFERENCES services(id),
  service_title VARCHAR(150) NOT NULL,
  package_name VARCHAR(100),
  price NUMERIC(10, 2) NOT NULL,
  quantity INT DEFAULT 1,
  notes TEXT
);

-- 8. PROJECT ENQUIRIES
CREATE TABLE IF NOT EXISTS project_enquiries (
  id VARCHAR(100) PRIMARY KEY,
  customer_name VARCHAR(150) NOT NULL,
  business_name VARCHAR(150),
  customer_email VARCHAR(150) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  services_required JSONB NOT NULL DEFAULT '[]'::jsonb,
  project_description TEXT NOT NULL,
  estimated_budget VARCHAR(100),
  timeline VARCHAR(100),
  reference_file TEXT,
  preferred_communication VARCHAR(50) DEFAULT 'WhatsApp',
  status VARCHAR(50) DEFAULT 'New Enquiry',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. QUOTATIONS
CREATE TABLE IF NOT EXISTS quotations (
  id VARCHAR(100) PRIMARY KEY,
  enquiry_id VARCHAR(100) REFERENCES project_enquiries(id) ON DELETE SET NULL,
  order_id VARCHAR(100) REFERENCES orders(id) ON DELETE SET NULL,
  customer_email VARCHAR(150) NOT NULL,
  scope_of_work TEXT NOT NULL,
  deliverables JSONB DEFAULT '[]'::jsonb,
  quoted_amount NUMERIC(10, 2) NOT NULL,
  valid_until DATE,
  status VARCHAR(50) DEFAULT 'Draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. PAYMENTS & SUBMISSIONS
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id VARCHAR(100) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL,
  gateway VARCHAR(50) DEFAULT 'manual_upi',
  status VARCHAR(50) DEFAULT 'Pending Verification',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS payment_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id VARCHAR(100) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  transaction_ref VARCHAR(150),
  screenshot_url TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  verification_status VARCHAR(50) DEFAULT 'Pending Verification',
  verified_by VARCHAR(100),
  verified_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT
);

-- 11. UPLOADED FILES
CREATE TABLE IF NOT EXISTS uploaded_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INT,
  mime_type VARCHAR(100),
  associated_order_id VARCHAR(100),
  associated_enquiry_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. PORTFOLIO PROJECTS
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  github TEXT,
  demo_url TEXT,
  featured BOOLEAN DEFAULT false,
  description TEXT NOT NULL,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  highlights JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS achievements (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  organization VARCHAR(200) NOT NULL,
  date VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. ADMIN USERS
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'Admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 15. NOTIFICATION LOGS (Audit Trail & Idempotency)
CREATE TABLE IF NOT EXISTS notification_logs (
  id VARCHAR(100) PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL,
  recipient VARCHAR(150) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body_preview TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'sent',
  error_message TEXT,
  related_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON project_enquiries(customer_email);
CREATE INDEX IF NOT EXISTS idx_notifs_related ON notification_logs(related_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Public can read active services & projects
CREATE POLICY "Public services read" ON services FOR SELECT USING (active = true);
CREATE POLICY "Public projects read" ON portfolio_projects FOR SELECT USING (true);

-- Authenticated Admin Full Access
CREATE POLICY "Admin full orders access" ON orders USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full enquiries access" ON project_enquiries USING (auth.role() = 'authenticated');
