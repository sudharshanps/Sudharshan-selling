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
  CheckCircle,
  Heart,
  Eye,
  ArrowRight
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
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeDetailService, setActiveDetailService] = useState<Service | null>(null);

  const categories = [
    'All', 
    'Web & Digital', 
    'Mobile', 
    'Artificial Intelligence', 
    'Enterprise Software', 
    'Security', 
    'Infrastructure', 
    'Cloud Products', 
    'Ongoing Support'
  ];

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

    // Trigger visual feedback animation
    setAddedAnimation(prev => ({ ...prev, [service.id]: true }));
    setTimeout(() => {
      setAddedAnimation(prev => ({ ...prev, [service.id]: false }));
    }, 1800);
  };

  const toggleWishlist = (serviceId: string) => {
    setWishlist(prev => 
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    );
  };

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
    <section id="services" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF4FF] border border-[#155EEF]/20 text-[#155EEF] text-xs font-bold tracking-tight mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIAL SERVICES MARKETPLACE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Browse, Customise & Order Digital Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select high-impact engineering services for your business. Choose a standard starting tier, add custom features, or request a full bespoke quotation.
          </p>

          {/* Pricing Disclaimer Note */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <Info className="w-4 h-4 text-[#155EEF] shrink-0" />
            <span>
              <strong>Transparent Pricing:</strong> "Starting from" rates shown. Final quote is customized according to features, integrations, and delivery SLA.
            </span>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#155EEF] text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
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
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#155EEF] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* 8 Distinct Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const currentPkg = selectedPackages[service.id] || (service.packages && service.packages[0]);
            const isAdded = addedAnimation[service.id];
            const inCartCount = cartItems.filter(i => i.serviceId === service.id).reduce((s, i) => s + i.quantity, 0);
            const isWishlisted = wishlist.includes(service.id);

            return (
              <div 
                key={service.id}
                className="group relative bg-white border border-slate-200 hover:border-[#155EEF] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-card-hover"
              >
                {/* Top Section with Distinct Service Visual */}
                <div>
                  
                  {/* Service Visual Image */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <img 
                      src={service.image || "/assets/services/web-development.svg"} 
                      alt={`${service.title} Service Visual`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Category Pill */}
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-[#155EEF] shadow-sm">
                      {service.category}
                    </span>

                    {/* Badge */}
                    {service.badge && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#E53935] text-white text-[10px] font-bold shadow-sm">
                        {service.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(service.id);
                      }}
                      className="absolute bottom-3 right-3 p-1.5 rounded-full bg-white/90 text-slate-400 hover:text-[#E53935] transition-colors shadow-sm"
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#E53935] text-[#E53935]' : ''}`} />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-[#155EEF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {service.short_description}
                    </p>

                    {/* Price Banner */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-slate-500 font-medium">Starting from</span>
                        <div className="text-right">
                          <span className="text-xl font-black text-[#155EEF]">
                            ₹{(currentPkg ? currentPkg.price : service.starting_price).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-500 block font-medium">
                            {service.unit}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#155EEF]" />
                          <span>Est: {currentPkg ? currentPkg.duration : service.turnaround}</span>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-emerald-700 font-semibold">100% Quality SLA</span>
                      </div>
                    </div>

                    {/* Package Selector Pills */}
                    {service.packages && service.packages.length > 1 && (
                      <div className="mb-4">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Choose Package Tier:
                        </label>
                        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                          {service.packages.map((pkg) => (
                            <button
                              key={pkg.name}
                              type="button"
                              onClick={() => handleSelectPackage(service.id, pkg)}
                              className={`py-1 px-1 rounded-lg text-[10px] font-bold truncate transition-all ${
                                currentPkg && currentPkg.name === pkg.name
                                  ? 'bg-[#155EEF] text-white shadow-sm'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                              title={`${pkg.name}: ₹${pkg.price.toLocaleString('en-IN')}`}
                            >
                              {pkg.name.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1 italic">
                          {currentPkg?.desc}
                        </p>
                      </div>
                    )}

                    {/* Key Deliverables Checkmarks */}
                    <div className="space-y-1.5 mb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Key Features Included:
                      </p>
                      {service.deliverables.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight text-[11px]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Action Buttons (Consistent Alignment & Spacing) */}
                <div className="p-5 pt-0 space-y-2">
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(service)}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-98 ${
                      isAdded
                        ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                        : 'bg-[#155EEF] hover:bg-[#1049B8] text-white shadow-[#155EEF]/20'
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

                  {/* View Details & Custom Quote & WhatsApp Row */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onCustomQuote(service.title)}
                      className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[11px] font-semibold text-slate-700 hover:text-slate-900 transition-colors truncate"
                      title="Request a customized quote for this service"
                    >
                      Custom Quote
                    </button>

                    <a
                      href={getServiceWhatsAppUrl(service)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1.5 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold text-emerald-700 flex items-center justify-center gap-1 transition-colors"
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
