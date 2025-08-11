import React from 'react';
import Image from 'next/image';
import { Twitter, Github, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#181824] text-gray-300 pt-10 pb-4 px-4 border-t border-bordergray w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex flex-col gap-4 min-w-[180px]">
          <span className="font-bold text-lg text-white mb-2 font-synthnet">hi@truesight.ai</span>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter size={22} />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="GitHub">
              <Github size={22} />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin size={22} />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="YouTube">
              <Youtube size={22} />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
          <div>
            <div className="font-bold text-white mb-2 font-synthnet">Product</div>
            <ul className="space-y-1">
              <li><a href="/" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Home</a></li>
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Features</a></li>
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Pricing</a></li>
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Enterprise</a></li>
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Downloads</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-2 font-synthnet">Resources</div>
            <ul className="space-y-1">
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Docs</a></li>
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Blog</a></li>
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Forum</a></li>
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Changelog</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-2 font-synthnet">Company</div>
            <ul className="space-y-1">
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">About</a></li>
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Careers</a></li>
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Customers</a></li>
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Community</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-2 font-synthnet">Legal</div>
            <ul className="space-y-1">
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Privacy</a></li>
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Security</a></li>
              <li><a href="#" className="font-medium hover:text-primary border-b-2 border-transparent hover:border-primary transition-all duration-200 font-rubik">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="font-bold w-full mt-8 text-center text-gray-500 text-sm border-t border-bordergray pt-4 font-bevietnampro">
        © 2025 TrueSight. All rights reserved.
      </div>
    </footer>
  );
} 