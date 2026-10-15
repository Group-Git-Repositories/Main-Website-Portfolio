'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Layers,
  FileText,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    async function checkAuth() {
      if (isLoginPage) {
        setChecking(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/verify');
        if (!res.ok) {
          router.push('/admin/login');
        }
      } catch (err) {
        router.push('/admin/login');
      } finally {
        setChecking(false);
      }
    }

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (_) {
      router.push('/admin/login');
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#070B16] flex items-center justify-center text-cyan-400 font-mono text-xs">
        VERIFYING ADMIN PRIVILEGES...
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Showroom Projects', href: '/admin/showroom', icon: Layers },
    { label: 'Site Content', href: '/admin/content', icon: FileText },
    { label: 'Client Inquiries', href: '/admin/inquiries', icon: Inbox },
    { label: 'Channel Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#070B16] text-slate-100 flex flex-col font-sans">
      {/* Top Admin Bar */}
      <header className="border-b border-slate-800 bg-[#0E1626] px-4 sm:px-8 h-16 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-white text-xs">
              <span className="text-violet-400">{'{'}</span>
              <span>H</span>
              <span className="text-cyan-400">{'}'}</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-white tracking-wide">HOPE ADMIN GATEWAY</div>
              <div className="text-[10px] font-mono text-cyan-400">Content Management Control</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-500/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <div className="md:hidden flex items-center gap-1 p-2 bg-[#090E1A] border-b border-slate-800 overflow-x-auto text-xs font-mono">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1 rounded whitespace-nowrap ${
                isActive ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Admin Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">{children}</main>
    </div>
  );
}
