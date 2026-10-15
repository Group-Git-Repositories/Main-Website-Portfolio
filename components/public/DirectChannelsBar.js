'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Linkedin, Send, MessageSquare, X } from 'lucide-react';

export default function DirectChannelsBar({ company }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Dynamic contact values derived from the single source of truth (company data)
  const phone = company?.phone || '+251 973 951 191';
  const email = company?.email || 'contact@hopeteams.com';
  const linkedinUrl = company?.linkedin || company?.channels?.linkedin?.url || 'https://www.linkedin.com/company/hope-web-development';
  const telegramUsername = company?.channels?.telegram?.username || 'TeddyEt';
  const telegramUrl = `https://t.me/${telegramUsername}`;

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const contactOptions = [
    {
      id: 'phone',
      label: phone,
      sublabel: 'Call Directly',
      href: `tel:${phone.replace(/[^\d+]/g, '')}`,
      icon: Phone,
      iconColor: 'text-emerald-500',
      hoverBg: 'hover:bg-emerald-600 hover:text-white',
      external: false,
    },
    {
      id: 'email',
      label: email,
      sublabel: 'Send Email',
      href: `mailto:${email}`,
      icon: Mail,
      iconColor: 'text-amber-500',
      hoverBg: 'hover:bg-amber-600 hover:text-white',
      external: false,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      sublabel: 'Connect with Us',
      href: linkedinUrl,
      icon: Linkedin,
      iconColor: 'text-[#0A66C2]',
      hoverBg: 'hover:bg-[#0A66C2] hover:text-white',
      external: true,
    },
    {
      id: 'telegram',
      label: `@${telegramUsername}`,
      sublabel: 'Chat on Telegram',
      href: telegramUrl,
      icon: Send,
      iconColor: 'text-sky-500',
      hoverBg: 'hover:bg-sky-600 hover:text-white',
      external: true,
    },
  ];

  return (
    <aside
      ref={containerRef}
      aria-label="Direct contact options"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end"
    >
      {/* 4 Stacked Contact Options (Visible when open) */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="flex flex-col items-end gap-2.5 mb-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {contactOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <a
                key={opt.id}
                href={opt.href}
                target={opt.external ? '_blank' : undefined}
                rel={opt.external ? 'noopener noreferrer' : undefined}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0E1626] text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700/80 shadow-xl text-xs font-mono transition-all hover:scale-102 ${opt.hoverBg}`}
              >
                <div className="flex flex-col text-right">
                  <span className="font-semibold text-[12px]">{opt.label}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-white/80">
                    {opt.sublabel}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800/80 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors">
                  <Icon className={`w-4 h-4 ${opt.iconColor} group-hover:text-white transition-colors`} />
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Main Single Floating Contact Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle contact menu"
        className={`group flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl font-mono text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 border ${
          isOpen
            ? 'bg-slate-900 text-white border-slate-700 dark:bg-slate-800 dark:text-white dark:border-slate-600'
            : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-950 border-slate-700 dark:border-cyan-300'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="w-4 h-4 transition-transform duration-200" />
          ) : (
            <>
              <MessageSquare className="w-4 h-4 transition-transform duration-200" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </>
          )}
        </div>
        <span>{isOpen ? 'Close' : 'Contact'}</span>
      </button>
    </aside>
  );
}
