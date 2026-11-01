'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Phone, MessageSquare, Utensils, ChevronRight } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';

export default function Navbar({ onOpenQuote, company }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Our Purpose', href: '#about' },
    { label: 'Sample Websites', href: '#showroom' },
    { label: 'What We Build', href: '#services' },
    { label: 'Price Calculator', href: '#estimator' },
    { label: 'Prices', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileOpen(false);
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 border-b ${
        scrolled
          ? 'backdrop-blur-md bg-white/95 dark:bg-[#070B16]/95 border-slate-200/80 dark:border-slate-800 shadow-sm'
          : 'backdrop-blur-sm bg-white/90 dark:bg-[#070B16]/90 border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-cyan-500/50 transition-colors shrink-0">
            <img
              src="/IMG_1561newwwwwwww.png"
              alt={company?.name || 'ROHA Dev'}
              className="w-full h-full object-contain p-1 block dark:hidden"
            />
            <img
              src="/IMG_1564jfurur.png"
              alt={company?.name || 'ROHA Dev'}
              className="w-full h-full object-contain p-1 hidden dark:block"
            />
          </div>
          <div>
            <div className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>ROHA Dev</span>
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono tracking-wider text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
              Restaurant & Web Software
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors tracking-wide cursor-pointer py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Header Right Action Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Always Visible Theme Toggle */}
          <ThemeToggle />

          {/* Quick Quote Button */}
          <Button
            size="sm"
            variant="primary"
            onClick={() => onOpenQuote?.()}
            icon={ArrowRight}
            iconPosition="right"
            className="text-xs font-bold px-3 py-2 sm:px-4 sm:py-2.5 shadow-sm min-h-[44px]"
          >
            <span className="hidden xs:inline">Get a Website</span>
            <span className="xs:hidden">Get Quote</span>
          </Button>

          {/* Mobile Hamburger Button - Minimum 44x44px Touch Target */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-11 h-11 flex items-center justify-center text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 active:scale-95 transition-all touch-manipulation cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Smooth Backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 sm:top-20 z-50 lg:hidden">
          {/* Dimmed backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Content - Ergonomic thumb reach */}
          <div className="relative bg-white dark:bg-[#070B16] border-b border-slate-200 dark:border-slate-800 px-5 py-6 space-y-5 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto pb-10">
            {/* Visual Theme Row */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Appearance Mode
                </span>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                  Switch Light / Dark
                </span>
              </div>
              <ThemeToggle showLabel={true} />
            </div>

            <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold px-1">
              Menu Navigation
            </div>

            {/* Navigation Links - Minimum 48px height per link for easy thumb tapping */}
            <nav className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-3.5 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-cyan-600 dark:hover:text-cyan-400 active:bg-cyan-50 dark:active:bg-cyan-950/40 transition-colors flex items-center justify-between min-h-[48px] touch-manipulation"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </a>
              ))}
            </nav>

            {/* Quick Actions in Mobile Drawer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <Button
                size="md"
                variant="primary"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenQuote?.();
                }}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full text-base font-bold py-3.5 min-h-[48px]"
              >
                Get a Free Quote
              </Button>

              {company?.phone && (
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center justify-center gap-2.5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 min-h-[48px] touch-manipulation active:scale-[0.98] transition-all"
                >
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span>Call {company.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
