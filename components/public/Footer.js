import React from 'react';
import Link from 'next/link';
import { Github, Mail, Phone, MapPin, Lock, Linkedin } from 'lucide-react';

export default function Footer({ company }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-900 dark:bg-[#070B16] text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/logo.png"
                  alt={company?.name || 'ROHA Dev'}
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <span className="text-sm font-bold text-white tracking-wide">
                {company?.name || 'ROHA Dev'}
              </span>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              Fast, simple static websites that load instantly on all phones and help your business get more clients.
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
              Links
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#showroom" className="hover:text-cyan-400 transition-colors">
                  Website Samples
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-cyan-400 transition-colors">
                  Price Calculator
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-cyan-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li className="pt-2 border-t border-slate-800/60">
                <Link
                  href="/admin/login"
                  className="hover:text-cyan-400 text-slate-400 transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-cyan-500" />
                  <span>Admin Login</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Repositories */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase font-semibold text-white tracking-wider">
              Code & Details
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
                <a
                  href={company?.linkedin || 'https://www.linkedin.com/company/hope-web-development'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>LinkedIn Page</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div>
            &copy; {currentYear} {company?.legalName || 'Hope Teams Digital Solutions'}.
          </div>
          <div className="flex items-center gap-3">
            <span>Fast Static Websites • Addis Ababa</span>
            <span>•</span>
            <Link
              href="/admin/login"
              className="text-slate-500 hover:text-cyan-400 flex items-center gap-1 transition-colors"
            >
              <Lock className="w-3 h-3 text-slate-500" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
