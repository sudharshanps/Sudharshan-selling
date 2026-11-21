import React from 'react';
import { Home, Layers, Briefcase, ShoppingBag, UserCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MobileNavProps {
  activeTab?: string;
}

export const MobileNav: React.FC<MobileNavProps> = () => {
  const { totalItems, openCart } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#080d1a]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-5 items-center">
        
        {/* Home */}
        <a 
          href="#" 
          className="flex flex-col items-center justify-center py-1 text-slate-400 hover:text-blue-400 active:text-blue-500 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Home</span>
        </a>

        {/* Services */}
        <a 
          href="#services" 
          className="flex flex-col items-center justify-center py-1 text-slate-400 hover:text-blue-400 active:text-blue-500 transition-colors"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Services</span>
        </a>

        {/* Cart with Swiggy Badge */}
        <button 
          onClick={openCart}
          className="relative flex flex-col items-center justify-center py-1 text-slate-400 hover:text-blue-400 active:text-blue-500 transition-colors"
        >
          <div className="relative">
            <div className="p-1.5 rounded-full bg-blue-600/20 text-blue-400">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold text-blue-400 mt-0.5">Cart</span>
        </button>

        {/* Projects */}
        <a 
          href="#projects" 
          className="flex flex-col items-center justify-center py-1 text-slate-400 hover:text-blue-400 active:text-blue-500 transition-colors"
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Projects</span>
        </a>

        {/* Profile / Contact */}
        <a 
          href="#founder" 
          className="flex flex-col items-center justify-center py-1 text-slate-400 hover:text-blue-400 active:text-blue-500 transition-colors"
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Founder</span>
        </a>

      </div>
    </nav>
  );
};
