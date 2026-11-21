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
  const { settings } = useSettings();

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
    <section id="founder" className="py-20 bg-[#F8FAFC] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Founder Bio Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 mb-16 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            
            {/* Founder Avatar & Quick Bio */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left shrink-0">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-slate-200 p-1 bg-white shadow-sm mb-4">
                <img 
                  src={settings.logo_image || "/assets/logo.jpg"} 
                  alt="Sudharshan P S - Founder" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                SUDHARSHAN P S
              </h3>
              <p className="text-xs sm:text-sm font-bold text-[#155EEF] mt-0.5">
                Founder – SUDHARSHAN_TECH
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-[240px]">
                Cyber Security Student | AI & Full-Stack Developer | Entrepreneur
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2.5 mt-4">
                <a
                  href={settings.github || "https://github.com/sudharshanps"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={settings.linkedin || "https://linkedin.com/in/sudharshan-ps-5a6b9a325"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#155EEF] hover:border-slate-300 transition-colors"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#155EEF] hover:border-slate-300 transition-colors"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Functional Resume Download Button */}
              <a
                href="/assets/Sudharshan_PS_Resume.pdf"
                download="Sudharshan_PS_Resume.pdf"
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#155EEF] hover:bg-[#1049B8] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#155EEF]/20 transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Verified Resume</span>
              </a>
            </div>

            {/* Founder Summary & Education */}
            <div className="flex-1 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] block mb-1">
                  Professional Background
                </span>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  B.E. Computer Science & Engineering (Cyber Security) student with a verified <strong className="text-slate-900 font-bold">8.5/10 CGPA</strong> at Sri Krishna College of Engineering and Technology, Coimbatore. Hands-on experience spanning applied machine learning, computer vision, IoT systems, full-stack web platforms, and cybersecurity vulnerability analysis.
                </p>
              </div>

              {/* Verified Education Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#EFF4FF] text-[#155EEF] border border-blue-200 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      B.E. Computer Science & Engineering (Cyber Security)
                    </h4>
                    <span className="px-2 py-0.5 rounded-md bg-[#EFF4FF] text-[#155EEF] text-xs font-bold border border-blue-200">
                      2024 – 2028 | CGPA: 8.5/10.0
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    Sri Krishna College of Engineering and Technology (SKCET), Coimbatore, Tamil Nadu
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
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
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-bold text-[#155EEF] block mb-1.5">
                        {skillGroup.category}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {skillGroup.items.map((skill, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded-md bg-white text-[10.5px] font-medium text-slate-700 border border-slate-200">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-4">
              <Briefcase className="w-3.5 h-3.5 text-[#155EEF]" />
              <span>INTERNSHIP EXPERIENCE</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-6">
              Industry Experience & Internships
            </h3>

            <div className="space-y-4 relative border-l-2 border-slate-200 pl-4 ml-2">
              {internships.map((intern, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#155EEF] border-2 border-white shadow-sm"></div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 transition-all hover:border-[#155EEF] shadow-sm">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#155EEF] transition-colors">
                        {intern.role}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0 font-bold">
                        {intern.period}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#155EEF] mb-2">
                      {intern.company}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E53935] border border-red-200 text-xs font-bold mb-4">
                <Award className="w-3.5 h-3.5" />
                <span>HACKATHON PARTICIPATION & LEADERSHIP</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">
                Honors & Academic Recognition
              </h3>

              <div className="space-y-3">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <span className="text-xs font-bold text-amber-600 block">
                    🏆 Top 50 Finalist (500+ Project Teams)
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Hackademia National AI Hackathon (2026)
                  </p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Built Hackademia — an AI online proctoring system using OpenCV face tracking and violation detection.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <span className="text-xs font-bold text-[#155EEF] block">
                    🥈 2nd Runner-Up
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Tex-Research Hackathon, YUGAM (2026)
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Recognized for high-impact prototype engineering during prestigious regional technical festival.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <span className="text-xs font-bold text-emerald-600 block">
                    🛡️ Active Contributor & Peer Mentor
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Cybersecurity Club, SKCET
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
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
                  <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">
                        {cert.title}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
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
