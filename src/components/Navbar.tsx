import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  Shield, 
  ChevronDown,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  Cpu,
  Layers
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { ProductsMegaMenu } from './ProductsMegaMenu';
import { ProductItem } from '../types';
import { getAssetPath } from '../utils/assetHelper';

interface NavbarProps {
  onOpenEnquiry: (preset?: string) => void;
  onOpenAdmin: () => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenEnquiry, 
  onOpenAdmin,
  onSelectProduct
}) => {
  const { totalItems, subtotal, openCart } = useCart();
  const { settings } = useSettings();
  
  // Navigation states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const moreMenuRef = useRef<HTMLDivElement>(null);
  const productsNavRef = useRef<HTMLDivElement>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic height & backdrop blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setProductsMenuOpen(false); // Close mega-menu immediately on scroll so page content is never blocked

      // Simple active section scroll-spy
      const sections = [
        { id: 'hero', element: document.getElementById('hero') || document.body },
        { id: 'products-showcase', element: document.getElementById('products-showcase') },
        { id: 'projects', element: document.getElementById('projects') },
        { id: 'services', element: document.getElementById('services') },
        { id: 'offers', element: document.getElementById('offers') },
        { id: 'why-us', element: document.getElementById('why-us') },
        { id: 'github', element: document.getElementById('github') },
        { id: 'founder', element: document.getElementById('founder') },
        { id: 'creatives', element: document.getElementById('creatives') },
        { id: 'contact', element: document.getElementById('contact') },
      ];

      const scrollPos = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.element && sec.element.offsetTop <= scrollPos) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProductsMenuOpen(false);
        setMoreMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Hover-intent handlers for Mega-Menu (220ms delay prevents accidental trigger when sweeping mouse)
  const handleMouseEnterProducts = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (!productsMenuOpen && !openTimeoutRef.current) {
      openTimeoutRef.current = setTimeout(() => {
        setProductsMenuOpen(true);
        openTimeoutRef.current = null;
      }, 220);
    }
  };

  const handleMouseLeaveProducts = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setProductsMenuOpen(false);
      closeTimeoutRef.current = null;
    }, 220);
  };

  const handleToggleProducts = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setProductsMenuOpen((prev) => !prev);
  };

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

  const isLinkActive = (href: string) => {
    if (href === '#' && (activeSection === 'hero' || !activeSection)) return true;
    if (href.startsWith('#') && href.slice(1) === activeSection) return true;
    return false;
  };

  const isProductsActive = activeSection === 'products-showcase' || activeSection === 'products' || productsMenuOpen;

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/5 border-b border-slate-200/90 py-2 sm:py-2.5' 
        : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3 sm:py-3.5'
    }`}>
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between gap-3 lg:gap-6 transition-all duration-300 ${
          isScrolled ? 'h-[48px]' : 'h-[52px]'
        }`}>
          
          {/* ========================================================
              LEFT: Logo, Company Name, PRO Badge & Tagline
              ======================================================== */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group select-none">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-slate-200 p-0.5 bg-white shadow-sm group-hover:border-[#155EEF] group-hover:shadow-md transition-all shrink-0">
              <img 
                src={getAssetPath(settings.logo_image || "/assets/logo.jpg")} 
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
              <p className="text-[10px] sm:text-[10.5px] font-medium tracking-wide text-slate-500 whitespace-nowrap mt-1">
                {settings.tagline || "Code. Create. Elevate."}
              </p>
            </div>
          </a>

          {/* ========================================================
              CENTER: Desktop Navigation Links (Single Row, No Wrapping)
              ======================================================== */}
          {/* Full Navigation on 1280px+ (xl) */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 shrink-0 relative">
            
            {/* 1. Home */}
            <a
              href="#"
              className={`text-[13px] 2xl:text-[14px] font-bold transition-colors whitespace-nowrap py-1 relative ${
                isLinkActive('#') ? 'text-[#155EEF]' : 'text-slate-600 hover:text-[#155EEF]'
              } after:h-0.5 after:bg-[#155EEF] after:absolute after:bottom-0 after:left-0 after:transition-all ${
                isLinkActive('#') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Home
            </a>

            {/* 2. Interactive PRODUCTS Mega-Menu Trigger */}
            <div 
              ref={productsNavRef}
              className="relative py-1"
              onMouseEnter={handleMouseEnterProducts}
              onMouseLeave={handleMouseLeaveProducts}
            >
              <button
                onClick={handleToggleProducts}
                className={`flex items-center gap-1 text-[13px] 2xl:text-[14px] font-bold transition-colors whitespace-nowrap relative ${
                  isProductsActive ? 'text-[#155EEF]' : 'text-slate-600 hover:text-[#155EEF]'
                } after:h-0.5 after:bg-[#155EEF] after:absolute after:bottom-[-4px] after:left-0 after:transition-all ${
                  isProductsActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                }`}
                aria-expanded={productsMenuOpen}
                aria-haspopup="true"
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  productsMenuOpen ? 'rotate-180 text-[#155EEF]' : 'text-slate-400'
                }`} />
                <span className="ml-0.5 inline-block w-1.5 h-1.5 rounded-full bg-[#155EEF] animate-pulse" />
              </button>
            </div>

            {/* 3. Our Work */}
            <a
              href="#projects"
              className={`text-[13px] 2xl:text-[14px] font-bold transition-colors whitespace-nowrap py-1 relative ${
                isLinkActive('#projects') ? 'text-[#155EEF]' : 'text-slate-600 hover:text-[#155EEF]'
              } after:h-0.5 after:bg-[#155EEF] after:absolute after:bottom-0 after:left-0 after:transition-all ${
                isLinkActive('#projects') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Our Work
            </a>

            {/* 4. Services */}
            <a
              href="#services"
              className={`text-[13px] 2xl:text-[14px] font-bold transition-colors whitespace-nowrap py-1 relative ${
                isLinkActive('#services') ? 'text-[#155EEF]' : 'text-slate-600 hover:text-[#155EEF]'
              } after:h-0.5 after:bg-[#155EEF] after:absolute after:bottom-0 after:left-0 after:transition-all ${
                isLinkActive('#services') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Services
            </a>

            {/* 5. Offers */}
            <a
              href="#offers"
              className={`text-[13px] 2xl:text-[14px] font-bold transition-colors whitespace-nowrap py-1 relative flex items-center gap-1.5 ${
                isLinkActive('#offers') ? 'text-[#155EEF]' : 'text-slate-600 hover:text-[#155EEF]'
              } after:h-0.5 after:bg-[#155EEF] after:absolute after:bottom-0 after:left-0 after:transition-all ${
                isLinkActive('#offers') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              <span>Offers</span>
              <span className="px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider bg-red-100 text-[#E53935] rounded-full">
                7
              </span>
            </a>

            {/* 6. GitHub */}
            <a
              href="#github"
              className={`text-[13px] 2xl:text-[14px] font-bold transition-colors whitespace-nowrap py-1 relative ${
                isLinkActive('#github') ? 'text-[#155EEF]' : 'text-slate-600 hover:text-[#155EEF]'
              } after:h-0.5 after:bg-[#155EEF] after:absolute after:bottom-0 after:left-0 after:transition-all ${
                isLinkActive('#github') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              GitHub
            </a>

            {/* 7. Founder & Profile */}
            <a
              href="#founder"
              className={`text-[13px] 2xl:text-[14px] font-bold transition-colors whitespace-nowrap py-1 relative ${
                isLinkActive('#founder') ? 'text-[#155EEF]' : 'text-slate-600 hover:text-[#155EEF]'
              } after:h-0.5 after:bg-[#155EEF] after:absolute after:bottom-0 after:left-0 after:transition-all ${
                isLinkActive('#founder') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Founder & Profile
            </a>

            {/* 8. Creatives */}
            <a
              href="#creatives"
              className={`text-[13px] 2xl:text-[14px] font-bold transition-colors whitespace-nowrap py-1 relative ${
                isLinkActive('#creatives') ? 'text-[#155EEF]' : 'text-slate-600 hover:text-[#155EEF]'
              } after:h-0.5 after:bg-[#155EEF] after:absolute after:bottom-0 after:left-0 after:transition-all ${
                isLinkActive('#creatives') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Creatives
            </a>

            {/* 9. Why Us */}
            <a
              href="#why-us"
              className={`text-[13px] 2xl:text-[14px] font-bold transition-colors whitespace-nowrap py-1 relative ${
                isLinkActive('#why-us') ? 'text-[#155EEF]' : 'text-slate-600 hover:text-[#155EEF]'
              } after:h-0.5 after:bg-[#155EEF] after:absolute after:bottom-0 after:left-0 after:transition-all ${
                isLinkActive('#why-us') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Why Us
            </a>

            {/* 10. Contact */}
            <a
              href="#contact"
              className={`text-[13px] 2xl:text-[14px] font-bold transition-colors whitespace-nowrap py-1 relative ${
                isLinkActive('#contact') ? 'text-[#155EEF]' : 'text-slate-600 hover:text-[#155EEF]'
              } after:h-0.5 after:bg-[#155EEF] after:absolute after:bottom-0 after:left-0 after:transition-all ${
                isLinkActive('#contact') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              Contact
            </a>

          </nav>

          {/* Condensed Navigation on Tablet (768px - 1279px) with 'More' dropdown */}
          <nav className="hidden md:flex xl:hidden items-center gap-3 lg:gap-4 shrink-0 relative">
            <a
              href="#"
              className={`text-[13px] font-bold whitespace-nowrap py-1 ${
                isLinkActive('#') ? 'text-[#155EEF]' : 'text-slate-600 hover:text-[#155EEF]'
              }`}
            >
              Home
            </a>

            {/* Tablet Products Button linking directly to #products-showcase */}
            <a
              href="#products-showcase"
              className={`text-[13px] font-bold whitespace-nowrap py-1 ${
                isProductsActive ? 'text-[#155EEF]' : 'text-slate-600 hover:text-[#155EEF]'
              }`}
            >
              Products
            </a>

            {primaryNavLinks.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[13px] font-bold whitespace-nowrap py-1 ${
                  isLinkActive(link.href) ? 'text-[#155EEF]' : 'text-slate-600 hover:text-[#155EEF]'
                }`}
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
              onClick={() => onOpenEnquiry()}
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

            {/* Mobile Hamburger Toggle */}
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

      {/* Floating Mega-Menu Panel & Backdrop (Rendered directly under header, centered on viewport) */}
      <ProductsMegaMenu
        isOpen={productsMenuOpen}
        onClose={() => setProductsMenuOpen(false)}
        onSelectProduct={onSelectProduct}
        onRequestDemo={(productName) => onOpenEnquiry(`Demo Request: ${productName}`)}
        onMouseEnter={() => {
          if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
          }
        }}
        onMouseLeave={handleMouseLeaveProducts}
      />

      {/* ========================================================
          MOBILE NAVIGATION DRAWER (<768px)
          ======================================================== */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto">
          
          {/* Expandable Products Accordion for Mobile */}
          <div className="mb-3 border border-blue-100 bg-blue-50/40 rounded-2xl p-2.5">
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-black text-[#155EEF] tracking-wide"
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#155EEF]" />
                <span>EXPLORE PRODUCTS (9)</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileProductsOpen && (
              <div className="mt-2 pt-2 border-t border-blue-100/80 space-y-1">
                <a
                  href="#products-showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-white transition-colors"
                >
                  <span>All Software & AI Products</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#155EEF]" />
                </a>
                <a
                  href="#products-showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-[#155EEF]"
                >
                  • Drishti 360 (Visual Crop AI)
                </a>
                <a
                  href="#products-showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-[#155EEF]"
                >
                  • TaskGuard (Agile Sprint SaaS)
                </a>
                <a
                  href="#products-showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-[#155EEF]"
                >
                  • Hackademia AI Invigilator
                </a>
                <a
                  href="#products-showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-[#155EEF]"
                >
                  • AICTE Grievance Dashboard
                </a>
                <a
                  href="#products-showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-[#155EEF]"
                >
                  • ThreatHunter (Cybersecurity AI)
                </a>
                <a
                  href="#products-showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-[#155EEF]"
                >
                  • Nidhi Setu (Grant Intelligence)
                </a>
                <a
                  href="#products-showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-[#155EEF]"
                >
                  • Sizora (E-Commerce Fit Engine)
                </a>
                <a
                  href="#products-showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-[#155EEF]"
                >
                  • Curriculum Suite (Syllabus System)
                </a>
                <a
                  href="#products-showcase"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-[#155EEF]"
                >
                  • CloudGuard (Zero-Trust Gateway)
                </a>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 pb-4">
            {allNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  isLinkActive(link.href)
                    ? 'bg-blue-50 text-[#155EEF] border-blue-200'
                    : 'text-slate-700 hover:text-[#155EEF] hover:bg-slate-50 border-transparent hover:border-slate-200'
                }`}
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
              className="w-full flex items-center justify-center gap-2 h-[48px] rounded-xl bg-[#155EEF] text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-98 transition-transform"
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
