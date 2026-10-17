import './globals.css';

export const metadata = {
  title: 'ROHA Dev | Fast Static Websites & Software Development',
  description:
    'Clean, fast static websites and software solutions that load instantly on all phones and computers. Zero database crashes, no maintenance headaches, and transparent pricing in Birr.',
  metadataBase: new URL('https://main-website-portfolio-sandy.vercel.app'),
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'ROHA Dev | Software & Web Development',
    description: 'Fast, reliable websites and software solutions for modern businesses.',
    siteName: 'ROHA Dev',
    images: ['/logo.png'],
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
