import React, { useState, useEffect } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductsShowcase } from './components/ProductsShowcase';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ServicesSection } from './components/ServicesSection';
import { OffersSection } from './components/OffersSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GitHubShowcase } from './components/GitHubShowcase';
import { FounderProfile } from './components/FounderProfile';
import { CreativeServices } from './components/CreativeServices';
import { CustomProjectForm } from './components/CustomProjectForm';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { MobileNav } from './components/MobileNav';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProductItem } from './types';

export function AppContent() {
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
  });

  // Modal States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [presetServiceForEnquiry, setPresetServiceForEnquiry] = useState<string | undefined>(undefined);
  const [cartRequirements, setCartRequirements] = useState('');
  const [cartFiles, setCartFiles] = useState<string[]>([]);

  // Product Detail Modal State
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setIsAdminView(window.location.pathname.startsWith('/admin') || window.location.hash === '#admin');
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleOpenAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSite = () => {
    window.history.pushState({}, '', '/');
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomQuote = (serviceTitle: string) => {
    setPresetServiceForEnquiry(serviceTitle);
    setIsEnquiryModalOpen(true);
  };

  const handleProceedCheckoutFromCart = (requirements: string, files: string[]) => {
    setCartRequirements(requirements);
    setCartFiles(files);
    setIsCheckoutOpen(true);
  };

  const handleRequestQuoteFromCart = () => {
    setIsCheckoutOpen(true);
  };

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
  };

  const handleRequestDemo = (productName: string) => {
    setPresetServiceForEnquiry(`Demo Request: ${productName}`);
    setIsEnquiryModalOpen(true);
  };

  if (isAdminView) {
    return <AdminDashboard onBackToSite={handleBackToSite} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white antialiased">
      
      {/* Top Sticky Navbar with Interactive Products Mega-Menu */}
      <Navbar 
        onOpenEnquiry={(preset) => {
          setPresetServiceForEnquiry(preset);
          setIsEnquiryModalOpen(true);
        }}
        onOpenAdmin={handleOpenAdmin}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero 
          onStartProject={() => {
            setPresetServiceForEnquiry(undefined);
            setIsEnquiryModalOpen(true);
          }}
        />

        {/* 2. Flagship Portfolio Projects Showcase */}
        <ProjectShowcase />

        {/* 3. Dedicated Products Showcase Section (#products-showcase) */}
        <ProductsShowcase 
          onSelectProduct={handleSelectProduct}
          onRequestDemo={handleRequestDemo}
        />

        {/* 4. Official 8 Services Marketplace */}
        <ServicesSection 
          onCustomQuote={handleCustomQuote}
        />

        {/* 5. Exclusive Digital Solution Offers */}
        <OffersSection 
          onCustomQuote={handleCustomQuote}
        />

        {/* 6. Why Choose SUDHARSHAN_TECH Technology Pillars */}
        <WhyChooseUs />

        {/* 7. Live GitHub Ecosystem & Tech Stack */}
        <GitHubShowcase />

        {/* 8. Founder Profile & Academic/Internship Achievements */}
        <FounderProfile />

        {/* 9. Creative Design Gallery & Posters */}
        <CreativeServices />

        {/* 10. Dedicated Customer Project Request Form */}
        <CustomProjectForm />

        {/* 11. Frequently Asked Questions (FAQ) Accordion */}
        <FAQSection />

        {/* 12. Contact Office & Interactive Location */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* Swiggy-Inspired Slide-Over Cart Drawer */}
      <CartDrawer 
        onProceedCheckout={handleProceedCheckoutFromCart}
        onRequestQuoteFromCart={handleRequestQuoteFromCart}
      />

      {/* Interactive Checkout & Payment Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialRequirements={cartRequirements}
        initialFiles={cartFiles}
      />

      {/* Standalone Custom Project Request Modal */}
      <CustomProjectForm 
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        presetService={presetServiceForEnquiry}
      />

      {/* Deep-Dive Interactive Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestDemo={handleRequestDemo}
      />

      {/* Floating Action Elements */}
      <FloatingWhatsApp />
      <MobileNav />

    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </SettingsProvider>
  );
}
