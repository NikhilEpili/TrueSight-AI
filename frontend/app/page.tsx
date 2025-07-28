'use client';

import Link from 'next/link';
import { Shield, FileSearch, Globe } from 'lucide-react';
import Footer from '../components/Footer';
import { useAuth } from '../components/Providers';
import { useRouter } from 'next/navigation';
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

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
      <div className="w-full flex flex-col items-center justify-center max-w-4xl mx-auto pt--10 pb-8">
        <h2 className={`text-4xl md:text-5xl font-extrabold text-[#a78bfa] animate-slide-in-down-long text-center font-poppins ${inter.className}`}>
          Detect Deepfakes & Misinformation in Real-time
        </h2>
        <p className={`text-left text-2x1 md:text-3x1 text-base md:text-lg text-gray-200 text-center mt-4 animate-slide-in-down-long font-rubik ${roboto.className}`} style={{ fontFamily: 'Helvetica Neue, Roboto, Arial, sans-serif' }}>
        TrueSight empowers users to detect deepfakes and misinformation in real time using cutting-edge AI technology that analyzes videos, images, audio, and text within seconds. In a world where synthetic media is becoming increasingly realistic and widespread, TrueSight serves as your digital truth shield—leveraging advanced machine learning models trained on vast datasets to identify even the most subtle signs of manipulation, such as pixel-level inconsistencies, unnatural facial expressions, audio mismatches, and falsified claims. Our platform performs frame-by-frame and sentence-level analysis, providing instant feedback and trust scores to help users assess content credibility on the spot. Whether you're watching a viral video, reading a news article, or listening to a voice note, TrueSight flags tampered elements before they can influence public opinion or cause harm. 
        </p>
      </div>
      
      {/* Section 3: Centered image */}
      <div className="flex justify-center items-center py-12">
        <img src="/img1.png" alt="Deepfake Illustration" className="rounded-3xl max-w-full w-[90vw] md:w-[900px] shadow-xl" />
      </div>

      {/* Deepfake Description Section */}
      <div className="max-w-4xl mx-auto px-6 py-8 animate-fade-in-2s">
        <div className="bg-[#23243a] bg-opacity-60 rounded-2xl p-8 border border-[#3a4be8] shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-400 text-center font-poppins">
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