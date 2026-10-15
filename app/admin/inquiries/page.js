'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, Building, Calendar, DollarSign, Clock, MessageSquare } from 'lucide-react';

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/inquiries');
        if (res.ok) {
          const json = await res.json();
          setInquiries(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="text-cyan-400 font-mono text-xs">LOADING CLIENT INQUIRIES...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Client Inquiries & Leads
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Inquiries submitted via the Workshop Showroom and Interactive Scope Estimator.
        </p>
      </div>

      {inquiries.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0E1626] border border-slate-800 text-slate-400 text-xs font-mono">
          No client inquiries received yet. Submit an inquiry through the homepage to test the flow.
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div>
                  <h3 className="text-base font-bold text-white">{inq.name}</h3>
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-cyan-400" />
                      <a href={`mailto:${inq.email}`} className="hover:underline">
                        {inq.email}
                      </a>
                    </span>
                    {inq.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-emerald-400" />
                        <a href={`tel:${inq.phone}`} className="hover:underline">
                          {inq.phone}
                        </a>
                      </span>
                    )}
                    {inq.company && (
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-violet-400" />
                        <span>{inq.company}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {inq.status || 'New'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {new Date(inq.receivedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {inq.projectRef && (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
                  <span className="text-slate-500">Target Build / Scope: </span>
                  {inq.projectRef}
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block">Budget Tier</span>
                  <span className="text-white font-semibold">{inq.budget || 'Unspecified'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Target Timeline</span>
                  <span className="text-white font-semibold">{inq.timeline || 'Flexible'}</span>
                </div>
              </div>

              {inq.message && (
                <div className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
                  <span className="text-slate-500 font-mono block mb-1">Client Message:</span>
                  {inq.message}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
