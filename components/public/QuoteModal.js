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
    timeline: 'Within 1 Week',
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
            timeline: initialData.estimatedDays || 'Within 1 Week',
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
            timeline: initialData.specs?.turnaroundDays ? `~${initialData.specs.turnaroundDays} Days` : 'Within 1 Week',
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
          timeline: 'Within 1 Week',
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        className="bg-[#070B16] w-full max-w-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col cursor-default animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#0E1626] border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Get Started
            </div>
            <h3 id="quote-modal-title" className="text-lg font-bold text-white tracking-tight">
              Order Your Restaurant Website / Menu
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white">Inquiry Received!</h4>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Thank you! Our team will review your restaurant details and contact you within 24 hours to begin your setup.
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Message on Telegram</span>
                </a>
                <a
                  href={`mailto:${emailAddress}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold shadow-sm transition-colors border border-slate-700"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Send Email</span>
                </a>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another Inquiry
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={onClose}
                >
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formData.projectRef && (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
                  <span className="text-slate-500">Selected Setup: </span>
                  {formData.projectRef}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dawit Tesfaye"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="dawit@restaurant.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Phone / Telegram (Ethiopia)
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+251 988 ..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Restaurant or Café Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Lucy Restaurant / Aroma Café"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Target Budget (Birr)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="9,500 - 16,500 Birr">9,500 – 16,500 Birr (QR Digital Menu / Café)</option>
                    <option value="16,500 - 28,000 Birr">16,500 – 28,000 Birr (Standard Restaurant & Bar)</option>
                    <option value="28,000+ Birr">28,000+ Birr (Premium Multi-Branch / Hotel)</option>
                    <option value="Custom Quote">Custom Quote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Desired Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Urgent (2-3 Days)">Urgent (2 to 3 Days)</option>
                    <option value="Standard (4-6 Days)">Standard (4 to 6 Days)</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Menu Items & Specific Preferences
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention your restaurant location in Addis Ababa, number of dishes, fasting categories, or specific order buttons..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>

              {error && (
                <div className="p-2.5 rounded bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  size="md"
                  variant="primary"
                  icon={Send}
                  iconPosition="right"
                  className="w-full text-xs font-bold py-2.5"
                >
                  {loading ? 'Sending...' : 'Send Inquiry'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
