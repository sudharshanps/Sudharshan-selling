import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  CheckCircle, 
  X,
  Code,
  ShieldAlert
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { useSettings } from '../context/SettingsContext';
import { PortfolioProject } from '../types';

export const ProjectShowcase: React.FC = () => {
  const { projects } = useSettings();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'AI & AgriTech', 'AI & Full-Stack', 'Enterprise Software', 'Education & Java', 'Web Development', 'Cybersecurity & AI'];

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

  return (
    <section id="projects" className="py-20 bg-[#070c18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PRODUCTION SHOWCASE & CASE STUDIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Engineered for Impact: Flagship Projects
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Explore authentic prototypes, enterprise dashboards, and AI systems engineered by founder Sudharshan P S and SUDHARSHAN_TECH.
            </p>
          </div>

          {/* Carousel Left/Right Buttons */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white font-semibold shadow-md shadow-cyan-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div 
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="w-[320px] sm:w-[380px] shrink-0 snap-start bg-[#0c1527] border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/30"
            >
              {/* Project Image / Visual Mockup */}
              <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e: any) => {
                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1527] via-transparent to-transparent"></div>
                
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  {project.category}
                </span>

                {project.featured && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-blue-600/90 text-white text-[10px] font-semibold">
                    Featured
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-cyan-300 font-medium mb-2.5">
                    {project.tagline}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(project.tech_stack || []).slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-300">
                        {tech}
                      </span>
                    ))}
                    {(project.tech_stack || []).length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 text-[10px] text-slate-500">
                        +{(project.tech_stack || []).length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Links Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                    <span className="text-cyan-400 font-semibold group-hover:underline flex items-center gap-1">
                      <span>View Details</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
                        title="Open GitHub Repository"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detailed Project Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#0c1527] border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 overflow-hidden my-8">
            
            {/* Modal Image Header */}
            <div className="relative h-60 w-full bg-slate-900">
              <img 
                src={activeProject.image} 
                alt={activeProject.title} 
                className="w-full h-full object-cover"
                onError={(e: any) => {
                  e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1527] via-[#0c1527]/40 to-transparent"></div>
              
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
                  {activeProject.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {activeProject.title}
                </h3>
                <p className="text-sm text-cyan-200 mt-0.5">
                  {activeProject.tagline}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Project Overview & Architecture
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Highlights */}
              {activeProject.highlights && activeProject.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Innovations & Deliverables
                  </h4>
                  <div className="space-y-2">
                    {activeProject.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technology Stack Badges */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(activeProject.tech_stack || []).map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links Action Row */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
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
                    className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Live Project</span>
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
