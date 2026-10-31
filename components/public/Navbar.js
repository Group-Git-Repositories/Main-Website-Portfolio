'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Phone, MessageSquare, Utensils } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';

export default function Navbar({ onOpenQuote, company }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Sample Websites', href: '#showroom' },
    { label: 'Price Calculator', href: '#estimator' },
    { label: 'What We Build', href: '#services' },
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
        const offset = 85;
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
          ? 'backdrop-blur-md bg-white/95 dark:bg-[#070B16]/95 border-slate-200/80 dark:border-slate-800 shadow-md'
          : 'backdrop-blur-sm bg-white/90 dark:bg-[#070B16]/90 border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-cyan-500/50 transition-colors shrink-0">
            <img
              src="/logo.png"
              alt={company?.name || 'ROHA Dev'}
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div>
            <div className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>ROHA Dev</span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-cyan-600 dark:text-cyan-400 uppercase font-semibold">
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

        {/* Right Desktop CTA & Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />

          <Button
            size="sm"
            variant="primary"
            onClick={() => onOpenQuote?.()}
            icon={ArrowRight}
            iconPosition="right"
            className="text-xs font-semibold px-4 py-2"
          >
            Get a Website
          </Button>
        </div>

        {/* Mobile Header Buttons */}
        <div className="flex lg:hidden items-center gap-2">
          <div className="sm:hidden">
            <ThemeToggle />
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 top-20 z-50 lg:hidden">
          {/* Dimmed backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative bg-white dark:bg-[#070B16] border-b border-slate-200 dark:border-slate-800 px-6 py-6 space-y-5 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold pb-2 border-b border-slate-100 dark:border-slate-800">
              Navigation Menu
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-3 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-slate-400 font-mono">→</span>
                </a>
              ))}
            </nav>

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
                className="w-full text-xs font-bold py-3"
              >
                Get a Restaurant Website
              </Button>

              {company?.phone && (
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center justify-center gap-2 py-2.5 text-xs font-mono text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-500" />
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
