import './globals.css';

export const metadata = {
  title: 'HOPE Web Development | Precision Web Architecture & Workshop Showroom',
  description:
    'Bespoke digital showroom and custom web engineering workshop. Explore real website architectures, test multi-device viewports, and commission your website build.',
  metadataBase: new URL('https://hopeteams.com'),
  openGraph: {
    title: 'HOPE Web Development | Digital Showroom',
    description: 'Precision engineered websites and digital showroom.',
    siteName: 'HOPE Web Development',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white dark:bg-[#070B16] text-slate-900 dark:text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
