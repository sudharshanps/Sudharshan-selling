import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsDir = path.join(__dirname, '..', 'public', 'assets', 'products');
const creativesDir = path.join(__dirname, '..', 'public', 'assets', 'creatives');

if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true });
if (!fs.existsSync(creativesDir)) fs.mkdirSync(creativesDir, { recursive: true });

function wrapUiSvg(title, badge, appContent, accentColor = '#155EEF') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B132B" />
      <stop offset="100%" stop-color="#1C2541" />
    </linearGradient>
    <linearGradient id="panelG" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.03" />
    </linearGradient>
    <linearGradient id="accentG" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accentColor}" />
      <stop offset="100%" stop-color="#00D2FF" />
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Dark Tech Canvas -->
  <rect width="800" height="450" fill="url(#bgG)" />

  <!-- Ambient Grid -->
  <g opacity="0.12">
    <pattern id="gridPattern" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#FFFFFF" stroke-width="0.75" />
    </pattern>
    <rect width="800" height="450" fill="url(#gridPattern)" />
  </g>

  <!-- Ambient Soft Glow -->
  <circle cx="680" cy="90" r="140" fill="${accentColor}" opacity="0.18" />
  <circle cx="120" cy="360" r="120" fill="#00D2FF" opacity="0.12" />

  <!-- Software Window Container -->
  <g transform="translate(40, 30)" filter="url(#cardShadow)">
    <!-- Window Outer Shell -->
    <rect width="720" height="390" rx="14" fill="#0F172A" stroke="#334155" stroke-width="1.5" />

    <!-- Window Titlebar -->
    <rect width="720" height="42" rx="14" fill="#1E293B" />
    <rect y="30" width="720" height="12" fill="#1E293B" />
    <line x1="0" y1="42" x2="720" y2="42" stroke="#334155" stroke-width="1" />

    <!-- Traffic Lights -->
    <circle cx="24" cy="21" r="5" fill="#EF4444" />
    <circle cx="42" cy="21" r="5" fill="#F59E0B" />
    <circle cx="60" cy="21" r="5" fill="#10B981" />

    <!-- Window Title -->
    <text x="85" y="25" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="700" fill="#E2E8F0">${title}</text>
    <rect x="580" y="12" width="124" height="20" rx="6" fill="#155EEF" fill-opacity="0.25" stroke="#155EEF" stroke-width="1" />
    <text x="642" y="25" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="9.5" font-weight="800" fill="#60A5FA" text-anchor="middle">${badge}</text>

    <!-- App Body Content -->
    ${appContent}
  </g>
</svg>`;
}

// 1. Drishti 360 - AI Visual Crop & Farm Quality Intelligence
const drishtiSvg = wrapUiSvg(
  'Drishti 360 • AI Visual Inspection & Grading Engine',
  'LIVE PROTOTYPE',
  `
  <!-- Left Side: Computer Vision Viewfinder -->
  <g transform="translate(24, 60)">
    <rect width="360" height="295" rx="10" fill="#090E17" stroke="#1E293B" />
    <!-- Viewfinder Grid & Target Reticle -->
    <circle cx="180" cy="140" r="85" fill="none" stroke="#10B981" stroke-dasharray="6,4" stroke-width="1.5" />
    <circle cx="180" cy="140" r="45" fill="none" stroke="#10B981" stroke-width="1" opacity="0.7" />
    <line x1="80" y1="140" x2="280" y2="140" stroke="#10B981" stroke-width="1" opacity="0.3" />
    <line x1="180" y1="40" x2="180" y2="240" stroke="#10B981" stroke-width="1" opacity="0.3" />

    <!-- Bounding Box Annotation 1 -->
    <rect x="110" y="75" width="140" height="125" rx="6" fill="none" stroke="#10B981" stroke-width="2" />
    <rect x="110" y="55" width="115" height="18" rx="4" fill="#10B981" />
    <text x="116" y="68" font-family="monospace" font-size="10" font-weight="700" fill="#090E17">GRADE A+ (98.4%)</text>

    <!-- Viewfinder Telemetry -->
    <rect x="12" y="255" width="336" height="28" rx="6" fill="#1E293B" />
    <text x="24" y="273" font-family="monospace" font-size="10" fill="#94A3B8">FPS: 42.6 | SENSOR: 4K OPTICAL | DEFECT: 0.02%</text>
  </g>

  <!-- Right Side: Intelligence & Passport Metrics -->
  <g transform="translate(404, 60)">
    <!-- Metric 1: Quality Grade -->
    <rect width="292" height="70" rx="10" fill="#1E293B" stroke="#334155" />
    <text x="18" y="28" font-family="sans-serif" font-size="10.5" font-weight="700" fill="#94A3B8">AI HARVEST MATURITY INDEX</text>
    <text x="18" y="54" font-family="sans-serif" font-size="20" font-weight="900" fill="#10B981">98.4% PREMIUM</text>
    <rect x="200" y="22" width="76" height="26" rx="6" fill="#10B981" fill-opacity="0.15" stroke="#10B981" />
    <text x="238" y="38" font-family="sans-serif" font-size="10" font-weight="800" fill="#10B981" text-anchor="middle">PASSED ✓</text>

    <!-- Metric 2: Export Compliance -->
    <rect y="84" width="292" height="70" rx="10" fill="#1E293B" stroke="#334155" />
    <text x="18" y="112" font-family="sans-serif" font-size="10.5" font-weight="700" fill="#94A3B8">EXPORT LABELLING COMPLIANCE</text>
    <text x="18" y="138" font-family="sans-serif" font-size="17" font-weight="900" fill="#60A5FA">ISO 22000 / APEDA</text>
    <text x="225" y="138" font-family="sans-serif" font-size="11" font-weight="700" fill="#10B981">100% MATCH</text>

    <!-- Metric 3: Digital Quality Passport -->
    <rect y="168" width="292" height="127" rx="10" fill="#0B1329" stroke="#155EEF" stroke-width="1.5" />
    <text x="18" y="196" font-family="sans-serif" font-size="12" font-weight="800" fill="#FFFFFF">Digital Quality Passport</text>
    <text x="18" y="214" font-family="monospace" font-size="10" fill="#60A5FA">ID: DQP-2026-ST-88942-IN</text>
    
    <!-- Mini QR Representation -->
    <rect x="18" y="225" width="55" height="55" rx="6" fill="#FFFFFF" />
    <rect x="26" y="233" width="16" height="16" fill="#000000" />
    <rect x="49" y="233" width="16" height="16" fill="#000000" />
    <rect x="26" y="256" width="16" height="16" fill="#000000" />
    <rect x="49" y="256" width="6" height="6" fill="#155EEF" />

    <text x="86" y="246" font-family="sans-serif" font-size="11" font-weight="700" fill="#E2E8F0">Cryptographically Signed</text>
    <text x="86" y="264" font-family="sans-serif" font-size="9.5" fill="#94A3B8">Tamper-Evident Mandi &amp; Customs Record</text>
  </g>
  `,
  '#10B981'
);

// 2. TaskGuard - Enterprise Agile Sprint SaaS
const taskguardSvg = wrapUiSvg(
  'TaskGuard • Agile Sprint Execution & Engineering Velocity Platform',
  'ENTERPRISE READY',
  `
  <!-- Top Sprint Bar -->
  <g transform="translate(24, 55)">
    <rect width="672" height="42" rx="8" fill="#1E293B" stroke="#334155" />
    <text x="16" y="25" font-family="sans-serif" font-size="11.5" font-weight="800" fill="#F8FAFC">Sprint 24: Core Architecture (Days 8/14)</text>
    <rect x="360" y="13" width="160" height="16" rx="8" fill="#0F172A" />
    <rect x="360" y="13" width="115" height="16" rx="8" fill="#155EEF" />
    <text x="530" y="25" font-family="sans-serif" font-size="10" font-weight="700" fill="#60A5FA">72% Completed</text>
    <text x="615" y="25" font-family="sans-serif" font-size="10.5" font-weight="800" fill="#10B981">On Track ✓</text>
  </g>

  <!-- Kanban 3 Columns -->
  <!-- Column 1: Backlog -->
  <g transform="translate(24, 110)">
    <rect width="214" height="250" rx="10" fill="#1E293B" stroke="#334155" />
    <rect x="14" y="14" width="8" height="8" rx="2" fill="#94A3B8" />
    <text x="30" y="22" font-family="sans-serif" font-size="11" font-weight="800" fill="#E2E8F0">TO DO (4)</text>

    <!-- Card 1 -->
    <rect x="12" y="38" width="190" height="62" rx="8" fill="#0F172A" stroke="#334155" />
    <text x="22" y="58" font-family="sans-serif" font-size="10.5" font-weight="700" fill="#F8FAFC">FastAPI OAuth2 Proxy</text>
    <rect x="22" y="70" width="45" height="16" rx="4" fill="#3B82F6" fill-opacity="0.2" />
    <text x="44" y="82" font-family="sans-serif" font-size="9" font-weight="700" fill="#60A5FA" text-anchor="middle">API</text>
    <text x="180" y="83" font-family="sans-serif" font-size="10" font-weight="800" fill="#EF4444">P1</text>

    <!-- Card 2 -->
    <rect x="12" y="110" width="190" height="62" rx="8" fill="#0F172A" stroke="#334155" />
    <text x="22" y="130" font-family="sans-serif" font-size="10.5" font-weight="700" fill="#F8FAFC">Docker Compose Staging</text>
    <rect x="22" y="142" width="58" height="16" rx="4" fill="#10B981" fill-opacity="0.2" />
    <text x="51" y="154" font-family="sans-serif" font-size="9" font-weight="700" fill="#34D399" text-anchor="middle">DevOps</text>
  </g>

  <!-- Column 2: In Progress -->
  <g transform="translate(253, 110)">
    <rect width="214" height="250" rx="10" fill="#1E293B" stroke="#155EEF" />
    <rect x="14" y="14" width="8" height="8" rx="2" fill="#3B82F6" />
    <text x="30" y="22" font-family="sans-serif" font-size="11" font-weight="800" fill="#60A5FA">IN PROGRESS (3)</text>

    <!-- Active Card -->
    <rect x="12" y="38" width="190" height="80" rx="8" fill="#0F172A" stroke="#155EEF" stroke-width="1.5" />
    <text x="22" y="58" font-family="sans-serif" font-size="10.5" font-weight="700" fill="#FFFFFF">Real-Time Burndown Velocity</text>
    <text x="22" y="73" font-family="sans-serif" font-size="9.5" fill="#94A3B8">Auto-calculate sprint scope</text>
    <rect x="22" y="86" width="60" height="16" rx="4" fill="#6366F1" fill-opacity="0.25" />
    <text x="52" y="98" font-family="sans-serif" font-size="9" font-weight="700" fill="#818CF8" text-anchor="middle">Analytics</text>
    <circle cx="180" cy="94" r="9" fill="#155EEF" />
    <text x="180" y="97" font-family="sans-serif" font-size="8" font-weight="900" fill="#FFFFFF" text-anchor="middle">ST</text>
  </g>

  <!-- Column 3: Completed / Done -->
  <g transform="translate(482, 110)">
    <rect width="214" height="250" rx="10" fill="#1E293B" stroke="#334155" />
    <rect x="14" y="14" width="8" height="8" rx="2" fill="#10B981" />
    <text x="30" y="22" font-family="sans-serif" font-size="11" font-weight="800" fill="#34D399">RESOLVED (18)</text>

    <!-- Card 1 -->
    <rect x="12" y="38" width="190" height="62" rx="8" fill="#0F172A" stroke="#10B981" stroke-opacity="0.4" />
    <text x="22" y="58" font-family="sans-serif" font-size="10.5" font-weight="700" fill="#94A3B8" text-decoration="line-through">RBAC Permission Matrix</text>
    <text x="175" y="82" font-family="sans-serif" font-size="11" fill="#10B981">✓</text>
  </g>
  `,
  '#155EEF'
);

// 3. AICTE Grievance Dashboard - GovTech Grievance Tracking
const aicteSvg = wrapUiSvg(
  'AICTE Grievance 360 • Institutional Dispute Redressal Portal',
  'GOVTECH MVP',
  `
  <g transform="translate(24, 55)">
    <!-- Metrics Row -->
    <rect width="156" height="64" rx="8" fill="#1E293B" stroke="#334155" />
    <text x="14" y="22" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#94A3B8">ACTIVE CASES</text>
    <text x="14" y="48" font-family="sans-serif" font-size="20" font-weight="900" fill="#F8FAFC">1,428</text>

    <rect x="172" width="156" height="64" rx="8" fill="#1E293B" stroke="#334155" />
    <text x="186" y="22" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#94A3B8">RB-PGRC OVERLAP</text>
    <text x="186" y="48" font-family="sans-serif" font-size="20" font-weight="900" fill="#F59E0B">0 DUAL</text>

    <rect x="344" width="156" height="64" rx="8" fill="#1E293B" stroke="#334155" />
    <text x="358" y="22" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#94A3B8">RESOLVED RATE</text>
    <text x="358" y="48" font-family="sans-serif" font-size="20" font-weight="900" fill="#10B981">94.2%</text>

    <rect x="516" width="156" height="64" rx="8" fill="#1E293B" stroke="#334155" />
    <text x="530" y="22" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#94A3B8">AVG SLA DAYS</text>
    <text x="530" y="48" font-family="sans-serif" font-size="20" font-weight="900" fill="#60A5FA">4.2 DAYS</text>
  </g>

  <!-- Case Table -->
  <g transform="translate(24, 132)">
    <rect width="672" height="225" rx="10" fill="#1E293B" stroke="#334155" />
    
    <!-- Table Header -->
    <rect width="672" height="34" rx="10" fill="#0F172A" />
    <text x="18" y="22" font-family="sans-serif" font-size="10" font-weight="800" fill="#94A3B8">GRIEVANCE ID</text>
    <text x="140" y="22" font-family="sans-serif" font-size="10" font-weight="800" fill="#94A3B8">INSTITUTION</text>
    <text x="320" y="22" font-family="sans-serif" font-size="10" font-weight="800" fill="#94A3B8">CATEGORY</text>
    <text x="460" y="22" font-family="sans-serif" font-size="10" font-weight="800" fill="#94A3B8">STATUS</text>
    <text x="580" y="22" font-family="sans-serif" font-size="10" font-weight="800" fill="#94A3B8">AUDIT SLA</text>

    <!-- Row 1 -->
    <line x1="0" y1="34" x2="672" y2="34" stroke="#334155" />
    <text x="18" y="60" font-family="monospace" font-size="10.5" font-weight="700" fill="#60A5FA">GRV-2026-881</text>
    <text x="140" y="60" font-family="sans-serif" font-size="10.5" fill="#E2E8F0">PSG Tech Coimbatore</text>
    <text x="320" y="60" font-family="sans-serif" font-size="10.5" fill="#94A3B8">Faculty Allocation</text>
    <rect x="460" y="46" width="70" height="20" rx="4" fill="#10B981" fill-opacity="0.2" />
    <text x="495" y="60" font-family="sans-serif" font-size="9.5" font-weight="800" fill="#34D399" text-anchor="middle">VERIFIED</text>
    <text x="580" y="60" font-family="sans-serif" font-size="10" fill="#10B981">Within SLA ✓</text>

    <!-- Row 2 -->
    <line x1="0" y1="80" x2="672" y2="80" stroke="#334155" />
    <text x="18" y="106" font-family="monospace" font-size="10.5" font-weight="700" fill="#60A5FA">GRV-2026-904</text>
    <text x="140" y="106" font-family="sans-serif" font-size="10.5" fill="#E2E8F0">CIT Coimbatore</text>
    <text x="320" y="106" font-family="sans-serif" font-size="10.5" fill="#94A3B8">Syllabus Compliance</text>
    <rect x="460" y="92" width="80" height="20" rx="4" fill="#3B82F6" fill-opacity="0.2" />
    <text x="500" y="106" font-family="sans-serif" font-size="9.5" font-weight="800" fill="#60A5FA" text-anchor="middle">IN REVIEW</text>
    <text x="580" y="106" font-family="sans-serif" font-size="10" fill="#F59E0B">2 Days Rem.</text>

    <!-- Row 3 -->
    <line x1="0" y1="126" x2="672" y2="126" stroke="#334155" />
    <text x="18" y="152" font-family="monospace" font-size="10.5" font-weight="700" fill="#60A5FA">GRV-2026-921</text>
    <text x="140" y="152" font-family="sans-serif" font-size="10.5" fill="#E2E8F0">SKCET Autonomous</text>
    <text x="320" y="152" font-family="sans-serif" font-size="10.5" fill="#94A3B8">Curriculum Update</text>
    <rect x="460" y="138" width="70" height="20" rx="4" fill="#10B981" fill-opacity="0.2" />
    <text x="495" y="152" font-family="sans-serif" font-size="9.5" font-weight="800" fill="#34D399" text-anchor="middle">RESOLVED</text>
    <text x="580" y="152" font-family="sans-serif" font-size="10" fill="#10B981">Within SLA ✓</text>
  </g>
  `,
  '#3B82F6'
);

// 4. Hackademia - AI Proctoring & Examination Invigilator
const hackademiaSvg = wrapUiSvg(
  'Hackademia • AI Real-Time Exam Invigilation & Proctoring Engine',
  'TOP 50 FINALIST',
  `
  <!-- Viewport Grid -->
  <g transform="translate(24, 55)">
    <!-- Webcam Feed -->
    <rect width="400" height="300" rx="10" fill="#090E17" stroke="#EF4444" stroke-width="1.5" />
    
    <!-- Face mesh & Gaze line simulation -->
    <circle cx="200" cy="140" r="55" fill="none" stroke="#60A5FA" stroke-width="1.5" stroke-dasharray="4,4" />
    <circle cx="180" cy="130" r="4" fill="#60A5FA" />
    <circle cx="220" cy="130" r="4" fill="#60A5FA" />
    <line x1="200" y1="135" x2="235" y2="155" stroke="#EF4444" stroke-width="2" /> <!-- Gaze vector pointing away -->

    <!-- Alert Box -->
    <rect x="14" y="14" width="160" height="24" rx="4" fill="#EF4444" fill-opacity="0.9" />
    <text x="94" y="30" font-family="sans-serif" font-size="10" font-weight="900" fill="#FFFFFF" text-anchor="middle">⚠ GAZE ANOMALY DETECTED</text>

    <!-- Bottom Telemetry -->
    <rect x="14" y="260" width="372" height="26" rx="6" fill="#1E293B" />
    <text x="24" y="277" font-family="monospace" font-size="10" fill="#94A3B8">GAZE: 42° OFF-SCREEN | DEVICES: 0 DETECTED | FPS: 30.0</text>
  </g>

  <!-- Violation Log Side Panel -->
  <g transform="translate(440, 55)">
    <rect width="256" height="300" rx="10" fill="#1E293B" stroke="#334155" />
    <text x="16" y="24" font-family="sans-serif" font-size="11" font-weight="800" fill="#F8FAFC">EVENT LOG &amp; BOOKMARKS</text>
    
    <!-- Event 1 -->
    <rect x="14" y="38" width="228" height="52" rx="6" fill="#0F172A" stroke="#EF4444" stroke-width="1" />
    <text x="22" y="56" font-family="monospace" font-size="10" font-weight="700" fill="#EF4444">10:14:22 - Eye Gaze Left</text>
    <text x="22" y="74" font-family="sans-serif" font-size="9" fill="#94A3B8">Duration: 3.4s (Threshold exceeded)</text>

    <!-- Event 2 -->
    <rect x="14" y="98" width="228" height="52" rx="6" fill="#0F172A" />
    <text x="22" y="116" font-family="monospace" font-size="10" font-weight="700" fill="#10B981">10:08:14 - Face Verified</text>
    <text x="22" y="134" font-family="sans-serif" font-size="9" fill="#94A3B8">Biometric Match: 99.1% Confidence</text>

    <!-- Candidate Info -->
    <rect x="14" y="200" width="228" height="86" rx="6" fill="#0F172A" stroke="#334155" />
    <text x="22" y="222" font-family="sans-serif" font-size="10" font-weight="700" fill="#E2E8F0">Integrity Score: 88 / 100</text>
    <rect x="22" y="232" width="180" height="8" rx="4" fill="#334155" />
    <rect x="22" y="232" width="158" height="8" rx="4" fill="#F59E0B" />
    <text x="22" y="260" font-family="sans-serif" font-size="9" fill="#60A5FA">Audit Video Proof Captured ✓</text>
  </g>
  `,
  '#EF4444'
);

// 5. Threat Detection Platform - Cybersecurity Threat & Phishing Hunter
const threatSvg = wrapUiSvg(
  'ThreatHunter AI • Real-Time Phishing & Heuristic Network Monitor',
  'CYBER DEFENCE',
  `
  <g transform="translate(24, 55)">
    <!-- Metric 1 -->
    <rect width="214" height="66" rx="8" fill="#1E293B" stroke="#334155" />
    <text x="14" y="22" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#94A3B8">PAYLOADS INSPECTED</text>
    <text x="14" y="48" font-family="sans-serif" font-size="20" font-weight="900" fill="#F8FAFC">284,910</text>

    <!-- Metric 2 -->
    <rect x="228" width="214" height="66" rx="8" fill="#1E293B" stroke="#EF4444" />
    <text x="242" y="22" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#EF4444">THREATS INTERCEPTED</text>
    <text x="242" y="48" font-family="sans-serif" font-size="20" font-weight="900" fill="#EF4444">1,418 BLOCKED</text>

    <!-- Metric 3 -->
    <rect x="456" width="216" height="66" rx="8" fill="#1E293B" stroke="#334155" />
    <text x="470" y="22" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#94A3B8">HEURISTIC ACCURACY</text>
    <text x="470" y="48" font-family="sans-serif" font-size="20" font-weight="900" fill="#10B981">99.78%</text>
  </g>

  <!-- Threat Stream Console -->
  <g transform="translate(24, 135)">
    <rect width="672" height="220" rx="10" fill="#0A0F1D" stroke="#334155" />
    
    <!-- Terminal Header -->
    <rect width="672" height="28" rx="10" fill="#1E293B" />
    <text x="14" y="18" font-family="monospace" font-size="10.5" fill="#94A3B8">console://threat-hunter.engine/live-stream</text>

    <!-- Log items -->
    <text x="14" y="54" font-family="monospace" font-size="10" fill="#EF4444">[ALERT] High-Entropy Suspicious Domain: hxxp://secure-login-account-update[.]xyz</text>
    <text x="14" y="74" font-family="monospace" font-size="9.5" fill="#94A3B8">  ↳ Heuristic Model: Random Forest Classification | Risk Score: 98.6% | Action: DROP &amp; BLACKLIST</text>

    <text x="14" y="104" font-family="monospace" font-size="10" fill="#10B981">[CLEAN] Valid REST API Webhook Call: POST /api/v2/orders/verify (IP: 52.88.14.22)</text>
    <text x="14" y="124" font-family="monospace" font-size="9.5" fill="#94A3B8">  ↳ TLS 1.3 | SHA256 Signature Valid | OWASP Payload Clean</text>

    <text x="14" y="154" font-family="monospace" font-size="10" fill="#F59E0B">[WARN] Port Scan Pattern Detected from 185.220.101.44 (42 probes / sec)</text>
    <text x="14" y="174" font-family="monospace" font-size="9.5" fill="#94A3B8">  ↳ CloudFlare Gateway Rate-Limiting engaged | Firewall state active</text>
  </g>
  `,
  '#EF4444'
);

// 6. Nidhi Setu - AI Grant Intelligence & Innovation Discovery
const nidhiSvg = wrapUiSvg(
  'Nidhi Setu • AI Grant Matching & Innovation Funding Engine',
  'GRANT INTELLIGENCE',
  `
  <g transform="translate(24, 55)">
    <!-- Abstract Input & Match Result -->
    <rect width="360" height="295" rx="10" fill="#1E293B" stroke="#334155" />
    <text x="16" y="24" font-family="sans-serif" font-size="11" font-weight="800" fill="#F8FAFC">INPUT RESEARCH SPECIFICATION</text>
    
    <rect x="14" y="38" width="332" height="110" rx="8" fill="#0F172A" stroke="#334155" />
    <text x="24" y="60" font-family="sans-serif" font-size="10.5" fill="#E2E8F0">"Autonomous IoT Edge Computer Vision</text>
    <text x="24" y="78" font-family="sans-serif" font-size="10.5" fill="#E2E8F0">for AgriTech Quality Determination"</text>
    <text x="24" y="105" font-family="monospace" font-size="9.5" fill="#60A5FA">Embedding: Gemini-Text-Embedding-004 (768 Dim)</text>
    <text x="24" y="130" font-family="sans-serif" font-size="9.5" fill="#10B981">✓ Semantic Match Score Computed</text>

    <!-- Matched Grant Badge -->
    <rect x="14" y="160" width="332" height="110" rx="8" fill="#0F172A" stroke="#10B981" />
    <text x="24" y="184" font-family="sans-serif" font-size="11" font-weight="800" fill="#10B981">TOP MATCH: NIDHI-PRAYAS GRANT</text>
    <text x="24" y="204" font-family="sans-serif" font-size="10" fill="#E2E8F0">Grant Ceiling: ₹10,00,000 (~$12,000 USD)</text>
    <text x="24" y="224" font-family="sans-serif" font-size="10" fill="#94A3B8">Deadline: 45 Days Remaining | Eligibility: 96%</text>
    <rect x="24" y="238" width="110" height="20" rx="4" fill="#155EEF" />
    <text x="79" y="252" font-family="sans-serif" font-size="9" font-weight="800" fill="#FFFFFF" text-anchor="middle">Generate Dossier</text>
  </g>

  <!-- Matched Opportunities Side List -->
  <g transform="translate(400, 55)">
    <rect width="296" height="295" rx="10" fill="#1E293B" stroke="#334155" />
    <text x="16" y="24" font-family="sans-serif" font-size="11" font-weight="800" fill="#F8FAFC">ACTIVE FUNDING PIPELINES</text>

    <rect x="14" y="38" width="268" height="74" rx="8" fill="#0F172A" stroke="#334155" />
    <text x="24" y="60" font-family="sans-serif" font-size="10.5" font-weight="700" fill="#F8FAFC">DST Seed Support System</text>
    <text x="24" y="78" font-family="sans-serif" font-size="9.5" fill="#94A3B8">Funding: ₹25 Lakhs | Match: 91%</text>
    <text x="24" y="96" font-family="sans-serif" font-size="9" fill="#10B981">Proposal Document Checklist Ready ✓</text>

    <rect x="14" y="122" width="268" height="74" rx="8" fill="#0F172A" stroke="#334155" />
    <text x="24" y="144" font-family="sans-serif" font-size="10.5" font-weight="700" fill="#F8FAFC">MSME Hackathon 3.0 Incubation</text>
    <text x="24" y="162" font-family="sans-serif" font-size="9.5" fill="#94A3B8">Funding: ₹15 Lakhs | Match: 88%</text>
    <text x="24" y="180" font-family="sans-serif" font-size="9" fill="#10B981">Application Portal Open</text>
  </g>
  `,
  '#00D2FF'
);

// 7. Sizora - Smart Apparel Fit Recommendation SaaS
const sizoraSvg = wrapUiSvg(
  'Sizora • D2C Apparel Size Recommendation & Fit Analytics',
  'ECOMMERCE SAAS',
  `
  <g transform="translate(24, 55)">
    <!-- Customer Fit Modal Simulation -->
    <rect width="360" height="295" rx="10" fill="#1E293B" stroke="#334155" />
    <text x="16" y="24" font-family="sans-serif" font-size="11" font-weight="800" fill="#F8FAFC">CUSTOMER FIT FINDER (3 STEPS)</text>
    
    <rect x="14" y="38" width="332" height="130" rx="8" fill="#0F172A" stroke="#334155" />
    <text x="24" y="62" font-family="sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Recommended Size: <tspan fill="#10B981" font-weight="900">LARGE (L)</tspan></text>
    <text x="24" y="82" font-family="sans-serif" font-size="9.5" fill="#94A3B8">Confidence Score: 94.8% (Chest: 40in, Fit: Slim)</text>
    
    <!-- Visual Fit Slider -->
    <text x="24" y="110" font-family="sans-serif" font-size="9" fill="#94A3B8">Tight Fit</text>
    <text x="160" y="110" font-family="sans-serif" font-size="9" font-weight="700" fill="#10B981">Optimal Fit</text>
    <text x="300" y="110" font-family="sans-serif" font-size="9" fill="#94A3B8">Loose</text>
    <rect x="24" y="118" width="310" height="6" rx="3" fill="#334155" />
    <circle cx="180" cy="121" r="7" fill="#10B981" stroke="#FFFFFF" stroke-width="2" />

    <rect x="14" y="180" width="332" height="95" rx="8" fill="#0F172A" stroke="#10B981" />
    <text x="24" y="204" font-family="sans-serif" font-size="10.5" font-weight="800" fill="#10B981">CART RETURN RISK: VERY LOW</text>
    <text x="24" y="224" font-family="sans-serif" font-size="9.5" fill="#E2E8F0">Saves ₹450 in roundtrip courier return costs</text>
    <text x="24" y="244" font-family="sans-serif" font-size="9" fill="#60A5FA">Shopify &amp; React E-Commerce Plugin Embedded</text>
  </g>

  <!-- Store Return Analytics -->
  <g transform="translate(400, 55)">
    <rect width="296" height="295" rx="10" fill="#1E293B" stroke="#334155" />
    <text x="16" y="24" font-family="sans-serif" font-size="11" font-weight="800" fill="#F8FAFC">MERCHANT METRICS DASHBOARD</text>

    <rect x="14" y="38" width="268" height="74" rx="8" fill="#0F172A" stroke="#334155" />
    <text x="24" y="60" font-family="sans-serif" font-size="9.5" fill="#94A3B8">RETURN RATE REDUCTION</text>
    <text x="24" y="86" font-family="sans-serif" font-size="20" font-weight="900" fill="#10B981">-35.4%</text>

    <rect x="14" y="122" width="268" height="74" rx="8" fill="#0F172A" stroke="#334155" />
    <text x="24" y="144" font-family="sans-serif" font-size="9.5" fill="#94A3B8">CHECKOUT CONVERSION</text>
    <text x="24" y="170" font-family="sans-serif" font-size="20" font-weight="900" fill="#60A5FA">+18.2%</text>
  </g>
  `,
  '#EC4899'
);

// 8. Syllabus System - Enterprise Curriculum & Faculty Allocation
const syllabusSvg = wrapUiSvg(
  'CurriculumSuite • Syllabus Progress & Faculty Allocation System',
  'ENTERPRISE JAVA',
  `
  <g transform="translate(24, 55)">
    <!-- Department Grid -->
    <rect width="672" height="295" rx="10" fill="#1E293B" stroke="#334155" />
    
    <!-- Top Stats -->
    <g transform="translate(14, 14)">
      <rect width="150" height="55" rx="6" fill="#0F172A" />
      <text x="12" y="20" font-family="sans-serif" font-size="9" fill="#94A3B8">DEPARTMENTS</text>
      <text x="12" y="42" font-family="sans-serif" font-size="17" font-weight="900" fill="#F8FAFC">12 ACTIVE</text>

      <rect x="160" width="150" height="55" rx="6" fill="#0F172A" />
      <text x="172" y="20" font-family="sans-serif" font-size="9" fill="#94A3B8">COURSES TRACKED</text>
      <text x="172" y="42" font-family="sans-serif" font-size="17" font-weight="900" fill="#60A5FA">148 SUBJECTS</text>

      <rect x="320" width="150" height="55" rx="6" fill="#0F172A" />
      <text x="332" y="20" font-family="sans-serif" font-size="9" fill="#94A3B8">FACULTY ALLOCATED</text>
      <text x="332" y="42" font-family="sans-serif" font-size="17" font-weight="900" fill="#10B981">64 / 64 (100%)</text>

      <rect x="480" width="164" height="55" rx="6" fill="#0F172A" />
      <text x="492" y="20" font-family="sans-serif" font-size="9" fill="#94A3B8">SYLLABUS PROGRESS</text>
      <text x="492" y="42" font-family="sans-serif" font-size="17" font-weight="900" fill="#F59E0B">78.4% ON TRACK</text>
    </g>

    <!-- Faculty Workload Progress Matrix -->
    <g transform="translate(14, 85)">
      <text x="6" y="16" font-family="sans-serif" font-size="10.5" font-weight="800" fill="#E2E8F0">DEPARTMENT SYLLABUS BENCHMARK PROGRESS</text>
      
      <!-- Dept 1 -->
      <text x="6" y="44" font-family="sans-serif" font-size="10" fill="#94A3B8">Dept of Computer Science &amp; Engineering</text>
      <rect x="280" y="34" width="300" height="12" rx="6" fill="#0F172A" />
      <rect x="280" y="34" width="250" height="12" rx="6" fill="#10B981" />
      <text x="600" y="44" font-family="sans-serif" font-size="10" font-weight="700" fill="#10B981">83%</text>

      <!-- Dept 2 -->
      <text x="6" y="74" font-family="sans-serif" font-size="10" fill="#94A3B8">Dept of Cybersecurity &amp; Network Defense</text>
      <rect x="280" y="64" width="300" height="12" rx="6" fill="#0F172A" />
      <rect x="280" y="64" width="270" height="12" rx="6" fill="#155EEF" />
      <text x="600" y="74" font-family="sans-serif" font-size="10" font-weight="700" fill="#60A5FA">90%</text>

      <!-- Dept 3 -->
      <text x="6" y="104" font-family="sans-serif" font-size="10" fill="#94A3B8">Dept of Artificial Intelligence &amp; Data Science</text>
      <rect x="280" y="94" width="300" height="12" rx="6" fill="#0F172A" />
      <rect x="280" y="94" width="225" height="12" rx="6" fill="#8B5CF6" />
      <text x="600" y="104" font-family="sans-serif" font-size="10" font-weight="700" fill="#A78BFA">75%</text>
    </g>
  </g>
  `,
  '#F59E0B'
);

// 9. CloudGuard - Next-Gen Zero-Trust Gateway
const cloudguardSvg = wrapUiSvg(
  'CloudGuard • Next-Generation Zero-Trust Cloud Access Proxy',
  'ROADMAP 2027',
  `
  <g transform="translate(24, 55)">
    <!-- Zero Trust Mesh Visualization -->
    <rect width="672" height="295" rx="10" fill="#1E293B" stroke="#334155" />
    
    <g transform="translate(40, 30)">
      <!-- Node 1: Client Posture -->
      <rect width="160" height="100" rx="8" fill="#0F172A" stroke="#60A5FA" />
      <text x="14" y="26" font-family="sans-serif" font-size="10.5" font-weight="800" fill="#60A5FA">DEVELOPER ENDPOINT</text>
      <text x="14" y="48" font-family="monospace" font-size="9" fill="#94A3B8">Device: Mac M3 Pro</text>
      <text x="14" y="66" font-family="monospace" font-size="9" fill="#10B981">Postures: Compliant ✓</text>
      <text x="14" y="84" font-family="monospace" font-size="9" fill="#94A3B8">Cert: SHA-384 OK</text>

      <!-- Arrow 1 -->
      <line x1="165" y1="50" x2="225" y2="50" stroke="#60A5FA" stroke-width="2" stroke-dasharray="4,3" />

      <!-- Node 2: CloudGuard Kernel Proxy -->
      <rect x="230" width="180" height="140" rx="8" fill="#0F172A" stroke="#10B981" stroke-width="1.5" />
      <text x="244" y="26" font-family="sans-serif" font-size="11" font-weight="800" fill="#10B981">CLOUGUARD GATEWAY</text>
      <text x="244" y="48" font-family="monospace" font-size="9" fill="#94A3B8">Proxy: eBPF Fast Path</text>
      <text x="244" y="66" font-family="monospace" font-size="9" fill="#F8FAFC">Latency: &lt; 0.4ms</text>
      <text x="244" y="86" font-family="monospace" font-size="9" fill="#10B981">mTLS Session: Active</text>
      <text x="244" y="106" font-family="monospace" font-size="9" fill="#94A3B8">Least Privilege Policy</text>

      <!-- Arrow 2 -->
      <line x1="415" y1="50" x2="475" y2="50" stroke="#10B981" stroke-width="2" stroke-dasharray="4,3" />

      <!-- Node 3: VPC Micro-Perimeter -->
      <rect x="480" width="150" height="100" rx="8" fill="#0F172A" stroke="#8B5CF6" />
      <text x="494" y="26" font-family="sans-serif" font-size="10.5" font-weight="800" fill="#A78BFA">AWS K8S CLUSTER</text>
      <text x="494" y="48" font-family="monospace" font-size="9" fill="#94A3B8">VPC: Isolated</text>
      <text x="494" y="66" font-family="monospace" font-size="9" fill="#10B981">Open Ports: 0</text>
      <text x="494" y="84" font-family="monospace" font-size="9" fill="#94A3B8">Ingress: Authorized</text>
    </g>
  </g>
  `,
  '#8B5CF6'
);

// Creative Poster SVGs for the Creatives section
function makePosterSvg(title, category, subtitle, accentColor, iconSvg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" width="100%" height="100%">
  <defs>
    <linearGradient id="pBg_${title.replace(/[^a-zA-Z]/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
    <filter id="pShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.3" />
    </filter>
  </defs>

  <rect width="600" height="420" fill="url(#pBg_${title.replace(/[^a-zA-Z]/g, '')})" />

  <!-- Ambient circles -->
  <circle cx="500" cy="80" r="120" fill="${accentColor}" opacity="0.15" />
  <circle cx="100" cy="340" r="100" fill="#155EEF" opacity="0.12" />

  <g transform="translate(40, 40)" filter="url(#pShadow)">
    <rect width="520" height="340" rx="16" fill="#FFFFFF" fill-opacity="0.04" stroke="#334155" />
    
    <!-- Category Pill -->
    <rect x="24" y="24" width="130" height="24" rx="6" fill="${accentColor}" fill-opacity="0.2" stroke="${accentColor}" />
    <text x="89" y="40" font-family="sans-serif" font-size="10" font-weight="800" fill="${accentColor}" text-anchor="middle">${category}</text>

    <!-- Main Visual Content -->
    ${iconSvg}

    <!-- Title and Subtitle -->
    <text x="24" y="270" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="19" font-weight="900" fill="#FFFFFF">${title}</text>
    <text x="24" y="295" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="600" fill="#94A3B8">${subtitle}</text>
    <text x="496" y="320" font-family="monospace" font-size="9" font-weight="700" fill="${accentColor}" text-anchor="end">SUDHARSHAN_TECH CREATIVE LAB</text>
  </g>
</svg>`;
}

const poster1 = makePosterSvg(
  'Tech Startup Launch Poster',
  'BUSINESS POSTERS',
  'High-impact visual identity for seed-stage deep-tech launches',
  '#3B82F6',
  `<g transform="translate(180, 80)">
    <rect width="160" height="110" rx="12" fill="#1E293B" stroke="#3B82F6" stroke-width="1.5" />
    <polygon points="260,105 275,135 245,135" fill="#3B82F6" />
    <circle cx="260" cy="155" r="14" fill="#60A5FA" />
  </g>`
);

const poster2 = makePosterSvg(
  'Cybersecurity Shield Campaign',
  'SECURITY CREATIVES',
  'Infographics covering zero-trust security & defense protocols',
  '#EF4444',
  `<g transform="translate(210, 80)">
    <path d="M 50,20 L 90,40 L 90,90 Q 50,130 50,130 Q 10,90 10,40 Z" fill="#EF4444" fill-opacity="0.2" stroke="#EF4444" stroke-width="2" />
    <path d="M 35,70 L 47,82 L 68,58" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" />
  </g>`
);

const poster3 = makePosterSvg(
  'Minimalist Brand Identity Suite',
  'BRANDING',
  'Clean vector geometry, typography, and brand digital guidelines',
  '#10B981',
  `<g transform="translate(200, 80)">
    <circle cx="60" cy="60" r="45" fill="none" stroke="#10B981" stroke-width="2" />
    <rect x="35" y="35" width="50" height="50" rx="8" fill="#10B981" fill-opacity="0.3" stroke="#10B981" />
  </g>`
);

const poster4 = makePosterSvg(
  'SaaS Dashboard Landing Mockup',
  'WEBSITE DESIGNS',
  'High-conversion hero sections and interactive pricing tiers',
  '#8B5CF6',
  `<g transform="translate(170, 75)">
    <rect width="180" height="115" rx="10" fill="#0F172A" stroke="#8B5CF6" stroke-width="1.5" />
    <rect x="15" y="15" width="150" height="18" rx="4" fill="#8B5CF6" fill-opacity="0.3" />
    <rect x="15" y="45" width="68" height="50" rx="6" fill="#1E293B" />
    <rect x="95" y="45" width="68" height="50" rx="6" fill="#1E293B" />
  </g>`
);

const poster5 = makePosterSvg(
  'FinTech Mobile App UI/UX',
  'UI/UX DESIGNS',
  'Interactive banking user flows, card management & biometric lock',
  '#06B6D4',
  `<g transform="translate(215, 75)">
    <rect width="90" height="125" rx="14" fill="#0F172A" stroke="#06B6D4" stroke-width="1.5" />
    <rect x="25" y="12" width="40" height="5" rx="2" fill="#334155" />
    <rect x="12" y="30" width="66" height="35" rx="6" fill="#06B6D4" fill-opacity="0.3" />
    <circle cx="45" cy="95" r="12" fill="#06B6D4" />
  </g>`
);

const poster6 = makePosterSvg(
  'AI Vision Marketing Banner',
  'ADVERTISEMENTS',
  'High-conversion targeted creatives for deep-tech algorithms',
  '#F59E0B',
  `<g transform="translate(180, 80)">
    <rect width="160" height="110" rx="10" fill="#0F172A" stroke="#F59E0B" stroke-width="1.5" />
    <circle cx="80" cy="55" r="28" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4,4" />
    <circle cx="80" cy="55" r="10" fill="#F59E0B" />
  </g>`
);

// Write product SVGs
fs.writeFileSync(path.join(productsDir, 'drishti-360.svg'), drishtiSvg);
fs.writeFileSync(path.join(productsDir, 'taskguard.svg'), taskguardSvg);
fs.writeFileSync(path.join(productsDir, 'aicte-dashboard.svg'), aicteSvg);
fs.writeFileSync(path.join(productsDir, 'hackademia.svg'), hackademiaSvg);
fs.writeFileSync(path.join(productsDir, 'threat-detection.svg'), threatSvg);
fs.writeFileSync(path.join(productsDir, 'nidhi-setu.svg'), nidhiSvg);
fs.writeFileSync(path.join(productsDir, 'sizora.svg'), sizoraSvg);
fs.writeFileSync(path.join(productsDir, 'syllabus-system.svg'), syllabusSvg);
fs.writeFileSync(path.join(productsDir, 'cloudguard.svg'), cloudguardSvg);

// Write creative poster SVGs
fs.writeFileSync(path.join(creativesDir, 'startup-launch.svg'), poster1);
fs.writeFileSync(path.join(creativesDir, 'cybersecurity-shield.svg'), poster2);
fs.writeFileSync(path.join(creativesDir, 'brand-identity.svg'), poster3);
fs.writeFileSync(path.join(creativesDir, 'saas-landing.svg'), poster4);
fs.writeFileSync(path.join(creativesDir, 'fintech-app.svg'), poster5);
fs.writeFileSync(path.join(creativesDir, 'ai-banner.svg'), poster6);

console.log('Successfully generated 9 product preview SVGs and 6 creative poster SVGs!');
