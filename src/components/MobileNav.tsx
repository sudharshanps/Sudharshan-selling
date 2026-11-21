import React from 'react';
import { Home, Layers, Briefcase, ShoppingBag, UserCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileNav: React.FC = () => {
  const { totalItems, openCart } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 items-center">
        
        {/* Home */}
        <a 
          href="#" 
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-[#155EEF] active:text-[#155EEF] transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Home</span>
        </a>

        {/* Our Work */}
        <a 
          href="#projects" 
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-[#155EEF] active:text-[#155EEF] transition-colors"
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Work</span>
        </a>

        {/* Services */}
        <a 
          href="#services" 
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-[#155EEF] active:text-[#155EEF] transition-colors"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Services</span>
        </a>

        {/* Cart with Swiggy Badge */}
        <button 
          onClick={openCart}
          className="relative flex flex-col items-center justify-center py-1 text-slate-500 hover:text-[#155EEF] active:text-[#155EEF] transition-colors"
        >
          <div className="relative">
            <div className="p-1 rounded-full bg-blue-50 text-[#155EEF]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E53935] text-white font-extrabold text-[9.5px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-[#155EEF] mt-0.5">Cart</span>
        </button>

        {/* Profile */}
        <a 
          href="#founder" 
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-[#155EEF] active:text-[#155EEF] transition-colors"
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Founder</span>
        </a>

      </div>
    </nav>
  );
};
