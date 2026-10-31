'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Linkedin, Send, MessageSquare, X, Sparkles } from 'lucide-react';
import { ensureAbsoluteUrl } from '../../lib/utils';

export default function DirectChannelsBar({ company, onOpenQuote }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Dynamic contact values derived from company data
  const phone = company?.phone || '+251 980717219';
  const email = company?.email || 'rohadev0@gmail.com';
  const rawLinkedin = company?.linkedin || company?.channels?.linkedin?.url || 'https://www.linkedin.com/in/roha-dev';
  const linkedinUrl = ensureAbsoluteUrl(rawLinkedin);
  const telegramUsername = company?.channels?.telegram?.username || 'ROHAD_59';
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
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const contactOptions = [
    {
      id: 'quote',
      label: 'Get a Website / Quote',
      sublabel: 'Send Inquiry Form',
      action: () => {
        setIsOpen(false);
        onOpenQuote?.();
      },
      icon: Sparkles,
      iconColor: 'text-cyan-400',
      hoverBg: 'hover:bg-cyan-600 hover:text-white',
    },
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
      id: 'telegram',
      label: `@${telegramUsername}`,
      sublabel: 'Chat on Telegram',
      href: telegramUrl,
      icon: Send,
      iconColor: 'text-sky-500',
      hoverBg: 'hover:bg-sky-600 hover:text-white',
      external: true,
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
  ];

  return (
    <aside
      ref={containerRef}
      aria-label="Direct contact options"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto select-none"
    >
      {/* Stacked Contact Options (Visible when open) */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="flex flex-col items-end gap-2.5 mb-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {contactOptions.map((opt) => {
            const Icon = opt.icon;

            if (opt.action) {
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="menuitem"
                  onClick={opt.action}
                  className={`group flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white dark:bg-[#0E1626] border border-cyan-500/40 dark:border-cyan-500/40 shadow-xl text-slate-800 dark:text-slate-100 transition-all duration-200 cursor-pointer ${opt.hoverBg}`}
                >
                  <div className="flex flex-col items-end text-right">
                    <span className="text-xs font-bold leading-tight font-mono text-cyan-600 dark:text-cyan-400 group-hover:text-white">
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-white/90">
                      {opt.sublabel}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                    <Icon className={`w-4 h-4 ${opt.iconColor} group-hover:text-white`} />
                  </div>
                </button>
              );
            }

            return (
              <a
                key={opt.id}
                role="menuitem"
                href={opt.href}
                target={opt.external ? '_blank' : undefined}
                rel={opt.external ? 'noopener noreferrer' : undefined}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 shadow-xl text-slate-800 dark:text-slate-100 transition-all duration-200 cursor-pointer ${opt.hoverBg}`}
              >
                <div className="flex flex-col items-end text-right">
                  <span className="text-xs font-semibold leading-tight font-mono">{opt.label}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-white/90">
                    {opt.sublabel}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <Icon className={`w-4 h-4 ${opt.iconColor} group-hover:text-white`} />
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Floating Toggle Pill Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={isOpen ? 'Close contact options' : 'Open direct contact options'}
        className={`flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl font-mono text-xs font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 cursor-pointer ${
          isOpen
            ? 'bg-slate-900 text-white dark:bg-slate-800 border border-slate-700 ring-2 ring-cyan-500/50'
            : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:scale-105 active:scale-95 shadow-cyan-500/30'
        }`}
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4 shrink-0" />
            <span>Close</span>
          </>
        ) : (
          <>
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span>Quick Contact</span>
          </>
        )}
      </button>
    </aside>
  );
}
