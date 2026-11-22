import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Laptop
} from 'lucide-react';

interface BrandedProjectImageProps {
  src?: string;
  alt: string;
  title: string;
  category?: string;
  tagline?: string;
  className?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain';
  priority?: boolean;
}

export const BrandedProjectImage: React.FC<BrandedProjectImageProps> = ({
  src,
  alt,
  title,
  category = "Digital Solution",
  tagline,
  className = "",
  containerClassName = "",
  objectFit = "cover",
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(!src);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);

  // Pick a contextual icon based on category
  const getCategoryIcon = () => {
    const cat = (category || "").toLowerCase();
    if (cat.includes('cyber') || cat.includes('security')) return <ShieldCheck className="w-8 h-8 text-[#00D2FF]" />;
    if (cat.includes('ai') || cat.includes('vision') || cat.includes('intel')) return <Cpu className="w-8 h-8 text-[#00D2FF]" />;
    if (cat.includes('web') || cat.includes('portal') || cat.includes('full-stack')) return <Code2 className="w-8 h-8 text-[#60A5FA]" />;
    if (cat.includes('saas') || cat.includes('enterprise')) return <Layers className="w-8 h-8 text-[#10B981]" />;
    return <Laptop className="w-8 h-8 text-[#60A5FA]" />;
  };

  const handleImageError = () => {
    // If the image fails, switch directly to branded SVG fallback card
    setHasError(true);
    setIsLoaded(true);
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-900 select-none ${containerClassName}`}>
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <Sparkles className="w-5 h-5 text-[#155EEF] animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Loading Preview...</span>
          </div>
        </div>
      )}

      {/* Actual Image if available and not errored */}
      {!hasError && currentSrc ? (
        <img
          src={currentSrc}
          alt={alt || title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full transition-all duration-500 ${
            objectFit === 'contain' ? 'object-contain' : 'object-cover'
          } ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } group-hover:scale-105 ${className}`}
        />
      ) : (
        /* Branded Fallback Card: Blue, Cyan & White Technology Card */
        <div className="w-full h-full relative flex flex-col justify-between p-5 bg-gradient-to-br from-[#0B132B] via-[#0F172A] to-[#1C2541] border border-slate-800 text-white">
          {/* Subtle Ambient Glow and Grid Lines */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#155EEF]/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00D2FF]/15 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top Bar: Watermark + Category */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-[#155EEF]/30 border border-[#155EEF]/50 text-[10px] font-extrabold uppercase tracking-wider text-[#60A5FA]">
              {category}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping"></span>
              <span>SUDHARSHAN_TECH</span>
            </div>
          </div>

          {/* Center Graphic */}
          <div className="relative z-10 flex items-center gap-3 my-auto">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
              {getCategoryIcon()}
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-snug line-clamp-1">
                {title}
              </h4>
              <p className="text-[11px] text-[#00D2FF] font-medium line-clamp-1 mt-0.5">
                {tagline || "Enterprise Digital Solution"}
              </p>
            </div>
          </div>

          {/* Bottom Bar: Tech Specs Stamp */}
          <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[9.5px] font-mono text-slate-400">
            <span>VERIFIED ARCHITECTURE</span>
            <span className="text-[#60A5FA] font-bold">100% PRODUCTION READY</span>
          </div>
        </div>
      )}
    </div>
  );
};
