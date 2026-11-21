import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  Shield, 
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

interface NavbarProps {
  onOpenEnquiry: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, onOpenAdmin }) => {
  const { totalItems, subtotal, openCart } = useCart();
  const { settings } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Our Work', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'GitHub', href: '#github' },
    { label: 'Founder & Profile', href: '#founder' },
    { label: 'Creatives', href: '#creatives' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/90 py-2.5' 
        : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Title */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 p-0.5 bg-white shadow-sm group-hover:border-[#155EEF] transition-all">
              <img 
                src={settings.logo_image || "/assets/logo.jpg"} 
                alt="SUDHARSHAN_TECH Logo" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-[#155EEF] transition-colors">
                  SUDHARSHAN<span className="text-[#155EEF]">_TECH</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-bold tracking-wider uppercase bg-[#EFF4FF] border border-[#155EEF]/20 text-[#155EEF] rounded">
                  PRO
                </span>
              </div>
              <p className="text-[10.5px] font-medium tracking-wide text-slate-500 hidden sm:block">
                {settings.tagline || "Code. Create. Elevate."}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-semibold text-slate-600 hover:text-[#155EEF] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#155EEF] after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Phone Dialler Link */}
            <a 
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
              title="Call SUDHARSHAN_TECH"
            >
              <Phone className="w-3.5 h-3.5 text-[#155EEF]" />
              <span>{settings.phone}</span>
            </a>

            {/* Cart Button with Swiggy Style Badge */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#155EEF] hover:bg-[#1049B8] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#155EEF]/20 transition-all active:scale-95"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center bg-[#E53935] text-white font-extrabold text-[10px] px-1.5 py-0.2 min-w-4 h-4 rounded-full shadow-sm animate-pulse">
                  {totalItems}
                </span>
              )}
              {subtotal > 0 && (
                <span className="hidden md:inline pl-1 border-l border-white/30 text-xs text-blue-50">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              )}
            </button>

            {/* Start Project CTA */}
            <button
              onClick={onOpenEnquiry}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 hover:text-[#155EEF] transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E53935]" />
              <span>Start Project</span>
            </button>

            {/* Admin Switcher */}
            <button
              onClick={onOpenAdmin}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4 text-[#155EEF]" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#155EEF] hover:bg-blue-50/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#155EEF] text-white font-bold text-xs shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFF1F0]" />
              <span>Start Custom Project</span>
            </button>

            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#155EEF]" />
              <span>Direct Call: {settings.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
