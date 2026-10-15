'use client';

import { useState, useEffect } from 'react';
import { Save, Check, Plus, Trash2 } from 'lucide-react';
import Button from '../../../components/ui/Button';

export default function ContentAdminPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to save website content.');
      showToast('Website content updated successfully.');
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-cyan-400 font-mono text-xs">LOADING CONTENT EDITOR...</div>;
  }

  const hero = data?.hero || {};
  const services = data?.services || [];
  const packages = data?.pricingPackages || [];
  const faq = data?.faq || [];

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Site Copy & Services Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Customize homepage hero messaging, engineering services, and pricing tiers.
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          onClick={handleSave}
          icon={Save}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Section Copy */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">Homepage Hero Section</h3>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">
            Status Badge Text
          </label>
          <input
            type="text"
            value={hero.badgeText || ''}
            onChange={(e) =>
              setData({ ...data, hero: { ...hero, badgeText: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">
            Primary Headline
          </label>
          <input
            type="text"
            value={hero.headline || ''}
            onChange={(e) =>
              setData({ ...data, hero: { ...hero, headline: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">
            Subheadline Copy
          </label>
          <textarea
            rows={3}
            value={hero.subheadline || ''}
            onChange={(e) =>
              setData({ ...data, hero: { ...hero, subheadline: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs resize-none"
          />
        </div>
      </div>

      {/* Pricing Packages */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">Pricing Packages</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg, idx) => (
            <div key={pkg.id || idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <input
                type="text"
                value={pkg.name}
                onChange={(e) => {
                  const next = [...packages];
                  next[idx].name = e.target.value;
                  setData({ ...data, pricingPackages: next });
                }}
                className="w-full font-bold text-white text-xs px-2 py-1 bg-slate-950 border border-slate-800 rounded"
              />
              <input
                type="text"
                value={pkg.price}
                onChange={(e) => {
                  const next = [...packages];
                  next[idx].price = e.target.value;
                  setData({ ...data, pricingPackages: next });
                }}
                className="w-full font-mono text-cyan-400 text-xs px-2 py-1 bg-slate-950 border border-slate-800 rounded"
              />
              <input
                type="text"
                value={pkg.turnaround}
                onChange={(e) => {
                  const next = [...packages];
                  next[idx].turnaround = e.target.value;
                  setData({ ...data, pricingPackages: next });
                }}
                className="w-full text-slate-400 text-[11px] px-2 py-1 bg-slate-950 border border-slate-800 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">FAQ Accordion Entries</h3>
          <button
            onClick={() => {
              const next = [
                ...faq,
                { question: 'New Question?', answer: 'Detailed response here.' },
              ];
              setData({ ...data, faq: next });
            }}
            className="text-xs font-mono text-cyan-400 flex items-center gap-1 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Question</span>
          </button>
        </div>

        <div className="space-y-3">
          {faq.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => {
                    const next = [...faq];
                    next[idx].question = e.target.value;
                    setData({ ...data, faq: next });
                  }}
                  className="flex-1 font-semibold text-white text-xs px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded"
                />
                <button
                  onClick={() => {
                    const next = faq.filter((_, i) => i !== idx);
                    setData({ ...data, faq: next });
                  }}
                  className="p-1.5 text-red-400 hover:bg-red-950/40 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                rows={2}
                value={item.answer}
                onChange={(e) => {
                  const next = [...faq];
                  next[idx].answer = e.target.value;
                  setData({ ...data, faq: next });
                }}
                className="w-full text-xs text-slate-300 px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded resize-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
