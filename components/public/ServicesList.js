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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono font-medium mb-4">
            <Code className="w-3.5 h-3.5" />
            <span>Engineering Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Bespoke Web Development Solutions
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            From modern responsive brand sites to high-volume headless e-commerce architectures, we engineer web solutions built to perform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv) => {
            const Icon = iconMap[srv.id] || Code;
            return (
              <div
                key={srv.id}
                className="flex flex-col justify-between p-8 rounded-2xl bg-white dark:bg-[#0E1626] border border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {srv.summary}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {srv.features?.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                        <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Starting From</span>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">
                      {srv.startingPrice}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onOpenQuote?.()}
                    icon={ArrowRight}
                    iconPosition="right"
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
