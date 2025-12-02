import React from 'react';
import { Metadata } from 'next';
import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { LucideIcon } from 'lucide-react';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Forge-app - Simple Todo Application',
  description: 'Manage your tasks efficiently with Forge-app, built with Next.js 15.',
  viewport: 'width=device-width, initial-scale=1',
};

const Layout: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow-md">
            <nav className="container mx-auto p-4 flex justify-between items-center">
              <div className="text-xl font-bold">Forge-app</div>
              <div>
                <LucideIcon name="menu" className="w-6 h-6" />
              </div>
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4">
            <Component {...pageProps} />
          </main>
          <footer className="bg-white shadow-inner">
            <div className="container mx-auto p-4 text-center">
              © {new Date().getFullYear()} Forge-app. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;