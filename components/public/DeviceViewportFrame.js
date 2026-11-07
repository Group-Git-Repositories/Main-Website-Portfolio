'use client';

import { useState } from 'react';
import { Monitor, Tablet, Smartphone, ExternalLink, Globe, Eye, Sparkles } from 'lucide-react';

export default function DeviceViewportFrame({ project }) {
  const isMobileOptimized = Boolean(project?.bestViewedOnMobile || project?.id === 'proj-rest-06');
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [viewMode, setViewMode] = useState('mockup'); // 'mockup' | 'iframe'
  const [iframeError, setIframeError] = useState(false);

  const mockups = project?.mockups || {};
  const currentMockup =
    device === 'mobile'
      ? mockups.mobile || mockups.desktop
      : device === 'tablet'
      ? mockups.tablet || mockups.desktop
      : mockups.desktop;

  const liveUrl = project?.liveUrl || '';

  return (
    <div className="w-full bg-[#0B0F19] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Device & Mode Control Bar */}
      <div className="px-4 py-3 bg-[#070B16] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              device === 'desktop'
                ? 'bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop 1920x1080 Viewport"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setDevice('tablet')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              device === 'tablet'
                ? 'bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tablet 768px Viewport"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              device === 'mobile'
                ? 'bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile 375px Viewport"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              Mobile{isMobileOptimized ? ' (Recommended)' : ''}
            </span>
          </button>
        </div>

        {/* View Mode Switcher (HD Mockup vs Interactive Iframe) */}
        <div className="flex items-center gap-2">
          {liveUrl && (
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setViewMode('mockup')}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  viewMode === 'mockup'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>HD Mockup</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('iframe');
                  setIframeError(false);
                }}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  viewMode === 'iframe'
                    ? 'bg-violet-600/30 text-violet-300 font-semibold border border-violet-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>Interactive</span>
              </button>
            </div>
          )}

          {/* External Live Link */}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Notice Banner: Displayed on PC (desktop) and Tablet before showing the preview */}
      {isMobileOptimized && (device === 'desktop' || device === 'tablet') && (
        <div className="mx-4 sm:mx-6 mt-4 p-3.5 sm:p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm shadow-lg">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-amber-500/20 text-amber-300 shrink-0">
              <Smartphone className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-amber-300 mr-1.5 uppercase font-mono text-[11px] tracking-wide">
                Best view on mobile phone:
              </span>
              <span className="text-amber-100/90 block sm:inline">
                This digital dining menu was engineered specifically for smartphone screens & QR table codes. Switch to mobile for the best experience.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold transition-colors shrink-0 shadow cursor-pointer active:scale-95"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Switch to Mobile View</span>
          </button>
        </div>
      )}

      {/* Screen Frame Container */}
      <div className="p-4 sm:p-6 flex items-center justify-center bg-[#070B16] min-h-[360px] sm:min-h-[460px] overflow-hidden">
        {/* Mockup Display */}
        {viewMode === 'mockup' ? (
          <div
            className={`transition-all duration-300 mx-auto shadow-2xl rounded-xl overflow-hidden border border-slate-800 bg-[#0E1626] relative ${
              device === 'mobile'
                ? 'w-[280px] sm:w-[320px] aspect-[9/16]'
                : device === 'tablet'
                ? 'w-full max-w-[560px] aspect-[4/3]'
                : 'w-full max-w-[900px] aspect-[16/9]'
            }`}
          >
            {/* Overlay hint when viewing mobile-optimized project on PC/Tablet */}
            {isMobileOptimized && (device === 'desktop' || device === 'tablet') && (
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-slate-950/90 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-semibold shadow-lg backdrop-blur-md flex items-center gap-1.5">
                  <Smartphone className="w-3 h-3 text-amber-400" />
                  Best view on mobile phone
                </span>
              </div>
            )}

            {currentMockup ? (
              <img
                src={currentMockup}
                alt={`${project.title} ${device} preview`}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-mono">
                Mockup preview unavailable
              </div>
            )}
          </div>
        ) : (
          /* Interactive iframe Display */
          <div
            className={`transition-all duration-300 mx-auto shadow-2xl rounded-xl overflow-hidden border border-slate-700 bg-white relative ${
              device === 'mobile'
                ? 'w-[320px] sm:w-[360px] h-[580px]'
                : device === 'tablet'
                ? 'w-full max-w-[640px] h-[520px]'
                : 'w-full max-w-[960px] h-[540px]'
            }`}
          >
            {/* Overlay hint on PC/Tablet interactive mode */}
            {isMobileOptimized && (device === 'desktop' || device === 'tablet') && (
              <div className="absolute top-3 left-3 z-20 pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-slate-950/90 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-semibold shadow-lg backdrop-blur-md flex items-center gap-1.5">
                  <Smartphone className="w-3 h-3 text-amber-400" />
                  Best view on mobile phone
                </span>
              </div>
            )}

            {iframeError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0E1626] text-slate-300 font-mono text-xs">
                <Globe className="w-8 h-8 text-cyan-400 mb-3" />
                <p className="font-semibold mb-1">Interactive embed protected by external host.</p>
                <p className="text-slate-400 mb-4 max-w-sm">
                  Please click below to launch the live deployed website in a new window.
                </p>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
                >
                  Open Live Website
                </a>
              </div>
            ) : (
              <iframe
                src={liveUrl}
                title={`${project.title} live demo`}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms"
                onError={() => setIframeError(true)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
