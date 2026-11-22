import { ProductItem } from '../types';

export const productsData: ProductItem[] = [
  // 1. DRISHTI 360 (Flagship AI Spotlight)
  {
    id: "prod-drishti-360",
    slug: "drishti-360",
    name: "Drishti 360",
    tagline: "AI-Powered Visual Crop & Farm Quality Intelligence Platform",
    category: "AI Solutions",
    badge: "Flagship Innovation",
    status: "Live Prototype",
    thumbnail: "/assets/services/ai-automation.svg",
    short_description: "Computer vision platform for automated crop quality grading, export packaging compliance, and fair price determination.",
    full_description: "Drishti 360 is an intelligent agricultural intelligence platform engineered to eliminate subjective manual crop inspection. Using deep learning and OpenCV edge inference, it computes instant defect and maturity grades, evaluates export compliance benchmarks, and issues cryptographic Digital Quality Passports for tamper-evident supply chain traceability.",
    features: [
      "Real-time visual defect detection & maturity scoring",
      "Smart packaging and label compliance intelligence",
      "Grade-linked fair price determination engine",
      "Tamper-evident Digital Quality Passport generation"
    ],
    benefits: [
      "Reduces crop inspection times from hours to seconds",
      "Ensures transparent, non-manipulable farmer pricing",
      "Accelerates export customs clearance with digital verification",
      "Minimizes post-harvest transit losses"
    ],
    target_users: [
      "Agricultural Cooperatives & APMC Mandis",
      "Food Processing & Packhouse Enterprises",
      "AgriTech Exporters & Supply Chain Logistics"
    ],
    tech_stack: ["Python", "OpenCV", "PyTorch", "FastAPI", "React", "Docker"],
    github: "https://github.com/sudharshanps/Drishti-360",
    demo_url: "",
    featured: true,
    spotlight: true
  },

  // 2. TASKGUARD (Flagship SaaS Platform)
  {
    id: "prod-taskguard",
    slug: "taskguard",
    name: "TaskGuard",
    tagline: "Enterprise Agile Sprint & Engineering Task Management SaaS",
    category: "SaaS Platforms",
    badge: "Enterprise SaaS",
    status: "Production Ready",
    thumbnail: "/assets/services/saas-development.svg",
    short_description: "Modular project management platform with real-time sprint tracking, burndown metrics, and role-based access control.",
    full_description: "TaskGuard is a multi-tenant agile sprint execution platform built for high-throughput software and engineering teams. It features interactive drag-and-drop Kanban boards, team dependency mapping, automated velocity forecasting, and granular role-based permissions.",
    features: [
      "Real-time interactive Kanban & sprint timeline views",
      "Automated burndown analytics and velocity forecasting",
      "Granular role-based access control (RBAC)",
      "Automated milestone reports and webhook integrations"
    ],
    benefits: [
      "Eliminates sprint friction and task communication gaps",
      "Gives engineering leadership instant roadmap visibility",
      "Replaces bulky bloated enterprise tools with a fast UI"
    ],
    target_users: [
      "Software Development Agencies & Consultancies",
      "Engineering Teams & Tech Startups",
      "Remote Product Teams"
    ],
    tech_stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/sudharshanps",
    demo_url: "",
    featured: true,
    spotlight: false
  },

  // 3. AICTE COMPLAINT DASHBOARD (Business Management)
  {
    id: "prod-aicte-dashboard",
    slug: "aicte-complaint-dashboard",
    name: "AICTE Integrated Grievance Dashboard",
    tagline: "Institutional Grievance Monitoring & Resolution Management System",
    category: "Business Management",
    badge: "Institutional GovTech",
    status: "Live Prototype",
    thumbnail: "/assets/services/custom-software.svg",
    short_description: "Centralized case tracking system with 360° institution profiles and automated regulatory overlap detection.",
    full_description: "Built to streamline higher education grievance monitoring across hundreds of institutions. The platform incorporates smart overlap detection between Regulatory Boards (RB) and Public Grievance Redressal Committees (PGRC), tracking cases from submission to verified resolution with tamper-resistant audit logs.",
    features: [
      "Institution 360° profile with full longitudinal case histories",
      "Automated RB–PGRC overlap detection to prevent dual processing",
      "Automated escalation triggers for SLA-breaching grievances",
      "Comprehensive compliance and analytics report exporter"
    ],
    benefits: [
      "Prevents bureaucratic bottlenecks in student & faculty complaints",
      "Provides state-level oversight into institutional compliance",
      "Ensures transparent grievance audit trails"
    ],
    target_users: [
      "Universities, Colleges & Technical Institutions",
      "Regulatory Boards & Education Ombudsman Offices",
      "Institutional Compliance Officers"
    ],
    tech_stack: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/sudharshanps/Frontend",
    demo_url: "",
    featured: true,
    spotlight: false
  },

  // 4. HACKADEMIA (AI Solutions)
  {
    id: "prod-hackademia",
    slug: "hackademia",
    name: "Hackademia AI Invigilator",
    tagline: "Computer Vision Remote Examination & Proctoring Engine",
    category: "AI Solutions",
    badge: "Top 50 National Finalist",
    status: "Top 50 Finalist",
    thumbnail: "/assets/services/ai-automation.svg",
    short_description: "Real-time AI proctoring system with face tracking, gaze estimation, and automated candidate violation logging.",
    full_description: "Selected as a Top 50 Finalist among 500+ national competing engineering teams at the Hackademia National AI Hackathon. Hackademia leverages low-latency OpenCV and MediaPipe pipelines to monitor exam environments, detect unauthorized persons or devices, track eye gaze anomalies, and compile automated compliance reports.",
    features: [
      "High-precision facial landmark & gaze vector tracking",
      "Multiple person and unauthorized device detection",
      "Automated timestamped video violation bookmarks",
      "Low-bandwidth edge processing architecture"
    ],
    benefits: [
      "Preserves academic integrity in remote certifications and exams",
      "Reduces manual proctoring overhead by over 70%",
      "Generates defensible audit evidence for academic boards"
    ],
    target_users: [
      "EdTech Platforms & Remote Assessment Providers",
      "Universities & Certification Bodies",
      "Corporate Recruitment & Technical Evaluation Teams"
    ],
    tech_stack: ["Python", "OpenCV", "MediaPipe", "Flask", "Machine Learning"],
    github: "https://github.com/sudharshanps/hackademia-ai-invigilation",
    demo_url: "",
    featured: true,
    spotlight: false
  },

  // 5. CYBERSECURITY THREAT DETECTION (Cybersecurity Tools)
  {
    id: "prod-threat-detection",
    slug: "threat-detection-platform",
    name: "AI Threat & Phishing Detection Platform",
    tagline: "Heuristic & Machine Learning Security Threat Classification Pipeline",
    category: "Cybersecurity Tools",
    badge: "Security Specialty",
    status: "Enterprise MVP",
    thumbnail: "/assets/services/cybersecurity.svg",
    short_description: "Real-time network security engine for phishing URL classification and anomalous traffic threat scoring.",
    full_description: "Engineered under the leadership of founder Sudharshan P S (Cybersecurity Specialist at SKCET). The system inspects incoming web traffic, dissects lexical and structural indicators of phishing URLs, and flags suspicious payload anomalies before endpoints are compromised.",
    features: [
      "Machine learning heuristic scoring for zero-day phishing links",
      "Network packet header anomaly classification",
      "RESTful security inspection API with containerized FastAPI",
      "OWASP Top 10 aligned detection rules"
    ],
    benefits: [
      "Blocks malicious social engineering payloads proactively",
      "Lightweight microservice easily integrated into API gateways",
      "Provides actionable risk intelligence to sysadmins"
    ],
    target_users: [
      "Corporate IT Departments & Network Administrators",
      "SaaS Providers requiring incoming webhook security",
      "Financial & Payment Portals"
    ],
    tech_stack: ["FastAPI", "Python", "Scikit-learn", "Docker", "OWASP Standards"],
    github: "https://github.com/sudharshanps",
    demo_url: "",
    featured: true,
    spotlight: false
  },

  // 6. NIDHI SETU (Automation Products)
  {
    id: "prod-nidhi-setu",
    slug: "nidhi-setu",
    name: "Nidhi Setu",
    tagline: "AI Grant Intelligence & Innovation Opportunity Engine",
    category: "Automation Products",
    badge: "Innovation Grant AI",
    status: "Live Prototype",
    thumbnail: "/assets/services/cloud-devops.svg",
    short_description: "Intelligent matching engine pairing academic researchers and innovators with public & private grants using Gemini embeddings.",
    full_description: "Nidhi Setu automates the complex task of funding discovery for early-stage engineering innovators. It ingests research abstracts and project specifications, comparing them against hundreds of government grants (NIDHI, DST, AICTE, MSME) to suggest highest-probability funding tracks.",
    features: [
      "Semantic project embedding matching powered by Gemini API",
      "Normalized grant database with deadline and criteria alerts",
      "Automated proposal eligibility check & gap analysis",
      "Instant export of required grant documentation checklists"
    ],
    benefits: [
      "Cuts grant discovery time from weeks to minutes",
      "Helps student innovators secure capital for hardware prototypes",
      "Simplifies compliance requirements for non-academic founders"
    ],
    target_users: [
      "Student Innovators & Hackathon Participants",
      "Academic Research Labs & Incubation Centers",
      "Early-Stage Deep-Tech Startups"
    ],
    tech_stack: ["React", "Vite", "FastAPI", "Python", "PostgreSQL", "Gemini API"],
    github: "https://github.com/sudharshanps/NidhiVizh",
    demo_url: "",
    featured: false,
    spotlight: false
  },

  // 7. SIZORA (SaaS Platforms)
  {
    id: "prod-sizora",
    slug: "sizora",
    name: "Sizora",
    tagline: "Smart Apparel Size Recommendation & Fit Analytics Engine",
    category: "SaaS Platforms",
    badge: "E-Commerce Tech",
    status: "Production Ready",
    thumbnail: "/assets/services/web-development.svg",
    short_description: "AI-assisted sizing engine for apparel e-commerce that drastically minimizes return rates and boosts conversion.",
    full_description: "Sizora bridges the gap between varying brand measurement standards and customer body profiles. It embeds directly onto checkout pages to give shoppers definitive sizing confidence, cutting costly wardrobe returns for online apparel brands.",
    features: [
      "Multi-brand measurement variance algorithm",
      "Intuitive 3-step customer measurement visual selector",
      "Shopify & Custom React e-commerce plugin architecture",
      "Analytics dashboard on garment return causality"
    ],
    benefits: [
      "Reduces sizing-related e-commerce return shipments by ~35%",
      "Elevates shopper checkout conversion and cart size",
      "Provides brand designers with real-world anthropometric fit metrics"
    ],
    target_users: [
      "Direct-to-Consumer (D2C) Fashion Brands",
      "Custom Tailoring & Apparel E-Commerce Portals",
      "Apparel Manufacturers"
    ],
    tech_stack: ["React", "Python", "Flask", "Tailwind CSS"],
    github: "https://github.com/sudharshanps",
    demo_url: "",
    featured: false,
    spotlight: false
  },

  // 8. SCHOOL SYLLABUS MANAGEMENT (Business Management)
  {
    id: "prod-syllabus-system",
    slug: "syllabus-system",
    name: "Curriculum & Syllabus Management Suite",
    tagline: "Academic Course Mapping & Faculty Allocation Architecture",
    category: "Business Management",
    badge: "Enterprise Java",
    status: "Enterprise MVP",
    thumbnail: "/assets/services/custom-software.svg",
    short_description: "Enterprise Java MVC system for managing department course prerequisites, faculty workload, and syllabus tracking.",
    full_description: "A production-grade academic management system designed to eliminate scheduling collisions and track syllabus completion benchmarks across multi-discipline institutions.",
    features: [
      "Course prerequisite and credit mapping engine",
      "Faculty workload allocation and timetable optimization",
      "Milestone-based syllabus progression auditor",
      "Automated department accreditation report exporter"
    ],
    benefits: [
      "Guarantees compliance with university curriculum guidelines",
      "Balances teaching loads transparently across faculty",
      "Provides real-time visibility into academic term completion"
    ],
    target_users: [
      "Engineering Colleges & Polytechnic Campuses",
      "Heads of Departments (HODs) & Academic Deans",
      "University Curriculum Review Committees"
    ],
    tech_stack: ["Java", "Spring Boot", "MySQL", "JDBC", "Hibernate"],
    github: "https://github.com/sudharshanps/School-Subject-Syllabus-Management-System",
    demo_url: "",
    featured: false,
    spotlight: false
  },

  // 9. CLOUDGUARD ZERO-TRUST GATEWAY (Coming Soon)
  {
    id: "prod-cloudguard",
    slug: "cloudguard",
    name: "CloudGuard Zero-Trust Gateway",
    tagline: "Next-Generation Identity-Aware Cloud Access Proxy",
    category: "Coming Soon",
    badge: "Roadmap 2027",
    status: "In Development",
    thumbnail: "/assets/services/cloud-devops.svg",
    short_description: "Micro-perimeter access gateway verifying every connection dynamically before granting infrastructure access.",
    full_description: "Currently in active research and prototyping by the SUDHARSHAN_TECH security lab. CloudGuard enforces contextual zero-trust network access (ZTNA) without requiring cumbersome VPN clients.",
    features: [
      "Context-aware device posture & TLS fingerprint validation",
      "Continuous session risk assessment and automated revocation",
      "Single-binary deployment via Go and eBPF kernel hooks",
      "Seamless integration with AWS and Kubernetes clusters"
    ],
    benefits: [
      "Eliminates vulnerable open ports on public cloud VPCs",
      "Implements modern least-privilege access for developers",
      "Generates immutable access telemetry for SOC compliance"
    ],
    target_users: [
      "Cloud Infrastructure Teams & DevOps Engineers",
      "FinTech Startups handling sensitive payment data",
      "Companies with distributed remote engineering teams"
    ],
    tech_stack: ["Go", "eBPF", "Docker", "Zero-Trust Architecture"],
    demo_url: "",
    featured: false,
    spotlight: false
  }
];
