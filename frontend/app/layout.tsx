'use client';

import type { Metadata } from 'next'
import { Inter, Libre_Baskerville } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/components/Providers';
import { usePathname } from 'next/navigation'

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
      <body className={inter.className + ' bg-gradient-to-br from-[#23243a] via-[#181824] to-[#2d2c3a] text-gray-100 font-sans min-h-screen pt-5'} style={{ fontFamily: 'Helvetica Neue, Inter, Arial, sans-serif' }}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            {shouldShowFixedNavbar ? (
              <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
              </div>
            ) : (
              <Navbar />
            )}
            {isRoot && (
              <section className="flex flex-col flex-grow items-center justify-center text-center w-full min-h-[60vh]">
                <h1 className={`text-4xl md:text-6xl font-extrabold mb-4 text-white animate-slide-in-down-long leading-none pb-2 font-orbitron ${libreBaskerville.className}`} style={{display: 'inline-block'}}>
                  Welcome to TrueSight
                </h1>
                <p className={`text-2xl md:text-3xl font-extrabold mb-4 text-white animate-slide-in-down-long leading-none pb-2 font-orbitron ${libreBaskerville.className}`} style={{display: 'inline-block'}}>
                  Beyond Sight, Towards Understanding !!
                </p>
              </section>
            )}
            <main className={`flex-1 w-full`}>
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}