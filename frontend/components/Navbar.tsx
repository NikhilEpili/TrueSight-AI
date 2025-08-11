"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from './Providers';
import Image from 'next/image';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleAuthClick = async () => {
    if (user) {
      await logout();
      router.push("/");
    } else {
      router.push("/auth");
    }
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50 border-b border-bordergray">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-20">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 select-none">
            <span className="text-b-2 text-3xl font-extrabold tracking-tight leading-none pb-1 font-synthnet text-text">
            ▶ TrueSight
            </span>
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="flex items-center gap-8 font-sans">
          <Link href="/why-truesight" className="text-lg font-bold text-text hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 pb-1 font-synthnet">Why TrueSight</Link>
          <Link href="/deepfake-detection" className="text-lg font-bold text-text hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 pb-1 font-synthnet">Deepfake Detection</Link>
          <Link href="/technology" className="text-lg font-bold text-text hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 pb-1 font-synthnet">Technology</Link>
          <Link href="/contact" className="text-lg font-bold text-text hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 pb-1 font-synthnet">Use Case</Link>
        </div>
        {/* Auth Button */}
        <div>
          <button
            className="ml-6 bg-primary hover:bg-[#23206F] text-white text-lg font-semibold rounded-full px-6 py-2 transition shadow font-synthnet"
            onClick={handleAuthClick}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
} 