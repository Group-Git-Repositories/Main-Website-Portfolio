import React from 'react';
import { Check, Shield, Clock } from 'lucide-react';
import Button from '../ui/Button';

export default function PricingMatrix({ packages = [], onOpenQuote }) {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50 dark:bg-[#070B16] border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-950/20 text-violet-400 text-xs font-mono font-medium mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Transparent Investment Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Clear Scope. Predictable Pricing.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            No surprise billing or opaque markups. Every package includes full source code, custom Admin Gateway, and guaranteed turnarounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col justify-between p-8 rounded-2xl transition-all duration-300 ${
                pkg.popular
                  ? 'bg-white dark:bg-[#0E1626] border-2 border-cyan-500 shadow-xl shadow-cyan-500/10'
                  : 'bg-white dark:bg-[#0E1626] border border-slate-200/80 dark:border-slate-800/80 shadow-sm'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-mono font-extrabold uppercase tracking-widest shadow-md">
                  Most Popular Workshop
                </div>
              )}

              <div>
                <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold mb-1 uppercase tracking-wider">
                  {pkg.name}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                  {pkg.price}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  {pkg.idealFor}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-mono text-violet-500 dark:text-violet-400 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Turnaround: {pkg.turnaround}</span>
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.features?.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
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
