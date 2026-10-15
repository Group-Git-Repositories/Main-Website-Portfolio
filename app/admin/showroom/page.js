'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Upload, ExternalLink, Save } from 'lucide-react';
import { INDUSTRY_CATEGORIES } from '../../../lib/constants';
import Button from '../../../components/ui/Button';

export default function ShowroomAdminPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setLoading(false);
    }
  }

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSaveAll = async (updatedProjects) => {
    setSaving(true);
    try {
      const payload = { ...data, projects: updatedProjects };
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to update showroom projects.');

      setData(payload);
      showToast('Showroom updated successfully.');
      setEditingProject(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this project showcase?')) return;
    const next = (data?.projects || []).filter((p) => p.id !== id);
    handleSaveAll(next);
  };

  const handleSaveModal = (project) => {
    const current = data?.projects || [];
    const exists = current.some((p) => p.id === project.id);
    let next;
    if (exists) {
      next = current.map((p) => (p.id === project.id ? project : p));
    } else {
      next = [project, ...current];
    }
    handleSaveAll(next);
  };

  if (loading) {
    return <div className="text-cyan-400 font-mono text-xs">LOADING SHOWROOM INVENTORY...</div>;
  }

  const projects = data?.projects || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Showroom Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Add and customize interactive website showcases for prospective clients.
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          icon={Plus}
          onClick={() =>
            setEditingProject({
              id: `proj-${Date.now()}`,
              title: '',
              tagline: '',
              category: 'Corporate & B2B',
              featured: false,
              liveUrl: '',
              mockups: { desktop: '', tablet: '', mobile: '' },
              deliverables: ['Custom Next.js Build', 'Admin Gateway', 'Mobile Responsive'],
              specs: {
                turnaroundDays: 7,
                showTurnaround: true,
                startingPrice: '$950',
                showPrice: true,
                enableOrderCta: true,
              },
              description: '',
            })
          }
        >
          Add Showcase Project
        </Button>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Projects Table / Cards */}
      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#0E1626] border border-slate-800 gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-12 rounded-lg bg-[#070B16] border border-slate-700 overflow-hidden shrink-0">
                <img
                  src={p.mockups?.desktop || '/projects/aura_desktop.svg'}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{p.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                    {p.category}
                  </span>
                  {p.featured && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-950 text-violet-400 border border-violet-800">
                      Featured
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Price: {p.specs?.startingPrice || 'N/A'} • Turnaround:{' '}
                  {p.specs?.turnaroundDays ? `${p.specs.turnaroundDays}d` : 'N/A'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => setEditingProject({ ...p })}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 text-xs font-mono flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="p-2 rounded-lg bg-red-950/20 border border-red-900/40 text-red-400 hover:bg-red-950/40 text-xs font-mono flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <ProjectEditorModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleSaveModal}
        />
      )}
    </div>
  );
}

function ProjectEditorModal({ project, onClose, onSave }) {
  const [form, setForm] = useState({ ...project });
  const [uploading, setUploading] = useState(false);

  const categories = INDUSTRY_CATEGORIES.filter((c) => c !== 'All Projects');

  const handleUpload = async (e, deviceKey) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setForm((prev) => ({
          ...prev,
          mockups: {
            ...prev.mockups,
            [deviceKey]: data.url,
          },
        }));
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0E1626] w-full max-w-2xl max-h-[90vh] rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        <div className="p-5 bg-[#070B16] border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-base">
            {project.title ? `Edit ${project.title}` : 'Add New Showcase'}
          </h3>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-mono mb-1">Showcase Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Apex Capital Advisory"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-mono mb-1">Industry Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">Tagline / Subheading</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              placeholder="e.g. Corporate consulting portal with appointment desk"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">Live URL (Optional for Interactive embed)</label>
            <input
              type="url"
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              placeholder="https://example.com"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Device Mockups */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="font-mono text-cyan-400 font-semibold block">
              Device Mockup Media (Desktop, Tablet, Mobile)
            </span>

            {['desktop', 'tablet', 'mobile'].map((dev) => (
              <div key={dev} className="flex items-center gap-3">
                <span className="w-16 font-mono text-slate-400 uppercase text-[10px]">
                  {dev}
                </span>
                <input
                  type="text"
                  value={form.mockups?.[dev] || ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      mockups: { ...form.mockups, [dev]: e.target.value },
                    })
                  }
                  placeholder={`/projects/sample_${dev}.svg or https://...`}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                />
                <label className="cursor-pointer px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[10px] flex items-center gap-1 shrink-0">
                  <Upload className="w-3 h-3" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, dev)}
                    className="hidden"
                  />
                </label>
              </div>
            ))}
          </div>

          {/* Pricing & Commercial Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <label className="block text-slate-400 font-mono text-[10px] mb-1">Starting Price</label>
              <input
                type="text"
                value={form.specs?.startingPrice || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    specs: { ...form.specs, startingPrice: e.target.value },
                  })
                }
                placeholder="$950"
                className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-mono text-[10px] mb-1">Turnaround Days</label>
              <input
                type="number"
                value={form.specs?.turnaroundDays || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    specs: { ...form.specs, turnaroundDays: parseInt(e.target.value, 10) || 7 },
                  })
                }
                placeholder="7"
                className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-white"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={form.specs?.showPrice}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      specs: { ...form.specs, showPrice: e.target.checked },
                    })
                  }
                  className="rounded text-cyan-500"
                />
                <span>Show Price</span>
              </label>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded text-cyan-500"
                />
                <span>Featured</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white resize-none"
            />
          </div>
        </div>

        <div className="p-4 bg-[#070B16] border-t border-slate-800 flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSave(form)}
            icon={Save}
            disabled={uploading}
          >
            Save Showcase
          </Button>
        </div>
      </div>
    </div>
  );
}
