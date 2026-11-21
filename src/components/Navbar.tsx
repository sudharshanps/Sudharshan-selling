import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  Shield, 
  ChevronDown,
  ExternalLink,
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
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavLinks = [
    { label: 'Home', href: '#' },
    { label: 'Our Work', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Offers', href: '#offers' },
    { label: 'Contact', href: '#contact' },
  ];

  const secondaryNavLinks = [
    { label: 'GitHub', href: '#github' },
    { label: 'Founder & Profile', href: '#founder' },
    { label: 'Creatives', href: '#creatives' },
    { label: 'Why Us', href: '#why-us' },
  ];

  const allNavLinks = [
    { label: 'Home', href: '#' },
    { label: 'Our Work', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Offers', href: '#offers' },
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
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:gap-6 h-[52px]">
          
          {/* ========================================================
              LEFT: Logo, Company Name, PRO Badge & Tagline
              ======================================================== */}
          <a href="#" className="flex items-center gap-3 shrink-0 group select-none">
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-200 p-0.5 bg-white shadow-sm group-hover:border-[#155EEF] group-hover:shadow-md transition-all shrink-0">
              <img 
                src={settings.logo_image || "/assets/logo.jpg"} 
                alt="SUDHARSHAN_TECH Logo" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-[#155EEF] transition-colors whitespace-nowrap">
                  SUDHARSHAN<span className="text-[#155EEF]">_TECH</span>
                </span>
                <span className="inline-block px-1.5 py-0.5 text-[9px] font-black tracking-wider uppercase bg-[#EFF4FF] border border-[#155EEF]/20 text-[#155EEF] rounded whitespace-nowrap">
                  PRO
                </span>
              </div>
              <p className="text-[10.5px] font-medium tracking-wide text-slate-500 whitespace-nowrap mt-1">
                {settings.tagline || "Code. Create. Elevate."}
              </p>
            </div>
          </a>

          {/* ========================================================
              CENTER: Desktop Navigation Links (Single Row, No Wrapping)
              ======================================================== */}
          {/* Full Navigation on 1280px+ (xl) */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 shrink-0">
            {allNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] 2xl:text-[14px] font-bold text-slate-600 hover:text-[#155EEF] transition-colors whitespace-nowrap py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#155EEF] after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Condensed Navigation on Tablet (768px - 1279px) with 'More' dropdown */}
          <nav className="hidden md:flex xl:hidden items-center gap-3 lg:gap-4 shrink-0">
            {primaryNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-bold text-slate-600 hover:text-[#155EEF] transition-colors whitespace-nowrap py-1"
              >
                {link.label}
              </a>
            ))}

            {/* More Menu for Tablet */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className="flex items-center gap-1 text-[13px] font-bold text-slate-600 hover:text-[#155EEF] py-1 transition-colors whitespace-nowrap"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreMenuOpen ? 'rotate-180 text-[#155EEF]' : ''}`} />
              </button>

              {moreMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  {secondaryNavLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50/70 hover:text-[#155EEF] transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* ========================================================
              RIGHT: Consistent Action Buttons (Height: 48px, Rounded-xl)
              ======================================================== */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Phone Dialler Button (Clickable, Single Line) */}
            <a 
              href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden lg:flex items-center gap-2 h-[48px] px-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-[#155EEF] border border-slate-200 hover:border-blue-300 font-bold text-xs whitespace-nowrap shadow-sm transition-all"
              title="Call SUDHARSHAN_TECH Office"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#155EEF] flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="tracking-tight">{settings.phone}</span>
            </a>

            {/* Cart Button with Swiggy Style Live Item Badge */}
            <button
              onClick={openCart}
              className="h-[48px] px-3.5 sm:px-4 flex items-center gap-2 rounded-xl bg-[#155EEF] hover:bg-[#1049B8] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 active:scale-98 transition-all whitespace-nowrap shrink-0"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center bg-[#E53935] text-white font-black text-[10px] min-w-[20px] h-5 rounded-full px-1.5 shadow-sm">
                  {totalItems}
                </span>
              )}
              {subtotal > 0 && (
                <span className="hidden sm:inline pl-1.5 border-l border-white/20 text-xs font-semibold text-blue-50">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              )}
            </button>

            {/* Start Project CTA Button */}
            <button
              onClick={onOpenEnquiry}
              className="hidden sm:flex items-center gap-2 h-[48px] px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#155EEF] text-slate-800 hover:text-[#155EEF] font-bold text-xs shadow-sm active:scale-98 transition-all whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-4 h-4 text-[#E53935] shrink-0" />
              <span>Start Project</span>
            </button>

            {/* Security / Admin Shield Button */}
            <button
              onClick={onOpenAdmin}
              className="h-[48px] w-[48px] flex items-center justify-center rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-[#155EEF] border border-slate-200 hover:border-blue-200 transition-all shadow-sm shrink-0"
              title="Admin & Security Verification Portal"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4 text-[#155EEF]" />
            </button>

            {/* Mobile Hamburger Toggle (under 1280px on small screens, or under 768px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-[48px] w-[48px] flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shrink-0"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-slate-800" />}
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================
          MOBILE NAVIGATION DRAWER (<768px)
          ======================================================== */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-4">
            {allNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#155EEF] hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full flex items-center justify-center gap-2 h-[48px] rounded-xl bg-[#155EEF] text-white font-bold text-xs shadow-md shadow-blue-500/20"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Start Your Custom Project</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-1.5 h-[44px] rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#155EEF]" />
                <span>Call Us</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20SUDHARSHAN_TECH,%20inquiring%20about%20digital%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 h-[44px] rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
