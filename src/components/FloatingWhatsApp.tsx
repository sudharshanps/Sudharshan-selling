import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useSettings();
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanPhone = (settings.whatsapp || "919791495418").replace(/[^0-9]/g, '');
  const defaultMessage = encodeURIComponent(
    "Hello SUDHARSHAN_TECH! I am exploring your digital services and would like to discuss my project."
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40 flex items-end flex-col gap-2">
      
      {/* Floating Tooltip */}
      {showTooltip && (
        <div className="bg-slate-900/95 text-slate-200 border border-slate-700/80 text-xs px-3 py-2 rounded-xl shadow-xl flex items-center gap-2 max-w-[220px] backdrop-blur-md animate-bounce duration-1000">
          <span>👋 Chat directly with founder Sudharshan on WhatsApp!</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }} 
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire on WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-gradient-to-tr from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white rounded-full shadow-[0_8px_25px_rgba(16,185,129,0.4)] transition-all transform hover:scale-110 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30 pointer-events-none"></span>
        <svg 
          className="w-7 h-7 fill-current transition-transform group-hover:scale-105" 
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.585 1.961.948 2.791.948 3.181 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.767-5.767-5.767zm4.332 7.734c-.18.508-.916.945-1.391.996-.451.049-.916.082-2.428-.541-1.802-.743-3.036-2.545-3.125-2.664-.09-.119-.729-.971-.729-1.853 0-.882.463-1.316.627-1.496.164-.18.359-.225.479-.225.12 0 .239.001.344.006.11.005.257-.042.402.308.15.361.509 1.242.554 1.332.045.09.075.195.015.315-.06.12-.09.195-.18.3-.09.105-.189.234-.27.315-.09.09-.184.188-.079.368.105.18.468.772 1.005 1.25.692.616 1.275.807 1.455.897.18.09.285.075.39-.045.105-.12.449-.523.569-.703.12-.18.239-.15.404-.09.165.06 1.049.495 1.229.585.18.09.3.135.344.21.045.075.045.435-.135.943z"/>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.527 3.659 1.439 5.176L2 22l4.981-1.396A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.17 8.17 0 01-4.242-1.185l-.304-.18-3.056.856.862-2.981-.197-.315A8.182 8.182 0 1112 20.2z"/>
        </svg>
      </a>
    </div>
  );
};
