import React from 'react';
import { Check, Clock } from 'lucide-react';
import Button from '../ui/Button';

export default function PricingMatrix({ packages = [], onOpenQuote }) {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50 dark:bg-[#070B16] border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-3">
            Simple Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Clear, Straightforward Prices
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            No surprise fees. Every website includes full design, mobile layout, free hosting setup, and an easy admin page to edit text.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col justify-between p-8 rounded-2xl transition-all duration-200 ${
                pkg.popular
                  ? 'bg-white dark:bg-[#0E1626] border-2 border-slate-900 dark:border-cyan-500 shadow-md'
                  : 'bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-md bg-slate-900 text-white dark:bg-cyan-400 dark:text-slate-950 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold mb-1 uppercase tracking-wider">
                  {pkg.name}
                </div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                  {pkg.price}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
                  {pkg.idealFor}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Ready in ~{pkg.turnaround}</span>
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.features?.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                size="md"
                variant={pkg.popular ? 'primary' : 'outline'}
                onClick={() => onOpenQuote?.()}
                className="w-full text-xs font-semibold"
              >
                Choose {pkg.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
