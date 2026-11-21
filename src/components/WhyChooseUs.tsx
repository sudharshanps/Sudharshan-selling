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
      icon: <Layers className="w-5 h-5 text-[#155EEF]" />,
      title: "One Place for Complete Digital Solutions",
      description: "From custom websites and mobile apps to AI pipelines, cloud deployments and cybersecurity, manage all your technology under one roof."
    },
    {
      icon: <Code2 className="w-5 h-5 text-[#2878F0]" />,
      title: "Custom-Built, Scalable Code",
      description: "We don't use fragile drag-and-drop website builders. Every solution is custom-coded using production-grade React, Python, Java, or Node.js."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#E53935]" />,
      title: "Security-Conscious Development",
      description: "Led by a cybersecurity specialist, our architectures incorporate OWASP standards, parameterized queries, and defensive authorization guards from day one."
    },
    {
      icon: <Smartphone className="w-5 h-5 text-purple-600" />,
      title: "Mobile-First Responsive Standards",
      description: "Seamless UI experiences engineered to look and perform flawlessly on desktop, tablets, iPhones, and Android devices."
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-emerald-600" />,
      title: "Direct Founder Communication",
      description: "No middlemen or confusing account managers. Communicate directly with founder and lead engineer Sudharshan P S for high-velocity iterations."
    },
    {
      icon: <Headphones className="w-5 h-5 text-indigo-600" />,
      title: "Ongoing Technical Support",
      description: "We stay with you post-deployment, offering proactive bug fixes, dependency updates, server health monitoring, and feature upgrades."
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-[#F8FAFC] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF4FF] border border-[#155EEF]/20 text-[#155EEF] text-xs font-bold tracking-tight mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE SUDHARSHAN_TECH ADVANTAGE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Why Partner with SUDHARSHAN_TECH?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Building reliable digital software requires clear engineering discipline, transparent pricing, and unwavering security standards.
          </p>
        </div>

        {/* 6 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:border-[#155EEF] hover:-translate-y-1 hover:shadow-card-hover shadow-sm"
            >
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 w-fit mb-4">
                {pt.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {pt.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {pt.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
