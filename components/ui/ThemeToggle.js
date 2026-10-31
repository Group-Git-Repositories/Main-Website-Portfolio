'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ showLabel = false, className = '' }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('hope_theme') || 'dark';
    setTheme(stored);
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('hope_theme', next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const isDark = mounted ? theme === 'dark' : true;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group inline-flex items-center gap-2 p-2 rounded-xl border transition-all duration-200 cursor-pointer select-none shadow-sm ${
        isDark
          ? 'bg-slate-900 hover:bg-slate-800 text-slate-100 border-slate-700/80 shadow-black/20 hover:border-amber-400/50'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-slate-200/50 hover:border-cyan-500/50'
      } ${className}`}
    >
      <div className="w-5 h-5 flex items-center justify-center shrink-0">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 fill-amber-400/30 drop-shadow-[0_0_8px_rgba(251,191,36,0.85)] transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-cyan-600 fill-cyan-500/20 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)] transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-mono font-semibold tracking-wide">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
}
