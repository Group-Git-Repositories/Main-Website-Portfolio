import './globals.css';

export const metadata = {
  title: 'HOPE Web Development | Fast Static Websites for Your Business',
  description:
    'Clean, fast static websites that load instantly on all phones and computers. Zero database crashes, no maintenance headaches, and transparent pricing in Birr.',
  metadataBase: new URL('https://hopeteams.com'),
  openGraph: {
    title: 'HOPE Web Development | Fast Static Websites',
    description: 'Fast, reliable static websites for Ethiopian businesses.',
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
      <body className="bg-white dark:bg-[#070B16] text-slate-900 dark:text-slate-100 min-h-screen selection:bg-slate-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}
