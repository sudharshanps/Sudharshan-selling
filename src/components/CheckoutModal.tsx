import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  QrCode, 
  Upload, 
  FileText, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRequirements?: string;
  initialFiles?: string[];
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialRequirements = '',
  initialFiles = []
}) => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { settings } = useSettings();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [customRequirements, setCustomRequirements] = useState(initialRequirements);
  const [paymentMethod, setPaymentMethod] = useState<'upi_qr' | 'quote_request'>('upi_qr');
  const [transactionRef, setTransactionRef] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

  // Status & Submission State
  const [isUploadingProof, setIsUploadingProof] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(settings.upi_id || "sudharshanthemagnet@okaxis");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(subtotal.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleScreenshotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingProof(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Could not upload payment screenshot');
      const data = await res.json();
      setScreenshotUrl(data.url);
    } catch (err: any) {
      setErrorMessage(err.message || 'Screenshot upload failed');
    } finally {
      setIsUploadingProof(false);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName || !customerEmail || !customerPhone) {
      setErrorMessage('Please fill in your name, email and phone number.');
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty. Please select services before checking out.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        business_name: businessName,
        billing_address: billingAddress,
        items: cartItems.map(item => ({
          service_id: item.serviceId,
          service_title: item.serviceTitle,
          package_name: item.selectedPackage.name,
          price: item.selectedPackage.price,
          quantity: item.quantity,
          custom_notes: item.customNotes
        })),
        total_amount: subtotal,
        payment_method: paymentMethod,
        custom_requirements: customRequirements,
        reference_files: initialFiles,
        transaction_ref: transactionRef || null,
        payment_proof: screenshotUrl || null
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit order');
      }

      setCompletedOrder(data.order);
      clearCart();

      // Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Error submitting order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl text-slate-900 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EFF4FF] border border-[#155EEF]/30 text-[#155EEF] flex items-center justify-center font-bold text-xs">
              ST
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {completedOrder ? 'Order Confirmation' : 'Checkout & Payment'}
              </h3>
              <p className="text-xs text-slate-500">
                SUDHARSHAN_TECH Digital Services Platform
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          
          {completedOrder ? (
            /* Order Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-[#EFF4FF] border border-blue-200 text-[#155EEF] text-xs font-bold uppercase tracking-wider">
                  Order Successfully Placed
                </span>
                <h4 className="text-2xl font-black text-slate-900 mt-2">
                  Thank You, {completedOrder.customer_name}!
                </h4>
                <p className="text-slate-600 text-sm mt-1">
                  Your Unique Order ID:{' '}
                  <span className="font-mono font-bold text-[#155EEF] text-base">
                    {completedOrder.id}
                  </span>
                </p>
              </div>

              {/* Status Banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Payment Status:</span>
                  <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 font-bold border border-amber-200">
                    {completedOrder.payment_status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Order Status:</span>
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#155EEF] font-bold border border-blue-200">
                    {completedOrder.order_status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200">
                  <span className="text-slate-500 font-medium">Estimated Total:</span>
                  <span className="text-base font-extrabold text-slate-900">
                    ₹{completedOrder.total_amount?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900 text-left space-y-1">
                <p className="font-bold text-slate-900">What happens next?</p>
                <p>1. Instant email confirmation sent to <strong>{completedOrder.customer_email}</strong>.</p>
                <p>2. SMS and email alert dispatched to company founder Sudharshan P S (+91 97914 95418).</p>
                <p>3. Your project will be reviewed and verified in the admin portal.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/919791495418?text=Hello%20SUDHARSHAN_TECH!%20I%20have%20placed%20Order%20${completedOrder.id}%20(Name:%20${encodeURIComponent(completedOrder.customer_name)}).%20Please%20confirm%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Track on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-[#E53935] flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 text-[#E53935] shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Customer Information */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#155EEF] mb-3">
                  1. Customer & Billing Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Full Name <span className="text-[#E53935]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#155EEF] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Email Address <span className="text-[#E53935]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#155EEF] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Phone Number (WhatsApp) <span className="text-[#E53935]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 97914 95418"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#155EEF] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Company / Business Name
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Innovations"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#155EEF] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Billing / City Address
                  </label>
                  <input
                    type="text"
                    placeholder="City, State, Country"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#155EEF] focus:bg-white"
                  />
                </div>
              </div>

              {/* 2. Order Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#155EEF] mb-3">
                  2. Order Summary
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{item.serviceTitle}</span>
                        <span className="text-slate-500 block text-[11px]">
                          Tier: {item.selectedPackage.name} (Qty: {item.quantity})
                        </span>
                      </div>
                      <span className="font-extrabold text-[#155EEF]">
                        ₹{(item.selectedPackage.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-extrabold text-slate-900">
                    <span>Total Estimated Amount:</span>
                    <span className="text-lg text-[#155EEF]">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* 3. Payment Method Choice */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#155EEF] mb-3">
                  3. Select Payment / Processing Method
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Google Pay / UPI QR Option */}
                  <label 
                    onClick={() => setPaymentMethod('upi_qr')}
                    className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                      paymentMethod === 'upi_qr'
                        ? 'bg-[#EFF4FF] border-[#155EEF] shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-[#155EEF]" />
                        <span>Google Pay / UPI QR</span>
                      </span>
                      {paymentMethod === 'upi_qr' && <Check className="w-4 h-4 text-[#155EEF]" />}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Scan exact official GPay QR with any UPI app (GPay, PhonePe, Paytm).
                    </p>
                  </label>

                  {/* Request Custom Quotation Option */}
                  <label 
                    onClick={() => setPaymentMethod('quote_request')}
                    className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                      paymentMethod === 'quote_request'
                        ? 'bg-[#EFF4FF] border-[#155EEF] shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#155EEF]" />
                        <span>Request Custom Quotation</span>
                      </span>
                      {paymentMethod === 'quote_request' && <Check className="w-4 h-4 text-[#155EEF]" />}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      ₹0 upfront. Receive a formal scope breakdown and customized milestone quote.
                    </p>
                  </label>
                </div>

                {/* EXACT GPay QR Display (Redesigned per Section 7) */}
                {paymentMethod === 'upi_qr' && (
                  <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      
                      {/* Exact Uploaded GPay QR Image with Crisp White Quiet Zone */}
                      <div className="w-48 h-48 sm:w-44 sm:h-44 bg-white p-2.5 rounded-2xl shadow-md border border-slate-200 flex items-center justify-center shrink-0">
                        <img 
                          src="/assets/gpay-qr.jpg" 
                          alt="Official SUDHARSHAN P S GPay QR Code" 
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="space-y-2.5 text-left w-full">
                        <div className="inline-block px-2.5 py-1 rounded-md bg-[#EFF4FF] text-[#155EEF] font-bold text-[11px] uppercase tracking-wider">
                          SCAN & PAY USING GPAY / ANY UPI APP
                        </div>
                        
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Merchant / Founder Account:</p>
                          <p className="text-sm font-bold text-slate-900">SUDHARSHAN P S</p>
                        </div>

                        {/* Copyable UPI ID */}
                        <div>
                          <p className="text-xs text-slate-500 font-medium">UPI ID:</p>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs font-mono font-bold text-slate-800">
                              {settings.upi_id || "sudharshanthemagnet@okaxis"}
                            </code>
                            <button
                              type="button"
                              onClick={handleCopyUpi}
                              className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs flex items-center gap-1 font-semibold"
                              title="Copy UPI ID"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[10px]">{copiedUpi ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Copyable Amount */}
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Payable Amount:</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-black text-[#155EEF]">
                              ₹{subtotal.toLocaleString('en-IN')}
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyAmount}
                              className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs flex items-center gap-1 font-semibold"
                              title="Copy Amount"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[10px]">{copiedAmount ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* UTR Input & Screenshot Upload */}
                    <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Transaction ID / UTR Number
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 412389102931"
                          value={transactionRef}
                          onChange={(e) => setTransactionRef(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#155EEF] font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Upload Payment Screenshot
                        </label>
                        <label className="flex items-center justify-center gap-1.5 p-2 bg-white border border-dashed border-slate-300 hover:border-[#155EEF] rounded-xl cursor-pointer text-xs text-slate-600 transition-colors">
                          <Upload className="w-3.5 h-3.5 text-[#155EEF]" />
                          <span className="truncate">
                            {isUploadingProof ? 'Uploading...' : screenshotUrl ? 'Screenshot Attached ✓' : 'Attach Screenshot'}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleScreenshotUpload}
                            disabled={isUploadingProof}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Strict Verification Guard Notice */}
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 flex items-start gap-2">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Verification Policy:</strong> Your payment will be verified before your order is marked as paid. Orders remain in <em>Pending Verification</em> until confirmed by administrative review.
                      </span>
                    </div>

                  </div>
                )}

              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-[#155EEF] hover:bg-[#1049B8] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#155EEF]/25 transition-all transform active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : paymentMethod === 'upi_qr' ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>I Have Paid & Submit Order (₹{subtotal.toLocaleString('en-IN')})</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      <span>Submit Request for Custom Quotation</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
