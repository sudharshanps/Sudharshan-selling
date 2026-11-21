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

interface CreativeServicesProps {
  onOrderDesignClick?: (category?: string) => void;
}

export const CreativeServices: React.FC<CreativeServicesProps> = () => {
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
    <section id="creatives" className="py-20 bg-[#080d1a] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3">
              <Palette className="w-3.5 h-3.5" />
              <span>BRANDING & CREATIVE DIGITAL SERVICES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Marketing Banners, Posters & Brand Identity
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Elevate your visual presence with bespoke business posters, high-converting social media creatives, UI/UX designs, and cohesive corporate branding.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-all self-start md:self-end"
          >
            <Sparkles className="w-4 h-4" />
            <span>Order a Custom Design</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
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
              className="group bg-[#0c1527] border border-slate-800 hover:border-purple-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/20"
            >
              <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e: any) => {
                    e.target.src = "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1527] via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/90 text-purple-300 text-[10px] font-bold uppercase tracking-wider border border-purple-500/30">
                  {item.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Custom tailored design</span>
                  <button
                    onClick={() => {
                      setDesignCategory(item.category);
                      setModalOpen(true);
                    }}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 group-hover:underline"
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#0c1527] border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 overflow-hidden my-8">
            
            <div className="px-5 py-4 border-b border-slate-800 bg-[#080d1a] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Order a Custom Creative Design</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Creative Design Request Received!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    We will review your visual requirements and get back to you with mockup sketches and pricing.
                  </p>
                  <a
                    href={`https://wa.me/919791495418?text=Hello%20SUDHARSHAN_TECH!%20I%20have%20submitted%20a%20design%20request%20for%20${encodeURIComponent(designCategory)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleDesignSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Creative Category
                    </label>
                    <select
                      value={designCategory}
                      onChange={(e) => setDesignCategory(e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                    >
                      {categories.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200"
                        placeholder="+91 97914 95418"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Design Description & Needs *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={designNotes}
                      onChange={(e) => setDesignNotes(e.target.value)}
                      placeholder="Describe target audience, preferred colors, copy/text, and intended format (e.g., 1080x1080 Instagram post)..."
                      className="w-full p-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Upload Reference Image / Logo (Optional)
                    </label>
                    <label className="flex items-center justify-center gap-1.5 p-2 bg-slate-900 border border-dashed border-slate-700 hover:border-purple-500 rounded-xl cursor-pointer text-xs text-slate-400">
                      <Upload className="w-3.5 h-3.5 text-purple-400" />
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
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
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
