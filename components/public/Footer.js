import React from 'react';
import Link from 'next/link';
import { Github, Mail, Phone, MapPin, Lock, Linkedin } from 'lucide-react';
import { ensureAbsoluteUrl } from '../../lib/utils';

export default function Footer({ company }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-900 dark:bg-[#070B16] text-slate-400 text-xs pb-24 sm:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                <img
                  src="/IMG_1561newwwwwwww.png"
                  alt={company?.name || 'ROHA Dev'}
                  className="w-full h-full object-contain p-1 block dark:hidden"
                />
                <img
                  src="/IMG_1564jfurur.png"
                  alt={company?.name || 'ROHA Dev'}
                  className="w-full h-full object-contain p-1 hidden dark:block"
                />
              </div>
              <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                {company?.name || 'ROHA Dev'}
              </span>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed text-sm sm:text-base">
              Fast, responsive restaurant websites and contactless digital QR menus that load instantly on all smartphones across Addis Ababa and Ethiopia.
            </p>

            <div className="space-y-2 pt-2 text-slate-400 font-mono text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{company?.location || 'Addis Ababa, Ethiopia'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${company?.email || 'rohadev0@gmail.com'}`} className="hover:underline">
                  {company?.email || 'rohadev0@gmail.com'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${company?.phone || '+251980717219'}`} className="hover:underline">
                  {company?.phone || '+251 980717219'}
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase font-semibold text-white tracking-wider">
              Quick Links
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors py-1 inline-block text-sm">
                  Our Purpose & Commitment
                </a>
              </li>
              <li>
                <a href="#showroom" className="hover:text-cyan-400 transition-colors py-1 inline-block text-sm">
                  Sample Websites
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors py-1 inline-block text-sm">
                  What We Build
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-cyan-400 transition-colors py-1 inline-block text-sm">
                  Pricing Packages
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-cyan-400 transition-colors py-1 inline-block text-sm">
                  Client Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors py-1 inline-block text-sm">
                  FAQ
                </a>
              </li>
              <li className="pt-2 border-t border-slate-800/60">
                <Link
                  href="/admin/login"
                  className="hover:text-cyan-400 text-slate-400 transition-colors flex items-center gap-1.5 py-1 text-sm"
                >
                  <Lock className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Admin Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Channels & Info */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase font-semibold text-white tracking-wider">
              Connect With Us
            </div>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={ensureAbsoluteUrl(company?.github || 'https://github.com/Group-Git-Repositories/Main-Website-Portfolio')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors py-1 text-sm"
                >
                  <Github className="w-4 h-4 shrink-0" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href={ensureAbsoluteUrl(company?.linkedin || company?.channels?.linkedin?.url || 'https://www.linkedin.com/in/roha-dev')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors py-1 text-sm"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2] shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500 text-center sm:text-left">
          <div>
            &copy; {currentYear} {company?.legalName || 'ROHA Dev'}. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Fast Restaurant Websites • Addis Ababa</span>
            <span>•</span>
            <Link
              href="/admin/login"
              className="text-slate-500 hover:text-cyan-400 flex items-center gap-1 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
