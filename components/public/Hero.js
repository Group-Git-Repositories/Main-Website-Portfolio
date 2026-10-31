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
    e.preventDefault();
    const element = document.querySelector(id);
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
  };

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Section Subtitle */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-xs font-mono font-semibold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase mb-6">
            <Utensils className="w-3.5 h-3.5" />
            <span>{badgeText}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-6">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-10 max-w-2xl">
            {subheadline}
          </p>

          {/* Action Triggers */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <Button
              size="lg"
              variant="primary"
              onClick={(e) => handleSmoothScroll(e, '#showroom')}
              icon={ArrowRight}
              iconPosition="right"
              className="text-sm font-bold px-6 py-3 cursor-pointer"
            >
              {hero?.primaryCta || 'View Restaurant Samples'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={(e) => handleSmoothScroll(e, '#estimator')}
              className="text-sm font-semibold px-6 py-3 cursor-pointer"
            >
              {hero?.secondaryCta || 'Calculate Menu Price'}
            </Button>
          </div>

          {/* Key Metric Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 max-w-lg">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-700 dark:text-cyan-400">
                    <Icon className="w-3.5 h-3.5" />
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
