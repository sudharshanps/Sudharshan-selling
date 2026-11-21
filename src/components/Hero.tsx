import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award
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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#070c18] via-[#091124] to-[#070c18]">
      
      {/* Background Decorative Grid and Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40"></div>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Trust Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6 shadow-sm backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
          <span>SUDHARSHAN_TECH Digital Services Marketplace</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Code. Create. Elevate.</span>
        </div>

        {/* Hero Headline & Description */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            Your Ideas. Our Technology.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
              One Powerful Digital Experience.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal mb-8 max-w-3xl">
            From websites and mobile applications to AI-powered automation and cybersecurity,{' '}
            <strong className="text-white font-semibold">SUDHARSHAN_TECH</strong> helps businesses transform their ideas into production-ready digital solutions.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            
            {/* Primary: Explore Services */}
            <a
              href="#services"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Primary 2: Start Your Project */}
            <button
              onClick={onStartProject}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-cyan-300 hover:text-white border border-slate-700 font-semibold text-sm sm:text-base transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Start Your Project</span>
            </button>

            {/* Secondary: View Our Projects */}
            <a
              href="#projects"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 text-sm sm:text-base font-medium transition-colors"
            >
              <span>View Our Projects</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>
          </div>

          {/* Service Category Shortcuts Pill Matrix */}
          <div className="pt-2 pb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Quick Service Navigation & Starting Estimates:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickCategories.map((cat) => (
                <a
                  key={cat.name}
                  href={cat.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 text-xs text-slate-200 transition-all group"
                >
                  <span className="font-medium group-hover:text-blue-400">{cat.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950/80 text-blue-400 border border-blue-900/60 font-semibold">
                    from {cat.price}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Highlight Trust Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">8 Services</p>
              <p className="text-xs text-slate-400">Complete Digital Stack</p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Cybersecurity</p>
              <p className="text-xs text-slate-400">Security-First Focus</p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Top 50 National</p>
              <p className="text-xs text-slate-400">AI Hackathon Finalist</p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Production Ready</p>
              <p className="text-xs text-slate-400">Coimbatore • Global Delivery</p>
            </div>
          </div>

        </div>

        {/* Animated Tech Ticker Marquee */}
        <div className="mt-10 overflow-hidden py-3 bg-slate-900/40 border-y border-slate-800/60 rounded-xl">
          <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
            {[...techBadges, ...techBadges].map((tech, idx) => (
              <span key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
