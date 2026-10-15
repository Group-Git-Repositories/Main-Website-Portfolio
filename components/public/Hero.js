import React from 'react';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero({ hero, company, onOpenQuote }) {
  const headline =
    hero?.headline || 'Simple, Fast Websites That Help Your Business Grow';
  const subheadline =
    hero?.subheadline ||
    'We build clean static websites that open instantly on any phone or computer. Pick a sample from our showroom or ask for a custom build.';
  const badgeText = hero?.badgeText || 'Fast Static Websites';

  const metrics = [
    { label: 'Page Speed', value: 'Instant (< 1s)', icon: Zap },
    { label: 'Ready In', value: '4–7 Days', icon: CheckCircle2 },
  ];

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 tech-grid-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Section Subtitle */}
          <div className="text-xs font-mono font-semibold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase mb-4">
            {badgeText}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14] mb-6">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-10 max-w-xl">
            {subheadline}
          </p>

          {/* Action Triggers */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <a href="#showroom">
              <Button size="lg" variant="primary" icon={ArrowRight} iconPosition="right">
                See Website Samples
              </Button>
            </a>
            <a href="#pricing">
              <Button size="lg" variant="outline">
                View Prices
              </Button>
            </a>
          </div>

          {/* Key Metric Indicators */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 max-w-sm">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-700 dark:text-cyan-400">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{m.label}</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
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
