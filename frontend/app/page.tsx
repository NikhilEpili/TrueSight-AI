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
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#a78bfa] to-[#38bdf8] bg-clip-text text-transparent text-center md:text-left font-poppins">
            Detect Deepfakes & Misinformation in Real-time
          </h2>
        </div>
        {/* Right: Description (no card effect) */}
        <div className="flex-1 flex items-center justify-center w-full">
          <p className="text-lg md:text-xl text-gray-200 text-center md:text-left animate-fade-in-2s font-rubik">
            Discover the power of artificial intelligence with TrueSight.Ai. Our cutting-edge platform harnesses advanced machine learning algorithms to provide unprecedented insights and analytics for your business needs.
          </p>
        </div>
      </div>
      
      {/* Section 3: Centered image */}
      <div className="flex justify-center items-center py-12">
        <img src="/img1.png" alt="Deepfake Illustration" className="rounded-3xl max-w-full w-[90vw] md:w-[900px] shadow-xl" />
      </div>

      {/* Deepfake Description Section */}
      <div className="max-w-4xl mx-auto px-6 py-8 animate-fade-in-2s">
        <div className="bg-[#23243a] bg-opacity-60 rounded-2xl p-8 border border-[#3a4be8] shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent text-center font-poppins">
            What are Deepfakes?
          </h3>
          <div className="space-y-4 text-gray-200 font-rubik">
            <p className="text-lg md:text-xl leading-relaxed">
              Deepfakes are highly realistic media—such as videos, images, or audio—created or manipulated using advanced artificial intelligence, particularly deep learning techniques. The name stems from blending "deep learning" and "fake."
            </p>
            <ul className="space-y-3 text-base md:text-lg leading-relaxed">
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3 mt-1">•</span>
                <span>They often involve swapping or synthesizing a person's face, voice, or movements using AI models trained on large datasets—making the output appear convincingly real.</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3 mt-1">•</span>
                <span>These synthetic artifacts can show someone saying or doing things they never did.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features section (unchanged) */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400 font-poppins">
            Comprehensive Protection
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-poppins">
            Everything you need to verify digital content
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300 font-rubik">
            Our suite of tools helps you stay informed and protected in an era of sophisticated
            digital manipulation.
          </p>
        </div>
        <br></br>
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3 font-poppins">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col bg-[#23243a] rounded-xl p-6 border border-[#3a4be8] shadow-lg hover:bg-indigo-900/40 hover:scale-105 transition-transform transition-colors duration-200 cursor-pointer"
              onClick={() => handleFeatureClick(feature)}
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <feature.icon
                  className="h-5 w-5 flex-none text-indigo-400 font-bold font-poppins"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300 font-rubik font-semibold">
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