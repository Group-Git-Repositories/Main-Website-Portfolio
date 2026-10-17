'use client';

import { useState, useEffect } from 'react';
import { Save, Check, Phone, Mail, Linkedin, Send, MapPin, Globe } from 'lucide-react';
import Button from '../../../components/ui/Button';

export default function SettingsAdminPage() {
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
        throw new Error(result.error || 'Failed to update channel settings.');
      }
      showToast('Settings saved successfully.');
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-cyan-400 font-mono text-xs">LOADING CHANNEL SETTINGS...</div>;
  }

  const company = data?.company || {};
  const channels = company?.channels || {};
  const telegram = channels.telegram || {};

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Contact & Channel Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Manage the phone, email, LinkedIn, and Telegram channels that appear in your website contact widget.
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          onClick={handleSave}
          icon={Save}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Phone Number */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5">
          <Phone className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-white text-base">Phone Call Endpoint</h3>
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">
            Display Phone Number (e.g. +251 973 951 191)
          </label>
          <input
            type="text"
            value={company.phone || ''}
            onChange={(e) =>
              setData({
                ...data,
                company: { ...company, phone: e.target.value },
              })
            }
            placeholder="+251 973 951 191"
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
          />
          <p className="text-[11px] font-mono text-slate-500 mt-1.5">
            Clicking this on mobile will dial this number directly.
          </p>
        </div>
      </div>

      {/* 2. Company Email */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5">
          <Mail className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-white text-base">Email Endpoint</h3>
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">
            Inquiry & Contact Email
          </label>
          <input
            type="email"
            value={company.email || ''}
            onChange={(e) =>
              setData({
                ...data,
                company: {
                  ...company,
                  email: e.target.value,
                  channels: {
                    ...channels,
                    email: {
                      ...(channels.email || {}),
                      address: e.target.value,
                    },
                  },
                },
              })
            }
            placeholder="contact@hopeteams.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 3. LinkedIn Profile */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5">
          <Linkedin className="w-5 h-5 text-[#0A66C2]" />
          <h3 className="font-bold text-white text-base">LinkedIn Profile URL</h3>
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">
            Full LinkedIn URL
          </label>
          <input
            type="url"
            value={company.linkedin || ''}
            onChange={(e) =>
              setData({
                ...data,
                company: { ...company, linkedin: e.target.value },
              })
            }
            placeholder="https://www.linkedin.com/company/hope-web-development"
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 4. Telegram Direct Trigger */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Send className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-white text-base">Telegram Direct Chat</h3>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
            <input
              type="checkbox"
              checked={telegram.enabled !== false}
              onChange={(e) =>
                setData({
                  ...data,
                  company: {
                    ...company,
                    channels: {
                      ...channels,
                      telegram: { ...telegram, enabled: e.target.checked },
                    },
                  },
                })
              }
              className="rounded text-sky-500"
            />
            <span>Enabled</span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">
            Telegram Username (without @)
          </label>
          <input
            type="text"
            value={telegram.username || ''}
            onChange={(e) =>
              setData({
                ...data,
                company: {
                  ...company,
                  channels: {
                    ...channels,
                    telegram: { ...telegram, username: e.target.value },
                  },
                },
              })
            }
            placeholder="TeddyEt"
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 5. General Location & Company Details */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5">
          <MapPin className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-white text-base">Location & Identity</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Company Display Name</label>
            <input
              type="text"
              value={company.name || ''}
              onChange={(e) =>
                setData({
                  ...data,
                  company: { ...company, name: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Office Location</label>
            <input
              type="text"
              value={company.location || ''}
              onChange={(e) =>
                setData({
                  ...data,
                  company: { ...company, location: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
