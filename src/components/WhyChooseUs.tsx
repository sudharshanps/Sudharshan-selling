import React from 'react';
import { 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Code2, 
  Smartphone, 
  MessageSquare, 
  Headphones, 
  Sparkles 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      title: "One Place for Complete Digital Solutions",
      description: "From custom websites and mobile apps to AI pipelines, cloud deployments and cybersecurity, manage all your technology under one roof."
    },
    {
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      title: "Custom-Built, Scalable Code",
      description: "We don't use fragile drag-and-drop website builders. Every solution is custom-coded using production-grade React, Python, Java, or Node.js."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: "Security-Conscious Development",
      description: "Led by a cybersecurity specialist, our architectures incorporate OWASP standards, parameterized queries, and defensive authorization guards from day one."
    },
    {
      icon: <Smartphone className="w-5 h-5 text-purple-400" />,
      title: "Mobile-First Responsive Standards",
      description: "Seamless UI experiences engineered to look and perform flawlessly on desktop, tablets, iPhones, and Android devices."
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-indigo-400" />,
      title: "Direct Founder Communication",
      description: "No middlemen or confusing account managers. Communicate directly with founder and lead engineer Sudharshan P S for high-velocity iterations."
    },
    {
      icon: <Headphones className="w-5 h-5 text-teal-400" />,
      title: "Ongoing Technical Support",
      description: "We stay with you post-deployment, offering proactive bug fixes, dependency updates, server health monitoring, and feature upgrades."
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-[#070c18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE SUDHARSHAN_TECH ADVANTAGE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Why Partner with SUDHARSHAN_TECH?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Building reliable digital software requires clear engineering discipline, transparent pricing, and unwavering security standards.
          </p>
        </div>

        {/* 6 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="bg-[#0c1527] border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/20"
            >
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 w-fit mb-4">
                {pt.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {pt.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {pt.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
