"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from './Providers';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

function TrueSightLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="18" rx="16" ry="10" fill="#6366f1" />
      <ellipse cx="18" cy="18" rx="6" ry="6" fill="#8b5cf6" />
      <path d="M15 18l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuthClick = async () => {
    router.push("/deepfake-detection");
  };

  const navLinks = [
    { href: '/why-truesight', label: 'Why TrueSight' },
    { href: '/deepfake-detection', label: 'Deepfake Detection' },
    { href: '/technology', label: 'Technology' },
    { href: '/contact', label: 'Use Cases' },
  ];

  return (
    <nav className="w-full glass border-b border-gray-700/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 select-none">
              <TrueSightLogo />
              <span className="text-xl font-bold gradient-text">
                TrueSight.AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Button */}
          <div className="flex items-center gap-4">
            <button
              className="btn-primary text-sm px-4 py-2"
              onClick={handleAuthClick}
            >
              Get Started
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700/50">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200 px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 