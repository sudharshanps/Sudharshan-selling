import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  Menu, 
  X, 
  ExternalLink, 
  Sparkles, 
  Shield, 
  Code, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

interface NavbarProps {
  onOpenEnquiry: () => void;
  onOpenAdmin: () => void;
  isAdminView?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, onOpenAdmin, isAdminView }) => {
  const { totalItems, subtotal, openCart } = useCart();
  const { settings } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'GitHub', href: '#github' },
    { label: 'Founder & Profile', href: '#founder' },
    { label: 'Creatives', href: '#creatives' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-[#070c18]/95 backdrop-blur-md shadow-xl border-b border-slate-800/80 py-3' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Tagline */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-blue-500/30 p-0.5 bg-slate-900 shadow-md shadow-blue-500/10 group-hover:border-blue-400 transition-all">
              <img 
                src={settings.logo_image || "/assets/logo.jpg"} 
                alt="SUDHARSHAN_TECH Logo" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  SUDHARSHAN<span className="text-blue-500">_TECH</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded">
                  PRO
                </span>
              </div>
              <p className="text-[11px] font-medium tracking-wide text-slate-400 hidden xs:block">
                {settings.tagline || "Code. Create. Elevate."}
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-blue-500 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            
            {/* Direct Phone Dialler CTA */}
            <a 
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden md:flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition-all"
              title="Call SUDHARSHAN_TECH"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{settings.phone}</span>
            </a>

            {/* Swiggy-Inspired Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium text-xs sm:text-sm shadow-lg shadow-blue-600/25 transition-all transform active:scale-95"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Cart</span>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center bg-white text-blue-700 font-extrabold text-[11px] px-1.5 py-0.2 min-w-5 h-5 rounded-full shadow-inner animate-pulse">
                  {totalItems}
                </span>
              )}
              {subtotal > 0 && (
                <span className="hidden md:inline pl-1 border-l border-blue-400/50 text-xs text-blue-100">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              )}
            </button>

            {/* Custom Project Button */}
            <button
              onClick={onOpenEnquiry}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-blue-400 hover:text-white transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Project</span>
            </button>

            {/* Admin Switcher */}
            <button
              onClick={onOpenAdmin}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a101f] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Custom Project</span>
            </button>

            <a
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-800 text-slate-300 font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Direct Call: {settings.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
