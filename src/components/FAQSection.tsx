import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How do your starting prices work, and how is the final quotation calculated?",
      answer: "The rates displayed (e.g. ₹1,199 for Web Development, ₹4,999 for Mobile Apps) represent our baseline starter tier for standard deliverables. Once you add services to cart or submit an enquiry describing your requirements, our technical team prepares a customized, transparent proposal matching your exact feature scope, integrations, and delivery speed."
    },
    {
      question: "What is the typical turnaround timeline for a project?",
      answer: "Starter landing pages and security audits are delivered in 2 to 5 business days. Full-stack business portals, AI chatbots, and MVP mobile applications typically take 7 to 14 business days. Enterprise ERP suites and multi-tenant SaaS products range from 14 to 30 days with weekly milestone demos."
    },
    {
      question: "Do I receive 100% source code ownership and deployment assistance?",
      answer: "Yes, absolutely. Upon completion and payment verification, full intellectual property and source code are handed over to you (via private GitHub repository or zipped archive). We also assist with cloud deployment on AWS, Vercel, or Render, SSL installation, and domain routing at no extra charge."
    },
    {
      question: "How does the Google Pay / UPI QR payment verification process work?",
      answer: "You can scan our official GPay QR code using Google Pay, PhonePe, Paytm, or any UPI banking app. After transferring the estimated amount, enter your 12-digit UTR/transaction reference and upload a screenshot. The submission is safely stored as 'Pending Verification', and our team confirms it via bank statement before kicking off development."
    },
    {
      question: "Can I request a formal quotation before making any upfront payment?",
      answer: "Yes! At checkout or from any service card, select 'Request Custom Quotation'. This generates an order without immediate charge, alerting founder Sudharshan P S to draft a milestone-based formal scope of work."
    },
    {
      question: "Do you offer ongoing technical maintenance and security updates?",
      answer: "Yes. Our IT Maintenance & Support starts at ₹299/month, covering weekly database backups, framework patching, uptime monitoring, bug fixes, and on-call developer assistance."
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF4FF] border border-[#155EEF]/20 text-[#155EEF] text-xs font-bold tracking-tight mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Everything You Need to Know
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Transparent answers regarding our service tiers, development process, payments, and codebase handover.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-[#F8FAFC] border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#155EEF] transition-colors"
                >
                  <span>{faq.question}</span>
                  <div className={`p-1 rounded-lg bg-white border border-slate-200 text-slate-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#155EEF]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
