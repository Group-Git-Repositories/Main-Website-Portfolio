'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';

export default function Navbar({ onOpenQuote, company }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Website Samples', href: '#showroom' },
    { label: 'Prices', href: '#pricing' },
    { label: 'Services', href: '#services' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-[#070B16]/90 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center font-mono font-bold text-white shadow-sm group-hover:border-cyan-500/50 transition-colors">
            <span className="text-violet-500 text-xs">{'{'}</span>
            <span className="text-white text-base">H</span>
            <span className="text-cyan-400 text-xs">{'}'}</span>
          </div>
          <div>
            <div className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              {company?.name || 'HOPE'}
            </div>
            <div className="text-[10px] font-mono tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
              Web Development
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <Button
            size="sm"
            variant="primary"
            onClick={() => onOpenQuote?.()}
            icon={ArrowRight}
            iconPosition="right"
          >
            Get a Website
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070B16] px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-500"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Button
              size="md"
              variant="primary"
              onClick={() => {
                setMobileOpen(false);
                onOpenQuote?.();
              }}
              className="w-full"
            >
              Request a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
