'use client';

import { MessageSquare, Send, PhoneCall } from 'lucide-react';

export default function DirectChannelsBar({ company }) {
  const channels = company?.channels || {};
  const whatsapp = channels.whatsapp || {};
  const telegram = channels.telegram || {};

  if (!whatsapp.enabled && !telegram.enabled) return null;

  const whatsappNumber = whatsapp.number?.replace(/\D/g, '') || '251973951191';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsapp.defaultMessage || 'Hello HOPE team, I would like to inquire about building a website.'
  )}`;

  const telegramUrl = telegram.username ? `https://t.me/${telegram.username}` : null;

  return (
    <aside aria-label="Quick contact channels" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* WhatsApp Trigger */}
      {whatsapp.enabled && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat directly on WhatsApp"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1F2C34] hover:bg-[#25D366] text-white border border-emerald-500/30 shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:bg-white animate-ping" />
          <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:text-white" />
          <span className="text-xs font-mono font-semibold tracking-wide">
            Chat on WhatsApp
          </span>
        </a>
      )}

      {/* Telegram Trigger */}
      {telegram.enabled && telegramUrl && (
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct message on Telegram"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#182533] hover:bg-[#229ED9] text-white border border-sky-500/30 shadow-lg text-xs font-mono transition-all duration-200 hover:scale-105"
        >
          <Send className="w-3.5 h-3.5 text-sky-400" />
          <span>Telegram</span>
        </a>
      )}
    </aside>
  );
}
