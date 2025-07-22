"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from './Providers';

function TrueSightLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="18" rx="16" ry="10" fill="#a5b4fc" />
      <ellipse cx="18" cy="18" rx="6" ry="6" fill="#6366f1" />
      <path d="M15 18l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
    <nav className="w-full border-b border-gray-300 bg-[#f3f4f6] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-20">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 select-none">
            <TrueSightLogo />
            <span className="text-3xl font-extrabold font-heading bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent tracking-tight leading-none pb-1" style={{display: 'inline-block'}}>
              TrueSight
            </span>
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link href="/why-truesight" className="text-lg font-bold text-[#23206F] hover:text-indigo-500 transition transform hover:scale-105">Why-TrueSight</Link>
          <Link href="/deepfake-detection" className="text-lg font-bold text-[#23206F] hover:text-indigo-500 transition transform hover:scale-105">Deepfake-Detection</Link>
          <Link href="/technology" className="text-lg font-bold text-[#23206F] hover:text-indigo-500 transition transform hover:scale-105">Technology</Link>
          <Link href="/contact" className="text-lg font-bold text-[#23206F] hover:text-indigo-500 transition transform hover:scale-105">Use-Case</Link>
        </div>
        {/* Auth Button */}
        <div>
          <button
            className="ml-6 bg-indigo-400 hover:bg-indigo-600 text-white text-lg font-semibold rounded-full px-6 py-2 transition shadow"
            onClick={handleAuthClick}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
} 