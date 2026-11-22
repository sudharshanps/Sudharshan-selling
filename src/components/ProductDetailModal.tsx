import React, { useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Cpu, 
  ExternalLink,
  MessageSquare,
  Users,
  Code2,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { ProductItem } from '../types';
import { useSettings } from '../context/SettingsContext';

interface ProductDetailModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestDemo: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onRequestDemo,
}) => {
  const { settings } = useSettings();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Live Production':
      case 'Production Ready':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Live Prototype':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Enterprise MVP':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Top 50 Finalist':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'In Development':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello SUDHARSHAN_TECH! I am interested in exploring the "${product.name}" digital platform. Could you share a live demonstration and enterprise deployment details?`
  );

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto z-10 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* ========================================================
            MODAL HEADER
            ======================================================== */}
        <div className="p-6 sm:p-7 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-blue-50/20 to-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/80 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200/80 transition-colors shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] border border-blue-200 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              {product.category}
            </span>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getStatusBadge(product.status)}`}>
              {product.status}
            </span>
            {product.badge && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-[#E53935] border border-red-200 text-xs font-bold">
                <Sparkles className="w-3 h-3" />
                {product.badge}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {product.name}
          </h2>
          <p className="text-sm sm:text-base font-semibold text-[#155EEF] mt-1">
            {product.tagline}
          </p>
        </div>

        {/* ========================================================
            MODAL BODY (Scrollable)
            ======================================================== */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* Executive Overview */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#155EEF]" />
              Executive Overview
            </h4>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70">
              {product.full_description}
            </p>
          </div>

          {/* Features and Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Features */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#155EEF]" />
                Key Product Capabilities
              </h4>
              <ul className="space-y-2.5">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF] mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategic Benefits */}
            <div className="bg-blue-50/40 rounded-2xl p-4 sm:p-5 border border-blue-100 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#155EEF] mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#155EEF]" />
                Business Impact & ROI
              </h4>
              <ul className="space-y-2.5">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E53935] mt-1.5 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Target Users / Industries */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              Target Users & Organizations
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.target_users.map((target, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                >
                  {target}
                </span>
              ))}
            </div>
          </div>

          {/* Technology Architecture */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#155EEF]" />
              Engineering Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.tech_stack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 rounded-lg bg-blue-50 text-[#155EEF] font-bold text-xs border border-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================
            MODAL FOOTER (CTAs)
            ======================================================== */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {product.github && (
              <a
                href={product.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 shadow-sm transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Source</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Query</span>
            </a>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-800 text-xs font-bold transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onRequestDemo(product.name);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#1049B8] text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-98 transition-all"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Request Demo / Custom Deployment</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
