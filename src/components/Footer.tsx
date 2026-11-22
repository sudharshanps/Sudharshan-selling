import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  ArrowUp,
  Shield
} from 'lucide-react';
import { GithubIcon, InstagramIcon } from './Icons';
import { useSettings } from '../context/SettingsContext';
import { getAssetPath } from '../utils/assetHelper';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { settings } = useSettings();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F8FAFC] border-t border-slate-200 text-slate-600 text-xs relative pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 p-0.5 bg-white shadow-sm">
                <img 
                  src={getAssetPath(settings.logo_image || "/assets/logo.jpg")} 
                  alt="SUDHARSHAN_TECH Logo" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <span className="font-black text-lg text-slate-900 tracking-tight">
                  SUDHARSHAN<span className="text-[#155EEF]">_TECH</span>
                </span>
                <p className="text-[11px] text-[#155EEF] font-bold tracking-wider">
                  {settings.tagline || "Code. Create. Elevate."}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Premium digital services marketplace delivering custom web applications, mobile software, applied AI automation, and cybersecurity solutions for ambitious businesses.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={settings.instagram || "https://www.instagram.com/sudharshan_tech/"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-pink-600 transition-colors shadow-sm"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={settings.github || "https://github.com/sudharshanps"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={settings.website || "https://sudharshan-tech.onrender.com/"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#155EEF] transition-colors shadow-sm"
                title="Portfolio"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#155EEF] transition-colors">Home</a></li>
              <li><a href="#products-showcase" className="hover:text-[#155EEF] transition-colors">Software &amp; AI Products</a></li>
              <li><a href="#projects" className="hover:text-[#155EEF] transition-colors">Our Work &amp; Projects</a></li>
              <li><a href="#services" className="hover:text-[#155EEF] transition-colors">Services Marketplace</a></li>
              <li><a href="#offers" className="hover:text-[#155EEF] transition-colors">Exclusive Offers &amp; Bundles</a></li>
              <li><a href="#github" className="hover:text-[#155EEF] transition-colors">GitHub Repositories</a></li>
              <li><a href="#founder" className="hover:text-[#155EEF] transition-colors">Founder &amp; Profile</a></li>
              <li><a href="#creatives" className="hover:text-[#155EEF] transition-colors">Creative Designs</a></li>
              <li><a href="#contact" className="hover:text-[#155EEF] transition-colors">Contact Office</a></li>
            </ul>
          </div>

          {/* Services Shortcuts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Core Services
            </h4>
            <ul className="space-y-2 text-[11.5px]">
              <li><a href="#services" className="hover:text-[#155EEF] transition-colors">Web Development (from ₹1,199)</a></li>
              <li><a href="#services" className="hover:text-[#155EEF] transition-colors">Mobile App Dev (from ₹4,999)</a></li>
              <li><a href="#services" className="hover:text-[#155EEF] transition-colors">AI & Automation (from ₹2,999)</a></li>
              <li><a href="#services" className="hover:text-[#155EEF] transition-colors">Custom Software & ERP (from ₹2,999)</a></li>
              <li><a href="#services" className="hover:text-[#155EEF] transition-colors">Cybersecurity (from ₹1,999)</a></li>
              <li><a href="#services" className="hover:text-[#155EEF] transition-colors">Cloud & DevOps (from ₹1,999)</a></li>
              <li><a href="#services" className="hover:text-[#155EEF] transition-colors">SaaS Development (from ₹8,999)</a></li>
              <li><a href="#services" className="hover:text-[#155EEF] transition-colors">IT Support (from ₹299/mo)</a></li>
            </ul>
          </div>

          {/* Office Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Registered Office
            </h4>
            <div className="space-y-2 text-[11px] leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#155EEF] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-slate-900 font-semibold">
                  {settings.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-slate-900 break-all font-semibold">
                  {settings.email}
                </a>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200 transition-colors shadow-sm"
              >
                <Shield className="w-3.5 h-3.5 text-[#155EEF]" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11.5px] text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-800">SUDHARSHAN_TECH</strong>. All Rights Reserved. Tagline: <em>Code. Create. Elevate.</em>
          </div>

          <div className="flex items-center gap-4 font-medium">
            <span>Coimbatore, Tamil Nadu, India</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1 shadow-sm font-semibold"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
