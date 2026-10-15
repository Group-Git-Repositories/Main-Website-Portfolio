import React from 'react';
import { Code, ShoppingCart, RefreshCw, Check, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function ServicesList({ services = [], onOpenQuote }) {
  const iconMap = {
    'srv-bespoke-web': Code,
    'srv-ecommerce': ShoppingCart,
    'srv-redesign': RefreshCw,
  };

  return (
    <section id="services" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono font-semibold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase mb-3">
            Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            What We Build
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Clean, ultra-fast static websites built to show your products and bring in real client inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv) => {
            const Icon = iconMap[srv.id] || Code;
            return (
              <div
                key={srv.id}
                className="flex flex-col justify-between p-8 rounded-2xl bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {srv.summary}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {srv.features?.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">From</span>
                    <div className="text-base font-bold text-slate-900 dark:text-white">
                      {srv.startingPrice}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onOpenQuote?.()}
                    className="text-xs"
                  >
                    Inquire
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
