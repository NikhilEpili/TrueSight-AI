'use client';

import Link from 'next/link';
import Footer from './Footer';
import { useAuth } from './Providers';
import { useRouter } from 'next/navigation';

const analysisCards = [
  {
    title: 'Video Analysis',
    description:
      'Advanced deep learning algorithms analyze video content to detect AI-generated footage with high accuracy and precision.',
    href: '/video-analysis',
  },
  {
    title: 'Image Analysis',
    description:
      'Sophisticated computer vision technology identifies AI-generated images and distinguishes them from authentic photographs.',
    href: '/image-analysis',
  },
  {
    title: 'Text Analysis',
    description:
      'Natural language processing models detect AI-generated text content and verify authenticity of written material.',
    href: '/text-analysis',
  },
  {
    title: 'Audio Analysis',
    description:
      'Cutting-edge audio forensics detect synthetic voices and manipulated speech patterns in audio files.',
    href: '/audio-analysis',
  },
];

export default function DeepfakeDetection() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleCardClick = (href: string) => {
    if (!user) {
      alert('Login first');
      router.push('/auth');
    } else {
      router.push(href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#23243a] via-[#181824] to-[#2d2c3a]">
        <span className="text-xl text-white">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#23243a] via-[#181824] to-[#2d2c3a] py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-16">
        {/* Left: Title and Description */}
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent leading-tight animate-slide-in-down-long leading-none pb-2"
        style={{ display: 'inline-block' }}>
            Deepfake Detection
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl animate-fade-in-2s w-full max-w-xl">
            Experience a frictionless and user-friendly interface designed for everyone. Simply drag and drop your files and get a deepfake media verification within seconds. Our advanced system uses a multilayer approach, examining pixels, file structures, and voice patterns to deliver the most comprehensive assessment effortlessly.
          </p>
        </div>
        {/* Right: Illustration Image */}
        <div className="flex-1 flex justify-center items-center">
          <img src="/img2.png" alt="Deepfake Detection Illustration" className="w-[420px] h-[320px] object-contain rounded-3xl shadow-lg" />
        </div>
      </div>
      {/* Analysis Cards Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {analysisCards.map((card) => (
          <div
            key={card.title}
            className="bg-[#23243a] bg-opacity-80 rounded-3xl shadow-lg p-8 flex flex-col gap-3 items-start border border-[#3a4be8] min-w-[220px] max-w-full cursor-pointer hover:bg-indigo-900/40 hover:scale-105 transition-transform transition-colors duration-200"
            onClick={() => handleCardClick(card.href)}
          >
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-1">{card.title}</h3>
            <p className="text-lg text-gray-200 font-normal leading-relaxed">{card.description}</p>
            <button className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-indigo-700 hover:scale-105">Try Now</button>
          </div>
        ))}
      </div>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
} 