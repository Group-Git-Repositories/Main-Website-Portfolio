'use client';

import { useState, useEffect } from 'react';
import { Save, Check, MessageSquare, Send, Globe } from 'lucide-react';
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

      if (!res.ok) throw new Error('Failed to update channel settings.');
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
  const whatsapp = channels.whatsapp || {};
  const telegram = channels.telegram || {};

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Channel & Identity Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Configure direct chat messaging triggers and company contact endpoints.
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

      {/* WhatsApp Configuration */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">WhatsApp Direct Trigger</h3>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
            <input
              type="checkbox"
              checked={whatsapp.enabled}
              onChange={(e) =>
                setData({
                  ...data,
                  company: {
                    ...company,
                    channels: {
                      ...channels,
                      whatsapp: { ...whatsapp, enabled: e.target.checked },
                    },
                  },
                })
              }
              className="rounded text-emerald-500"
            />
            <span>Enabled</span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">
            WhatsApp Phone Number (with Country Code)
          </label>
          <input
            type="text"
            value={whatsapp.number || ''}
            onChange={(e) =>
              setData({
                ...data,
                company: {
                  ...company,
                  channels: {
                    ...channels,
                    whatsapp: { ...whatsapp, number: e.target.value },
                  },
                },
              })
            }
            placeholder="+251 973 951 191"
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">
            Pre-Filled Greeting Message
          </label>
          <input
            type="text"
            value={whatsapp.defaultMessage || ''}
            onChange={(e) =>
              setData({
                ...data,
                company: {
                  ...company,
                  channels: {
                    ...channels,
                    whatsapp: { ...whatsapp, defaultMessage: e.target.value },
                  },
                },
              })
            }
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
          />
        </div>
      </div>

      {/* Telegram Configuration */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Send className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-white text-base">Telegram Direct Trigger</h3>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
            <input
              type="checkbox"
              checked={telegram.enabled}
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
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
          />
        </div>
      </div>

      {/* Company Contact Endpoints */}
      <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
        <h3 className="font-bold text-white text-base">Company Contact Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Company Email</label>
            <input
              type="email"
              value={company.email || ''}
              onChange={(e) =>
                setData({
                  ...data,
                  company: { ...company, email: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Location</label>
            <input
              type="text"
              value={company.location || ''}
              onChange={(e) =>
                setData({
                  ...data,
                  company: { ...company, location: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
