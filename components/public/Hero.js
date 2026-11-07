'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Zap, Utensils, QrCode } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero({ hero, company, onOpenQuote }) {
  const headline =
    hero?.headline || 'Boost Your Restaurant Sales With Instant Digital Menus & Websites';
  const subheadline =
    hero?.subheadline ||
    'We build ultra-fast restaurant websites and digital QR menus that open in under 1 second on any smartphone. Let customers browse your fasting (የጾም) and non-fasting dishes, book tables, and order directly on WhatsApp or Telegram.';
  const badgeText = hero?.badgeText || 'Restaurant & Menu Websites in Ethiopia';

  const metrics = [
    { label: 'Mobile Loading', value: 'Instant (< 1s)', icon: Zap },
    { label: 'Delivery Time', value: '2–5 Days', icon: CheckCircle2 },
    { label: 'QR Table Menus', value: 'Contactless', icon: QrCode },
  ];

  const handleSmoothScroll = (e, id) => {
    if (e && e.preventDefault) e.preventDefault();
    const element = document.querySelector(id);
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
    } else {
      window.location.hash = id;
    }
  };

  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 md:pt-28 md:pb-32 tech-grid-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Section Subtitle */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-xs font-mono font-semibold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase mb-5 sm:mb-6">
            <Utensils className="w-3.5 h-3.5 shrink-0" />
            <span>{badgeText}</span>
          </div>

          {/* Headline - Responsive typography */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-5 sm:mb-6">
            {headline}
          </h1>

          {/* Subheadline - Minimum 16px body font with generous line spacing */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            {subheadline}
          </p>

          {/* Action Triggers - Stack vertically full-width on mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10 sm:mb-14 w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              href="#showroom"
              onClick={(e) => handleSmoothScroll(e, '#showroom')}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto text-base font-bold px-6 py-3.5 cursor-pointer min-h-[48px]"
            >
              {hero?.primaryCta || 'View Restaurant Samples'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              href="#pricing"
              onClick={(e) => handleSmoothScroll(e, '#pricing')}
              className="w-full sm:w-auto text-base font-semibold px-6 py-3.5 cursor-pointer min-h-[48px]"
            >
              {hero?.secondaryCta || 'View Pricing Plans'}
            </Button>
          </div>

          {/* Key Metric Indicators - Mobile-friendly cards */}
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-3.5 sm:gap-6 pt-6 sm:pt-8 border-t border-slate-200/80 dark:border-slate-800/80 max-w-lg">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="p-3 sm:p-0 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 sm:bg-transparent sm:dark:bg-transparent border border-slate-200/60 dark:border-slate-800/60 sm:border-none space-y-1"
                >
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-700 dark:text-cyan-400">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{m.label}</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {m.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
