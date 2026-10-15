'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, Inbox, MessageSquare, ArrowRight, ShieldCheck, Plus } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function AdminOverviewPage() {
  const [data, setData] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [contentRes, inqRes] = await Promise.all([
          fetch('/api/content'),
          fetch('/api/inquiries'),
        ]);

        if (contentRes.ok) {
          const contentJson = await contentRes.json();
          setData(contentJson);
        }

        if (inqRes.ok) {
          const inqJson = await inqRes.json();
          setInquiries(inqJson);
        }
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return <div className="text-cyan-400 font-mono text-xs">LOADING OVERVIEW METRICS...</div>;
  }

  const projects = data?.projects || [];
  const featuredCount = projects.filter((p) => p.featured).length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  return (
    <div className="space-y-8">
      {/* Title & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Manage your showroom inventory, website copy, and client inquiries.
          </p>
        </div>

        <Link href="/admin/showroom">
          <Button size="sm" variant="primary" icon={Plus}>
            Add New Showcase
          </Button>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Total Showcases</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{projects.length}</div>
          <div className="text-[11px] font-mono text-slate-500">
            {featuredCount} marked as Featured
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Client Inquiries</span>
            <Inbox className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{inquiries.length}</div>
          <div className="text-[11px] font-mono text-cyan-400 font-semibold">
            {newInquiriesCount} requiring response
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">WhatsApp Channel</span>
            <MessageSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white">
            {data?.company?.channels?.whatsapp?.enabled ? 'Active' : 'Disabled'}
          </div>
          <div className="text-[11px] font-mono text-slate-500 truncate">
            {data?.company?.channels?.whatsapp?.number}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Security Status</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white">Protected</div>
          <div className="text-[11px] font-mono text-slate-500">HTTP-Only Session</div>
        </div>
      </div>

      {/* Quick Access Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Latest Showcases</h3>
            <Link
              href="/admin/showroom"
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Manage all</span> <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs"
              >
                <div>
                  <div className="font-semibold text-white">{p.title}</div>
                  <div className="text-slate-400 font-mono text-[10px]">{p.category}</div>
                </div>
                <div className="font-mono text-cyan-400 font-semibold">
                  {p.specs?.startingPrice || 'Custom'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Recent Client Inquiries</h3>
            <Link
              href="/admin/inquiries"
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>View inbox</span> <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {inquiries.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 font-mono">
                No inquiries received yet. Test by submitting a quote on the homepage.
              </div>
            ) : (
              inquiries.slice(0, 4).map((inq) => (
                <div
                  key={inq.id}
                  className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{inq.name}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                      {inq.status}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] truncate">{inq.email}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
