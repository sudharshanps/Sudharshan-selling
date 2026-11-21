import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Service, ServicePackage } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (service: Service, packageTier?: ServicePackage, customNotes?: string, fileUrl?: string, fileName?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  updatePackage: (cartItemId: string, newPackage: ServicePackage) => void;
  updateNotes: (cartItemId: string, notes: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getWhatsAppCartLink: (customNote?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'sudharshan_tech_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.warn("Could not persist cart to storage", err);
    }
  }, [cartItems]);

  const addToCart = (
    service: Service,
    packageTier?: ServicePackage,
    customNotes?: string,
    fileUrl?: string,
    fileName?: string
  ) => {
    const selectedPkg = packageTier || (service.packages && service.packages.length > 0 ? service.packages[0] : {
      name: "Starter Package",
      price: service.starting_price,
      duration: service.turnaround,
      desc: service.short_description
    });

    setCartItems(prev => {
      // Check if same service and package already exist
      const existingIdx = prev.findIndex(item => item.serviceId === service.id && item.selectedPackage.name === selectedPkg.name);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        if (customNotes) copy[existingIdx].customNotes = customNotes;
        if (fileUrl) copy[existingIdx].referenceFileUrl = fileUrl;
        if (fileName) copy[existingIdx].referenceFileName = fileName;
        return copy;
      }

      const newItem: CartItem = {
        id: `ci-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        serviceId: service.id,
        serviceTitle: service.title,
        serviceCategory: service.category,
        selectedPackage: selectedPkg,
        quantity: 1,
        customNotes: customNotes || '',
        referenceFileUrl: fileUrl,
        referenceFileName: fileName
      };
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const updatePackage = (cartItemId: string, newPackage: ServicePackage) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === cartItemId) {
        return { ...item, selectedPackage: newPackage };
      }
      return item;
    }));
  };

  const updateNotes = (cartItemId: string, notes: string) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === cartItemId) {
        return { ...item, customNotes: notes };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.selectedPackage.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Generate WhatsApp Enquiry URL with dynamic cart details
  const getWhatsAppCartLink = (customNote?: string) => {
    const phone = "919791495418";
    if (cartItems.length === 0) {
      return `https://wa.me/${phone}?text=Hello%20SUDHARSHAN_TECH,%20I%20would%20like%20to%20discuss%20a%20digital%20project.`;
    }

    const itemsSummary = cartItems.map((item, idx) => 
      `${idx + 1}. ${item.serviceTitle} (${item.selectedPackage.name}) - Qty: ${item.quantity} (₹${item.selectedPackage.price * item.quantity})`
    ).join('\n');

    let text = `Hello SUDHARSHAN_TECH,\nI would like to order the following services:\n\n${itemsSummary}\n\nEstimated Subtotal: ₹${subtotal.toLocaleString('en-IN')}`;
    if (customNote) {
      text += `\nAdditional Notes: ${customNote}`;
    }
    text += `\nPlease guide me on next steps and project onboarding.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      updatePackage,
      updateNotes,
      clearCart,
      subtotal,
      totalItems,
      isCartOpen,
      openCart,
      closeCart,
      getWhatsAppCartLink
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
