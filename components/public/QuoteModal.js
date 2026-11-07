'use client';

import { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Mail, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function QuoteModal({ isOpen, onClose, initialData, company }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '9,500 - 16,500 Birr',
    timeline: 'Ready in ~4-5 Days',
    projectRef: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Reset form or populate from initialData whenever modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError('');

      if (initialData) {
        if (initialData.type === 'estimator' || initialData.type === 'restaurant-estimator') {
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            budget: initialData.estimatedPrice || '9,500 - 16,500 Birr',
            timeline: initialData.estimatedDays || 'Ready in ~4-5 Days',
            projectRef: `Restaurant Estimator: ${initialData.industry} with features: ${initialData.features?.join(', ')}`,
            message: '',
          });
        } else if (initialData.id) {
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            budget: initialData.specs?.startingPrice ? `From ${initialData.specs.startingPrice}` : '9,500 - 16,500 Birr',
            timeline: initialData.specs?.turnaroundDays ? `Ready in ~${initialData.specs.turnaroundDays} Days` : 'Ready in ~4-5 Days',
            projectRef: `Sample: ${initialData.title} (${initialData.category})`,
            message: '',
          });
        }
      } else {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          budget: '9,500 - 16,500 Birr',
          timeline: 'Ready in ~4-5 Days',
          projectRef: '',
          message: '',
        });
      }
    }
  }, [isOpen, initialData]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit quote inquiry.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Error sending request. Please reach out directly via Telegram or Phone.');
    } finally {
      setLoading(false);
    }
  };

  const telegramUrl = company?.channels?.telegram?.username
    ? `https://t.me/${company.channels.telegram.username}`
    : 'https://t.me/ROHAD_59';
  const emailAddress = company?.email || 'rohadev0@gmail.com';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/75 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        className="bg-white dark:bg-[#070B16] text-slate-900 dark:text-white w-full sm:max-w-xl h-full sm:h-auto max-h-[100dvh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Adapts cleanly to Light & Dark Mode */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#0E1626] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400 font-semibold">
              Get Started
            </div>
            <h3 id="quote-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Order Your Restaurant Website / Menu
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-manipulation cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Scrollable on mobile, pristine light/dark background */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-white dark:bg-[#070B16]">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 flex items-center justify-center mx-auto border border-cyan-200 dark:border-cyan-500/20">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Inquiry Received!</h4>
              <p className="text-base text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you! Our team will review your restaurant details and contact you within 24 hours to begin your setup.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold shadow-sm transition-colors min-h-[48px] touch-manipulation"
                >
                  <Send className="w-4 h-4" />
                  <span>Message on Telegram</span>
                </a>
                <a
                  href={`mailto:${emailAddress}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-sm font-semibold shadow-sm transition-colors border border-slate-300 dark:border-slate-700 min-h-[48px] touch-manipulation"
                >
                  <Mail className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span>Send Email</span>
                </a>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto text-sm min-h-[48px]"
                >
                  Submit Another Inquiry
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={onClose}
                  className="w-full sm:w-auto text-sm min-h-[48px]"
                >
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pb-6">
              {formData.projectRef && (
                <div className="p-3 rounded-xl bg-cyan-50 dark:bg-slate-900 border border-cyan-200/80 dark:border-slate-800 text-xs font-mono text-cyan-800 dark:text-cyan-400">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Selected Setup: </span>
                  {formData.projectRef}
                </div>
              )}

              {/* Name & Email - 16px text-base to prevent iOS automatic zoom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dawit Tesfaye"
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base focus:bg-white dark:focus:bg-slate-900 focus:border-cyan-500 focus:outline-none min-h-[48px] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    inputMode="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="dawit@restaurant.com"
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base focus:bg-white dark:focus:bg-slate-900 focus:border-cyan-500 focus:outline-none min-h-[48px] transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Restaurant Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                    Phone / Telegram (Ethiopia)
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+251 988 ..."
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base focus:bg-white dark:focus:bg-slate-900 focus:border-cyan-500 focus:outline-none min-h-[48px] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                    Restaurant or Café Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Lucy Restaurant / Aroma Café"
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base focus:bg-white dark:focus:bg-slate-900 focus:border-cyan-500 focus:outline-none min-h-[48px] transition-colors"
                  />
                </div>
              </div>

              {/* Budget & Desired Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                    Target Budget (Birr)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-base focus:bg-white dark:focus:bg-slate-900 focus:border-cyan-500 focus:outline-none min-h-[48px] transition-colors cursor-pointer"
                  >
                    <option value="5,000 - 8,500 Birr">5,000 – 8,500 Birr (QR Digital Menu Express)</option>
                    <option value="10,500 - 18,500 Birr">10,500 – 18,500 Birr (Standard Restaurant & Bar)</option>
                    <option value="24,000+ Birr">24,000+ Birr (Premium Multi-Branch / Hotel)</option>
                    <option value="Custom Quote">Custom Quote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                    Desired Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-base focus:bg-white dark:focus:bg-slate-900 focus:border-cyan-500 focus:outline-none min-h-[48px] transition-colors cursor-pointer"
                  >
                    <option value="Ready in ~2-3 Days">Ready in ~2-3 Days (QR Digital Menu / Express)</option>
                    <option value="Ready in ~4-5 Days">Ready in ~4-5 Days (Standard Restaurant & Bar)</option>
                    <option value="Ready in ~5-7 Days">Ready in ~5-7 Days (Fine Dining & Ordering)</option>
                    <option value="Flexible">Flexible Timeline</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                  Menu Items & Specific Preferences
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention your restaurant location in Addis Ababa, number of dishes, fasting categories, or specific order buttons..."
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base focus:bg-white dark:focus:bg-slate-900 focus:border-cyan-500 focus:outline-none resize-none transition-colors"
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-500/40 text-red-700 dark:text-red-300 text-xs font-mono">
                  {error}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  variant="primary"
                  icon={Send}
                  iconPosition="right"
                  className="w-full text-base font-bold py-3.5 min-h-[48px]"
                >
                  {loading ? 'Sending Request...' : 'Send Inquiry'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
