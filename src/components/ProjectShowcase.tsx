import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  CheckCircle, 
  X,
  Code2,
  ArrowRight,
  Eye
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { useSettings } from '../context/SettingsContext';
import { PortfolioProject } from '../types';

export const ProjectShowcase: React.FC = () => {
  const { projects } = useSettings();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    'All',
    'AI & AgriTech',
    'AI & Full-Stack',
    'Enterprise Software',
    'Education & Java',
    'Web Development',
    'Cybersecurity & AI'
  ];

  const filteredProjects = (projects || []).filter(p => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory || p.category.includes(selectedCategory.split(' ')[0]);
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Auto-scroll carousel with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="projects" className="py-20 bg-[#F8FAFC] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading directly matching Section 4 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#E53935] text-xs font-bold tracking-tight mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E53935]" />
              <span>OUR WORK. OUR INNOVATION.</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
              Explore Flagship Digital Solutions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              Explore the digital products, platforms and solutions developed by SUDHARSHAN_TECH.
            </p>
          </div>

          {/* Carousel Next/Prev Navigation Buttons */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#155EEF] text-slate-700 hover:text-[#155EEF] shadow-sm transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#155EEF] text-slate-700 hover:text-[#155EEF] shadow-sm transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Project Carousel with Auto-slide & Pause on Hover */}
        <div 
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="w-[320px] sm:w-[380px] shrink-0 snap-start bg-white border border-slate-200 hover:border-[#155EEF] rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer group transition-all duration-300 shadow-sm hover:shadow-card-hover"
            >
              {/* Project Image Container */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e: any) => {
                    e.target.src = "/assets/products/drishti-360.svg";
                  }}
                />
                
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[10.5px] font-bold uppercase tracking-wider text-[#155EEF] shadow-sm">
                  {project.category}
                </span>

                {project.featured && (
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md bg-[#E53935] text-white text-[10px] font-bold shadow-sm">
                    Featured
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#155EEF] transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#155EEF] font-semibold mb-2">
                    {project.tagline}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(project.tech_stack || []).slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10.5px] font-medium text-slate-700">
                        {tech}
                      </span>
                    ))}
                    {(project.tech_stack || []).length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-500 font-medium">
                        +{(project.tech_stack || []).length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Action Buttons */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span className="text-[#155EEF] font-bold flex items-center gap-1 group-hover:underline">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Project</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center gap-1 font-semibold text-[11px]"
                          title="Open GitHub Repository"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}

                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 rounded-lg bg-[#EFF4FF] hover:bg-blue-100 text-[#155EEF] transition-colors flex items-center gap-1 font-semibold text-[11px]"
                          title="Open Live Deployment"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detailed Project Modal with Deep Technical Case Study */}
      {activeProject && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl text-slate-900 overflow-hidden my-8">
            
            {/* Modal Image Header */}
            <div className="relative h-64 w-full bg-slate-100">
              <img 
                src={activeProject.image} 
                alt={activeProject.title} 
                className="w-full h-full object-cover"
                onError={(e: any) => {
                  e.target.src = "/assets/products/taskguard.svg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-2.5 py-1 rounded bg-[#155EEF] text-white text-[10.5px] font-bold uppercase tracking-wider">
                  {activeProject.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-2">
                  {activeProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 mt-0.5">
                  {activeProject.tagline}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto text-slate-700">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Project Overview & Architecture
                </h4>
                <p className="text-sm leading-relaxed text-slate-700">
                  {activeProject.description}
                </p>
              </div>

              {/* Highlights */}
              {activeProject.highlights && activeProject.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Features & Technical Innovations
                  </h4>
                  <div className="space-y-2">
                    {activeProject.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(activeProject.tech_stack || []).map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links Action Row */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View GitHub Repository</span>
                  </a>
                )}

                {activeProject.demo_url && (
                  <a
                    href={activeProject.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#155EEF] hover:bg-[#1049B8] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#155EEF]/20 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Live Demo</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
