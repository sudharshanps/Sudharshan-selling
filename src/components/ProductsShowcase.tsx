import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  ExternalLink, 
  Code2, 
  ShieldCheck, 
  Cpu, 
  Cloud, 
  Briefcase,
  Zap,
  Clock,
  Eye
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { productsData } from '../data/products';
import { ProductItem, ProductCategory } from '../types';
import { BrandedProjectImage } from './BrandedProjectImage';

interface ProductsShowcaseProps {
  onSelectProduct: (product: ProductItem) => void;
  onRequestDemo: (productName: string) => void;
}

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({
  onSelectProduct,
  onRequestDemo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All Products');

  const categories: ProductCategory[] = [
    'All Products',
    'SaaS Platforms',
    'AI Solutions',
    'Business Management',
    'Cybersecurity Tools',
    'Automation Products',
    'Coming Soon',
  ];

  const filteredProducts = productsData.filter((product) => {
    if (selectedCategory === 'All Products') return true;
    if (selectedCategory === 'Coming Soon') return product.category === 'Coming Soon' || product.status === 'In Development';
    return product.category === selectedCategory;
  });

  const getStatusBadge = (status: string) => {
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
    <section id="products-showcase" className="py-20 bg-white relative border-b border-slate-200">
      {/* Anchor for nav links linking to #products */}
      <div id="products" className="absolute -top-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            SECTION HEADER
            ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#155EEF] text-xs font-black tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#155EEF]" />
            <span>SUDHARSHAN_TECH Products</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Built to Solve Real Business Challenges.
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Explore the software platforms, intelligent tools and digital products developed by SUDHARSHAN_TECH to simplify operations, improve productivity and enable growth.
          </p>
        </div>

        {/* ========================================================
            CATEGORY FILTER PILLS
            ======================================================== */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const count = productsData.filter((p) => {
              if (cat === 'All Products') return true;
              if (cat === 'Coming Soon') return p.category === 'Coming Soon' || p.status === 'In Development';
              return p.category === cat;
            }).length;

            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20 translate-y-[-1px]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            PRODUCTS RESPONSIVE GRID (3 Cols Desktop, 2 Tablet, 1 Mobile)
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-[#155EEF] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 relative"
            >
              {/* Product Preview Image & Status Badges */}
              <div>
                <div 
                  onClick={() => onSelectProduct(product)}
                  className="relative h-44 sm:h-48 w-full bg-slate-900 rounded-xl overflow-hidden mb-4 border border-slate-200 cursor-pointer group-hover:border-[#155EEF]/50 shadow-sm"
                >
                  <BrandedProjectImage 
                    src={product.preview_image || product.thumbnail} 
                    alt={`${product.name} Architecture Preview`} 
                    title={product.name}
                    category={product.category}
                    tagline={product.tagline}
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-sm border border-slate-200 text-[10px] font-extrabold uppercase tracking-wider text-[#155EEF] shadow-sm">
                    {product.category}
                  </span>
                  <span className={`absolute top-2.5 right-2.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border shadow-sm ${getStatusBadge(product.status)}`}>
                    {product.status}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF]" />
                    <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                  {product.badge && (
                    <span className="text-[10px] font-bold text-[#155EEF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Title and Tagline */}
                <h3 className="text-lg font-black text-slate-900 group-hover:text-[#155EEF] transition-colors tracking-tight leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs font-semibold text-[#155EEF] mt-0.5">
                  {product.tagline}
                </p>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {product.short_description}
                </p>

                {/* Key Feature Bullets */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  {product.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#155EEF] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {product.tech_stack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold border border-slate-200/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="flex-1 h-[40px] flex items-center justify-center gap-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-[#155EEF] border border-slate-200 hover:border-blue-200 font-bold text-xs transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-[#155EEF]" />
                  <span>Explore Details</span>
                </button>

                <button
                  onClick={() => onRequestDemo(product.name)}
                  className="h-[40px] px-3.5 flex items-center justify-center gap-1 rounded-xl bg-[#155EEF] hover:bg-[#1049B8] text-white font-bold text-xs shadow-sm active:scale-98 transition-all shrink-0"
                  title="Request Live Demo"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E53935]" />
                  <span>Demo</span>
                </button>

                {product.github && (
                  <a
                    href={product.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-[40px] w-[40px] flex items-center justify-center rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors shrink-0"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
