import React from 'react';
import { ArrowRight, Sliders, CheckCircle2, Shield, Zap, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero({ hero, company, onOpenQuote }) {
  const headline =
    hero?.headline || 'Engineering Websites That Command Authority and Drive Measurable Growth';
  const subheadline =
    hero?.subheadline ||
    'Explore our interactive workshop showroom of live websites and bespoke digital architectures. Test them across real device viewports and commission your build today.';
  const badgeText = hero?.badgeText || 'Available for New Commissioned Projects';

  const metrics = [
    { label: 'Core Web Vitals', value: '99+', icon: Zap },
    { label: 'Delivered In', value: '5-10 Days', icon: CheckCircle2 },
    { label: 'Admin Gateway', value: 'Included', icon: Shield },
  ];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Engineering Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono font-medium tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{badgeText}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-6">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
            {subheadline}
          </p>

          {/* Action Triggers */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <a href="#showroom">
              <Button size="lg" variant="primary" icon={ArrowRight} iconPosition="right">
                Explore Workshop Showroom
              </Button>
            </a>
            <a href="#estimator">
              <Button size="lg" variant="outline" icon={Sliders}>
                Instant Scope Estimator
              </Button>
            </a>
          </div>

          {/* Key Metric Indicators */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 max-w-xl">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{m.label}</span>
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
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
