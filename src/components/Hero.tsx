import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Smartphone,
  Globe
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface HeroProps {
  onStartProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject }) => {
  const { settings } = useSettings();

  const techBadges = [
    "React.js", "TypeScript", "Python", "FastAPI", "Docker", "Node.js", 
    "OpenCV", "PostgreSQL", "Cybersecurity (OWASP)", "AWS Cloud", "Tailwind CSS", "Spring Boot"
  ];

  const quickCategories = [
    { name: "Web Dev", href: "#services", price: "₹1,199" },
    { name: "Mobile Apps", href: "#services", price: "₹4,999" },
    { name: "AI Automation", href: "#services", price: "₹2,999" },
    { name: "Cybersecurity", href: "#services", price: "₹1,999" },
    { name: "Custom ERP", href: "#services", price: "₹2,999" },
    { name: "Cloud & DevOps", href: "#services", price: "₹1,999" },
  ];

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-white border-b border-slate-200">
      
      {/* Subtle modern background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F033_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F033_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none"></div>
      
      {/* Soft gradient blur lights */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-blue-100/50 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-[350px] h-[300px] bg-red-100/40 blur-[90px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Headline & CTAs on Left, Visual Mockup & Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Pill with Red Accent Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFF4FF] border border-[#155EEF]/20 text-[#155EEF] text-xs font-bold tracking-tight shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#E53935] animate-ping"></span>
              <span>SUDHARSHAN_TECH Digital Services Marketplace</span>
              <span className="text-slate-300">|</span>
              <span className="text-[#E53935] font-semibold">Code. Create. Elevate.</span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Your Ideas. Our Technology.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#155EEF] via-[#2878F0] to-[#E53935]">
                One Powerful Digital Experience.
              </span>
            </h1>

            {/* Supporting Content */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              From websites and mobile applications to AI-powered automation and cybersecurity,{' '}
              <strong className="text-slate-900 font-bold">SUDHARSHAN_TECH</strong> helps businesses transform their ideas into production-ready digital solutions.
            </p>

            {/* 3 Call-To-Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              
              {/* Primary: Explore Services */}
              <a
                href="#services"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#155EEF] hover:bg-[#1049B8] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#155EEF]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary: Start Your Project (Red Accent Border) */}
              <button
                onClick={onStartProject}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFF1F0] hover:bg-red-100 text-[#E53935] border border-[#E53935]/30 font-bold text-sm sm:text-base transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-[#E53935]" />
                <span>Start Your Project</span>
              </button>

              {/* Third: View Our Projects */}
              <a
                href="#projects"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-sm sm:text-base font-semibold transition-colors"
              >
                <span>View Our Projects</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Quick Category Shortcuts */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Quick Service Discovery:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickCategories.map((cat) => (
                  <a
                    key={cat.name}
                    href={cat.href}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#155EEF] hover:bg-blue-50/50 text-xs font-semibold text-slate-700 transition-all group"
                  >
                    <span className="group-hover:text-[#155EEF]">{cat.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-[#155EEF] border border-blue-200 font-bold">
                      from {cat.price}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Visual Mockup Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Interactive Mockup Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card (Laptop / Desktop Simulation) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-5 space-y-4 relative z-10">
                
                {/* Header Mockup */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                    <span className="text-[11px] font-mono text-slate-400 ml-2">sudharshan-tech.com</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold">
                    ✓ Operational 24/7
                  </span>
                </div>

                {/* Hero Inside Card */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-xl p-4 border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#155EEF]">
                    <Zap className="w-4 h-4 text-[#E53935]" />
                    <span>Instant Digital Execution</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                    Engineering Modern Web, AI & Cybersecurity Solutions
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Trusted by businesses to deploy resilient full-stack systems.
                  </p>
                </div>

                {/* Mini Metric Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">Core Services</p>
                    <p className="text-lg font-black text-slate-900 mt-0.5">8 Solutions</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#EFF4FF] border border-blue-100">
                    <p className="text-xs text-[#155EEF] font-medium">Starting Rate</p>
                    <p className="text-lg font-black text-[#155EEF] mt-0.5">₹1,199</p>
                  </div>
                </div>

                {/* Simulated Order Notification Banner */}
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                  <span className="font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Instant WhatsApp & Email Alert System</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">LIVE</span>
                </div>

              </div>

              {/* Floating Technology Badges */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-200 p-2.5 flex items-center gap-2 z-20 animate-pulse-slow">
                <div className="p-1.5 rounded-lg bg-blue-50 text-[#155EEF]">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Web & Mobile</p>
                  <p className="text-xs font-bold text-slate-900">Modern Stacks</p>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-4 bg-white rounded-xl shadow-lg border border-slate-200 p-2.5 flex items-center gap-2 z-20">
                <div className="p-1.5 rounded-lg bg-red-50 text-[#E53935]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Cybersecurity</p>
                  <p className="text-xs font-bold text-slate-900">OWASP Top 10 Hardened</p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 4 Feature Trust Pillars */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-slate-200">
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#EFF4FF] text-[#155EEF] border border-blue-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">8 Official Services</p>
              <p className="text-xs text-slate-500">Complete Digital Ecosystem</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-50 text-[#E53935] border border-red-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">Cybersecurity</p>
              <p className="text-xs text-slate-500">Security-Conscious Dev</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">National AI Finalist</p>
              <p className="text-xs text-slate-500">Top 50 among 500+ Teams</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">Production Ready</p>
              <p className="text-xs text-slate-500">Coimbatore • Global Delivery</p>
            </div>
          </div>

        </div>

        {/* Animated Tech Ticker Marquee */}
        <div className="mt-8 overflow-hidden py-3 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
            {[...techBadges, ...techBadges].map((tech, idx) => (
              <span key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF]"></span>
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
