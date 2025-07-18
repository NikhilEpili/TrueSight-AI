import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#23243a] via-[#181824] to-[#2d2c3a] text-gray-300 pt-12 pb-6 px-4 border-t border-[#23243a]/40 w-full">
      <div className="w-full flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex flex-col gap-4 min-w-[180px]">
          <span className="font-bold text-lg text-white mb-2">hi@truesight.ai</span>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-indigo-400 transition-colors"><span className="sr-only">Twitter</span>🐦</a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><span className="sr-only">GitHub</span>🐙</a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><span className="sr-only">Reddit</span>👽</a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><span className="sr-only">YouTube</span>▶️</a>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
          <div>
            <div className="font-semibold text-white mb-2">Product</div>
            <ul className="space-y-1">
              <li><a href="/" className="hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Enterprise</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Downloads</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Resources</div>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Docs</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Forum</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Company</div>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Customers</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Legal</div>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full mt-8 text-center text-gray-400 text-sm border-t border-[#23243a]/40 pt-4">
        © 2024 TrueSight.Ai. All rights reserved.
      </div>
    </footer>
  );
} 