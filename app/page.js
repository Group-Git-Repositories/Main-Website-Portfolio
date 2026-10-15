'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/public/Navbar';
import Hero from '../components/public/Hero';
import ShowroomGrid from '../components/public/ShowroomGrid';
import CostEstimator from '../components/public/CostEstimator';
import ServicesList from '../components/public/ServicesList';
import PricingMatrix from '../components/public/PricingMatrix';
import FAQAccordion from '../components/public/FAQAccordion';
import Footer from '../components/public/Footer';
import DirectChannelsBar from '../components/public/DirectChannelsBar';
import QuoteModal from '../components/public/QuoteModal';

export default function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load portfolio content:', err);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  const handleOpenQuote = (initialPayload = null) => {
    setQuoteInitialData(initialPayload);
    setQuoteModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070B16] flex flex-col items-center justify-center text-cyan-400 font-mono text-xs gap-3">
        <div className="w-8 h-8 rounded-lg border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
        <span>INITIALIZING HOPE SHOWROOM...</span>
      </div>
    );
  }

  const company = data?.company || {};
  const hero = data?.hero || {};
  const projects = data?.projects || [];
  const services = data?.services || [];
  const packages = data?.pricingPackages || [];
  const faq = data?.faq || [];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#070B16] text-slate-900 dark:text-slate-100 selection:bg-cyan-500/20">
      <Navbar company={company} onOpenQuote={() => handleOpenQuote(null)} />

      <main className="flex-1">
        <Hero hero={hero} company={company} onOpenQuote={() => handleOpenQuote(null)} />
        <ShowroomGrid projects={projects} onSelectProjectForQuote={handleOpenQuote} />
        <CostEstimator onCommissionSpec={handleOpenQuote} />
        <ServicesList services={services} onOpenQuote={() => handleOpenQuote(null)} />
        <PricingMatrix packages={packages} onOpenQuote={() => handleOpenQuote(null)} />
        <FAQAccordion items={faq} />
      </main>

      <Footer company={company} />
      <DirectChannelsBar company={company} />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialData={quoteInitialData}
        company={company}
      />
    </div>
  );
}
