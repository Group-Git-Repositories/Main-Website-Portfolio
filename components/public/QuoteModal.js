'use client';

import { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function QuoteModal({ isOpen, onClose, initialData, company }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '$800 - $1,500',
    timeline: 'Within 2-3 Weeks',
    projectRef: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      if (initialData.type === 'estimator') {
        setFormData((prev) => ({
          ...prev,
          budget: initialData.estimatedPrice || prev.budget,
          timeline: initialData.estimatedDays || prev.timeline,
          projectRef: `Estimator Spec: ${initialData.industry} with modules: ${initialData.features?.join(', ')}`,
        }));
      } else if (initialData.id) {
        setFormData((prev) => ({
          ...prev,
          budget: initialData.specs?.startingPrice ? `From ${initialData.specs.startingPrice}` : prev.budget,
          timeline: initialData.specs?.turnaroundDays ? `~${initialData.specs.turnaroundDays} Days` : prev.timeline,
          projectRef: `Showroom Showcase: ${initialData.title} (${initialData.category})`,
        }));
      }
    }
  }, [initialData]);

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
      setError(err.message || 'Error sending request. Please try again or message via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = company?.channels?.whatsapp?.number?.replace(/\D/g, '') || '251973951191';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello HOPE team, I submitted an inquiry for: ${formData.projectRef || 'a custom website build'}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-[#070B16] w-full max-w-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#0E1626] border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Project Commission & Scope Inquiry
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Request Your Custom Website Build
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white">Inquiry Received</h4>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Thank you! Our engineering team will review your project specification and respond within 24 hours.
              </p>

              {company?.channels?.whatsapp?.enabled && (
                <div className="pt-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Message Directly via WhatsApp</span>
                  </a>
                </div>
              )}

              <div className="pt-2">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formData.projectRef && (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
                  <span className="text-slate-500">Referenced Scope: </span>
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
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Phone or WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+251 911 ..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Estimated Budget Tier
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="$650 - $1,000">$650 - $1,000 (Standard Showcase)</option>
                    <option value="$1,000 - $1,800">$1,000 - $1,800 (Professional Workshop)</option>
                    <option value="$2,000+">$2,000+ (Custom Enterprise / E-Commerce)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Target Delivery
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Urgent (< 7 Days)">Urgent (Under 7 Days)</option>
                    <option value="Within 2-3 Weeks">Standard (2 to 3 Weeks)</option>
                    <option value="Flexible">Flexible Planning</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Project Notes & Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your target audience, required integrations, or design preferences..."
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
                  className="w-full text-xs font-bold"
                >
                  {loading ? 'Submitting Specification...' : 'Submit Project Inquiry'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
