import React from 'react';
import { Star, Quote, CheckCircle, MapPin, Building2 } from 'lucide-react';

export default function ClientTestimonials({ testimonials = [] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-mono font-semibold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase mb-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>የደንበኞች ምስክርነት • Client Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            Trusted by Ethiopian Restaurants & Cafés
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Hear from Addis Ababa restaurant owners, café founders, and lounge managers about how our fast digital menus and websites improved their customer experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id || t.clientName}
              className="flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Background Accent watermark */}
              <div className="absolute top-4 right-4 text-slate-100 dark:text-slate-800/40 pointer-events-none select-none group-hover:text-cyan-500/10 transition-colors">
                <Quote className="w-16 h-16 stroke-[1]" />
              </div>

              <div className="relative z-10">
                {/* Rating Stars & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400 stroke-none"
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>የተረጋገጠ ደንበኛ (Verified)</span>
                  </div>
                </div>

                {/* Main Amharic Testimonial Quote */}
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* English translation */}
                {t.translation && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed mb-6 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    &ldquo;{t.translation}&rdquo;
                  </p>
                )}
              </div>

              {/* Author & Restaurant Details */}
              <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 text-white font-bold flex items-center justify-center text-sm shadow-md shrink-0">
                  {t.clientName ? t.clientName.charAt(0) : 'R'}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {t.clientName}
                  </div>
                  <div className="text-xs text-cyan-700 dark:text-cyan-400 font-medium truncate">
                    {t.role}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 truncate">
                      <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{t.restaurant}</span>
                    </span>
                    <span className="hidden sm:flex items-center gap-1 shrink-0">
                      <MapPin className="w-3 h-3 text-cyan-500 shrink-0" />
                      <span>{t.location}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
