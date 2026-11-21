import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicesDir = path.join(__dirname, '..', 'public', 'assets', 'services');
const offersDir = path.join(__dirname, '..', 'public', 'assets', 'offers');

if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir, { recursive: true });
if (!fs.existsSync(offersDir)) fs.mkdirSync(offersDir, { recursive: true });

// Helper to wrap SVG in standard 800x480 container with brand gradients
function makeSvg(title, subtitle, graphicContent, accentColor = '#155EEF', tag = 'SUDHARSHAN_TECH') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F1F5F9" />
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#155EEF" />
      <stop offset="100%" stop-color="#00D2FF" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E53935" />
      <stop offset="100%" stop-color="#FF6B6B" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F8FAFC" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0F172A" flood-opacity="0.08" />
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="${accentColor}" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="480" fill="url(#bgGrad)" />

  <!-- Subtle Tech Grid -->
  <g opacity="0.4">
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" stroke-width="1" />
    </pattern>
    <rect width="800" height="480" fill="url(#grid)" />
  </g>

  <!-- Ambient Decorative Rings -->
  <circle cx="700" cy="80" r="140" fill="${accentColor}" opacity="0.04" />
  <circle cx="100" cy="420" r="160" fill="#155EEF" opacity="0.04" />

  <!-- Main Illustration Content -->
  ${graphicContent}

  <!-- Brand Label Overlay Bar -->
  <g transform="translate(40, 420)">
    <rect width="720" height="38" rx="10" fill="#FFFFFF" stroke="#E2E8F0" filter="url(#shadow)" />
    <rect x="12" y="10" width="8" height="18" rx="4" fill="${accentColor}" />
    <text x="30" y="23" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="800" fill="#172033">${tag}</text>
    <text x="170" y="23" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="600" fill="#64748B">• ${title} (${subtitle})</text>
    <text x="690" y="23" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="700" fill="${accentColor}" text-anchor="end">PRO VERIFIED</text>
  </g>
</svg>`;
}

// 1. Web Development Illustration
const webDevSvg = makeSvg(
  'Web Development',
  'Responsive UI/UX & Web Applications',
  `
  <!-- Laptop Workspace -->
  <g transform="translate(180, 50)" filter="url(#shadow)">
    <!-- Laptop Screen Outer -->
    <rect x="20" y="20" width="400" height="250" rx="14" fill="#1E293B" stroke="#334155" stroke-width="2" />
    <!-- Screen Glass -->
    <rect x="32" y="32" width="376" height="226" rx="8" fill="#FFFFFF" />
    
    <!-- Browser Window Header -->
    <rect x="32" y="32" width="376" height="30" fill="#F1F5F9" />
    <circle cx="50" cy="47" r="4" fill="#EF4444" />
    <circle cx="64" cy="47" r="4" fill="#F59E0B" />
    <circle cx="78" cy="47" r="4" fill="#10B981" />
    <rect x="100" y="39" width="180" height="16" rx="4" fill="#E2E8F0" />
    <text x="110" y="51" font-family="monospace" font-size="9" fill="#64748B">https://sudharshan-tech.com</text>

    <!-- Web Page Mockup Elements inside Screen -->
    <rect x="48" y="76" width="160" height="14" rx="3" fill="#155EEF" />
    <rect x="48" y="96" width="130" height="8" rx="2" fill="#94A3B8" />
    <rect x="48" y="108" width="100" height="8" rx="2" fill="#CBD5E1" />
    <rect x="48" y="126" width="70" height="20" rx="6" fill="#E53935" />

    <!-- Split Code Editor on right -->
    <rect x="230" y="76" width="162" height="166" rx="6" fill="#0F172A" />
    <text x="242" y="96" font-family="monospace" font-size="9" fill="#38BDF8">&lt;div <tspan fill="#F43F5E">className</tspan>=<tspan fill="#34D399">"hero"</tspan>&gt;</text>
    <text x="252" y="112" font-family="monospace" font-size="9" fill="#94A3B8">&lt;h1&gt;Digital Solution&lt;/h1&gt;</text>
    <text x="252" y="128" font-family="monospace" font-size="9" fill="#38BDF8">&lt;Button <tspan fill="#F59E0B">primary</tspan>&gt;</text>
    <text x="262" y="144" font-family="monospace" font-size="9" fill="#34D399">Start Project</text>
    <text x="252" y="160" font-family="monospace" font-size="9" fill="#38BDF8">&lt;/Button&gt;</text>
    <text x="242" y="176" font-family="monospace" font-size="9" fill="#38BDF8">&lt;/div&gt;</text>

    <!-- Laptop Keyboard Base -->
    <path d="M -10 270 L 450 270 L 430 295 L 10 295 Z" fill="#CBD5E1" stroke="#94A3B8" />
    <rect x="180" y="272" width="80" height="6" rx="3" fill="#94A3B8" />
  </g>

  <!-- Floating Responsive Tech Pills -->
  <g transform="translate(80, 140)" filter="url(#glow)">
    <rect width="110" height="42" rx="12" fill="#FFFFFF" stroke="#BFDBFE" stroke-width="1.5" />
    <circle cx="24" cy="21" r="10" fill="#EFF4FF" />
    <text x="20" y="25" font-family="sans-serif" font-size="12" font-weight="900" fill="#155EEF">R</text>
    <text x="42" y="25" font-family="sans-serif" font-size="11" font-weight="700" fill="#1E293B">React 19</text>
  </g>

  <g transform="translate(610, 180)" filter="url(#glow)">
    <rect width="120" height="42" rx="12" fill="#FFFFFF" stroke="#FECACA" stroke-width="1.5" />
    <circle cx="24" cy="21" r="10" fill="#FFF1F0" />
    <text x="18" y="25" font-family="sans-serif" font-size="12" font-weight="900" fill="#E53935">TS</text>
    <text x="42" y="25" font-family="sans-serif" font-size="11" font-weight="700" fill="#1E293B">TypeScript</text>
  </g>
  `,
  '#155EEF'
);

// 2. Mobile App Development Illustration
const mobileAppSvg = makeSvg(
  'Mobile App Development',
  'Android, iOS & Cross-Platform Applications',
  `
  <!-- Dual Smartphone Mockups -->
  <!-- Left Phone (iOS Mockup) -->
  <g transform="translate(250, 70)" filter="url(#shadow)">
    <rect width="160" height="310" rx="28" fill="#1E293B" stroke="#475569" stroke-width="3" />
    <rect x="8" y="8" width="144" height="294" rx="22" fill="#FFFFFF" />
    <!-- Dynamic Island -->
    <rect x="52" y="14" width="56" height="14" rx="7" fill="#0F172A" />
    
    <!-- App UI Mockup -->
    <rect x="20" y="44" width="80" height="12" rx="4" fill="#155EEF" />
    <circle cx="132" cy="50" r="10" fill="#EFF4FF" />
    <!-- Balance Card -->
    <rect x="20" y="70" width="120" height="65" rx="12" fill="url(#primaryGrad)" />
    <text x="32" y="92" font-family="sans-serif" font-size="9" fill="#FFFFFF" opacity="0.8">Marketplace Cart</text>
    <text x="32" y="114" font-family="sans-serif" font-size="15" font-weight="900" fill="#FFFFFF">₹4,999</text>
    
    <!-- Action Grid -->
    <rect x="20" y="150" width="55" height="50" rx="10" fill="#F8FAFC" stroke="#E2E8F0" />
    <rect x="85" y="150" width="55" height="50" rx="10" fill="#F8FAFC" stroke="#E2E8F0" />
    <rect x="20" y="210" width="120" height="34" rx="10" fill="#E53935" />
    <text x="44" y="232" font-family="sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Order Now</text>
  </g>

  <!-- Right Phone (Android Mockup, angled overlay) -->
  <g transform="translate(410, 110)" filter="url(#shadow)">
    <rect width="150" height="280" rx="22" fill="#0F172A" stroke="#334155" stroke-width="2" />
    <rect x="6" y="6" width="138" height="268" rx="18" fill="#F8FAFC" />
    <!-- Punch hole camera -->
    <circle cx="75" cy="18" r="4" fill="#000000" />
    
    <!-- UI Elements -->
    <rect x="18" y="36" width="114" height="40" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />
    <circle cx="36" cy="56" r="10" fill="#10B981" opacity="0.2" />
    <rect x="54" y="48" width="60" height="7" rx="3" fill="#1E293B" />
    <rect x="54" y="58" width="40" height="6" rx="2" fill="#94A3B8" />

    <rect x="18" y="86" width="114" height="75" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />
    <rect x="18" y="171" width="114" height="70" rx="10" fill="#EFF4FF" stroke="#BFDBFE" />
  </g>

  <!-- Floating Flutter & React Native Badges -->
  <g transform="translate(100, 180)" filter="url(#glow)">
    <rect width="110" height="42" rx="12" fill="#FFFFFF" stroke="#BFDBFE" />
    <text x="18" y="26" font-family="sans-serif" font-size="11" font-weight="800" fill="#0284C7">Flutter SDK</text>
  </g>
  <g transform="translate(580, 150)" filter="url(#glow)">
    <rect width="130" height="42" rx="12" fill="#FFFFFF" stroke="#FECACA" />
    <text x="16" y="26" font-family="sans-serif" font-size="11" font-weight="800" fill="#E53935">React Native</text>
  </g>
  `,
  '#0284C7'
);

// 3. AI & Automation Illustration
const aiAutomationSvg = makeSvg(
  'AI Solutions & Automation',
  'LLM Chatbots, AI Agents & Workflow Automation',
  `
  <!-- Central AI Core Node -->
  <g transform="translate(400, 190)" filter="url(#glow)">
    <circle cx="0" cy="0" r="70" fill="url(#primaryGrad)" opacity="0.15" />
    <circle cx="0" cy="0" r="50" fill="#FFFFFF" stroke="#155EEF" stroke-width="3" filter="url(#shadow)" />
    <!-- AI Brain Circuit Symbol -->
    <path d="M -20 -15 C -25 -5, -25 10, -15 20 C -5 25, 10 20, 18 10 C 25 0, 20 -15, 10 -20 Z" fill="none" stroke="#155EEF" stroke-width="3" stroke-linecap="round" />
    <circle cx="-6" cy="-2" r="5" fill="#E53935" />
    <circle cx="10" cy="4" r="4" fill="#155EEF" />
    <path d="M -6 -2 L 10 4" stroke="#155EEF" stroke-width="2" />
  </g>

  <!-- Connected Automation Nodes -->
  <!-- Node Left: Chatbot Interface -->
  <g transform="translate(130, 100)" filter="url(#shadow)">
    <rect width="210" height="150" rx="16" fill="#FFFFFF" stroke="#E2E8F0" />
    <rect x="16" y="16" width="100" height="12" rx="4" fill="#155EEF" />
    <!-- Chat Bubbles -->
    <rect x="16" y="42" width="140" height="34" rx="10" fill="#F1F5F9" />
    <text x="26" y="63" font-family="sans-serif" font-size="10" fill="#334155">How can AI help my business?</text>
    <rect x="54" y="86" width="140" height="42" rx="10" fill="#EFF4FF" stroke="#BFDBFE" />
    <text x="64" y="104" font-family="sans-serif" font-size="10" font-weight="600" fill="#155EEF">Automate 80% of inquiries &amp;</text>
    <text x="64" y="118" font-family="sans-serif" font-size="10" font-weight="600" fill="#155EEF">streamline lead pipeline!</text>
  </g>

  <!-- Node Right: Automated Workflow Pipeline -->
  <g transform="translate(480, 100)" filter="url(#shadow)">
    <rect width="200" height="150" rx="16" fill="#FFFFFF" stroke="#E2E8F0" />
    <text x="18" y="32" font-family="sans-serif" font-size="11" font-weight="800" fill="#172033">Intelligent Pipeline</text>
    <rect x="18" y="48" width="164" height="26" rx="6" fill="#F0FDF4" stroke="#BBF7D0" />
    <text x="28" y="65" font-family="monospace" font-size="9" fill="#166534">✓ Trigger: Webhook Event</text>
    <rect x="18" y="80" width="164" height="26" rx="6" fill="#EFF4FF" stroke="#BFDBFE" />
    <text x="28" y="97" font-family="monospace" font-size="9" fill="#1D4ED8">⚡ Gemini LLM Analysis</text>
    <rect x="18" y="112" width="164" height="26" rx="6" fill="#FEF2F2" stroke="#FECACA" />
    <text x="28" y="129" font-family="monospace" font-size="9" fill="#B91C1C">✉ Auto-Reply &amp; CRM Sync</text>
  </g>

  <!-- Connecting Stream Lines -->
  <path d="M 340 175 L 350 190" stroke="#155EEF" stroke-width="2" stroke-dasharray="4 4" />
  <path d="M 450 190 L 480 175" stroke="#155EEF" stroke-width="2" stroke-dasharray="4 4" />
  `,
  '#155EEF'
);

// 4. Custom Software Development Illustration
const customSoftwareSvg = makeSvg(
  'Custom Software & ERP',
  'Enterprise CRM, ERP, Billing & Business Portals',
  `
  <!-- Enterprise Dashboard UI Canvas -->
  <g transform="translate(150, 70)" filter="url(#shadow)">
    <rect width="500" height="300" rx="16" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
    
    <!-- Sidebar Navigation -->
    <rect width="110" height="300" rx="16" fill="#0F172A" />
    <text x="18" y="36" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFFFFF">ERP Pro</text>
    <rect x="14" y="60" width="82" height="24" rx="6" fill="#155EEF" />
    <text x="24" y="76" font-family="sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">Overview</text>
    <rect x="14" y="92" width="82" height="20" rx="6" fill="#1E293B" />
    <text x="24" y="106" font-family="sans-serif" font-size="9" fill="#94A3B8">Inventory</text>
    <rect x="14" y="120" width="82" height="20" rx="6" fill="#1E293B" />
    <text x="24" y="134" font-family="sans-serif" font-size="9" fill="#94A3B8">Billing / Tax</text>
    <rect x="14" y="148" width="82" height="20" rx="6" fill="#1E293B" />
    <text x="24" y="162" font-family="sans-serif" font-size="9" fill="#94A3B8">Analytics</text>

    <!-- Top Metric Cards -->
    <rect x="130" y="20" width="105" height="60" rx="10" fill="#F8FAFC" stroke="#E2E8F0" />
    <text x="140" y="38" font-family="sans-serif" font-size="9" fill="#64748B">Revenue</text>
    <text x="140" y="58" font-family="sans-serif" font-size="14" font-weight="900" fill="#16A34A">₹2,84,500</text>

    <rect x="250" y="20" width="105" height="60" rx="10" fill="#F8FAFC" stroke="#E2E8F0" />
    <text x="260" y="38" font-family="sans-serif" font-size="9" fill="#64748B">Active Orders</text>
    <text x="260" y="58" font-family="sans-serif" font-size="14" font-weight="900" fill="#155EEF">142</text>

    <rect x="370" y="20" width="105" height="60" rx="10" fill="#F8FAFC" stroke="#E2E8F0" />
    <text x="380" y="38" font-family="sans-serif" font-size="9" fill="#64748B">System Health</text>
    <text x="380" y="58" font-family="sans-serif" font-size="14" font-weight="900" fill="#E53935">99.98%</text>

    <!-- Bar Chart Graphic -->
    <rect x="130" y="100" width="345" height="175" rx="12" fill="#FFFFFF" stroke="#E2E8F0" />
    <text x="146" y="122" font-family="sans-serif" font-size="11" font-weight="700" fill="#1E293B">Monthly Business Throughput</text>
    <!-- Chart Bars -->
    <rect x="160" y="210" width="28" height="45" rx="4" fill="#BFDBFE" />
    <rect x="205" y="180" width="28" height="75" rx="4" fill="#93C5FD" />
    <rect x="250" y="160" width="28" height="95" rx="4" fill="#60A5FA" />
    <rect x="295" y="140" width="28" height="115" rx="4" fill="#3B82F6" />
    <rect x="340" y="130" width="28" height="125" rx="4" fill="#2563EB" />
    <rect x="385" y="115" width="28" height="140" rx="4" fill="#155EEF" />
    <rect x="430" y="135" width="28" height="120" rx="4" fill="#E53935" />
  </g>
  `,
  '#155EEF'
);

// 5. Cybersecurity Illustration
const cybersecuritySvg = makeSvg(
  'Cybersecurity & Hardening',
  'Vulnerability Assessments, Security Hardening & OWASP Audits',
  `
  <!-- Central Digital Security Shield -->
  <g transform="translate(400, 200)" filter="url(#glow)">
    <!-- Glowing Outer Shield -->
    <path d="M 0 -110 L 85 -70 C 85 40, 45 95, 0 120 C -45 95, -85 40, -85 -70 Z" fill="url(#primaryGrad)" opacity="0.2" />
    <!-- Solid Shield -->
    <path d="M 0 -95 L 75 -60 C 75 35, 40 85, 0 105 C -40 85, -75 35, -75 -60 Z" fill="#FFFFFF" stroke="#155EEF" stroke-width="3" filter="url(#shadow)" />
    <!-- Padlock Graphic inside Shield -->
    <rect x="-24" y="-10" width="48" height="40" rx="8" fill="#172033" />
    <path d="M -16 -10 L -16 -24 C -16 -34, 16 -34, 16 -24 L 16 -10" fill="none" stroke="#172033" stroke-width="5" stroke-linecap="round" />
    <circle cx="0" cy="8" r="4" fill="#E53935" />
    <path d="M 0 10 L 0 18" stroke="#E53935" stroke-width="2" />
  </g>

  <!-- Left Card: Threat Monitor -->
  <g transform="translate(110, 110)" filter="url(#shadow)">
    <rect width="180" height="160" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
    <text x="18" y="32" font-family="sans-serif" font-size="11" font-weight="800" fill="#172033">Audit Parameters</text>
    <rect x="18" y="48" width="144" height="24" rx="6" fill="#F0FDF4" stroke="#BBF7D0" />
    <text x="26" y="64" font-family="sans-serif" font-size="9" font-weight="700" fill="#166534">✓ OWASP Top 10 Audited</text>
    <rect x="18" y="80" width="144" height="24" rx="6" fill="#F0FDF4" stroke="#BBF7D0" />
    <text x="26" y="96" font-family="sans-serif" font-size="9" font-weight="700" fill="#166534">✓ TLS 1.3 Strict HTTPS</text>
    <rect x="18" y="112" width="144" height="24" rx="6" fill="#EFF4FF" stroke="#BFDBFE" />
    <text x="26" y="128" font-family="sans-serif" font-size="9" font-weight="700" fill="#155EEF">🛡 Rate Limiting Active</text>
  </g>

  <!-- Right Card: Security Metrics -->
  <g transform="translate(510, 110)" filter="url(#shadow)">
    <rect width="180" height="160" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
    <text x="18" y="32" font-family="sans-serif" font-size="11" font-weight="800" fill="#172033">Security Score</text>
    <circle cx="90" cy="85" r="40" fill="none" stroke="#E2E8F0" stroke-width="8" />
    <circle cx="90" cy="85" r="40" fill="none" stroke="#10B981" stroke-width="8" stroke-dasharray="210 250" stroke-linecap="round" />
    <text x="90" y="90" font-family="sans-serif" font-size="16" font-weight="900" fill="#172033" text-anchor="middle">A+</text>
    <text x="90" y="145" font-family="sans-serif" font-size="9" font-weight="700" fill="#10B981" text-anchor="middle">Zero Critical Findings</text>
  </g>
  `,
  '#155EEF'
);

// 6. Cloud & DevOps Illustration
const cloudDevOpsSvg = makeSvg(
  'Cloud & DevOps',
  'AWS Cloud Infrastructure, Docker Containers & CI/CD Pipelines',
  `
  <!-- Central Cloud & Server Stacks -->
  <g transform="translate(350, 90)" filter="url(#shadow)">
    <!-- Cloud Contour -->
    <path d="M 50 100 C 30 100 10 80 10 55 C 10 32 30 16 52 16 C 60 -5 95 -5 110 12 C 125 0 155 8 155 35 C 175 38 190 55 190 75 C 190 100 170 100 150 100 Z" fill="#FFFFFF" stroke="#0284C7" stroke-width="3" filter="url(#glow)" />
    <text x="100" y="62" font-family="sans-serif" font-size="12" font-weight="900" fill="#0284C7" text-anchor="middle">AWS Cloud</text>
  </g>

  <!-- Server Racks Bottom -->
  <g transform="translate(300, 210)" filter="url(#shadow)">
    <rect width="200" height="130" rx="12" fill="#1E293B" stroke="#475569" stroke-width="2" />
    <!-- Server Unit 1 -->
    <rect x="12" y="14" width="176" height="26" rx="6" fill="#0F172A" />
    <circle cx="28" cy="27" r="4" fill="#10B981" />
    <circle cx="40" cy="27" r="4" fill="#10B981" />
    <circle cx="52" cy="27" r="4" fill="#38BDF8" />
    <line x1="70" y1="27" x2="160" y2="27" stroke="#334155" stroke-width="4" stroke-dasharray="8 6" />

    <!-- Server Unit 2 -->
    <rect x="12" y="48" width="176" height="26" rx="6" fill="#0F172A" />
    <circle cx="28" cy="61" r="4" fill="#10B981" />
    <circle cx="40" cy="61" r="4" fill="#F59E0B" />
    <circle cx="52" cy="61" r="4" fill="#38BDF8" />
    <line x1="70" y1="61" x2="160" y2="61" stroke="#334155" stroke-width="4" stroke-dasharray="8 6" />

    <!-- Server Unit 3 -->
    <rect x="12" y="82" width="176" height="26" rx="6" fill="#0F172A" />
    <circle cx="28" cy="95" r="4" fill="#10B981" />
    <circle cx="40" cy="95" r="4" fill="#10B981" />
    <circle cx="52" cy="95" r="4" fill="#E53935" />
    <line x1="70" y1="95" x2="160" y2="95" stroke="#334155" stroke-width="4" stroke-dasharray="8 6" />
  </g>

  <!-- Left: CI/CD Pipeline Step Indicator -->
  <g transform="translate(100, 140)" filter="url(#shadow)">
    <rect width="160" height="170" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
    <text x="18" y="32" font-family="sans-serif" font-size="11" font-weight="800" fill="#172033">GitHub Actions</text>
    <rect x="18" y="48" width="124" height="24" rx="6" fill="#F8FAFC" stroke="#E2E8F0" />
    <text x="26" y="64" font-family="monospace" font-size="9" fill="#1E293B">1. Test &amp; Build ✓</text>
    <rect x="18" y="80" width="124" height="24" rx="6" fill="#F8FAFC" stroke="#E2E8F0" />
    <text x="26" y="96" font-family="monospace" font-size="9" fill="#1E293B">2. Docker Build ✓</text>
    <rect x="18" y="112" width="124" height="24" rx="6" fill="#EFF4FF" stroke="#BFDBFE" />
    <text x="26" y="128" font-family="monospace" font-size="9" font-weight="700" fill="#155EEF">3. Cloud Push 🚀</text>
  </g>

  <!-- Right: Docker Containers -->
  <g transform="translate(540, 150)" filter="url(#shadow)">
    <rect width="160" height="150" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
    <text x="18" y="32" font-family="sans-serif" font-size="11" font-weight="800" fill="#0284C7">Docker Containers</text>
    <rect x="20" y="50" width="48" height="36" rx="6" fill="#0284C7" />
    <rect x="76" y="50" width="48" height="36" rx="6" fill="#0369A1" />
    <rect x="20" y="94" width="48" height="36" rx="6" fill="#0284C7" />
    <rect x="76" y="94" width="48" height="36" rx="6" fill="#E53935" />
  </g>
  `,
  '#0284C7'
);

// 7. SaaS Development Illustration
const saasDevSvg = makeSvg(
  'SaaS Development',
  'Subscription Platforms, Multi-Tenant Architecture & Dashboards',
  `
  <!-- SaaS Dashboard Center -->
  <g transform="translate(180, 70)" filter="url(#shadow)">
    <rect width="440" height="290" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
    
    <!-- Top App Bar -->
    <rect width="440" height="42" rx="16" fill="#F8FAFC" />
    <circle cx="30" cy="21" r="10" fill="#155EEF" />
    <text x="50" y="26" font-family="sans-serif" font-size="12" font-weight="800" fill="#172033">SaaSify Pro Platform</text>
    <rect x="340" y="11" width="80" height="22" rx="6" fill="#155EEF" />
    <text x="380" y="26" font-family="sans-serif" font-size="9" font-weight="700" fill="#FFFFFF" text-anchor="middle">+ Add User</text>

    <!-- MRR & Subscription Stats -->
    <rect x="24" y="60" width="180" height="70" rx="10" fill="#EFF4FF" stroke="#BFDBFE" />
    <text x="36" y="80" font-family="sans-serif" font-size="10" fill="#1D4ED8">Monthly Recurring Revenue</text>
    <text x="36" y="108" font-family="sans-serif" font-size="18" font-weight="900" fill="#155EEF">₹8,99,000</text>
    <text x="140" y="108" font-family="sans-serif" font-size="9" font-weight="700" fill="#16A34A">+34% MoM</text>

    <rect x="220" y="60" width="195" height="70" rx="10" fill="#F0FDF4" stroke="#BBF7D0" />
    <text x="232" y="80" font-family="sans-serif" font-size="10" fill="#15803D">Active Paid Subscribers</text>
    <text x="232" y="108" font-family="sans-serif" font-size="18" font-weight="900" fill="#166534">1,480</text>
    <text x="340" y="108" font-family="sans-serif" font-size="9" font-weight="700" fill="#16A34A">Churn &lt;1%</text>

    <!-- User Management Table Row -->
    <rect x="24" y="145" width="392" height="120" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />
    <text x="38" y="168" font-family="sans-serif" font-size="10" font-weight="700" fill="#64748B">RECENT SUBSCRIPTION EVENTS</text>
    
    <rect x="36" y="180" width="368" height="28" rx="6" fill="#F8FAFC" />
    <circle cx="50" cy="194" r="7" fill="#155EEF" />
    <text x="65" y="198" font-family="sans-serif" font-size="9" font-weight="700" fill="#1E293B">TechCorp India • Enterprise Tier</text>
    <text x="380" y="198" font-family="sans-serif" font-size="9" font-weight="800" fill="#16A34A" text-anchor="end">₹14,999/mo</text>

    <rect x="36" y="216" width="368" height="28" rx="6" fill="#F8FAFC" />
    <circle cx="50" cy="230" r="7" fill="#E53935" />
    <text x="65" y="234" font-family="sans-serif" font-size="9" font-weight="700" fill="#1E293B">StartupPulse • Growth Tier</text>
    <text x="380" y="234" font-family="sans-serif" font-size="9" font-weight="800" fill="#16A34A" text-anchor="end">₹4,999/mo</text>
  </g>
  `,
  '#155EEF'
);

// 8. IT Maintenance & Support Illustration
const itMaintenanceSvg = makeSvg(
  'IT Maintenance & Support',
  'Software Patches, Backups, Monitoring & Performance Optimisation',
  `
  <!-- Central Tech Support Control Desk -->
  <g transform="translate(240, 70)" filter="url(#shadow)">
    <rect width="320" height="220" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
    
    <rect width="320" height="38" rx="16" fill="#F8FAFC" />
    <circle cx="20" cy="19" r="6" fill="#10B981" />
    <text x="36" y="23" font-family="sans-serif" font-size="11" font-weight="800" fill="#172033">24/7 Production System Health</text>
    <text x="300" y="23" font-family="sans-serif" font-size="9" font-weight="800" fill="#10B981" text-anchor="end">ONLINE</text>

    <!-- Gauges & Dials -->
    <g transform="translate(30, 60)">
      <circle cx="45" cy="45" r="35" fill="none" stroke="#E2E8F0" stroke-width="6" />
      <circle cx="45" cy="45" r="35" fill="none" stroke="#155EEF" stroke-width="6" stroke-dasharray="160 220" />
      <text x="45" y="48" font-family="sans-serif" font-size="12" font-weight="900" fill="#155EEF" text-anchor="middle">99.9%</text>
      <text x="45" y="95" font-family="sans-serif" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">Uptime SLA</text>
    </g>

    <g transform="translate(180, 60)">
      <circle cx="45" cy="45" r="35" fill="none" stroke="#E2E8F0" stroke-width="6" />
      <circle cx="45" cy="45" r="35" fill="none" stroke="#10B981" stroke-width="6" stroke-dasharray="190 220" />
      <text x="45" y="48" font-family="sans-serif" font-size="12" font-weight="900" fill="#10B981" text-anchor="middle">0.12s</text>
      <text x="45" y="95" font-family="sans-serif" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">Avg Latency</text>
    </g>

    <rect x="20" y="170" width="280" height="34" rx="8" fill="#F0FDF4" stroke="#BBF7D0" />
    <text x="160" y="191" font-family="sans-serif" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">Daily Automated Backups Configured</text>
  </g>

  <!-- Left: Wrench & Tools Card -->
  <g transform="translate(90, 140)" filter="url(#shadow)">
    <rect width="130" height="130" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
    <circle cx="65" cy="50" r="24" fill="#EFF4FF" />
    <!-- Gear icon -->
    <circle cx="65" cy="50" r="10" fill="none" stroke="#155EEF" stroke-width="4" />
    <text x="65" y="92" font-family="sans-serif" font-size="10" font-weight="800" fill="#1E293B" text-anchor="middle">Bug Fixes &amp;</text>
    <text x="65" y="106" font-family="sans-serif" font-size="10" font-weight="800" fill="#155EEF" text-anchor="middle">Patch Updates</text>
  </g>

  <!-- Right: Security & Monitoring -->
  <g transform="translate(580, 140)" filter="url(#shadow)">
    <rect width="130" height="130" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
    <circle cx="65" cy="50" r="24" fill="#FFF1F0" />
    <!-- Shield icon -->
    <path d="M 65 35 L 75 40 C 75 55 65 62 65 62 C 65 62 55 55 55 40 Z" fill="#E53935" />
    <text x="65" y="92" font-family="sans-serif" font-size="10" font-weight="800" fill="#1E293B" text-anchor="middle">Rapid Response</text>
    <text x="65" y="106" font-family="sans-serif" font-size="10" font-weight="800" fill="#E53935" text-anchor="middle">&lt; 2hr SLA</text>
  </g>
  `,
  '#10B981'
);

// Write Services SVGs
fs.writeFileSync(path.join(servicesDir, 'web-development.svg'), webDevSvg, 'utf8');
fs.writeFileSync(path.join(servicesDir, 'mobile-app-development.svg'), mobileAppSvg, 'utf8');
fs.writeFileSync(path.join(servicesDir, 'ai-automation.svg'), aiAutomationSvg, 'utf8');
fs.writeFileSync(path.join(servicesDir, 'custom-software.svg'), customSoftwareSvg, 'utf8');
fs.writeFileSync(path.join(servicesDir, 'cybersecurity.svg'), cybersecuritySvg, 'utf8');
fs.writeFileSync(path.join(servicesDir, 'cloud-devops.svg'), cloudDevOpsSvg, 'utf8');
fs.writeFileSync(path.join(servicesDir, 'saas-development.svg'), saasDevSvg, 'utf8');
fs.writeFileSync(path.join(servicesDir, 'it-maintenance.svg'), itMaintenanceSvg, 'utf8');

console.log("✓ Generated 8 distinct service SVG assets in public/assets/services/");

// ========================================================
// GENERATE 7 PROMOTIONAL OFFER BANNERS
// ========================================================

function makeOfferBanner(title, price, tag, subtitle, bgGradColor = '#155EEF') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="100%" height="100%">
  <defs>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F8FAFC" />
    </linearGradient>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${bgGradColor}" />
      <stop offset="100%" stop-color="#00D2FF" />
    </linearGradient>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0F172A" flood-opacity="0.08" />
    </filter>
  </defs>

  <rect width="600" height="340" fill="url(#cardBg)" rx="20" stroke="#E2E8F0" stroke-width="1.5" />

  <!-- Top Accent Bar -->
  <rect width="600" height="12" fill="url(#headerGrad)" rx="6" />

  <!-- Watermark Grid -->
  <g opacity="0.3">
    <circle cx="520" cy="100" r="120" fill="${bgGradColor}" opacity="0.06" />
    <circle cx="80" cy="280" r="80" fill="#E53935" opacity="0.04" />
  </g>

  <!-- Tag Pill -->
  <g transform="translate(40, 40)">
    <rect width="130" height="26" rx="8" fill="#EFF4FF" stroke="#BFDBFE" />
    <text x="65" y="17" font-family="sans-serif" font-size="10" font-weight="800" fill="#155EEF" text-anchor="middle">${tag}</text>
  </g>

  <!-- Offer Title -->
  <text x="40" y="105" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="24" font-weight="900" fill="#172033">${title}</text>
  <text x="40" y="130" font-family="sans-serif" font-size="12" font-weight="600" fill="#64748B">${subtitle}</text>

  <!-- Pricing Highlight Card -->
  <g transform="translate(40, 160)" filter="url(#cardShadow)">
    <rect width="520" height="110" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
    
    <text x="24" y="40" font-family="sans-serif" font-size="12" font-weight="700" fill="#64748B">Starting Package Rate</text>
    <text x="24" y="80" font-family="sans-serif" font-size="32" font-weight="900" fill="${bgGradColor}">₹${price}</text>
    
    <!-- CTA Visual Pill inside banner -->
    <g transform="translate(350, 36)">
      <rect width="145" height="42" rx="10" fill="${bgGradColor}" />
      <text x="72" y="26" font-family="sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">Explore Offer →</text>
    </g>
  </g>

  <!-- Verified Badge Footer -->
  <text x="40" y="305" font-family="sans-serif" font-size="10" font-weight="700" fill="#10B981">✓ Genuine Starting Rate • Transparent Scope Boundaries • Zero Hidden Charges</text>
</svg>`;
}

fs.writeFileSync(path.join(offersDir, 'website-launch-offer.svg'), makeOfferBanner('Website Launch Offer', '1,199', 'LIMITED LAUNCH', 'Professional responsive business website package', '#155EEF'), 'utf8');
fs.writeFileSync(path.join(offersDir, 'ai-automation-offer.svg'), makeOfferBanner('AI Automation Offer', '2,999', 'TRENDING TECH', 'Custom LLM assistant & smart workflow integration', '#155EEF'), 'utf8');
fs.writeFileSync(path.join(offersDir, 'cybersecurity-starter.svg'), makeOfferBanner('Cybersecurity Starter', '1,999', 'FOUNDER SPECIAL', 'Website vulnerability assessment & hardening roadmap', '#E53935'), 'utf8');
fs.writeFileSync(path.join(offersDir, 'cloud-deployment-offer.svg'), makeOfferBanner('Cloud Deployment Offer', '1,999', 'DEVOPS PRO', 'Docker setup & cloud deployment configuration', '#0284C7'), 'utf8');
fs.writeFileSync(path.join(offersDir, 'business-digitalisation.svg'), makeOfferBanner('Business Digitalisation', '2,999', 'PRODUCTIVITY', 'Digital dashboards, inventory & operational workflows', '#155EEF'), 'utf8');
fs.writeFileSync(path.join(offersDir, 'startup-saas-offer.svg'), makeOfferBanner('Startup SaaS Offer', '8,999', 'FOUNDER MVP', 'Subscription platform boilerplate with auth & database', '#155EEF'), 'utf8');
fs.writeFileSync(path.join(offersDir, 'maintenance-plan.svg'), makeOfferBanner('Maintenance Plan', '299/mo', 'PEACE OF MIND', 'Continuous backups, updates & priority bug fixes', '#10B981'), 'utf8');

console.log("✓ Generated 7 distinct promotional offer banner SVGs in public/assets/offers/");
