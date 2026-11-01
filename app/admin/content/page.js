'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Save, Check, Plus, Trash2, Star, MessageSquareQuote, Utensils, Tag } from 'lucide-react';
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

      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(result.error || 'Failed to save website content.');
      }
      showToast('Website content updated successfully.');
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    if (!confirm('This will synchronize your website content with the latest repository defaults (restaurant services, pricing, Ethiopian testimonials). Continue?')) return;
    setSaving(true);
    try {
      const res = await fetch('/api/content?reset=true');
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to sync defaults');
      setData(result.data);
      showToast('Successfully synchronized with repository defaults.');
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
  const company = data?.company || {};
  const services = data?.services || [];
  const packages = data?.pricingPackages || [];
  const testimonials = data?.testimonials || [];
  const faq = data?.faq || [];

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Site Copy & Services Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Customize homepage hero messaging, restaurant services, pricing tiers, and Ethiopian client testimonials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleResetDefaults}
            disabled={saving}
            className="text-xs"
          >
            Sync Defaults
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={handleSave}
            icon={Save}
            disabled={saving}
            className="text-xs font-bold"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Section Copy */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>Homepage Hero Section</span>
        </h3>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              Primary Button Text
            </label>
            <input
              type="text"
              value={hero.primaryCta || ''}
              onChange={(e) =>
                setData({ ...data, hero: { ...hero, primaryCta: e.target.value } })
              }
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              Secondary Button Text
            </label>
            <input
              type="text"
              value={hero.secondaryCta || ''}
              onChange={(e) =>
                setData({ ...data, hero: { ...hero, secondaryCta: e.target.value } })
              }
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>
        </div>
      </div>

      {/* Vision & Mission Copy */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>Company Vision & Mission</span>
        </h3>
        <p className="text-xs text-slate-400 font-mono">
          Edit the vision and mission statements displayed on the homepage.
        </p>

        <div>
          <label className="block text-xs font-mono text-cyan-400 mb-1">
            Our Vision Statement
          </label>
          <textarea
            rows={3}
            value={company.vision || ''}
            onChange={(e) =>
              setData({ ...data, company: { ...company, vision: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-blue-400 mb-1">
            Our Mission Statement
          </label>
          <textarea
            rows={3}
            value={company.mission || ''}
            onChange={(e) =>
              setData({ ...data, company: { ...company, mission: e.target.value } })
            }
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs resize-none"
          />
        </div>
      </div>

      {/* Pricing Packages */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-cyan-400" />
            <span>Restaurant Pricing Packages</span>
          </h3>
          <span className="text-[11px] font-mono text-cyan-400">Editable for Live Site</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg, idx) => (
            <div key={pkg.id || idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Package Name</label>
                <input
                  type="text"
                  value={pkg.name || ''}
                  onChange={(e) => {
                    const next = [...packages];
                    next[idx].name = e.target.value;
                    setData({ ...data, pricingPackages: next });
                  }}
                  className="w-full font-bold text-white text-xs px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Price (ETB / Birr)</label>
                <input
                  type="text"
                  value={pkg.price || ''}
                  onChange={(e) => {
                    const next = [...packages];
                    next[idx].price = e.target.value;
                    setData({ ...data, pricingPackages: next });
                  }}
                  className="w-full font-mono text-cyan-400 text-xs px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Turnaround Time</label>
                <input
                  type="text"
                  value={pkg.turnaround || ''}
                  onChange={(e) => {
                    const next = [...packages];
                    next[idx].turnaround = e.target.value;
                    setData({ ...data, pricingPackages: next });
                  }}
                  className="w-full text-slate-300 text-xs px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Ideal For</label>
                <textarea
                  rows={2}
                  value={pkg.idealFor || ''}
                  onChange={(e) => {
                    const next = [...packages];
                    next[idx].idealFor = e.target.value;
                    setData({ ...data, pricingPackages: next });
                  }}
                  className="w-full text-slate-300 text-[11px] px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">
                  Features (One per line)
                </label>
                <textarea
                  rows={4}
                  value={(pkg.features || []).join('\n')}
                  onChange={(e) => {
                    const next = [...packages];
                    next[idx].features = e.target.value.split('\n').filter(Boolean);
                    setData({ ...data, pricingPackages: next });
                  }}
                  className="w-full text-slate-300 text-[11px] px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded resize-none font-mono"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section ("What We Build") */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Utensils className="w-4 h-4 text-cyan-400" />
          <span>What We Build (Restaurant Services)</span>
        </h3>

        <div className="space-y-4">
          {services.map((srv, idx) => (
            <div key={srv.id || idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Service Title</label>
                  <input
                    type="text"
                    value={srv.title || ''}
                    onChange={(e) => {
                      const next = [...services];
                      next[idx].title = e.target.value;
                      setData({ ...data, services: next });
                    }}
                    className="w-full font-bold text-white text-xs px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Starting Price</label>
                  <input
                    type="text"
                    value={srv.startingPrice || ''}
                    onChange={(e) => {
                      const next = [...services];
                      next[idx].startingPrice = e.target.value;
                      setData({ ...data, services: next });
                    }}
                    className="w-full font-mono text-cyan-400 text-xs px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Summary</label>
                <textarea
                  rows={2}
                  value={srv.summary || ''}
                  onChange={(e) => {
                    const next = [...services];
                    next[idx].summary = e.target.value;
                    setData({ ...data, services: next });
                  }}
                  className="w-full text-slate-300 text-xs px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">
                  Features (One per line)
                </label>
                <textarea
                  rows={3}
                  value={(srv.features || []).join('\n')}
                  onChange={(e) => {
                    const next = [...services];
                    next[idx].features = e.target.value.split('\n').filter(Boolean);
                    setData({ ...data, services: next });
                  }}
                  className="w-full text-slate-300 text-[11px] px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded resize-none font-mono"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Testimonials Section */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquareQuote className="w-4 h-4 text-cyan-400" />
            <span>Ethiopian Client Testimonials (የደንበኞች ምስክርነት)</span>
          </h3>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/comments"
              className="text-xs font-mono text-amber-400 flex items-center gap-1 hover:underline"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Connect Live Ratings & Comments</span>
            </Link>
            <button
              onClick={() => {
                const next = [
                  ...testimonials,
                  {
                    id: `test-${Date.now()}`,
                    clientName: 'አዲስ ደንበኛ (Client Name)',
                    role: 'ባለቤት (Owner)',
                    restaurant: 'የሬስቶራንት ስም (Restaurant Name)',
                    location: 'አዲስ አበባ (Addis Ababa)',
                    rating: 5,
                    quote: 'የምስክርነት ጽሁፍ እዚህ ይጻፉ...',
                    translation: 'English translation here...',
                  },
                ];
                setData({ ...data, testimonials: next });
              }}
              className="text-xs font-mono text-cyan-400 flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Testimonial</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {testimonials.map((t, idx) => (
            <div key={t.id || idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                  <input
                    type="text"
                    placeholder="Client Name"
                    value={t.clientName || ''}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx].clientName = e.target.value;
                      setData({ ...data, testimonials: next });
                    }}
                    className="font-bold text-white text-xs px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Role (e.g. ባለቤት)"
                    value={t.role || ''}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx].role = e.target.value;
                      setData({ ...data, testimonials: next });
                    }}
                    className="text-cyan-400 text-xs px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Restaurant & Location"
                    value={t.restaurant || ''}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx].restaurant = e.target.value;
                      setData({ ...data, testimonials: next });
                    }}
                    className="text-slate-300 text-xs px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded"
                  />
                </div>

                <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1.5 rounded border border-slate-800 shrink-0">
                  <span className="text-[10px] font-mono text-slate-400 mr-1">Rating:</span>
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => {
                        const next = [...testimonials];
                        next[idx].rating = starVal;
                        setData({ ...data, testimonials: next });
                      }}
                      className="p-0.5 hover:scale-110 transition-transform"
                      title={`${starVal} Star${starVal > 1 ? 's' : ''}`}
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          starVal <= (Number(t.rating) || 5)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const next = testimonials.filter((_, i) => i !== idx);
                    setData({ ...data, testimonials: next });
                  }}
                  className="p-2 text-red-400 hover:bg-red-950/40 rounded transition-colors"
                  title="Delete testimonial"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">
                  Amharic Quote (የአማርኛ ምስክርነት)
                </label>
                <textarea
                  rows={2}
                  value={t.quote || ''}
                  onChange={(e) => {
                    const next = [...testimonials];
                    next[idx].quote = e.target.value;
                    setData({ ...data, testimonials: next });
                  }}
                  className="w-full text-xs text-slate-100 px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">
                  English Subtitle / Translation
                </label>
                <textarea
                  rows={2}
                  value={t.translation || ''}
                  onChange={(e) => {
                    const next = [...testimonials];
                    next[idx].translation = e.target.value;
                    setData({ ...data, testimonials: next });
                  }}
                  className="w-full text-xs text-slate-400 px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded resize-none italic"
                />
              </div>
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
                { question: 'አዲስ ጥያቄ (New Question)?', answer: 'መልስ እዚህ ይጻፉ (Answer here).' },
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
