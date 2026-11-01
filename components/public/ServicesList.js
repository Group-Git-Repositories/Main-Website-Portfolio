import React from 'react';
import { QrCode, UtensilsCrossed, Send, Check, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function ServicesList({ services = [], onOpenQuote }) {
  const iconMap = {
    'srv-qr-menu': QrCode,
    'srv-full-restaurant': UtensilsCrossed,
    'srv-online-ordering': Send,
  };

  return (
    <section id="services" className="py-14 sm:py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-16">
          <div className="text-xs font-mono font-semibold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Restaurant Solutions</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            What We Build
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Tailored digital menus and restaurant websites built specifically for Ethiopian hospitality, cafés, traditional kitchens, and lounges.
          </p>
        </div>

        {/* Services Cards Grid - Stacks vertically on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((srv) => {
            const Icon = iconMap[srv.id] || UtensilsCrossed;
            return (
              <div
                key={srv.id}
                className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6 shadow-sm">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2.5">
                    {srv.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {srv.summary}
                  </p>

                  <div className="space-y-3 mb-8">
                    {srv.features?.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                        <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Starting at</span>
                    <div className="text-base sm:text-xl font-bold text-slate-900 dark:text-white">
                      {srv.startingPrice}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onOpenQuote?.()}
                    icon={ArrowRight}
                    iconPosition="right"
                    className="text-xs sm:text-sm font-semibold min-h-[44px]"
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
