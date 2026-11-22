import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Upload, 
  Check, 
  CheckCircle2, 
  MessageSquare, 
  Mail, 
  Phone,
  AlertCircle,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSettings } from '../context/SettingsContext';

interface CustomProjectFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  presetService?: string;
}

export const CustomProjectForm: React.FC<CustomProjectFormProps> = ({ 
  isOpen = false, 
  onClose,
  presetService 
}) => {
  const { settings } = useSettings();

  const [customerName, setCustomerName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(
    presetService ? [presetService] : ['Web Development']
  );
  const [projectDescription, setProjectDescription] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('Flexible / Open to Quote');
  const [timeline, setTimeline] = useState('Standard (2-4 Weeks)');
  const [preferredCommunication, setPreferredCommunication] = useState<'WhatsApp' | 'Email' | 'Phone'>('WhatsApp');
  const [referenceFile, setReferenceFile] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<any | null>(null);

  const allServices = [
    'Web Development',
    'Mobile App Development',
    'AI Solutions & Automation',
    'Custom Software & ERP',
    'Cybersecurity & Hardening',
    'Cloud & DevOps',
    'SaaS Development',
    'IT Maintenance & Support',
    'Branding & Poster Creatives'
  ];

  const handleToggleService = (srv: string) => {
    setSelectedServices(prev => 
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setReferenceFile(data.url);
    } catch (err: any) {
      setErrorMessage(err.message || 'File upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName || !customerEmail || !customerPhone || !projectDescription) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: customerName,
          email: customerEmail,
          phone: customerPhone,
          company_name: businessName || null,
          service: selectedServices.join(', '),
          project_budget: estimatedBudget,
          message: projectDescription + (timeline ? `\n[Timeline: ${timeline}]` : '') + (referenceFile ? `\n[Reference File: ${referenceFile}]` : ''),
          source: 'custom_project_modal'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setSubmittedEnquiry(data.inquiry || data.enquiry || { id: data.inquiryId, customer_name: customerName, customer_email: customerEmail });
      confetti({ particleCount: 70, spread: 50, origin: { y: 0.5 } });
    } catch (err: any) {
      setErrorMessage(err.message || 'Error sending enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-slate-900 shadow-xl">
      
      {submittedEnquiry ? (
        <div className="text-center py-6 space-y-5">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-[#EFF4FF] text-[#155EEF] font-bold text-xs uppercase tracking-wider">
              Enquiry Dispatched Successfully
            </span>
            <h4 className="text-2xl font-black text-slate-900 mt-2">
              Thank You, {submittedEnquiry.customer_name}!
            </h4>
            <p className="text-sm text-slate-600 mt-1">
              Your Unique Enquiry Reference:{' '}
              <span className="font-mono font-bold text-[#155EEF]">
                {submittedEnquiry.id}
              </span>
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-1.5 text-slate-700">
            <p>• An instant confirmation email has been dispatched to <strong>{submittedEnquiry.customer_email}</strong>.</p>
            <p>• Company founder Sudharshan P S (+91 97914 95418) has been notified.</p>
            <p>• We will prepare a detailed proposal & timeline estimate within 24 hours.</p>
          </div>

          {/* Quick Contact Options */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <a
              href={`https://wa.me/919791495418?text=Hello%20SUDHARSHAN_TECH!%20I%20have%20submitted%20project%20enquiry%20${submittedEnquiry.id}.%20Can%20we%20discuss%20further?`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>

            <a
              href={`mailto:${settings.email}?subject=Project Enquiry ${submittedEnquiry.id}`}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email SUDHARSHAN_TECH</span>
            </a>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-800 pt-2 block mx-auto underline font-medium"
            >
              Close this window
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#155EEF]" />
                <span>Start Your Custom Project</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tell us about your digital requirements and receive an engineering proposal.
              </p>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-[#E53935] flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 text-[#E53935] shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Customer Name <span className="text-[#E53935]">*</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#155EEF] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Business / Company Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Acme Innovations"
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
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="john@example.com"
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
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+91 97914 95418"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#155EEF] focus:bg-white"
              />
            </div>
          </div>

          {/* Services Required (Multi-Select Chips) */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Services Required (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {allServices.map((srv) => (
                <button
                  key={srv}
                  type="button"
                  onClick={() => handleToggleService(srv)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedServices.includes(srv)
                      ? 'bg-[#155EEF] text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900'
                  }`}
                >
                  {selectedServices.includes(srv) && <span className="mr-1">✓</span>}
                  {srv}
                </button>
              ))}
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Project Description & Requirements <span className="text-[#E53935]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Outline what you want to build, user goals, feature ideas, and any reference websites..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#155EEF] focus:bg-white resize-none"
            />
          </div>

          {/* Budget, Timeline & Preferred Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Estimated Budget
              </label>
              <select
                value={estimatedBudget}
                onChange={(e) => setEstimatedBudget(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              >
                <option value="Under ₹5,000">Under ₹5,000</option>
                <option value="₹5,000 – ₹15,000">₹5,000 – ₹15,000</option>
                <option value="₹15,000 – ₹35,000">₹15,000 – ₹35,000</option>
                <option value="₹35,000 – ₹75,000+">₹35,000 – ₹75,000+</option>
                <option value="Flexible / Open to Quote">Flexible / Open to Quote</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Expected Timeline
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              >
                <option value="Urgent (< 1 Week)">Urgent (&lt; 1 Week)</option>
                <option value="Standard (2-4 Weeks)">Standard (2-4 Weeks)</option>
                <option value="1-2 Months">1-2 Months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Preferred Channel
              </label>
              <select
                value={preferredCommunication}
                onChange={(e: any) => setPreferredCommunication(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone Call</option>
              </select>
            </div>
          </div>

          {/* Reference File Upload */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Attach Reference Document / Wireframes (Optional)
            </label>
            <label className="flex items-center justify-center gap-2 p-2.5 bg-slate-50 border border-dashed border-slate-300 hover:border-[#155EEF] rounded-xl cursor-pointer text-xs text-slate-600">
              <Upload className="w-4 h-4 text-[#155EEF]" />
              <span>{isUploading ? 'Uploading file...' : referenceFile ? 'File Uploaded Successfully ✓' : 'Upload PDF, DOC, or Image (Max 15MB)'}</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-[#155EEF] hover:bg-[#1049B8] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#155EEF]/20 transition-all transform active:scale-98 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Submitting Enquiry...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Custom Project Request</span>
              </>
            )}
          </button>

        </form>
      )}

    </div>
  );

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl my-8">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="custom-project" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
};
