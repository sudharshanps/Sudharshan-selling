import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Paperclip, 
  Check, 
  MessageSquare, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

interface CartDrawerProps {
  onProceedCheckout: (customRequirements: string, uploadedFiles: string[]) => void;
  onRequestQuoteFromCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  onProceedCheckout,
  onRequestQuoteFromCart
}) => {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    clearCart,
    getWhatsAppCartLink
  } = useCart();
  const { settings } = useSettings();

  const [generalRequirements, setGeneralRequirements] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{ url: string; name: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed. Please upload valid image, PDF or doc.');
      }

      const data = await res.json();
      setUploadedFiles(prev => [...prev, { url: data.url, name: file.name }]);
    } catch (err: any) {
      setUploadError(err.message || 'File upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCheckoutClick = () => {
    closeCart();
    const fileUrls = uploadedFiles.map(f => f.url);
    onProceedCheckout(generalRequirements, fileUrls);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 flex flex-col shadow-2xl">
          
          {/* Drawer Header */}
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#EFF4FF] text-[#155EEF]">
                <ShoppingBag className="w-5 h-5 text-[#155EEF]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Your Service Cart</h2>
                <p className="text-xs text-slate-500">
                  {cartItems.length} {cartItems.length === 1 ? 'service item' : 'service items'} selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-500 hover:text-[#E53935] transition-colors px-2 py-1 font-semibold"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={closeCart}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Explore our 8 engineering services and add the solutions your business needs.
                  </p>
                </div>
                <a
                  href="#services"
                  onClick={closeCart}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#155EEF] text-white text-xs font-bold shadow-md shadow-[#155EEF]/20"
                >
                  <span>Browse Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-[#155EEF] uppercase tracking-wider block">
                            {item.serviceCategory}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900">
                            {item.serviceTitle}
                          </h4>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-medium text-slate-600">
                            Tier: {item.selectedPackage.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-[#E53935] transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-200">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-slate-500 hover:text-slate-900 p-0.5"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-800 px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-slate-500 hover:text-slate-900 p-0.5"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-slate-500 block text-[10px]">Estimated Price</span>
                          <span className="text-sm font-black text-[#155EEF]">
                            ₹{(item.selectedPackage.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Project Specific Requirements Notes */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Project Specific Requirements</span>
                    <span className="text-[10px] text-slate-400 font-medium">Optional</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe specific features, branding preferences, preferred tech stack, or deadlines..."
                    value={generalRequirements}
                    onChange={(e) => setGeneralRequirements(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#155EEF] transition-colors resize-none"
                  />
                </div>

                {/* File Attachment Upload */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Upload Reference / Wireframes
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">PDF, PNG, JPG</span>
                  </div>

                  <label className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-slate-300 hover:border-[#155EEF] bg-white cursor-pointer text-xs text-slate-600 hover:text-slate-900 transition-all">
                    <Paperclip className="w-3.5 h-3.5 text-[#155EEF]" />
                    <span>{isUploading ? 'Uploading file...' : 'Attach Reference File'}</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </label>

                  {uploadError && (
                    <p className="text-[11px] text-[#E53935] flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      <span>{uploadError}</span>
                    </p>
                  )}

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-1 pt-1">
                      {uploadedFiles.map((f, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-700">
                          <span className="truncate max-w-[210px]">{f.name}</span>
                          <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Attached
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Transparent Notice */}
                <div className="p-3.5 rounded-xl bg-[#EFF4FF] border border-blue-200 text-[11px] text-blue-900 leading-relaxed flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
                  <span>
                    No automated card deductions. Starting prices serve as base estimates. You can pay via GPay / UPI QR or request a customized formal quotation.
                  </span>
                </div>
              </>
            )}

          </div>

          {/* Drawer Footer with Calculations & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Selected Services:</span>
                  <span className="font-semibold text-slate-900">{cartItems.length}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1 border-t border-slate-200">
                  <span>Estimated Subtotal:</span>
                  <span className="text-base text-[#155EEF]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Primary: Continue to Checkout */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 rounded-xl bg-[#155EEF] hover:bg-[#1049B8] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#155EEF]/25 transition-all transform active:scale-98"
              >
                <span>Continue to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Options */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    closeCart();
                    onRequestQuoteFromCart();
                  }}
                  className="py-2 px-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-[11px] font-bold text-slate-700 transition-colors"
                >
                  Custom Quotation
                </button>

                <a
                  href={getWhatsAppCartLink(generalRequirements)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold text-emerald-700 flex items-center justify-center gap-1 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enquire Cart</span>
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
