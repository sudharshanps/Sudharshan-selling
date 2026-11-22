import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Cloud, 
  Briefcase, 
  ShieldCheck, 
  Zap, 
  Clock, 
  ExternalLink,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { productsData } from '../data/products';
import { ProductItem, ProductCategory } from '../types';
import { getAssetPath } from '../utils/assetHelper';

interface ProductsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onRequestDemo: (productName: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ProductsMegaMenu: React.FC<ProductsMegaMenuProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onRequestDemo,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All Products');
  const [hoveredProduct, setHoveredProduct] = useState<ProductItem | null>(null);

  if (!isOpen) return null;

  // Categories with matching icons
  const categories: { label: ProductCategory; icon: React.ReactNode }[] = [
    { label: 'All Products', icon: <Layers className="w-4 h-4" /> },
    { label: 'SaaS Platforms', icon: <Cloud className="w-4 h-4" /> },
    { label: 'AI Solutions', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Business Management', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Cybersecurity Tools', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Automation Products', icon: <Zap className="w-4 h-4" /> },
    { label: 'Coming Soon', icon: <Clock className="w-4 h-4" /> },
  ];

  // Filter products by active category
  const filteredProducts = productsData.filter((p) => {
    if (activeCategory === 'All Products') return true;
    if (activeCategory === 'Coming Soon') return p.category === 'Coming Soon' || p.status === 'In Development';
    return p.category === activeCategory;
  });

  // Default spotlight product
  const spotlightProduct = hoveredProduct || productsData.find(p => p.spotlight) || productsData[0];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Live Production':
      case 'Production Ready':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Live Prototype':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Enterprise MVP':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Top 50 Finalist':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'In Development':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <>
      {/* 1. Backdrop Overlay (Dismiss on outside click, dims page slightly behind mega menu) */}
      <div 
        className="fixed inset-0 top-[60px] sm:top-[68px] bg-slate-900/20 backdrop-blur-[2px] z-40 transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Floating Mega-Menu Panel (Centered on viewport, strictly beneath header) */}
      <div 
        className="fixed top-[62px] sm:top-[70px] left-1/2 -translate-x-1/2 w-[min(960px,calc(100vw-2rem))] max-h-[min(540px,calc(100vh-85px))] bg-white/98 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/20 z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150 flex flex-col overflow-hidden"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="grid grid-cols-12 divide-x divide-slate-100 flex-1 min-h-0 overflow-hidden">
          
          {/* ========================================================
              SECTION 1: Product Categories (Left - 3 cols / fixed width)
              ======================================================== */}
          <div className="col-span-3 bg-slate-50/70 p-3.5 sm:p-4 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 mb-2 text-[10.5px] font-black uppercase tracking-wider text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-[#155EEF]" />
                <span>Catalog By Domain</span>
              </div>

              <div className="space-y-1">
                {categories.map((cat) => {
                  const count = productsData.filter((p) => {
                    if (cat.label === 'All Products') return true;
                    if (cat.label === 'Coming Soon') return p.category === 'Coming Soon' || p.status === 'In Development';
                    return p.category === cat.label;
                  }).length;

                  const isActive = activeCategory === cat.label;

                  return (
                    <button
                      key={cat.label}
                      onMouseEnter={() => setActiveCategory(cat.label)}
                      onClick={() => setActiveCategory(cat.label)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all text-left ${
                        isActive
                          ? 'bg-white text-[#155EEF] shadow-sm border border-slate-200/80 font-extrabold translate-x-1'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`shrink-0 ${isActive ? 'text-[#155EEF]' : 'text-slate-400'}`}>
                          {cat.icon}
                        </span>
                        <span className="truncate">{cat.label}</span>
                      </div>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${
                        isActive ? 'bg-blue-50 text-[#155EEF]' : 'text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/60 mt-3">
              <a
                href="#products-showcase"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#155EEF] hover:text-[#1049B8] bg-blue-50/70 hover:bg-blue-100/80 rounded-xl transition-colors group"
              >
                <span>Explore All Products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* ========================================================
              SECTION 2: Filtered Products List (Center - 5 cols)
              ======================================================== */}
          <div className="col-span-5 p-3.5 sm:p-4 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-extrabold text-slate-800 tracking-tight">
                  {activeCategory} ({filteredProducts.length})
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  Hover to spotlight
                </span>
              </div>

              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {filteredProducts.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    onMouseEnter={() => setHoveredProduct(product)}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className={`group p-2.5 rounded-xl border transition-all cursor-pointer ${
                      spotlightProduct.id === product.id
                        ? 'bg-blue-50/50 border-blue-200 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                          <img 
                            src={getAssetPath(product.thumbnail)} 
                            alt={`${product.name} icon`} 
                            className="w-4 h-4 object-contain"
                            onError={(e: any) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-[#155EEF] transition-colors leading-tight truncate">
                            {product.name}
                          </h4>
                          <p className="text-[10px] font-medium text-slate-500 truncate">
                            {product.category}
                          </p>
                        </div>
                      </div>

                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded border whitespace-nowrap shrink-0 ${getStatusBadgeClass(product.status)}`}>
                        {product.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-1 mt-1.5">
                      {product.short_description}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100/80">
                      <div className="flex items-center gap-1 overflow-hidden">
                        {product.tech_stack.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded truncate">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-[#155EEF] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 shrink-0 ml-1">
                        Explore <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredProducts.length > 4 && (
              <div className="pt-2">
                <a
                  href="#products-showcase"
                  onClick={onClose}
                  className="text-[11px] font-bold text-slate-500 hover:text-[#155EEF] flex items-center justify-center gap-1 py-1"
                >
                  +{filteredProducts.length - 4} more products in {activeCategory}
                </a>
              </div>
            )}
          </div>

          {/* ========================================================
              SECTION 3: Featured Product Spotlight Card (Right - 4 cols)
              ======================================================== */}
          <div className="col-span-4 bg-gradient-to-br from-blue-50/50 via-white to-slate-50/50 p-3.5 sm:p-4 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-[#155EEF] text-[9.5px] font-black uppercase tracking-wider">
                  <Sparkles className="w-2.5 h-2.5" />
                  Featured Spotlight
                </span>
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${getStatusBadgeClass(spotlightProduct.status)}`}>
                  {spotlightProduct.status}
                </span>
              </div>

              <div className="mt-1.5">
                <div className="relative h-20 w-full bg-slate-900 rounded-lg overflow-hidden border border-slate-200/80 mb-1.5 shadow-sm">
                  <img 
                    src={getAssetPath(spotlightProduct.preview_image || spotlightProduct.thumbnail)} 
                    alt={`${spotlightProduct.name} Preview`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-black text-slate-900 tracking-tight leading-snug">
                  {spotlightProduct.name}
                </h3>
                <p className="text-[10.5px] font-semibold text-[#155EEF] mt-0.5 line-clamp-1">
                  {spotlightProduct.tagline}
                </p>
                <p className="text-[10.5px] text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                  {spotlightProduct.full_description}
                </p>
              </div>

              {/* Capability Bullets */}
              <div className="mt-2.5 space-y-1 bg-white/80 rounded-xl p-2.5 border border-slate-200/80">
                <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                  Core Capabilities
                </span>
                {spotlightProduct.features.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[10.5px] text-slate-700 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-[#155EEF] shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="mt-3 pt-2.5 border-t border-slate-200/70 space-y-2">
              <button
                onClick={() => {
                  onSelectProduct(spotlightProduct);
                  onClose();
                }}
                className="w-full h-[36px] flex items-center justify-center gap-1.5 rounded-xl bg-[#155EEF] hover:bg-[#1049B8] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-98"
              >
                <span>Explore Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  onRequestDemo(spotlightProduct.name);
                  onClose();
                }}
                className="w-full h-[34px] flex items-center justify-center gap-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E53935]" />
                <span>Request Live Demo</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
