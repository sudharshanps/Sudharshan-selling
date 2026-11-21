export interface ServicePackage {
  name: string;
  price: number;
  duration: string;
  desc: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: string;
  icon: string;
  badge?: string;
  image?: string;
  starting_price: number;
  unit: string;
  turnaround: string;
  short_description: string;
  full_description: string;
  deliverables: string[];
  packages: ServicePackage[];
  active: boolean;
}

export interface CartItem {
  id: string; // unique item id in cart
  serviceId: string;
  serviceTitle: string;
  serviceCategory: string;
  selectedPackage: ServicePackage;
  quantity: number;
  customNotes?: string;
  referenceFileUrl?: string;
  referenceFileName?: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  business_name?: string;
  billing_address?: string;
  items: {
    service_id: string;
    service_title: string;
    package_name: string;
    price: number;
    quantity: number;
    custom_notes?: string;
  }[];
  total_amount: number;
  payment_method: 'upi_qr' | 'quote_request';
  payment_status: 'Pending' | 'Pending Verification' | 'Payment Verified' | 'Quotation Pending' | 'Failed';
  order_status: 'New Enquiry' | 'Quote Required' | 'Quote Sent' | 'Awaiting Payment' | 'Awaiting Payment Verification' | 'In Progress' | 'Completed' | 'Cancelled';
  custom_requirements?: string;
  reference_files?: string[];
  transaction_ref?: string;
  payment_proof?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectEnquiry {
  id: string;
  customer_name: string;
  business_name?: string;
  customer_email: string;
  customer_phone: string;
  services_required: string[];
  project_description: string;
  estimated_budget?: string;
  timeline?: string;
  reference_file?: string;
  preferred_communication: 'WhatsApp' | 'Email' | 'Phone';
  status: 'New Enquiry' | 'In Review' | 'Proposal Sent' | 'Resolved';
  admin_notes?: string;
  created_at: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  github?: string;
  demo_url?: string;
  featured: boolean;
  description: string;
  tech_stack: string[];
  highlights: string[];
}

export interface FounderAchievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: string;
  description: string;
}

export interface PosterItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface CompanySettings {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  personal_email: string;
  upi_id: string;
  website: string;
  instagram: string;
  github: string;
  linkedin: string;
  address: string;
  google_maps_url: string;
  qr_image: string;
  logo_image: string;
  resume_url: string;
}

export interface NotificationLog {
  id: string;
  event_type: string;
  recipient: string;
  subject: string;
  body_preview: string;
  status: 'sent' | 'simulated_logged' | 'failed';
  error_message?: string;
  related_id?: string;
  created_at: string;
}

export interface SmsLog {
  id: string;
  recipient: string;
  message: string;
  status: 'sent' | 'simulated_logged' | 'failed';
  provider: string;
  error_message?: string;
  related_id?: string;
  created_at: string;
}
