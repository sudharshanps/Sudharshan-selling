import React, { useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink, Code2, Sparkles, RefreshCw } from 'lucide-react';
import { GithubIcon } from './Icons';
import { useSettings } from '../context/SettingsContext';

interface GitHubRepo {
  id: number | string;
  name: string;
  full_name?: string;
  description?: string;
  html_url: string;
  language?: string;
  stargazers_count?: number;
  forks_count?: number;
  updated_at?: string;
}

export const GitHubShowcase: React.FC = () => {
  const { settings } = useSettings();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/github-repos');
      if (res.ok) {
        const data = await res.json();
        setRepos(data);
      }
    } catch (err) {
      console.warn("Could not load github repos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <section id="github" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold tracking-tight mb-3">
              <GithubIcon className="w-3.5 h-3.5 text-slate-900" />
              <span>LIVE GITHUB ECOSYSTEM</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
              Open-Source & Engineering Repositories
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              Verified public repositories authored by founder Sudharshan P S (@sudharshanps), featuring production AI microservices, Spring Boot backends, and full-stack solutions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchRepos}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
              title="Refresh Repositories"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <a
              href={settings.github || "https://github.com/sudharshanps"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Visit @sudharshanps on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            </a>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.slice(0, 6).map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#F8FAFC] border border-slate-200 hover:border-[#155EEF] rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#155EEF]" />
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#155EEF] transition-colors truncate max-w-[210px]">
                      {repo.name}
                    </h3>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {repo.description || "Public repository for engineering architecture, algorithms, and application source code."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#155EEF]"></span>
                  <span className="font-mono text-[11px] font-semibold text-slate-700">
                    {repo.language || "TypeScript"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-slate-600 font-medium">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    <span>{repo.stargazers_count || 0}</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <GitFork className="w-3.5 h-3.5 text-slate-400" />
                    <span>{repo.forks_count || 0}</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
