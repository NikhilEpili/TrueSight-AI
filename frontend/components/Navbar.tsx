'use client'

import Link from 'next/link'
import { useState } from 'react'

// Simple geometric logo SVG for TrueSight
function TrueSightLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="30" height="30" rx="6" fill="#3B3BFF"/>
      <rect x="13" y="13" width="14" height="14" rx="3" fill="white"/>
      <rect x="17" y="17" width="6" height="6" rx="1.5" fill="#3B3BFF"/>
    </svg>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full border-b border-gray-200 bg-[#F3F6FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <TrueSightLogo />
              <span className="text-3xl font-semibold text-[#23206F] tracking-tight select-none">TrueSight</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#why" className="text-lg font-medium text-[#23206F] hover:text-[#3B3BFF] transition">Why TrueSight</Link>
            <Link href="#detection" className="text-lg font-medium text-[#23206F] hover:text-[#3B3BFF] transition">Deepfake Detection</Link>
            <div className="relative group">
              <button className="text-lg font-medium text-[#23206F] hover:text-[#3B3BFF] transition flex items-center gap-1">Use Cases <span className="text-xs">▼</span></button>
              {/* Dropdown example (not functional) */}
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                <Link href="/media" className="block px-4 py-2 text-[#23206F] hover:bg-[#F3F6FB]">Media Analysis</Link>
                <Link href="/news" className="block px-4 py-2 text-[#23206F] hover:bg-[#F3F6FB]">News Verification</Link>
              </div>
            </div>
            <Link href="#technology" className="text-lg font-medium text-[#23206F] hover:text-[#3B3BFF] transition">Technology</Link>
            <div className="relative group">
              <button className="text-lg font-medium text-[#23206F] hover:text-[#3B3BFF] transition flex items-center gap-1">Resources <span className="text-xs">▼</span></button>
              {/* Dropdown example (not functional) */}
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                <Link href="/extension" className="block px-4 py-2 text-[#23206F] hover:bg-[#F3F6FB]">Browser Extension</Link>
                <Link href="/about" className="block px-4 py-2 text-[#23206F] hover:bg-[#F3F6FB]">About</Link>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/get-started" className="bg-[#3B3BFF] hover:bg-[#23206F] text-white text-lg font-medium rounded-full px-8 py-3 transition shadow-md">Get Started</Link>
            <Link href="/login" className="text-[#23206F] text-lg font-medium hover:text-[#3B3BFF] transition">Log In</Link>
          </div>

          {/* Mobile menu button (hamburger) */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#23206F] p-2 focus:outline-none">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#F3F6FB] border-t border-gray-200 px-4 pb-4">
          <div className="flex flex-col gap-2 mt-2">
            <Link href="#why" className="text-lg font-medium text-[#23206F] hover:text-[#3B3BFF] transition">Why TrueSight</Link>
            <Link href="#detection" className="text-lg font-medium text-[#23206F] hover:text-[#3B3BFF] transition">Deepfake Detection</Link>
            <Link href="/media" className="text-lg font-medium text-[#23206F] hover:text-[#3B3BFF] transition">Media Analysis</Link>
            <Link href="/news" className="text-lg font-medium text-[#23206F] hover:text-[#3B3BFF] transition">News Verification</Link>
            <Link href="#technology" className="text-lg font-medium text-[#23206F] hover:text-[#3B3BFF] transition">Technology</Link>
            <Link href="/extension" className="text-lg font-medium text-[#23206F] hover:text-[#3B3BFF] transition">Browser Extension</Link>
            <Link href="/about" className="text-lg font-medium text-[#23206F] hover:text-[#3B3BFF] transition">About</Link>
            <Link href="/get-started" className="bg-[#3B3BFF] hover:bg-[#23206F] text-white text-lg font-medium rounded-full px-8 py-3 transition shadow-md mt-2">Get Started</Link>
            <Link href="/login" className="text-[#23206F] text-lg font-medium hover:text-[#3B3BFF] transition">Log In</Link>
          </div>
        </div>
      )}
    </nav>
  )
} 