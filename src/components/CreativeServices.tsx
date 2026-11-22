import React, { useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  Upload, 
  Check, 
  ArrowRight, 
  X, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { getAssetPath } from '../utils/assetHelper';

export const CreativeServices: React.FC = () => {
  const { posters, settings } = useSettings();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [designCategory, setDesignCategory] = useState('Business Posters');
  const [designNotes, setDesignNotes] = useState('');
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
  const [referenceFile, setReferenceFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    'All',
    'Business Posters',
    'Social Media Creatives',
    'Website Designs',
    'Branding',
    'Advertisements',
    'UI/UX Designs'
  ];

  const filteredPosters = (posters || []).filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('File upload failed');
      const data = await res.json();
      setReferenceFile(data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDesignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: contactInfo.name,
          customer_email: contactInfo.email,
          customer_phone: contactInfo.phone,
          services_required: [`Creative Design: ${designCategory}`],
          project_description: designNotes,
          reference_file: referenceFile,
          preferred_communication: 'WhatsApp'
        })
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="creatives" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold tracking-tight mb-3">
              <Palette className="w-3.5 h-3.5" />
              <span>BRANDING & CREATIVE DIGITAL SERVICES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
              Marketing Banners, Posters & Brand Identity
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              Elevate your visual presence with bespoke business posters, high-converting social media creatives, UI/UX designs, and cohesive corporate branding.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all self-start md:self-end"
          >
            <Sparkles className="w-4 h-4 text-[#E53935]" />
            <span>Order a Custom Design</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posters Mockup Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosters.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-slate-200 hover:border-[#155EEF] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-card-hover"
            >
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <img 
                  src={getAssetPath(item.image)} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e: any) => {
                    e.target.src = getAssetPath("/assets/creatives/startup-launch.svg");
                  }}
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white/95 text-purple-700 text-[10px] font-bold uppercase tracking-wider border border-purple-200 shadow-sm">
                  {item.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#155EEF] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Custom tailored design</span>
                  <button
                    onClick={() => {
                      setDesignCategory(item.category);
                      setModalOpen(true);
                    }}
                    className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1"
                  >
                    <span>Order Design</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Order Custom Design Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl text-slate-900 overflow-hidden my-8">
            
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-bold text-slate-900">Order a Custom Creative Design</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Creative Design Request Received!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    We will review your visual requirements and get back to you with mockup sketches and pricing.
                  </p>
                  <a
                    href={`https://wa.me/919791495418?text=Hello%20SUDHARSHAN_TECH!%20I%20have%20submitted%20a%20design%20request%20for%20${encodeURIComponent(designCategory)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleDesignSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Creative Category
                    </label>
                    <select
                      value={designCategory}
                      onChange={(e) => setDesignCategory(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#155EEF]"
                    >
                      {categories.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                        placeholder="+91 97914 95418"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Design Description & Needs *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={designNotes}
                      onChange={(e) => setDesignNotes(e.target.value)}
                      placeholder="Describe target audience, preferred colors, copy/text, and intended format (e.g., 1080x1080 Instagram post)..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Upload Reference Image / Logo (Optional)
                    </label>
                    <label className="flex items-center justify-center gap-1.5 p-2 bg-slate-50 border border-dashed border-slate-300 hover:border-[#155EEF] rounded-xl cursor-pointer text-xs text-slate-600">
                      <Upload className="w-3.5 h-3.5 text-purple-600" />
                      <span>{isUploading ? 'Uploading...' : referenceFile ? 'File Attached ✓' : 'Attach Reference Image'}</span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-[#155EEF] hover:bg-[#1049B8] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#155EEF]/20 transition-all"
                  >
                    {submitting ? 'Submitting...' : 'Submit Design Request'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
