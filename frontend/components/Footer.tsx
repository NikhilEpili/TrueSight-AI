import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#23243a] via-[#181824] to-[#2d2c3a] text-gray-300 pt-8 pb-4 px-4 border-t border-[#23243a]/40 w-full">
      <div className="w-full flex flex-col md:flex-row md:justify-between gap-6">
        <div className="flex flex-col gap-4 min-w-[180px]">
          <span className="font-bold text-lg text-white mb-2">hi@truesight.ai</span>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-indigo-400 transition-colors"><span className="sr-only">Twitter</span>🐦</a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><span className="sr-only">GitHub</span>🐙</a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><span className="sr-only">Reddit</span>👽</a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><span className="sr-only">YouTube</span>▶️</a>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
          <div>
            <div className="font-bold text-white mb-2 font-poppins">Product</div>
            <ul className="space-y-1">
              <li><a href="/" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Home</a></li>
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Features</a></li>
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Pricing</a></li>
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Enterprise</a></li>
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Downloads</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-2 font-poppins">Resources</div>
            <ul className="space-y-1">
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Docs</a></li>
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Blog</a></li>
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Forum</a></li>
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Changelog</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-2 font-poppins">Company</div>
            <ul className="space-y-1">
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">About</a></li>
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Careers</a></li>
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Customers</a></li>
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Community</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-2 font-poppins">Legal</div>
            <ul className="space-y-1">
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Privacy</a></li>
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Security</a></li>
              <li><a href="#" className="font-medium hover:text-indigo-400 transition-colors font-rubik">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="font-bold w-full mt-6 text-center text-gray-400 text-sm border-t border-[#23243a]/40 pt-3 font-rubik">
        © 2024 TrueSight.Ai. All rights reserved.
      </div>
    </footer>
  );
} 