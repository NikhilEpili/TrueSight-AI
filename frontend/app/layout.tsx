'use client';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/components/Providers';
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isRoot = pathname === '/';
  
  // Pages where navbar should not be fixed
  const excludeFixedNavbar = [
    '/video-analysis',
    '/image-analysis',
    '/text-analysis',
    '/audio-analysis'
  ];
  
  const shouldShowFixedNavbar = pathname ? !excludeFixedNavbar.includes(pathname) : true;

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white antialiased`}>
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
              <section className="flex flex-col items-center justify-center text-center w-full min-h-[80vh] px-4">
                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="space-y-6 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
                      Welcome to TrueSight
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl mx-auto">
                      Beyond Sight, Towards Understanding
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                      <button className="btn-primary">
                        Get Started
                      </button>
                      <button className="btn-secondary">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            <main className="flex-1 w-full">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}