'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, Inbox, MessageSquare, ArrowRight, ShieldCheck, Plus, Star } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function AdminOverviewPage() {
  const [data, setData] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [contentRes, inqRes, commentsRes] = await Promise.all([
          fetch('/api/content'),
          fetch('/api/inquiries'),
          fetch('/api/comments?all=true'),
        ]);

        if (contentRes.ok) {
          const contentJson = await contentRes.json();
          setData(contentJson);
        }

        if (inqRes.ok) {
          const inqJson = await inqRes.json();
          setInquiries(inqJson);
        }

        if (commentsRes.ok) {
          const commentsJson = await commentsRes.json();
          setComments(Array.isArray(commentsJson) ? commentsJson : []);
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
  const avgRating =
    comments.length > 0
      ? (comments.reduce((acc, c) => acc + (Number(c.rating) || 5), 0) / comments.length).toFixed(1)
      : '5.0';

  return (
    <div className="space-y-8">
      {/* Title & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Manage your showroom inventory, website copy, client inquiries, and user reviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/comments"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800/60 text-slate-200 text-xs font-semibold transition-colors shadow-sm"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>View Reviews</span>
          </Link>
          <Link
            href="/admin/showroom"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Showcase</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
            <span className="text-xs font-mono">Client Ratings</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white flex items-center gap-2">
            <span>{avgRating}</span>
            <span className="text-amber-400 text-lg">★</span>
          </div>
          <div className="text-[11px] font-mono text-slate-500">
            {comments.length} user review{comments.length !== 1 ? 's' : ''} recorded
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Showcases */}
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

        {/* Recent Client Inquiries */}
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

        {/* Recent Client Ratings & Comments */}
        <div className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Ratings & Comments</span>
            </h3>
            <Link
              href="/admin/comments"
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Manage all ({comments.length})</span> <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {comments.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 font-mono">
                No user ratings or comments yet.
              </div>
            ) : (
              comments.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white truncate max-w-[150px]">{c.name}</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(Math.min(5, Math.max(1, Number(c.rating) || 5)))].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-400 text-[11px] line-clamp-2 italic">
                    &ldquo;{c.comment}&rdquo;
                  </p>
                  <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between pt-1">
                    <span>{c.role || 'Client'}</span>
                    <span>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
