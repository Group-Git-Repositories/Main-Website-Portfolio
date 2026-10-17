'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../../../components/ui/Button';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => {
        if (d?.company?.name) setCompanyName(d.company.name);
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid username or password');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B16] text-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#0E1626] border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-700 flex items-center justify-center overflow-hidden shadow-sm shadow-cyan-500/20 shrink-0">
            <img
              src="/logo.png"
              alt={companyName || 'ROHA Dev'}
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div>
            <div className="text-base font-bold tracking-tight uppercase">
              {companyName ? `${companyName} Gateway` : 'ROHA DEV GATEWAY'}
            </div>
            <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
              Admin Authentication
            </div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
              {error}
            </div>
          )}

          <div className="pt-2 space-y-3">
            <Button
              type="submit"
              disabled={loading}
              size="md"
              variant="primary"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full text-xs font-bold"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <div className="text-center pt-1">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Website</span>
              </Link>
            </div>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-slate-800/80 text-center text-[11px] font-mono text-slate-500">
          Default seed: admin / hope2026 (configurable in .env)
        </div>
      </div>
    </div>
  );
}
