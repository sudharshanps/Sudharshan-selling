import React, { useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Cloud, 
  Rocket, 
  Wrench, 
  Check, 
  Plus, 
  Clock, 
  Info, 
  MessageSquare, 
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useCart } from '../context/CartContext';
import { Service, ServicePackage } from '../types';

interface ServicesSectionProps {
  onCustomQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onCustomQuote }) => {
  const { services } = useSettings();
  const { addToCart, cartItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPackages, setSelectedPackages] = useState<{ [serviceId: string]: ServicePackage }>({});
  const [addedAnimation, setAddedAnimation] = useState<{ [serviceId: string]: boolean }>({});

  const iconMap: { [key: string]: React.ReactNode } = {
    Globe: <Globe className="w-6 h-6 text-blue-400" />,
    Smartphone: <Smartphone className="w-6 h-6 text-cyan-400" />,
    Cpu: <Cpu className="w-6 h-6 text-purple-400" />,
    Layers: <Layers className="w-6 h-6 text-indigo-400" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    Cloud: <Cloud className="w-6 h-6 text-sky-400" />,
    Rocket: <Rocket className="w-6 h-6 text-amber-400" />,
    Wrench: <Wrench className="w-6 h-6 text-teal-400" />,
  };

  const categories = ['All', 'Web & Digital', 'Mobile', 'Artificial Intelligence', 'Enterprise Software', 'Security', 'Infrastructure', 'Cloud Products', 'Ongoing Support'];

  const filteredServices = (services || []).filter(service => {
    const matchesCat = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.short_description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectPackage = (serviceId: string, pkg: ServicePackage) => {
    setSelectedPackages(prev => ({ ...prev, [serviceId]: pkg }));
  };

  const handleAddToCart = (service: Service) => {
    const chosenPkg = selectedPackages[service.id] || (service.packages && service.packages[0]);
    addToCart(service, chosenPkg);

    // Trigger visual check animation
    setAddedAnimation(prev => ({ ...prev, [service.id]: true }));
    setTimeout(() => {
      setAddedAnimation(prev => ({ ...prev, [service.id]: false }));
    }, 1800);
  };

  // WhatsApp enquiry for specific service
  const getServiceWhatsAppUrl = (service: Service) => {
    let msg = `Hello SUDHARSHAN_TECH! I am interested in your ${service.title} service. Please share details and pricing for my project.`;
    if (service.title.includes("Web")) {
      msg = "Hello SUDHARSHAN_TECH, I would like to discuss a website development project.";
    } else if (service.title.includes("Cyber")) {
      msg = "Hello SUDHARSHAN_TECH, I am interested in your cybersecurity services.";
    } else if (service.title.includes("AI")) {
      msg = "Hello SUDHARSHAN_TECH, I would like to explore AI and automation solutions for my business.";
    }
    return `https://wa.me/919791495418?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="services" className="py-20 bg-[#080e1e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIAL SERVICES MARKETPLACE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Browse, Customise & Order Digital Solutions
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Select high-impact engineering services for your business. Choose a standard starting tier, add custom features, or request a full bespoke quotation.
          </p>

          {/* Pricing Disclaimer Note */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300">
            <Info className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              <strong>Note:</strong> Starting prices shown. Final pricing depends on project scope, custom integrations and timeline requirements.
            </span>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const currentPkg = selectedPackages[service.id] || (service.packages && service.packages[0]);
            const isAdded = addedAnimation[service.id];
            const inCartCount = cartItems.filter(i => i.serviceId === service.id).reduce((s, i) => s + i.quantity, 0);

            return (
              <div 
                key={service.id}
                className="group relative bg-[#0c1527] border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/15"
              >
                {/* Card Top: Category, Badge & Icon */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-blue-500/30 transition-colors">
                      {iconMap[service.icon] || <Layers className="w-6 h-6 text-blue-400" />}
                    </div>
                    {service.badge && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Short Desc */}
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {service.short_description}
                  </p>

                  {/* Price Banner */}
                  <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800/80 mb-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] text-slate-400">Starting from</span>
                      <div className="text-right">
                        <span className="text-lg font-black text-white text-blue-400">
                          ₹{(currentPkg ? currentPkg.price : service.starting_price).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          {service.unit}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>Est: {currentPkg ? currentPkg.duration : service.turnaround}</span>
                      </span>
                      <span className="text-slate-500">•</span>
                      <span>Verified Tech</span>
                    </div>
                  </div>

                  {/* Package Selector Pills (if multiple packages available) */}
                  {service.packages && service.packages.length > 1 && (
                    <div className="mb-4">
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Choose Tier / Scope:
                      </label>
                      <div className="grid grid-cols-3 gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
                        {service.packages.map((pkg) => (
                          <button
                            key={pkg.name}
                            type="button"
                            onClick={() => handleSelectPackage(service.id, pkg)}
                            className={`py-1 px-1 rounded text-[10px] font-medium truncate transition-all ${
                              currentPkg && currentPkg.name === pkg.name
                                ? 'bg-blue-600 text-white font-semibold shadow-sm'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                            title={`${pkg.name}: ₹${pkg.price.toLocaleString('en-IN')}`}
                          >
                            {pkg.name.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 italic">
                        {currentPkg?.desc}
                      </p>
                    </div>
                  )}

                  {/* Key Deliverables */}
                  <div className="space-y-1.5 mb-5">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Included Deliverables:
                    </p>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-tight text-[11px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(service)}
                    className={`w-full py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98 ${
                      isAdded
                        ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <CheckCircle className="w-4 h-4 animate-bounce" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add to Cart {inCartCount > 0 ? `(${inCartCount})` : ''}</span>
                      </>
                    )}
                  </button>

                  {/* Custom Quote & WhatsApp Row */}
                  <div className="grid grid-cols-2 gap-2">
                    
                    <button
                      onClick={() => onCustomQuote(service.title)}
                      className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-medium text-slate-300 hover:text-white transition-colors truncate"
                      title="Request a customized quote for this service"
                    >
                      Custom Quote
                    </button>

                    <a
                      href={getServiceWhatsAppUrl(service)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1 transition-colors"
                      title="Enquire on WhatsApp with pre-filled message"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
