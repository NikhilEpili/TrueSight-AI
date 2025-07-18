'use client'
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

  return (
    <html lang="en">
      <body className={inter.className + ' bg-gradient-to-br from-[#23243a] via-[#181824] to-[#2d2c3a] text-gray-100 font-sans min-h-screen'}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            {isRoot && (
              <section className="flex flex-col flex-grow items-center justify-center text-center w-full min-h-[60vh]">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent animate-slide-in-down-long leading-none pb-2" style={{display: 'inline-block'}}>
                  Welcome to TrueSight.Ai
                </h1>
              </section>
            )}
            <main className="flex-1 w-full">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}