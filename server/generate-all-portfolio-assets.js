import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsDir = path.join(__dirname, '..', 'public', 'assets', 'products');
if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true });

function wrapUiSvg(title, badge, appContent, accentColor = '#155EEF', bgTheme = 'dark') {
  const isDark = bgTheme === 'dark';
  const bgGradStart = isDark ? '#0B132B' : '#F8FAFC';
  const bgGradEnd = isDark ? '#1C2541' : '#EDF2F7';
  const windowBg = isDark ? '#0F172A' : '#FFFFFF';
  const windowStroke = isDark ? '#334155' : '#E2E8F0';
  const titlebarBg = isDark ? '#1E293B' : '#F1F5F9';
  const titleColor = isDark ? '#E2E8F0' : '#1E293B';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bgG_${accentColor.replace('#', '')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradStart}" />
      <stop offset="100%" stop-color="${bgGradEnd}" />
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="${isDark ? '0.35' : '0.12'}" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="450" fill="url(#bgG_${accentColor.replace('#', '')})" />

  <!-- Ambient Grid -->
  <g opacity="${isDark ? '0.10' : '0.4'}">
    <pattern id="gridPattern" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="${isDark ? '#FFFFFF' : '#CBD5E1'}" stroke-width="0.75" />
    </pattern>
    <rect width="800" height="450" fill="url(#gridPattern)" />
  </g>

  <!-- Ambient Soft Glow -->
  <circle cx="680" cy="90" r="140" fill="${accentColor}" opacity="${isDark ? '0.18' : '0.08'}" />
  <circle cx="120" cy="360" r="120" fill="#00D2FF" opacity="${isDark ? '0.12' : '0.06'}" />

  <!-- Software Window Container (16:9 inner frame) -->
  <g transform="translate(40, 30)" filter="url(#cardShadow)">
    <!-- Window Outer Shell -->
    <rect width="720" height="390" rx="14" fill="${windowBg}" stroke="${windowStroke}" stroke-width="1.5" />

    <!-- Window Titlebar -->
    <rect width="720" height="42" rx="14" fill="${titlebarBg}" />
    <rect y="30" width="720" height="12" fill="${titlebarBg}" />
    <line x1="0" y1="42" x2="720" y2="42" stroke="${windowStroke}" stroke-width="1" />

    <!-- Traffic Lights -->
    <circle cx="24" cy="21" r="5" fill="#EF4444" />
    <circle cx="42" cy="21" r="5" fill="#F59E0B" />
    <circle cx="60" cy="21" r="5" fill="#10B981" />

    <!-- Window Title -->
    <text x="85" y="25" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="700" fill="${titleColor}">${title}</text>
    <rect x="560" y="11" width="144" height="22" rx="6" fill="${accentColor}" fill-opacity="${isDark ? '0.25' : '0.12'}" stroke="${accentColor}" stroke-width="1" />
    <text x="632" y="25" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="9.5" font-weight="800" fill="${isDark ? '#60A5FA' : accentColor}" text-anchor="middle">${badge}</text>

    <!-- App Body Content -->
    ${appContent}
  </g>
</svg>`;
}

// =========================================================================
// 1. TECHNICO LABORATORY PRODUCTS — Corporate Website & Scientific Catalog
// =========================================================================
const technicoSvg = wrapUiSvg(
  'Technico Laboratory Products Pvt. Ltd. • Corporate Digital Catalog & RFQ Portal',
  'CLIENT PRODUCTION',
  `
  <!-- Top Navigation Bar of the Technico Website -->
  <g transform="translate(20, 50)">
    <rect width="680" height="34" rx="6" fill="#1E293B" stroke="#334155" />
    <circle cx="20" cy="17" r="8" fill="#06B6D4" />
    <text x="36" y="21" font-family="sans-serif" font-size="11" font-weight="900" fill="#FFFFFF">TECHNICO</text>
    <text x="96" y="21" font-family="sans-serif" font-size="9" font-weight="500" fill="#94A3B8">| Laboratory Products Chennai</text>
    
    <text x="270" y="21" font-family="sans-serif" font-size="9.5" font-weight="600" fill="#F8FAFC">Glassware</text>
    <text x="340" y="21" font-family="sans-serif" font-size="9.5" font-weight="600" fill="#94A3B8">Instruments</text>
    <text x="420" y="21" font-family="sans-serif" font-size="9.5" font-weight="600" fill="#94A3B8">Cleanroom</text>
    <text x="495" y="21" font-family="sans-serif" font-size="9.5" font-weight="600" fill="#94A3B8">Certifications</text>

    <rect x="580" y="7" width="90" height="20" rx="4" fill="#06B6D4" />
    <text x="625" y="20" font-family="sans-serif" font-size="9" font-weight="800" fill="#0B132B" text-anchor="middle">REQUEST RFQ</text>
  </g>

  <!-- Left: Featured Scientific Laboratory Catalog Cards -->
  <g transform="translate(20, 94)">
    <!-- Product Card 1: Precision Borosilicate Glassware -->
    <rect width="330" height="126" rx="8" fill="#1E293B" stroke="#334155" />
    <!-- Flask silhouette -->
    <path d="M 38 30 L 48 30 L 48 55 L 62 85 L 24 85 L 38 55 Z" fill="#06B6D4" fill-opacity="0.3" stroke="#06B6D4" stroke-width="2" />
    <circle cx="43" cy="72" r="3" fill="#06B6D4" />
    <circle cx="50" cy="78" r="2" fill="#06B6D4" />
    <text x="80" y="38" font-family="sans-serif" font-size="11.5" font-weight="800" fill="#FFFFFF">Borosilicate 3.3 Glassware</text>
    <text x="80" y="54" font-family="sans-serif" font-size="9.5" fill="#06B6D4">Class A Volumetric &amp; Interchangeable</text>
    <text x="80" y="70" font-family="sans-serif" font-size="9" fill="#94A3B8">Thermal Shock Resistance: Up to 500°C</text>
    <text x="80" y="84" font-family="sans-serif" font-size="9" fill="#94A3B8">Compliance: DIN EN ISO 1042 / Class A</text>
    
    <rect x="80" y="94" width="86" height="20" rx="4" fill="#0F172A" stroke="#06B6D4" stroke-width="1" />
    <text x="123" y="107" font-family="sans-serif" font-size="8.5" font-weight="700" fill="#06B6D4" text-anchor="middle">View Specs</text>
    <rect x="174" y="94" width="94" height="20" rx="4" fill="#06B6D4" />
    <text x="221" y="107" font-family="sans-serif" font-size="8.5" font-weight="800" fill="#0B132B" text-anchor="middle">+ Add to RFQ</text>

    <!-- Product Card 2: Digital Micro-Centrifuge -->
    <g transform="translate(0, 134)">
      <rect width="330" height="126" rx="8" fill="#1E293B" stroke="#334155" />
      <!-- Centrifuge icon -->
      <rect x="24" y="32" width="42" height="50" rx="6" fill="#0F172A" stroke="#3B82F6" stroke-width="1.5" />
      <circle cx="45" cy="56" r="12" fill="none" stroke="#3B82F6" stroke-width="2" stroke-dasharray="4,2" />
      <circle cx="45" cy="56" r="4" fill="#3B82F6" />
      
      <text x="80" y="38" font-family="sans-serif" font-size="11.5" font-weight="800" fill="#FFFFFF">Digital Micro-Centrifuge</text>
      <text x="80" y="54" font-family="sans-serif" font-size="9.5" fill="#60A5FA">Brushless Induction • 15,000 RPM</text>
      <text x="80" y="70" font-family="sans-serif" font-size="9" fill="#94A3B8">RCF: 21,380 x g | 24 x 1.5/2.0 mL Rotor</text>
      <text x="80" y="84" font-family="sans-serif" font-size="9" fill="#94A3B8">Safety: Dual Lid Lock &amp; Imbalance Sensor</text>

      <rect x="80" y="94" width="86" height="20" rx="4" fill="#0F172A" stroke="#3B82F6" stroke-width="1" />
      <text x="123" y="107" font-family="sans-serif" font-size="8.5" font-weight="700" fill="#60A5FA" text-anchor="middle">Datasheet</text>
      <rect x="174" y="94" width="94" height="20" rx="4" fill="#2563EB" />
      <text x="221" y="107" font-family="sans-serif" font-size="8.5" font-weight="800" fill="#FFFFFF" text-anchor="middle">+ Add to RFQ</text>
    </g>
  </g>

  <!-- Right: Corporate Laboratory Showcase & Inquiries -->
  <g transform="translate(362, 94)">
    <rect width="338" height="260" rx="8" fill="#1E293B" stroke="#334155" />
    
    <!-- Header banner -->
    <rect x="14" y="14" width="310" height="58" rx="6" fill="#0F172A" stroke="#06B6D4" stroke-width="1" />
    <text x="24" y="34" font-family="sans-serif" font-size="10.5" font-weight="800" fill="#06B6D4">ESTABLISHED CHENNAI MANUFACTURER</text>
    <text x="24" y="50" font-family="sans-serif" font-size="9.5" fill="#E2E8F0">Supplying Research Labs, Pharma &amp; Biotech Across India</text>
    <text x="24" y="62" font-family="sans-serif" font-size="8.5" fill="#94A3B8">ISO 9001:2015 Certified Manufacturing Facility</text>

    <!-- RFQ Quick Summary Box -->
    <rect x="14" y="82" width="310" height="96" rx="6" fill="#0F172A" />
    <text x="24" y="102" font-family="sans-serif" font-size="10" font-weight="800" fill="#F8FAFC">ACTIVE QUOTATION INQUIRIES</text>
    
    <rect x="24" y="112" width="290" height="26" rx="4" fill="#1E293B" />
    <text x="32" y="128" font-family="sans-serif" font-size="9" font-weight="600" fill="#E2E8F0">Biotech Lab Chennai: 45 Volumetric Flasks</text>
    <text x="250" y="128" font-family="sans-serif" font-size="8.5" fill="#10B981">Dispatched</text>

    <rect x="24" y="144" width="290" height="26" rx="4" fill="#1E293B" />
    <text x="32" y="160" font-family="sans-serif" font-size="9" font-weight="600" fill="#E2E8F0">Clinical Diagnostics: 2 Centrifuges</text>
    <text x="250" y="160" font-family="sans-serif" font-size="8.5" fill="#60A5FA">Processing</text>

    <!-- Industrial Stats -->
    <g transform="translate(14, 190)">
      <rect width="98" height="56" rx="6" fill="#0F172A" />
      <text x="49" y="212" font-family="sans-serif" font-size="16" font-weight="900" fill="#06B6D4" text-anchor="middle">500+</text>
      <text x="49" y="228" font-family="sans-serif" font-size="8" fill="#94A3B8" text-anchor="middle">Labs Supplied</text>

      <rect x="106" width="98" height="56" rx="6" fill="#0F172A" />
      <text x="155" y="212" font-family="sans-serif" font-size="16" font-weight="900" fill="#3B82F6" text-anchor="middle">100%</text>
      <text x="155" y="228" font-family="sans-serif" font-size="8" fill="#94A3B8" text-anchor="middle">ISO Certified</text>

      <rect x="212" width="98" height="56" rx="6" fill="#0F172A" />
      <text x="261" y="212" font-family="sans-serif" font-size="16" font-weight="900" fill="#10B981" text-anchor="middle">48h</text>
      <text x="261" y="228" font-family="sans-serif" font-size="8" fill="#94A3B8" text-anchor="middle">Fast Dispatch</text>
    </g>
  </g>
  `,
  '#06B6D4'
);

// =========================================================================
// 2. SIZORA — Fashion E-Commerce AI Size Recommendation Platform
// =========================================================================
const sizoraSvg = wrapUiSvg(
  'Sizora • Fashion E-Commerce AI Size Recommendation & Measurement Engine',
  'AI E-COMMERCE',
  `
  <!-- Left Side: Apparel E-Commerce Product Card Simulation -->
  <g transform="translate(24, 55)">
    <rect width="330" height="295" rx="10" fill="#1E293B" stroke="#334155" />
    
    <!-- Garment Visual Box -->
    <rect x="14" y="14" width="302" height="135" rx="8" fill="#0F172A" stroke="#334155" />
    
    <!-- Shirt Outline Vector Graphic -->
    <path d="M 130 35 L 145 48 L 165 48 L 180 35 L 215 50 L 195 85 L 180 75 L 180 135 L 130 135 L 130 75 L 115 85 L 95 50 Z" 
          fill="#EC4899" fill-opacity="0.2" stroke="#EC4899" stroke-width="1.8" />
    <path d="M 155 48 L 155 135" stroke="#EC4899" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" />
    
    <!-- Garment Details -->
    <text x="24" y="166" font-family="sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">Tailored Oxford Cotton Shirt</text>
    <text x="24" y="182" font-family="sans-serif" font-size="10" font-weight="600" fill="#EC4899">₹1,899 • Regular / Slim Fit</text>

    <!-- SIZORA EMBEDDED RECOMMENDER BADGE -->
    <rect x="14" y="194" width="302" height="85" rx="8" fill="#0F172A" stroke="#10B981" stroke-width="1.2" />
    <circle cx="28" cy="214" r="6" fill="#10B981" />
    <text x="40" y="218" font-family="sans-serif" font-size="10" font-weight="800" fill="#10B981">SIZORA AI RECOMMENDED FIT: SIZE M</text>
    <text x="24" y="238" font-family="sans-serif" font-size="9" fill="#E2E8F0">Confidence Score: 98.2% (Chest: 39.5in, Shoulder: 17.5in)</text>
    <text x="24" y="254" font-family="sans-serif" font-size="8.5" fill="#94A3B8">Cross-Brand Delta: Fits like H&amp;M (M) and Zara (L)</text>
    <text x="24" y="268" font-family="sans-serif" font-size="8.5" font-weight="700" fill="#60A5FA">Estimated Return Risk: Very Low (&lt;2%)</text>
  </g>

  <!-- Right Side: Body Measurement Intelligence & Cross-Brand Fit Analytics -->
  <g transform="translate(370, 55)">
    <rect width="326" height="295" rx="10" fill="#1E293B" stroke="#334155" />
    <text x="16" y="26" font-family="sans-serif" font-size="11" font-weight="800" fill="#F8FAFC">BODY DIMENSION &amp; BRAND COMPARISON</text>
    
    <!-- User Measurement Inputs -->
    <rect x="14" y="38" width="298" height="66" rx="8" fill="#0F172A" />
    <text x="24" y="58" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#94A3B8">ACTIVE MEASUREMENT PROFILE</text>
    <text x="24" y="78" font-family="sans-serif" font-size="10" font-weight="700" fill="#E2E8F0">Chest: 39.5" | Waist: 32" | Shoulders: 17.5"</text>
    <text x="24" y="92" font-family="sans-serif" font-size="8.5" fill="#10B981">Unit System: Inches (Imperial) ✓ Verified</text>

    <!-- Cross-Brand Size Chart Matrix -->
    <rect x="14" y="114" width="298" height="98" rx="8" fill="#0F172A" />
    <text x="24" y="132" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#94A3B8">CROSS-BRAND PREDICTED SIZES</text>
    
    <g transform="translate(24, 142)">
      <rect width="84" height="26" rx="4" fill="#1E293B" stroke="#334155" />
      <text x="42" y="152" font-family="sans-serif" font-size="8" fill="#94A3B8" text-anchor="middle">ZARA</text>
      <text x="42" y="164" font-family="sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" text-anchor="middle">Size L</text>

      <rect x="94" width="84" height="26" rx="4" fill="#1E293B" stroke="#10B981" />
      <text x="136" y="152" font-family="sans-serif" font-size="8" fill="#10B981" text-anchor="middle">H&amp;M</text>
      <text x="136" y="164" font-family="sans-serif" font-size="9" font-weight="800" fill="#10B981" text-anchor="middle">Size M (Best)</text>

      <rect x="188" width="84" height="26" rx="4" fill="#1E293B" stroke="#334155" />
      <text x="230" y="152" font-family="sans-serif" font-size="8" fill="#94A3B8" text-anchor="middle">UNIQLO</text>
      <text x="230" y="164" font-family="sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" text-anchor="middle">Size M</text>
    </g>
    <text x="24" y="196" font-family="sans-serif" font-size="8.5" fill="#60A5FA">Garment Ease Formula: +1.5" chest breathing room</text>

    <!-- Merchant Benefits -->
    <rect x="14" y="222" width="298" height="60" rx="8" fill="#0F172A" stroke="#334155" />
    <text x="24" y="242" font-family="sans-serif" font-size="10" font-weight="800" fill="#EC4899">ECOMMERCE CONVERSION METRICS</text>
    <text x="24" y="258" font-family="sans-serif" font-size="9" fill="#10B981">↓ 35% Courier Returns Saved</text>
    <text x="160" y="258" font-family="sans-serif" font-size="9" fill="#60A5FA">↑ 18.2% Cart Checkout Lift</text>
    <text x="24" y="272" font-family="sans-serif" font-size="8" fill="#94A3B8">Supports Shopify, WooCommerce &amp; Custom React D2C</text>
  </g>
  `,
  '#EC4899'
);

// =========================================================================
// 3. HACKADEMIA — AI Online Exam Invigilation & Proctoring Engine
// =========================================================================
const hackademiaSvg = wrapUiSvg(
  'Hackademia • AI Real-Time Exam Invigilation & Proctoring Engine',
  'TOP 50 FINALIST',
  `
  <!-- Left Side: Live Examination Session Viewport (No personal candidate PII) -->
  <g transform="translate(24, 55)">
    <rect width="390" height="295" rx="10" fill="#090E17" stroke="#1E293B" />
    
    <!-- Viewport Header -->
    <rect width="390" height="32" rx="10" fill="#1E293B" />
    <rect y="22" width="390" height="10" fill="#1E293B" />
    <circle cx="18" cy="16" r="4" fill="#10B981" />
    <text x="30" y="20" font-family="monospace" font-size="9.5" font-weight="700" fill="#10B981">EXAM-2026-AI • PROCTORING ACTIVE</text>
    <text x="290" y="20" font-family="monospace" font-size="9" fill="#94A3B8">LATENCY: 48ms</text>

    <!-- Synthetic Head Silhouette & Landmark Points (Zero PII) -->
    <g transform="translate(195, 140)">
      <!-- Oval Head Guide -->
      <ellipse cx="0" cy="0" rx="55" ry="70" fill="none" stroke="#60A5FA" stroke-width="1.5" stroke-dasharray="4,4" />
      <!-- Eyes points -->
      <circle cx="-20" cy="-12" r="3.5" fill="#60A5FA" />
      <circle cx="20" cy="-12" r="3.5" fill="#60A5FA" />
      <!-- Gaze vector (Center alignment) -->
      <line x1="-20" y1="-12" x2="-20" y2="-4" stroke="#10B981" stroke-width="2" />
      <line x1="20" y1="-12" x2="20" y2="-4" stroke="#10B981" stroke-width="2" />
      <!-- Nose and Mouth mesh guides -->
      <path d="M 0 -4 L -5 12 L 5 12 Z" fill="none" stroke="#60A5FA" stroke-width="1" opacity="0.6" />
      <path d="M -16 28 Q 0 34 16 28" fill="none" stroke="#60A5FA" stroke-width="1.5" opacity="0.6" />
      
      <!-- Bounding Box -->
      <rect x="-65" y="-85" width="130" height="165" rx="6" fill="none" stroke="#10B981" stroke-width="1.5" />
      <rect x="-65" y="-102" width="98" height="16" rx="3" fill="#10B981" />
      <text x="-16" y="-90" font-family="monospace" font-size="8.5" font-weight="800" fill="#090E17" text-anchor="middle">FACE OK (99.4%)</text>
    </g>

    <!-- Live Telemetry Status Bar -->
    <rect x="14" y="254" width="362" height="28" rx="6" fill="#1E293B" />
    <text x="24" y="272" font-family="monospace" font-size="9" fill="#94A3B8">GAZE: 0° CENTERED | AUDIO: 0dB NORMAL | DEVICES: 0 FOUND</text>
  </g>

  <!-- Right Side: Security Analytics & Compliance Dashboard -->
  <g transform="translate(430, 55)">
    <rect width="266" height="295" rx="10" fill="#1E293B" stroke="#334155" />
    <text x="16" y="24" font-family="sans-serif" font-size="11" font-weight="800" fill="#F8FAFC">AI INTEGRITY METRICS</text>

    <!-- Overall Session Score Card -->
    <rect x="14" y="36" width="238" height="70" rx="8" fill="#0F172A" stroke="#10B981" stroke-width="1" />
    <text x="24" y="56" font-family="sans-serif" font-size="9.5" fill="#94A3B8">CANDIDATE INTEGRITY SCORE</text>
    <text x="24" y="84" font-family="sans-serif" font-size="22" font-weight="900" fill="#10B981">98.4 <tspan font-size="11" fill="#94A3B8" font-weight="600">/ 100</tspan></text>
    <text x="140" y="80" font-family="sans-serif" font-size="8.5" font-weight="700" fill="#10B981">VERIFIED SESSION</text>

    <!-- Real-Time Monitoring Indicators -->
    <rect x="14" y="116" width="238" height="100" rx="8" fill="#0F172A" />
    <text x="24" y="134" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#F8FAFC">ACTIVE COMPUTER VISION CHECKS</text>
    
    <text x="24" y="152" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• Gaze Tracking: 98% On-Screen</text>
    <text x="24" y="168" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• Multiple Persons: None Detected (0)</text>
    <text x="24" y="184" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• Mobile Phone / Device: 0 Detected</text>
    <text x="24" y="200" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• Background Tab Switches: 0 Times</text>

    <!-- Hackathon Recognition -->
    <rect x="14" y="226" width="238" height="56" rx="8" fill="#0F172A" stroke="#334155" />
    <text x="24" y="246" font-family="sans-serif" font-size="9.5" font-weight="800" fill="#EF4444">NATIONAL AI HACKATHON</text>
    <text x="24" y="260" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">Top 50 National Finalist across 500+ Teams</text>
    <text x="24" y="272" font-family="sans-serif" font-size="8" fill="#60A5FA">Low-bandwidth OpenCV + MediaPipe Engine</text>
  </g>
  `,
  '#EF4444'
);

// =========================================================================
// 4. SUDHARSHAN_TECH DIGITAL SHOWCASE — Official Company Portal
// =========================================================================
const portalSvg = wrapUiSvg(
  'SUDHARSHAN_TECH • Code. Create. Elevate. • Digital Solutions Platform',
  'OFFICIAL PORTAL',
  `
  <!-- Main Platform Hero Header -->
  <g transform="translate(24, 55)">
    <rect width="672" height="74" rx="10" fill="#1E293B" stroke="#155EEF" stroke-width="1.5" />
    
    <!-- Stylized ST Logo Icon -->
    <rect x="18" y="16" width="42" height="42" rx="8" fill="#0B1736" stroke="#155EEF" />
    <text x="39" y="44" font-family="sans-serif" font-size="18" font-weight="900" fill="#00D2FF" text-anchor="middle">ST</text>
    
    <text x="72" y="36" font-family="sans-serif" font-size="13" font-weight="900" fill="#FFFFFF">SUDHARSHAN<tspan fill="#155EEF">_TECH</tspan></text>
    <text x="72" y="52" font-family="sans-serif" font-size="9.5" font-weight="600" fill="#94A3B8">Code. Create. Elevate. • Premium Digital Services Marketplace</text>
    
    <rect x="520" y="22" width="134" height="28" rx="6" fill="#155EEF" />
    <text x="587" y="40" font-family="sans-serif" font-size="9.5" font-weight="800" fill="#FFFFFF" text-anchor="middle">Explore Solutions →</text>
  </g>

  <!-- 3 Service Columns in Portal Interface -->
  <g transform="translate(24, 140)">
    <!-- Column 1: Custom Web & Mobile Apps -->
    <rect width="214" height="210" rx="8" fill="#1E293B" stroke="#334155" />
    <rect x="12" y="12" width="32" height="32" rx="6" fill="#0F172A" stroke="#155EEF" />
    <text x="28" y="32" font-family="sans-serif" font-size="14" fill="#60A5FA" text-anchor="middle">💻</text>
    <text x="52" y="26" font-family="sans-serif" font-size="10.5" font-weight="800" fill="#FFFFFF">Full-Stack Web</text>
    <text x="52" y="38" font-family="sans-serif" font-size="8.5" fill="#94A3B8">&amp; Mobile Engineering</text>
    
    <text x="14" y="66" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• React, TypeScript &amp; Next.js</text>
    <text x="14" y="82" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• REST &amp; GraphQL Architectures</text>
    <text x="14" y="98" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• High-Performance UI/UX</text>
    <text x="14" y="114" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• Cross-Platform React Native</text>

    <rect x="12" y="170" width="190" height="26" rx="6" fill="#0F172A" stroke="#334155" />
    <text x="107" y="186" font-family="sans-serif" font-size="8.5" font-weight="700" fill="#60A5FA" text-anchor="middle">Starting ₹12,999</text>

    <!-- Column 2: AI & Computer Vision -->
    <g transform="translate(229, 0)">
      <rect width="214" height="210" rx="8" fill="#1E293B" stroke="#00D2FF" stroke-width="1.2" />
      <rect x="12" y="12" width="32" height="32" rx="6" fill="#0F172A" stroke="#00D2FF" />
      <text x="28" y="32" font-family="sans-serif" font-size="14" fill="#00D2FF" text-anchor="middle">🧠</text>
      <text x="52" y="26" font-family="sans-serif" font-size="10.5" font-weight="800" fill="#FFFFFF">AI &amp; Automation</text>
      <text x="52" y="38" font-family="sans-serif" font-size="8.5" fill="#00D2FF">Edge Vision &amp; LLMs</text>

      <text x="14" y="66" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• Computer Vision (OpenCV)</text>
      <text x="14" y="82" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• Gemini API Contextual RAG</text>
      <text x="14" y="98" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• Automated AI Ingestion</text>
      <text x="14" y="114" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• Custom PyTorch / ML Models</text>

      <rect x="12" y="170" width="190" height="26" rx="6" fill="#0F172A" stroke="#00D2FF" stroke-width="1" />
      <text x="107" y="186" font-family="sans-serif" font-size="8.5" font-weight="800" fill="#00D2FF" text-anchor="middle">Custom Engineering</text>
    </g>

    <!-- Column 3: Cybersecurity & Cloud -->
    <g transform="translate(458, 0)">
      <rect width="214" height="210" rx="8" fill="#1E293B" stroke="#334155" />
      <rect x="12" y="12" width="32" height="32" rx="6" fill="#0F172A" stroke="#EF4444" />
      <text x="28" y="32" font-family="sans-serif" font-size="14" fill="#EF4444" text-anchor="middle">🛡️</text>
      <text x="52" y="26" font-family="sans-serif" font-size="10.5" font-weight="800" fill="#FFFFFF">Cybersecurity</text>
      <text x="52" y="38" font-family="sans-serif" font-size="8.5" fill="#94A3B8">&amp; Cloud DevOps</text>

      <text x="14" y="66" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• VAPT &amp; Web Penetration Testing</text>
      <text x="14" y="82" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• Phishing Threat Intelligence</text>
      <text x="14" y="98" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• Docker &amp; CI/CD Pipelines</text>
      <text x="14" y="114" font-family="sans-serif" font-size="8.5" fill="#E2E8F0">• AWS / GCP Cloud Hardening</text>

      <rect x="12" y="170" width="190" height="26" rx="6" fill="#0F172A" stroke="#334155" />
      <text x="107" y="186" font-family="sans-serif" font-size="8.5" font-weight="700" fill="#60A5FA" text-anchor="middle">Enterprise Ready</text>
    </g>
  </g>
  `,
  '#155EEF'
);

// Save generated vector assets
fs.writeFileSync(path.join(productsDir, 'technico-laboratory.svg'), technicoSvg);
fs.writeFileSync(path.join(productsDir, 'sizora.svg'), sizoraSvg);
fs.writeFileSync(path.join(productsDir, 'hackademia.svg'), hackademiaSvg);
fs.writeFileSync(path.join(productsDir, 'sudharshan-tech-portal.svg'), portalSvg);

console.log('✅ Successfully generated and updated portfolio assets:');
console.log(' - technico-laboratory.svg');
console.log(' - sizora.svg');
console.log(' - hackademia.svg');
console.log(' - sudharshan-tech-portal.svg');
