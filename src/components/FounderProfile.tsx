import React from 'react';
import { 
  Download, 
  Award, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Mail,
  Cpu,
  Code
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useSettings } from '../context/SettingsContext';

export const FounderProfile: React.FC = () => {
  const { settings, achievements } = useSettings();

  const technicalSkills = [
    { category: "Languages", items: ["Python", "Java", "C++", "JavaScript", "SQL"] },
    { category: "Frameworks & Libraries", items: ["React.js", "FastAPI", "Flask", "Node.js", "OpenCV", "MediaPipe", "Scikit-learn", "REST APIs"] },
    { category: "Cybersecurity", items: ["OWASP Top 10", "Network Security", "Threat Analysis", "Vulnerability Assessment", "SIEM", "Incident Response"] },
    { category: "Tools & Cloud", items: ["Git", "GitHub", "Docker", "MySQL", "PostgreSQL", "Linux", "ESP32", "Figma", "AWS Basics"] },
  ];

  const internships = [
    {
      role: "UI/UX Design Intern",
      company: "Technico Laboratory Products Pvt. Ltd., Chennai",
      period: "May 2026 – Jun 2026",
      desc: "Designed responsive website interfaces and UI concepts for laboratory product lines. Produced professional business quotations and client-facing presentations."
    },
    {
      role: "UI/UX Design Intern",
      company: "Future Interns (Remote)",
      period: "Mar 2026 – Apr 2026",
      desc: "Designed responsive UI/UX prototypes for CRM dashboards and booking applications in Figma, delivering 15+ high-fidelity wireframes."
    },
    {
      role: "Junior Software Developer Intern",
      company: "Yuva Intern (Remote)",
      period: "Jan 2026 – Feb 2026",
      desc: "Built and debugged application features in Python and JavaScript within an Agile sprint workflow from ticket to code review."
    },
    {
      role: "Cybersecurity Content Intern",
      company: "XECUREONE (Remote)",
      period: "Jun 2026 – Jul 2026",
      desc: "Authored cybersecurity awareness content covering phishing techniques, OWASP Top 10 vulnerabilities, and emerging CVE attack trends."
    }
  ];

  const certifications = [
    { title: "Prompt Engineering for Developers", issuer: "Vanderbilt University" },
    { title: "Cybersecurity Threat Vectors", issuer: "Microsoft" },
    { title: "Introduction to AI", issuer: "Google" },
    { title: "Cybersecurity Analyst Job Simulation", issuer: "Tata (Forage)" },
    { title: "UX Design Job Simulation", issuer: "Lloyds Banking Group (Forage)" },
  ];

  return (
    <section id="founder" className="py-20 bg-[#070c18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Founder Bio Card */}
        <div className="bg-[#0c1527] border border-slate-800 rounded-3xl p-6 sm:p-10 mb-16 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            
            {/* Founder Avatar & Quick Bio */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left shrink-0">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-blue-500/40 p-1 bg-slate-900 shadow-xl mb-4">
                <img 
                  src={settings.logo_image || "/assets/logo.jpg"} 
                  alt="Sudharshan P S" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                SUDHARSHAN P S
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-blue-400 mt-0.5">
                Founder – SUDHARSHAN_TECH
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
                Cyber Security Student | AI & Full-Stack Developer | Entrepreneur
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-4">
                <a
                  href={settings.github || "https://github.com/sudharshanps"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={settings.linkedin || "https://linkedin.com/in/sudharshan-ps-5a6b9a325"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 transition-colors"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Functional Resume Download Button */}
              <a
                href="/assets/Sudharshan_PS_Resume.pdf"
                download="Sudharshan_PS_Resume.pdf"
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Verified Resume</span>
              </a>
            </div>

            {/* Founder Summary & Education */}
            <div className="flex-1 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  Professional Background
                </span>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  B.E. Computer Science & Engineering (Cyber Security) student with a verified <strong className="text-white">8.5/10 CGPA</strong> at Sri Krishna College of Engineering and Technology, Coimbatore. Hands-on experience spanning applied machine learning, computer vision, IoT systems, full-stack web platforms, and cybersecurity vulnerability analysis.
                </p>
              </div>

              {/* Verified Education Box */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">
                      B.E. Computer Science & Engineering (Cyber Security)
                    </h4>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-semibold">
                      2024 – 2028 | CGPA: 8.5/10.0
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Sri Krishna College of Engineering and Technology (SKCET), Coimbatore, Tamil Nadu
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP, Cybersecurity Fundamentals, Artificial Intelligence
                  </p>
                </div>
              </div>

              {/* Technical Expertise Matrix */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Technical Expertise Matrix
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {technicalSkills.map((skillGroup, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <span className="text-xs font-semibold text-blue-400 block mb-1.5">
                        {skillGroup.category}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {skillGroup.items.map((skill, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-slate-300 border border-slate-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Section 2: Experience Timeline & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Professional Internships */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold mb-4">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>INTERNSHIP EXPERIENCE</span>
            </div>
            <h3 className="text-xl font-extrabold text-white mb-6">
              Industry Experience & Internships
            </h3>

            <div className="space-y-4 relative border-l border-slate-800 pl-4 ml-2">
              {internships.map((intern, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-[#070c18]"></div>
                  <div className="bg-[#0c1527] border border-slate-800/80 rounded-xl p-4 transition-all hover:border-blue-500/40">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        {intern.role}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 shrink-0 font-medium">
                        {intern.period}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-cyan-300 mb-2">
                      {intern.company}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {intern.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathons, Leadership & Certifications */}
          <div className="space-y-8">
            
            {/* Hackathon Wins & Leadership */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-4">
                <Award className="w-3.5 h-3.5" />
                <span>HACKATHON PARTICIPATION & LEADERSHIP</span>
              </div>
              <h3 className="text-xl font-extrabold text-white mb-4">
                Honors & Academic Recognition
              </h3>

              <div className="space-y-3">
                <div className="bg-[#0c1527] border border-slate-800 rounded-xl p-4">
                  <span className="text-xs font-bold text-amber-400 block">
                    🏆 Top 50 Finalist (500+ Project Teams)
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    Hackademia National AI Hackathon (2026)
                  </p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Built Hackademia — an AI online proctoring system using OpenCV face tracking and violation detection.
                  </p>
                </div>

                <div className="bg-[#0c1527] border border-slate-800 rounded-xl p-4">
                  <span className="text-xs font-bold text-cyan-400 block">
                    🥈 2nd Runner-Up
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    Tex-Research Hackathon, YUGAM (2026)
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Recognized for high-impact prototype engineering during prestigious regional technical festival.
                  </p>
                </div>

                <div className="bg-[#0c1527] border border-slate-800 rounded-xl p-4">
                  <span className="text-xs font-bold text-blue-400 block">
                    🛡️ Active Contributor & Peer Mentor
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    Cybersecurity Club, SKCET
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Conducting hands-on peer workshops on OWASP Top 10 vulnerabilities, secure coding, and network reconnaissance.
                  </p>
                </div>
              </div>
            </div>

            {/* Verified Certifications */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Verified Technical Certifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">
                        {cert.title}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
