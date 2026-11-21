import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Globe, 
  Send, 
  ExternalLink, 
  CheckCircle2, 
  Copy,
  Sparkles,
  Share2
} from 'lucide-react';
import { GithubIcon, InstagramIcon } from './Icons';
import { useSettings } from '../context/SettingsContext';

export const ContactSection: React.FC = () => {
  const { settings } = useSettings();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'New Project Collaboration',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: 'New Project Collaboration', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShareWebsite = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SUDHARSHAN_TECH | Code. Create. Elevate.',
        text: 'Explore premium digital services and custom software from SUDHARSHAN_TECH.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#080d1a] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>CONNECT WITH SUDHARSHAN_TECH</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Let's Build Something Exceptional Together
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Reach out directly for project quotations, architectural consulting, or custom business solutions. Every channel connects directly to our engineering desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone & WhatsApp Card */}
            <div className="bg-[#0c1527] border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Direct Phone & WhatsApp
                  </span>
                  <a 
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-base font-bold text-white hover:text-blue-400 transition-colors block mt-1"
                    title="Click to dial"
                  >
                    {settings.phone}
                  </a>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <a
                      href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-blue-400 hover:underline font-medium"
                    >
                      Call Phone
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href={`https://wa.me/${(settings.whatsapp || "919791495418").replace(/[^0-9]/g, '')}?text=Hello%20SUDHARSHAN_TECH!%20I%20would%20like%20to%20connect.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-medium"
                    >
                      Open WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-[#0c1527] border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Official Email
                  </span>
                  <a 
                    href={`mailto:${settings.email}`}
                    className="text-sm sm:text-base font-bold text-white hover:text-cyan-400 transition-colors block mt-1 break-all"
                  >
                    {settings.email}
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Direct response within 12 business hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Office Address & Google Maps Card */}
            <div className="bg-[#0c1527] border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Registered Office Address
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 leading-relaxed">
                    {settings.address}
                  </p>
                  <a
                    href={settings.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 hover:underline mt-2.5"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Social Ecosystem Links */}
            <div className="bg-[#0c1527] border border-slate-800 rounded-2xl p-5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                Digital Presence & Portfolios
              </span>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={settings.instagram || "https://www.instagram.com/sudharshan_tech/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/40 text-slate-300 hover:text-pink-400 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Instagram</span>
                </a>

                <a
                  href={settings.github || "https://github.com/sudharshanps"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={settings.website || "https://sudharshan-tech.onrender.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-blue-400 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Portfolio</span>
                </a>
              </div>

              {/* Share Website Button */}
              <button
                onClick={handleShareWebsite}
                className="mt-3 w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 border border-slate-800 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share SUDHARSHAN_TECH'}</span>
              </button>
            </div>

          </div>

          {/* Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#0c1527] border border-slate-800 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Have an inquiry or custom requirement? Fill out the form below.
            </p>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Delivered!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you for reaching out. We have received your inquiry and will reply to your email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full p-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full p-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 97914 95418"
                      className="w-full p-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Inquiries, Partnerships..."
                      className="w-full p-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your requirements, project questions, or digital aspirations..."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all active:scale-98 disabled:opacity-50"
                >
                  {submitting ? 'Sending Message...' : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
