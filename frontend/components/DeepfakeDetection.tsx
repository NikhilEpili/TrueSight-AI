"use client";
import { useRouter } from 'next/navigation';
import { useAuth } from './Providers';
import Footer from './Footer';

export default function DeepfakeDetection() {
  const router = useRouter();
  const { user } = useAuth();

  const cards = [
    {
      title: "Video Analysis",
      description: "Upload videos to detect deepfakes and AI-generated content with advanced computer vision algorithms.",
      href: "/video-analysis"
    },
    {
      title: "Image Analysis", 
      description: "Analyze images for signs of manipulation, AI generation, or deepfake technology.",
      href: "/image-analysis"
    },
    {
      title: "Audio Analysis",
      description: "Detect AI-generated voice synthesis and audio deepfakes using sophisticated audio processing.",
      href: "/audio-analysis"
    },
    {
      title: "Text Analysis",
      description: "Identify AI-generated text content and detect patterns indicative of automated writing.",
      href: "/text-analysis"
    }
  ];

  const handleCardClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#23243a] via-[#181824] to-[#2d2c3a] py-15 px-4 flex flex-col pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-16">
        {/* Left: Title and Description */}
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent leading-tight animate-slide-in-down-long leading-none pb-2 font-poppins"
            style={{ display: 'inline-block' }}>
              Deepfake Detection
            </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl animate-fade-in-2s w-full max-w-xl font-rubik">
            Experience a frictionless and user-friendly interface designed for everyone. Simply drag and drop your files and get a deepfake media verification within seconds. Our advanced system uses a multilayer approach, examining pixels, file structures, and voice patterns to deliver the most comprehensive assessment effortlessly.
          </p>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex items-center justify-center">
          <img src="/img2.png" alt="Deepfake Detection" className="rounded-3xl max-w-full w-[500px] shadow-xl" />
        </div>
      </div>

      {/* Analysis Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-[#23243a] bg-opacity-80 rounded-3xl shadow-lg p-8 flex flex-col gap-3 items-start border border-[#3a4be8] min-w-[220px] max-w-full cursor-pointer hover:bg-indigo-900/40 hover:scale-105 transition-transform transition-colors duration-200"
            onClick={() => handleCardClick(card.href)}
          >
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-1 font-poppins">{card.title}</h3>
            <p className="text-lg text-gray-200 font-normal leading-relaxed font-rubik">{card.description}</p>
            <button className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-indigo-700 hover:scale-105 font-poppins font-bold">Try Now</button>
          </div>
        ))}
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
} 