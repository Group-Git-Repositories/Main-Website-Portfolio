import React from 'react';
import Link from 'next/link';
import { Github, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer({ company }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-900 dark:bg-[#070B16] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-white">
                <span className="text-violet-400 text-[10px]">{'{'}</span>
                <span className="text-white text-xs">H</span>
                <span className="text-cyan-400 text-[10px]">{'}'}</span>
              </div>
              <span className="text-sm font-bold text-white tracking-wide">
                {company?.name || 'HOPE Web Development'}
              </span>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              {company?.tagline ||
                'Precision Engineered Web Architecture & Interactive Workshop Showroom.'}
            </p>

            <div className="space-y-1.5 pt-2 text-slate-400 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{company?.location || 'Addis Ababa, Ethiopia'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{company?.email || 'contact@hopeteams.com'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{company?.phone || '+251 973 951 191'}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase font-semibold text-white tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#showroom" className="hover:text-cyan-400 transition-colors">
                  Workshop Showroom
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-cyan-400 transition-colors">
                  Scope Estimator
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Engineering Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-cyan-400 transition-colors">
                  Package Matrix
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Repositories & Control */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase font-semibold text-white tracking-wider">
              Engineering & Access
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href={company?.github || 'https://github.com/Group-Git-Repositories/Main-Website-Portfolio'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors font-mono"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Gateway</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div>
            &copy; {currentYear} {company?.legalName || 'Hope Teams Digital Solutions'}. All rights reserved.
          </div>
          <div>Bespoke Next.js 14 App Architecture • Zero AI Templates</div>
        </div>
      </div>
    </footer>
  );
}
