import React, { useState, useEffect } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProjectShowcase } from './components/ProjectShowcase';
import { GitHubShowcase } from './components/GitHubShowcase';
import { FounderProfile } from './components/FounderProfile';
import { CreativeServices } from './components/CreativeServices';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomProjectForm } from './components/CustomProjectForm';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminDashboard } from './pages/AdminDashboard';

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

  if (isAdminView) {
    return <AdminDashboard onBackToSite={handleBackToSite} />;
  }

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        onOpenEnquiry={() => {
          setPresetServiceForEnquiry(undefined);
          setIsEnquiryModalOpen(true);
        }}
        onOpenAdmin={handleOpenAdmin}
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

        {/* 2. Official Services Marketplace */}
        <ServicesSection 
          onCustomQuote={handleCustomQuote}
        />

        {/* 3. Flagship Projects Showcase */}
        <ProjectShowcase />

        {/* 4. Live GitHub Ecosystem */}
        <GitHubShowcase />

        {/* 5. Founder Profile & Achievements */}
        <FounderProfile />

        {/* 6. Creative Digital Services & Posters */}
        <CreativeServices />

        {/* 7. Why Choose Us */}
        <WhyChooseUs />

        {/* 8. Dedicated Custom Project Request Form */}
        <CustomProjectForm />

        {/* 9. Contact Office & Interactive Map */}
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
