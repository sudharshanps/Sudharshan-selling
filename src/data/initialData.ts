import { CompanySettings, Service, PortfolioProject, FounderAchievement, PosterItem, SpecialOffer } from '../types';

export const initialCompanySettings: CompanySettings = {
  "name": "SUDHARSHAN_TECH",
  "tagline": "Code. Create. Elevate.",
  "phone": "+91 97914 95418",
  "whatsapp": "+91 97914 95418",
  "email": "sudharshantech123@gmail.com",
  "personal_email": "sudharshanthemagnet@gmail.com",
  "upi_id": "sudharshanthemagnet@okaxis",
  "website": "https://sudharshan-tech.onrender.com/",
  "instagram": "https://www.instagram.com/sudharshan_tech/",
  "github": "https://github.com/sudharshanps",
  "linkedin": "https://linkedin.com/in/sudharshan-ps-5a6b9a325",
  "address": "No. 16A, Thendral Nagar, Veerakeralam, Coimbatore – 641007, Tamil Nadu, India",
  "google_maps_url": "https://www.google.com/maps/search/?api=1&query=No.+16A%2C+Thendral+Nagar%2C+Veerakeralam%2C+Coimbatore+641007%2C+Tamil+Nadu",
  "qr_image": "/assets/gpay-qr.jpg",
  "logo_image": "/assets/logo.jpg",
  "resume_url": "/assets/Sudharshan_PS_Resume.pdf"
};

export const initialServices: Service[] = [
  {
    "id": "srv-web",
    "slug": "web-development",
    "title": "Web Development",
    "category": "Web & Digital",
    "icon": "Globe",
    "badge": "Most Popular",
    "image": "/assets/services/web-development.svg",
    "starting_price": 1199,
    "unit": "starting project",
    "turnaround": "3 - 7 Days",
    "short_description": "Business websites, landing pages, e-commerce, portfolios, web applications and UI/UX design.",
    "full_description": "From lightweight, lightning-fast landing pages to full-featured enterprise web portals and e-commerce platforms. Built with modern, scalable stacks including React, Next.js, Node.js, Tailwind CSS, and secure database backends.",
    "deliverables": [
      "100% Mobile & Tablet Responsive",
      "SEO Optimization & Fast Core Web Vitals",
      "Modern Clean UI/UX Design Standards",
      "Lead Capture & Contact Form Integration",
      "Free SSL Setup & Custom Domain Configuration",
      "1 Month Post-Launch Maintenance Support"
    ],
    "packages": [
      {
        "name": "Starter Landing Page",
        "price": 1199,
        "duration": "2-3 Days",
        "desc": "Single-page responsive showcase or personal portfolio"
      },
      {
        "name": "Business Pro",
        "price": 3499,
        "duration": "4-6 Days",
        "desc": "Multi-page corporate website with CMS & lead capture"
      },
      {
        "name": "Full-Stack Custom App / E-commerce",
        "price": 7999,
        "duration": "7-12 Days",
        "desc": "Dynamic web application with database & payment processing"
      }
    ],
    "active": true
  },
  {
    "id": "srv-mobile",
    "slug": "mobile-app-development",
    "title": "Mobile App Development",
    "category": "Mobile",
    "icon": "Smartphone",
    "badge": "High Growth",
    "image": "/assets/services/mobile-app-development.svg",
    "starting_price": 4999,
    "unit": "starting project",
    "turnaround": "7 - 21 Days",
    "short_description": "Android, iOS and cross-platform mobile applications with sleek native feel.",
    "full_description": "High-performance native and cross-platform applications built with React Native and Flutter. Designed with smooth micro-animations, offline storage, push notifications, and rock-solid REST API integrations.",
    "deliverables": [
      "Cross-Platform Android & iOS Builds",
      "Intuitive User Experience & Modern Cupertino/Material UI",
      "Secure Authentication & User Sessions",
      "Push Notifications & Cloud Storage Sync",
      "App Store & Play Store Deployment Assistance",
      "Complete Source Code & Documentation"
    ],
    "packages": [
      {
        "name": "Prototype / MVP App",
        "price": 4999,
        "duration": "7-10 Days",
        "desc": "Functional mobile application with core screens and API integration"
      },
      {
        "name": "Full Business App",
        "price": 11999,
        "duration": "14-20 Days",
        "desc": "Production-ready Android/iOS app with authentication & payment"
      },
      {
        "name": "Enterprise Custom Mobile Solution",
        "price": 21999,
        "duration": "25-35 Days",
        "desc": "Complex real-time multi-role ecosystem with offline-first sync"
      }
    ],
    "active": true
  },
  {
    "id": "srv-ai",
    "slug": "ai-automation",
    "title": "AI Solutions & Automation",
    "category": "Artificial Intelligence",
    "icon": "Cpu",
    "badge": "Cutting-Edge",
    "image": "/assets/services/ai-automation.svg",
    "starting_price": 2999,
    "unit": "starting project",
    "turnaround": "4 - 10 Days",
    "short_description": "AI chatbots, intelligent assistants, AI integrations and workflow automation.",
    "full_description": "Supercharge your business with custom LLM agents, Gemini API integrations, conversational customer service bots, OCR document parsers, and automated multi-step business pipelines.",
    "deliverables": [
      "Custom LLM & Gemini / OpenAI API Integration",
      "Context-Aware Chatbots with Company Knowledge Base",
      "Workflow Automation (Zapier, n8n, Custom Webhooks)",
      "Computer Vision & Document Processing Pipelines",
      "Secure Prompt Engineering & Guardrails",
      "Usage Monitoring & Analytics Dashboard"
    ],
    "packages": [
      {
        "name": "Smart AI Chatbot Assistant",
        "price": 2999,
        "duration": "3-5 Days",
        "desc": "Website chatbot trained on your business FAQs and docs"
      },
      {
        "name": "Workflow & Data Automation Pipeline",
        "price": 5999,
        "duration": "6-8 Days",
        "desc": "Automate manual data extraction, syncing, and alerting"
      },
      {
        "name": "Custom Applied AI System",
        "price": 12999,
        "duration": "10-15 Days",
        "desc": "Bespoke computer vision, NLP, or predictive machine learning engine"
      }
    ],
    "active": true
  },
  {
    "id": "srv-custom-software",
    "slug": "custom-software-development",
    "title": "Custom Software & ERP",
    "category": "Enterprise Software",
    "icon": "Layers",
    "badge": "Business Essential",
    "image": "/assets/services/custom-software.svg",
    "starting_price": 2999,
    "unit": "starting project",
    "turnaround": "7 - 14 Days",
    "short_description": "CRM, ERP, billing systems, inventory management, dashboards and business management software.",
    "full_description": "Tailor-made software built to eliminate spreadsheets and automate your company operations. Features role-based access control, relational database architecture, real-time analytics, and exportable invoicing.",
    "deliverables": [
      "Modular Multi-User Architecture (Admin, Staff, Client)",
      "Inventory Tracking, Invoicing & GST/Tax Billing",
      "Real-Time Data Visualization & Exportable Reports",
      "Role-Based Access Control (RBAC) & Audit Logs",
      "Scalable SQL/PostgreSQL Relational Storage",
      "Comprehensive Admin Controls"
    ],
    "packages": [
      {
        "name": "Custom Business Dashboard",
        "price": 2999,
        "duration": "5-7 Days",
        "desc": "Clean metrics reporting dashboard with secure authentication"
      },
      {
        "name": "Inventory & Billing Portal",
        "price": 6999,
        "duration": "8-12 Days",
        "desc": "Full inventory management with barcode/PDF invoice generation"
      },
      {
        "name": "Comprehensive ERP / CRM Suite",
        "price": 14999,
        "duration": "15-25 Days",
        "desc": "Multi-department operational portal with automated workflows"
      }
    ],
    "active": true
  },
  {
    "id": "srv-cybersecurity",
    "slug": "cybersecurity",
    "title": "Cybersecurity & Hardening",
    "category": "Security",
    "icon": "ShieldCheck",
    "badge": "Founder Specialty",
    "image": "/assets/services/cybersecurity.svg",
    "starting_price": 1999,
    "unit": "starting audit",
    "turnaround": "2 - 5 Days",
    "short_description": "Website security assessments, vulnerability testing, secure development and security hardening.",
    "full_description": "Led by founder Sudharshan P S (Cybersecurity Specialist). Thorough vulnerability assessments covering OWASP Top 10, penetration testing, server hardening, SSL/TLS configuration, and SQL injection prevention.",
    "deliverables": [
      "Comprehensive Vulnerability Audit (OWASP Top 10)",
      "Detailed Executive & Technical Remediation Report",
      "Authentication & Authorization Hardening",
      "Rate Limiting & DDoS Shielding Recommendations",
      "Secure Headers & SSL/TLS Configuration Check",
      "Post-Fix Retesting & Certificate of Review"
    ],
    "packages": [
      {
        "name": "Web Application Security Audit",
        "price": 1999,
        "duration": "2-3 Days",
        "desc": "Deep vulnerability scan and prioritized remediation report"
      },
      {
        "name": "Full Pentest & Source Code Review",
        "price": 4499,
        "duration": "4-6 Days",
        "desc": "Hands-on penetration testing and API security assessment"
      },
      {
        "name": "Enterprise Infrastructure Hardening",
        "price": 8999,
        "duration": "7-10 Days",
        "desc": "Cloud, server, database, and container hardening suite"
      }
    ],
    "active": true
  },
  {
    "id": "srv-cloud-devops",
    "slug": "cloud-devops",
    "title": "Cloud & DevOps",
    "category": "Infrastructure",
    "icon": "Cloud",
    "badge": "High Performance",
    "image": "/assets/services/cloud-devops.svg",
    "starting_price": 1999,
    "unit": "starting setup",
    "turnaround": "2 - 5 Days",
    "short_description": "AWS cloud deployment, Docker, CI/CD pipelines, server configuration and monitoring.",
    "full_description": "Seamless deployment pipelines and scalable cloud architecture. We containerize your applications with Docker, configure automated GitHub Actions CI/CD, and deploy on AWS, Render, Vercel, or DigitalOcean.",
    "deliverables": [
      "Production Cloud Setup (AWS / Render / Vercel)",
      "Docker Containerization & Multi-Stage Builds",
      "Automated CI/CD Pipelines with GitHub Actions",
      "Domain, DNS, Reverse Proxy (Nginx) & SSL",
      "Live System Health Monitoring & Uptime Alerts",
      "Zero-Downtime Deployment Best Practices"
    ],
    "packages": [
      {
        "name": "Standard Cloud Deployment",
        "price": 1999,
        "duration": "2-3 Days",
        "desc": "Production deploy of frontend + backend + database"
      },
      {
        "name": "Docker & CI/CD Pipeline Setup",
        "price": 3999,
        "duration": "3-5 Days",
        "desc": "Automated test and deploy on every git push"
      },
      {
        "name": "Scalable AWS Cloud Infrastructure",
        "price": 7999,
        "duration": "5-8 Days",
        "desc": "EC2/ECS, S3, RDS, CloudFront CDN, and auto-recovery"
      }
    ],
    "active": true
  },
  {
    "id": "srv-saas",
    "slug": "saas-development",
    "title": "SaaS Development",
    "category": "Cloud Products",
    "icon": "Rocket",
    "badge": "Full Product",
    "image": "/assets/services/saas-development.svg",
    "starting_price": 8999,
    "unit": "starting platform",
    "turnaround": "14 - 30 Days",
    "short_description": "Subscription-based platforms, scalable software products and SaaS dashboards.",
    "full_description": "Turn your startup idea into a recurring-revenue software product. We build scalable multi-tenant SaaS applications equipped with customer billing, user seats, onboarding flows, and analytics.",
    "deliverables": [
      "Multi-Tenant User & Team Organization Architecture",
      "Stripe / Razorpay Recurring Subscription & Tier Billing",
      "Interactive Customer Self-Serve Dashboard",
      "Transactional Email Notifications & Onboarding",
      "Admin Management & Churn / Revenue Analytics",
      "Scalable Microservices / Modular Monolith Design"
    ],
    "packages": [
      {
        "name": "SaaS MVP Architecture",
        "price": 8999,
        "duration": "14-18 Days",
        "desc": "Core SaaS prototype with authentication and billing setup"
      },
      {
        "name": "Production SaaS Platform",
        "price": 18999,
        "duration": "20-30 Days",
        "desc": "End-to-end multi-tenant application with team permissions"
      },
      {
        "name": "Scale-Ready Enterprise SaaS",
        "price": 34999,
        "duration": "30-45 Days",
        "desc": "High-throughput product with advanced API keys & webhooks"
      }
    ],
    "active": true
  },
  {
    "id": "srv-maintenance",
    "slug": "it-maintenance-support",
    "title": "IT Maintenance & Support",
    "category": "Ongoing Support",
    "icon": "Wrench",
    "badge": "Peace of Mind",
    "image": "/assets/services/it-maintenance.svg",
    "starting_price": 299,
    "unit": "starting per month",
    "turnaround": "Monthly Retainer",
    "short_description": "Bug fixes, software updates, backups, security patches and performance optimisation.",
    "full_description": "Keep your digital infrastructure running 24/7 without disruptions. Our maintenance packages provide proactive dependency patching, automated database backups, speed tuning, and on-call technical troubleshooting.",
    "deliverables": [
      "Scheduled Weekly Database & Code Backups",
      "Critical Security & Vulnerability Patching",
      "Performance Monitoring & Speed Optimization",
      "Priority Bug Fixes & Urgent Response SLA",
      "Server Health & Storage Space Inspections",
      "Monthly Technical Health Summary"
    ],
    "packages": [
      {
        "name": "Basic Peace of Mind",
        "price": 299,
        "duration": "Monthly",
        "desc": "Essential security updates, backups & uptime monitoring"
      },
      {
        "name": "Standard Business Care",
        "price": 999,
        "duration": "Monthly",
        "desc": "Includes up to 10 hours of active bug fixes & minor tweaks"
      },
      {
        "name": "Priority Dedicated Support",
        "price": 2499,
        "duration": "Monthly",
        "desc": "Same-day priority turnaround, on-call support & deep optimization"
      }
    ],
    "active": true
  }
];

export const initialProjects: PortfolioProject[] = [
  {
    "id": "proj-drishti",
    "title": "Drishti 360",
    "tagline": "AI-Powered Visual Crop & Farm Quality Intelligence",
    "category": "AI & AgriTech",
    "image": "/assets/products/drishti-360.svg",
    "github": "https://github.com/sudharshanps/Drishti-360",
    "demo_url": "",
    "featured": true,
    "description": "Comprehensive agricultural AI platform delivering visual crop quality grading, smart packaging compliance intelligence, a grade-linked fair price determination engine, and tamper-evident Digital Quality Passports.",
    "tech_stack": [
      "JavaScript",
      "Python",
      "Computer Vision",
      "AI Model",
      "Tailwind CSS"
    ],
    "highlights": [
      "AI Visual Crop Intelligence for real-time defect and maturity scoring",
      "Smart Label & Compliance Intelligence for export standards",
      "Grade-Linked Fair Price Engine ensuring agricultural equity",
      "Digital Quality Passport verifiable via cryptographic scan"
    ]
  },
  {
    "id": "proj-nidhi",
    "title": "Nidhi Setu",
    "tagline": "AI-Enabled Hackathon & Grant Intelligence Prototype",
    "category": "AI & Full-Stack",
    "image": "/assets/products/nidhi-setu.svg",
    "github": "https://github.com/sudharshanps/NidhiVizh",
    "demo_url": "",
    "featured": true,
    "description": "AI-powered grant recommendation and discovery platform built for hackathons, matching innovators with public and private funding opportunities using Gemini API and contextual embeddings.",
    "tech_stack": [
      "React",
      "Vite",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Gemini API"
    ],
    "highlights": [
      "Contextual search powered by Gemini API",
      "Containerized microservices with Docker",
      "Relational storage with normalized PostgreSQL schema",
      "Fast response times via FastAPI asynchronous endpoints"
    ]
  },
  {
    "id": "proj-aicte",
    "title": "AICTE Integrated Institution Complaint Dashboard",
    "tagline": "Centralised Case Tracking & Academic Grievance Monitoring",
    "category": "Enterprise Software",
    "image": "/assets/products/aicte-dashboard.svg",
    "github": "https://github.com/sudharshanps/Frontend",
    "demo_url": "",
    "featured": true,
    "description": "Centralized institutional grievance management system with 360-degree institution profiles, smart overlap detection between regulatory boards (RB) and grievances committees (PGRC), and live analytics.",
    "tech_stack": [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Tailwind CSS"
    ],
    "highlights": [
      "Institution 360° Profile & comprehensive case timeline",
      "RB–PGRC Overlap Detection to eliminate duplicate reporting",
      "Smart Alerts & automated escalation for overdue cases",
      "Advanced search, multi-field filtering & exportable audit reports"
    ]
  },
  {
    "id": "proj-taskguard",
    "title": "TaskGuard",
    "tagline": "Enterprise Task & Sprint Management Platform",
    "category": "Enterprise Software",
    "image": "/assets/products/taskguard.svg",
    "github": "https://github.com/sudharshanps",
    "demo_url": "",
    "featured": true,
    "description": "Full-featured task management platform designed for agile engineering teams. Features Kanban boards, task dependencies, burndown charts, and role-based permissions.",
    "tech_stack": [
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS"
    ],
    "highlights": [
      "Kanban & list views with drag-and-drop workflow",
      "Role-based access controls and team hierarchy",
      "Automated sprint report generation & project milestone tracking"
    ]
  },
  {
    "id": "proj-syllabus",
    "title": "School Subject & Syllabus Management System",
    "tagline": "Academic Curriculum & Faculty Allocation Architecture",
    "category": "Education & Java",
    "image": "/assets/products/syllabus-system.svg",
    "github": "https://github.com/sudharshanps/School-Subject-Syllabus-Management-System",
    "demo_url": "",
    "featured": false,
    "description": "Robust academic curriculum and syllabus tracking system built with enterprise Java and Spring Boot. Manages subject prerequisites, faculty mapping, and syllabus completion audits.",
    "tech_stack": [
      "Java",
      "Spring Boot",
      "MySQL",
      "JDBC",
      "Hibernate"
    ],
    "highlights": [
      "Clean enterprise MVC architecture with Spring Boot",
      "Normalized relational database with strict constraints",
      "Automated syllabus progress tracking and department reports"
    ]
  },
  {
    "id": "proj-sizora",
    "title": "Sizora",
    "tagline": "Smart Apparel Size Recommendation Platform",
    "category": "E-Commerce & AI",
    "image": "/assets/products/sizora.svg",
    "github": "https://github.com/sudharshanps",
    "demo_url": "",
    "featured": false,
    "description": "Intelligent sizing engine for fashion e-commerce that minimizes returns by recommending optimal garment fits based on user body dimensions and brand sizing variance.",
    "tech_stack": [
      "React",
      "Python",
      "Flask",
      "Tailwind CSS"
    ],
    "highlights": [
      "Algorithmic fit matching across disparate brand sizing charts",
      "Interactive measurement input with visual guide",
      "Reduction of e-commerce return rates by estimated 35%"
    ]
  },
  {
    "id": "proj-technico",
    "title": "Technico Website",
    "tagline": "Corporate Portal for Laboratory Products Manufacturer",
    "category": "Web Development",
    "image": "/assets/products/technico-laboratory.svg",
    "github": "https://github.com/sudharshanps/technico-laboratory-products",
    "demo_url": "",
    "featured": true,
    "description": "Production business website and product showcase designed and developed for Technico Laboratory Products Pvt. Ltd., Chennai, translating industrial product specs into intuitive digital catalog layouts.",
    "tech_stack": [
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Figma Design"
    ],
    "highlights": [
      "Interactive product showcase with dynamic specification sheets",
      "Fast quote inquiry flow for enterprise laboratory buyers",
      "Engineered during official UI/UX internship with client"
    ]
  },
  {
    "id": "proj-hackademia",
    "title": "Hackademia — AI Online Exam Invigilation",
    "tagline": "Computer Vision Proctoring System | Top 50 National Finalist",
    "category": "AI & Computer Vision",
    "image": "/assets/products/hackademia.svg",
    "github": "https://github.com/sudharshanps/hackademia-ai-invigilation",
    "demo_url": "",
    "featured": true,
    "description": "AI-powered proctoring solution utilizing real-time face tracking, gaze direction, and suspicious activity detection. Recognized as a Top 50 Finalist among 500+ teams nationwide.",
    "tech_stack": [
      "Python",
      "OpenCV",
      "MediaPipe",
      "Machine Learning",
      "Flask"
    ],
    "highlights": [
      "Top 50 Finalist among 500+ teams at National AI Hackathon",
      "Real-time head pose, multiple face, and suspicious object detection",
      "Automated timestamped violation reporting and incident logging"
    ]
  },
  {
    "id": "proj-threat-detection",
    "title": "AI-Powered Cybersecurity Threat Detection Platform",
    "tagline": "Phishing & Anomaly Detection Pipeline",
    "category": "Cybersecurity & AI",
    "image": "/assets/products/threat-detection.svg",
    "github": "https://github.com/sudharshanps",
    "demo_url": "",
    "featured": false,
    "description": "AI-driven platform for phishing URL classification and anomalous network activity detection using Scikit-learn with containerized FastAPI endpoints.",
    "tech_stack": [
      "FastAPI",
      "Python",
      "Scikit-learn",
      "Docker"
    ],
    "highlights": [
      "Real-time heuristic & ML threat scoring engine",
      "Containerized Docker architecture for rapid deployment",
      "OWASP compliance and live security monitoring"
    ]
  },
  {
    "id": "proj-portfolio",
    "title": "Official SUDHARSHAN_TECH Digital Showcase",
    "tagline": "Live Company Portal & Digital Solutions Hub",
    "category": "Web Development",
    "image": "/assets/products/sudharshan-tech-portal.svg",
    "github": "https://github.com/sudharshanps/Sudharshan_tech-Portfolio",
    "demo_url": "https://sudharshan-tech.onrender.com/",
    "featured": true,
    "description": "Official online identity for SUDHARSHAN_TECH, showcasing full-stack capabilities, developer ecosystem, and client solution offerings.",
    "tech_stack": [
      "React",
      "Vite",
      "Tailwind CSS",
      "Render"
    ],
    "highlights": [
      "Live deployment on Render at sudharshan-tech.onrender.com",
      "Clean modern aesthetic, royal blue highlights, and seamless transitions"
    ]
  }
];

export const initialAchievements: FounderAchievement[] = [
  {
    "id": "ach-1",
    "title": "Top 50 Finalist (500+ Projects)",
    "organization": "Hackademia National AI Hackathon",
    "date": "2026",
    "type": "Hackathon",
    "description": "Engineered Hackademia AI Online Exam Invigilation System with real-time OpenCV & MediaPipe violation detection among 500+ national competing engineering teams."
  },
  {
    "id": "ach-2",
    "title": "2nd Runner-Up",
    "organization": "Tex-Research Hackathon, YUGAM",
    "date": "2026",
    "type": "Hackathon",
    "description": "Recognized for innovative applied technology and rapid prototype execution during prestigious YUGAM technical festival."
  },
  {
    "id": "ach-3",
    "title": "Active Contributor & Technical Mentor",
    "organization": "Cybersecurity Club, SKCET",
    "date": "2024 – Present",
    "type": "Leadership",
    "description": "Leading peer-to-peer technical workshops on network security, OWASP vulnerabilities, and ethical hacking for junior engineering peers."
  },
  {
    "id": "ach-4",
    "title": "Academic Excellence (CGPA 8.5 / 10)",
    "organization": "Sri Krishna College of Engineering & Technology, Coimbatore",
    "date": "2024 – 2028",
    "type": "Education",
    "description": "Pursuing B.E. in Computer Science & Engineering (Cyber Security), excelling in data structures, DBMS, computer networks, and cloud architecture."
  }
];

export const initialPosters: PosterItem[] = [
  {
    "id": "post-1",
    "title": "Modern Tech Startup Launch Poster",
    "category": "Business Posters",
    "image": "/assets/creatives/startup-launch.svg",
    "description": "High-impact visual branding for product launches and investor pitch presentations."
  },
  {
    "id": "post-2",
    "title": "Cybersecurity Awareness & Shield Campaign",
    "category": "Social Media Creatives",
    "image": "/assets/creatives/cybersecurity-shield.svg",
    "description": "Engaging educational infographics covering zero-trust architecture and threat prevention."
  },
  {
    "id": "post-3",
    "title": "Minimalist Brand Identity & Logo Suite",
    "category": "Branding",
    "image": "/assets/creatives/brand-identity.svg",
    "description": "Clean vector geometry, typography guidelines, and digital brand styleguides."
  },
  {
    "id": "post-4",
    "title": "SaaS Application Landing Page Mockup",
    "category": "Website Designs",
    "image": "/assets/creatives/saas-landing.svg",
    "description": "Conversion-optimized hero headers, feature matrices, and interactive pricing tables."
  },
  {
    "id": "post-5",
    "title": "FinTech Mobile App UI/UX Concept",
    "category": "UI/UX Designs",
    "image": "/assets/creatives/fintech-app.svg",
    "description": "Figma wireframes with user journey mapping and responsive design systems."
  },
  {
    "id": "post-6",
    "title": "AI Product Feature Banner & Ads",
    "category": "Advertisements",
    "image": "/assets/creatives/ai-banner.svg",
    "description": "Targeted digital marketing creatives engineered for high click-through rates."
  }
];

export const initialOffers: SpecialOffer[] = [
  {
    "id": "off-web",
    "slug": "website-launch-offer",
    "title": "Website Launch Offer",
    "category": "Web & Digital",
    "badge": "LIMITED LAUNCH",
    "starting_price": 1199,
    "unit": "starting project",
    "short_description": "A budget-friendly starting package for small business websites and personal portfolios.",
    "banner_image": "/assets/offers/website-launch-offer.svg",
    "service_id": "srv-web",
    "features": [
      "100% Mobile & Tablet Responsive Layout",
      "Up to 3 Essential Website Pages",
      "Interactive Contact Section & Lead Capture",
      "Fast Core Web Vitals & Clean Typography",
      "Free SSL Setup & Custom Domain Assistance"
    ],
    "scope_limits": "Covers single-page or up to 3 static sections. E-commerce portals and custom API backends quoted separately.",
    "active": true
  },
  {
    "id": "off-ai",
    "slug": "ai-automation-offer",
    "title": "AI Automation Offer",
    "category": "Artificial Intelligence",
    "badge": "TRENDING TECH",
    "starting_price": 2999,
    "unit": "starting project",
    "short_description": "Explore AI-powered chatbots and business workflow automation.",
    "banner_image": "/assets/offers/ai-automation-offer.svg",
    "service_id": "srv-ai",
    "features": [
      "Custom Trained AI Chatbot Assistant",
      "Gemini API & OpenAI Model Integration",
      "Automated FAQ & Lead Qualification",
      "Website Embeddable Floating Chat Widget",
      "Complete Prompt Engineering & Guardrails"
    ],
    "scope_limits": "Includes 1 AI agent or automated webhook pipeline. Cloud LLM token costs billed directly via client API key.",
    "active": true
  },
  {
    "id": "off-cyber",
    "slug": "cybersecurity-starter",
    "title": "Cybersecurity Starter",
    "category": "Cybersecurity",
    "badge": "FOUNDER SPECIAL",
    "starting_price": 1999,
    "unit": "starting audit",
    "short_description": "Website security review and fundamental security hardening package.",
    "banner_image": "/assets/offers/cybersecurity-starter.svg",
    "service_id": "srv-cybersecurity",
    "features": [
      "Comprehensive Vulnerability Assessment Report",
      "OWASP Top 10 Security Exposure Audit",
      "HTTP Security Headers & SSL Hardening",
      "SQL Injection & Cross-Site Scripting (XSS) Checks",
      "Actionable Step-by-Step Remediation Roadmap"
    ],
    "scope_limits": "Single web domain assessment. Enterprise internal network penetration testing quoted separately.",
    "active": true
  },
  {
    "id": "off-cloud",
    "slug": "cloud-deployment-offer",
    "title": "Cloud Deployment Offer",
    "category": "Cloud & DevOps",
    "badge": "DEVOPS PRO",
    "starting_price": 1999,
    "unit": "starting setup",
    "short_description": "Deployment and initial configuration support for eligible web applications.",
    "banner_image": "/assets/offers/cloud-deployment-offer.svg",
    "service_id": "srv-cloud-devops",
    "features": [
      "Docker Containerization & Multi-Stage Builds",
      "Production Deploy to Render, AWS or VPS",
      "Automated GitHub Actions CI/CD Pipeline",
      "Environment Secret Configuration & SSL",
      "Uptime Monitoring & Health Check Setup"
    ],
    "scope_limits": "Covers single-service app or standard frontend+backend pair. Multi-cluster Kubernetes architecture quoted separately.",
    "active": true
  },
  {
    "id": "off-custom",
    "slug": "business-digitalisation",
    "title": "Business Digitalisation",
    "category": "Custom Software",
    "badge": "PRODUCTIVITY",
    "starting_price": 2999,
    "unit": "starting project",
    "short_description": "Digital dashboards and workflow solutions for small business operations.",
    "banner_image": "/assets/offers/business-digitalisation.svg",
    "service_id": "srv-custom-software",
    "features": [
      "Custom Interactive Analytics Dashboard",
      "Inventory & Order Tracking Interface",
      "Automated Invoicing & Report Export",
      "Role-Based Access for Staff Members",
      "Mobile-Friendly Admin Panel"
    ],
    "scope_limits": "Starting tier covers up to 5 core dashboard modules. Full ERP/CRM custom integrations quoted separately.",
    "active": true
  },
  {
    "id": "off-saas",
    "slug": "startup-saas-offer",
    "title": "Startup SaaS Offer",
    "category": "SaaS Development",
    "badge": "FOUNDER MVP",
    "starting_price": 8999,
    "unit": "starting project",
    "short_description": "Initial development package for founder MVPs and subscription platforms.",
    "banner_image": "/assets/offers/startup-saas-offer.svg",
    "service_id": "srv-saas",
    "features": [
      "Multi-Tenant Database Architecture",
      "User Authentication & Role Management",
      "Subscription Billing Flow (Razorpay / Stripe)",
      "Modern Responsive SaaS Dashboard",
      "Cloud Deployment & Database Setup"
    ],
    "scope_limits": "Covers MVP scope with 1 core feature loop and billing integration. Extended custom modules scoped per requirement.",
    "active": true
  },
  {
    "id": "off-maint",
    "slug": "maintenance-plan",
    "title": "Maintenance Plan",
    "category": "IT Support",
    "badge": "PEACE OF MIND",
    "starting_price": 299,
    "unit": "/month",
    "short_description": "Basic ongoing website maintenance, security updates and technical peace of mind.",
    "banner_image": "/assets/offers/maintenance-plan.svg",
    "service_id": "srv-maintenance",
    "features": [
      "Weekly Database & Asset Backups",
      "Security Patches & Dependency Updates",
      "Continuous Uptime & SSL Monitoring",
      "Priority Bug Fixes & Minor Content Edits",
      "Monthly Health & Performance Summary"
    ],
    "scope_limits": "Includes up to 2 hours of monthly active maintenance and minor tweaks. Major feature overhauls quoted separately.",
    "active": true
  }
];
