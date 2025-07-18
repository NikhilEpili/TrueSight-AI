'use client';

import Link from 'next/link';
import { Shield, FileSearch, Globe } from 'lucide-react';
import Footer from '../components/Footer';
import { useAuth } from '../components/Providers';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const features = [
    {
      name: 'Media Analysis',
      description: 'Upload images, videos, or audio files to detect potential deepfakes with advanced AI models.',
      icon: Shield,
      href: '/deepfake-detection',
      protected: true,
    },
    {
      name: 'News Verification',
      description: 'Verify news articles and text content for misinformation using state-of-the-art fact-checking.',
      icon: FileSearch,
      href: '/news',
      protected: true,
    },
    {
      name: 'Browser Extension',
      description: 'Install our browser extension for instant fact-checking while browsing the web.',
      icon: Globe,
      href: '/extension',
      protected: false,
    },
  ];

  const handleFeatureClick = (feature: any) => {
    if (feature.protected && !user) {
      alert('Login first');
      router.push('/auth');
    } else {
      router.push(feature.href);
    }
  };

  return (
    <div className="relative isolate">
      {/* Section 2: Split left/right */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto pt-8 md:pt-12 gap-8">
        {/* Left: Title */}
        <div className="flex-1 flex items-center justify-center w-full animate-fade-in-2s">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#a78bfa] to-[#38bdf8] bg-clip-text text-transparent text-center md:text-left">
            Detect Deepfakes & Misinformation in Real-time
          </h2>
        </div>
        {/* Right: Description (no card effect) */}
        <div className="flex-1 flex items-center justify-center w-full">
          <p className="text-lg md:text-xl text-gray-200 text-center md:text-left animate-fade-in-2s">
            Discover the power of artificial intelligence with TrueSight.Ai. Our cutting-edge platform harnesses advanced machine learning algorithms to provide unprecedented insights and analytics for your business needs.
          </p>
        </div>
      </div>
      {/* Section 3: Centered image */}
      <div className="flex justify-center items-center py-12">
        <img src="/img1.png" alt="Deepfake Illustration" className="rounded-3xl max-w-full w-[90vw] md:w-[900px] shadow-xl" />
      </div>
      {/* Features section (unchanged) */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Comprehensive Protection
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to verify digital content
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our suite of tools helps you stay informed and protected in an era of sophisticated
            digital manipulation.
          </p>
        </div>
        <br></br>
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col bg-[#23243a] rounded-xl p-6 border border-[#3a4be8] shadow-lg hover:bg-indigo-900/40 hover:scale-105 transition-transform transition-colors duration-200 cursor-pointer"
              onClick={() => handleFeatureClick(feature)}
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <feature.icon
                  className="h-5 w-5 flex-none text-indigo-400"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
} 