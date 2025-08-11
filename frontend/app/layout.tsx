'use client';

import type { Metadata } from 'next'
import { Inter, Libre_Baskerville } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/components/Providers';
import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })
const libreBaskerville = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isRoot = pathname === '/';
  
  // Pages where navbar should not be fixed
  const excludeFixedNavbar = [
    '/auth',
    '/video-analysis',
    '/image-analysis',
    '/text-analysis',
    '/audio-analysis'
  ];
  
  const shouldShowFixedNavbar = !excludeFixedNavbar.includes(pathname);

  return (
    <html lang="en">
      <body className="bg-white text-text font-sans min-h-screen" style={{ fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif' }}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-white">
            {shouldShowFixedNavbar ? (
              <div className="sticky top-0 left-0 right-0 z-50">
                <Navbar />
              </div>
            ) : (
              <Navbar />
            )}
            {isRoot && (
              <section className="flex flex-col flex-grow items-center justify-center text-center w-full min-h-[60vh] bg-white">
                <h1 className="text-5xl md:text-8xl font-extrabold mb-4 text-text leading-tight pb-2 animate-slide-in-down 2s font-synthnet">
                  Welcome to TrueSight.Ai
                </h1>
                <p className="text-2xl md:text-4xl font-semibold mb-4 text-text leading-snug animate-slide-in-down 2s font-synthnet">
                  Beyond Sight, Towards Understanding !!
                </p>
              </section>
            )}
            <main className="flex-1 w-full bg-white">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}