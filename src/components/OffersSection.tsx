import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Info, 
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useCart } from '../context/CartContext';
import { SpecialOffer } from '../types';

interface OffersSectionProps {
  onCustomQuote: (serviceTitle: string) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onCustomQuote }) => {
  const { offers, services } = useSettings();
  const { addToCart } = useCart();
  const [selectedOfferForDetails, setSelectedOfferForDetails] = useState<SpecialOffer | null>(null);
  const [addedOfferId, setAddedOfferId] = useState<string | null>(null);

  const handleAddToCart = (offer: SpecialOffer) => {
    // Find matching service from context
    const matchingService = services.find(s => s.id === offer.service_id) || services[0];
    
    addToCart(
      matchingService,
      {
        name: offer.title,
        price: offer.starting_price,
        duration: offer.unit === '/month' ? 'Monthly' : 'Standard Turnaround',
        desc: offer.short_description
      },
      1
    );

    setAddedOfferId(offer.id);
    setTimeout(() => setAddedOfferId(null), 2000);
  };

  return (
    <section id="offers" className="py-20 lg:py-28 bg-[#F8FAFC] border-y border-slate-200/80 relative">
      
      {/* Decorative Brand Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F0] border border-red-200/80 text-[#E53935] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E53935]" />
            <span>TRANSPARENT PRICING &amp; PACKAGES</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#172033] tracking-tight">
            EXCLUSIVE DIGITAL SOLUTION OFFERS
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Get started with smarter digital solutions at attractive starting prices.
          </p>

          {/* Pricing Policy Guarantee Banner */}
          <div className="mt-6 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start sm:items-center justify-center gap-3 text-xs text-slate-600 text-left sm:text-center">
            <Info className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>Transparent Starting Rates:</strong> All packages represent genuine baseline configurations with clearly defined scope limits. Bespoke enterprise requirements are quoted individually.
            </span>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {(offers || []).map((offer) => (
            <div 
              key={offer.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Banner Visual Top */}
                <div className="h-44 bg-slate-50 relative overflow-hidden border-b border-slate-100 flex items-center justify-center">
                  <img 
                    src={offer.banner_image} 
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e: any) => {
                      e.target.src = "/assets/offers/website-launch-offer.svg";
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 text-[#155EEF] shadow-sm border border-slate-200">
                      {offer.badge}
                    </span>
                  </div>
                </div>

                {/* Offer Body */}
                <div className="p-6">
                  
                  {/* Category & Title */}
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    {offer.category}
                  </span>
                  <h3 className="text-xl font-black text-[#172033] group-hover:text-[#155EEF] transition-colors">
                    {offer.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {offer.short_description}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Starting From</span>
                      <span className="text-2xl font-black text-[#155EEF] tracking-tight">
                        ₹{offer.starting_price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {offer.unit}
                    </span>
                  </div>

                  {/* Included Scope Checklist */}
                  <div className="mt-5 space-y-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Included In This Offer:
                    </span>
                    {(offer.features || []).slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Scope Limit & Exclusions Note */}
                  <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">
                      <strong>Scope Limits:</strong> {offer.scope_limits}
                    </span>
                  </div>

                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAddToCart(offer)}
                    className="h-11 flex items-center justify-center gap-1.5 rounded-xl bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-98 transition-all"
                  >
                    {addedOfferId === offer.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onCustomQuote(offer.title)}
                    className="h-11 flex items-center justify-center gap-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-bold text-xs shadow-sm transition-all"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#E53935]" />
                    <span>Custom Quote</span>
                  </button>
                </div>

                <button
                  onClick={() => setSelectedOfferForDetails(offer)}
                  className="w-full py-2 text-center text-xs font-bold text-slate-500 hover:text-[#155EEF] transition-colors flex items-center justify-center gap-1"
                >
                  <span>Explore Offer Scope &amp; Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Offer Details Scope Modal */}
      {selectedOfferForDetails && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-800 space-y-6 my-8 animate-in zoom-in-95 duration-150">
            
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-extrabold text-[#155EEF] uppercase tracking-wider block">
                  {selectedOfferForDetails.badge}
                </span>
                <h3 className="text-2xl font-black text-[#172033] mt-1">
                  {selectedOfferForDetails.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Starting rate: <span className="font-bold text-[#155EEF] text-sm">₹{selectedOfferForDetails.starting_price.toLocaleString('en-IN')}</span> ({selectedOfferForDetails.unit})
                </p>
              </div>
              <button
                onClick={() => setSelectedOfferForDetails(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div>
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                Deliverables Included in Baseline Package:
              </h4>
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {selectedOfferForDetails.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                Defined Scope Limits &amp; Exclusions:
              </h4>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed space-y-1.5">
                <p>• {selectedOfferForDetails.scope_limits}</p>
                <p>• Third-party fees (domain registrations, dedicated cloud hosting, paid API tokens) are billed directly via client credentials or at direct cost.</p>
                <p>• Custom integrations outside this package are scoped transparently via custom quotation.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  handleAddToCart(selectedOfferForDetails);
                  setSelectedOfferForDetails(null);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart (₹{selectedOfferForDetails.starting_price.toLocaleString('en-IN')})</span>
              </button>

              <button
                onClick={() => {
                  const title = selectedOfferForDetails.title;
                  setSelectedOfferForDetails(null);
                  onCustomQuote(title);
                }}
                className="py-3 px-5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs shadow-sm transition-all"
              >
                Request Custom Proposal
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
