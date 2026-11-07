'use client';

import { useState } from 'react';
import { Monitor, Tablet, Smartphone, ExternalLink, Globe, Eye, RotateCw } from 'lucide-react';

export default function DeviceViewportFrame({ project }) {
  const isMobileOptimized = Boolean(project?.bestViewedOnMobile || project?.id === 'proj-rest-06');
  const liveUrl = project?.liveUrl || '';

  // Default to interactive iframe view if liveUrl is available, otherwise mockup
  const [device, setDevice] = useState(isMobileOptimized ? 'mobile' : 'desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [viewMode, setViewMode] = useState(liveUrl ? 'iframe' : 'mockup'); // 'mockup' | 'iframe'
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);

  const mockups = project?.mockups || {};
  const currentMockup =
    device === 'mobile'
      ? mockups.mobile || mockups.desktop
      : device === 'tablet'
      ? mockups.tablet || mockups.desktop
      : mockups.desktop;

  const handleRefreshIframe = () => {
    setIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="w-full bg-[#0B0F19] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Device & Mode Control Bar */}
      <div className="px-3 sm:px-4 py-3 bg-[#070B16] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
              device === 'desktop'
                ? 'bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Desktop 1440px Viewport"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setDevice('tablet')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
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
            type="button"
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
              device === 'mobile'
                ? 'bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile 375px Viewport"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile{isMobileOptimized ? ' ⭐' : ''}</span>
          </button>
        </div>

        {/* View Mode Switcher (Interactive Iframe vs HD Mockup) */}
        <div className="flex items-center gap-2">
          {liveUrl && (
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setViewMode('iframe');
                  setIframeLoading(true);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === 'iframe'
                    ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Live interactive browsing"
              >
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>Interactive</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('mockup')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === 'mockup'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Static high-definition capture"
              >
                <Eye className="w-3 h-3" />
                <span>HD Mockup</span>
              </button>
            </div>
          )}

          {/* Refresh iframe button when in interactive mode */}
          {liveUrl && viewMode === 'iframe' && (
            <button
              type="button"
              onClick={handleRefreshIframe}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Reload Simulator"
              aria-label="Reload Simulator"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* External Live Link */}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Notice Banner: Displayed on PC (desktop) and Tablet before showing the preview */}
      {isMobileOptimized && (device === 'desktop' || device === 'tablet') && (
        <div className="mx-3 sm:mx-6 mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm shadow-lg">
          <div className="flex items-center gap-2.5">
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
      <div className="p-3 sm:p-6 flex items-center justify-center bg-[#070B16] min-h-[380px] sm:min-h-[500px] overflow-hidden">
        {/* 1. Live Interactive Iframe Display */}
        {viewMode === 'iframe' && liveUrl ? (
          <div
            className={`transition-all duration-300 mx-auto shadow-2xl rounded-2xl overflow-hidden border border-slate-700 bg-white relative flex flex-col ${
              device === 'mobile'
                ? 'w-[320px] sm:w-[375px] h-[600px] max-h-[75vh]'
                : device === 'tablet'
                ? 'w-full max-w-[680px] h-[540px]'
                : 'w-full max-w-[960px] h-[560px]'
            }`}
          >
            {/* Device Frame Top Bar (Simulates browser / phone header) */}
            <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-300 font-semibold truncate max-w-[180px] sm:max-w-[280px]">
                  {project?.title} Live Simulator
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-[10px]">
                <span>{device === 'mobile' ? '375×812' : device === 'tablet' ? '768×1024' : '1440×900'}</span>
              </div>
            </div>

            {/* Overlay hint when viewing mobile-first project on PC/Tablet */}
            {isMobileOptimized && (device === 'desktop' || device === 'tablet') && (
              <div className="absolute top-10 left-3 z-20 pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-slate-950/95 border border-amber-500/50 text-amber-300 text-[11px] font-mono font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5">
                  <Smartphone className="w-3 h-3 text-amber-400" />
                  Best view on mobile phone
                </span>
              </div>
            )}

            {/* Iframe Loading Indicator */}
            {iframeLoading && (
              <div className="absolute inset-x-0 top-8 bottom-0 bg-[#0E1626] flex flex-col items-center justify-center gap-3 z-10 text-slate-400 text-xs font-mono">
                <div className="w-7 h-7 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
                <span>Loading interactive simulator...</span>
              </div>
            )}

            {/* Real Interactive Website Iframe */}
            <iframe
              key={iframeKey}
              src={liveUrl}
              title={`${project?.title || 'Project'} live demo`}
              className="w-full flex-1 border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads allow-top-navigation-by-user-activation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              onLoad={() => setIframeLoading(false)}
            />
          </div>
        ) : (
          /* 2. HD Mockup Display */
          <div
            className={`transition-all duration-300 mx-auto shadow-2xl rounded-xl overflow-hidden border border-slate-800 bg-[#0E1626] relative ${
              device === 'mobile'
                ? 'w-[280px] sm:w-[320px] aspect-[9/16]'
                : device === 'tablet'
                ? 'w-full max-w-[560px] aspect-[4/3]'
                : 'w-full max-w-[900px] aspect-[16/9]'
            }`}
          >
            {/* Overlay hint on PC/Tablet */}
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
                alt={`${project?.title} ${device} preview`}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-mono">
                Mockup preview unavailable
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
