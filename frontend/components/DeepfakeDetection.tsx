"use client";
import { useRouter } from 'next/navigation';
import { useAuth } from './Providers';

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
    if (!user) {
      alert('Please login first to access this feature');
      router.push('/auth');
      return;
    }
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-lightgray py-15 px-4 flex flex-col pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-16">
        {/* Left: Title and Description */}
        <div className="flex-1">
          <h1 className="font-poppins font-extrabold text-5xl md:text-6xl font-extrabold mb-6 text-primary leading-tight animate-slide-in-down-slow font-sans"
            style={{ display: 'inline-block' }}>
              Deepfake Detection
            </h1>
          <p className="text-xl md:text-2xl text-text mb-8 max-w-2xl animate-fade-in-3s w-full max-w-xl font-rubik font-medium">
            Experience a frictionless and user-friendly interface designed for everyone. Simply drag and drop your files and get a deepfake media verification within seconds. Our advanced system uses a multilayer approach, examining pixels, file structures, and voice patterns to deliver the most comprehensive assessment effortlessly.
          </p>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex items-center justify-center">
          <img src="/img2.png" alt="Deepfake Detection" className="rounded-3xl max-w-full w-[500px] shadow-xl" />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center max-w-4xl mx-auto pt--10 pb-8 bg-#F5F6FA">
        <h2 className="text-4xl md:text-5xl font-semibold font-bevietnampro text-center">
        The Role of Deepfake Detection in Digital Integrity
        </h2>
        <p className="text-left text-base md:text-lg text-medium text-center mt-4 font-rubik" >
        Deepfake detection is critical in protecting public trust across digital platforms. Advanced tools analyze video inconsistencies, image artifacts, audio anomalies, and textual patterns to identify manipulated content. From political misinformation to fake job interviews, deepfakes are eroding the authenticity of communication. Robust detection systems are essential to ensure truth in an age of AI-driven deception.
        </p>
      </div>
      {/* Analysis Cards */} 
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-3xl shadow-lg p-8 flex flex-col gap-3 items-start border border-bordergray min-w-[220px] max-w-full cursor-pointer hover:bg-lightgray hover:scale-105 transition-transform transition-colors duration-200"
            onClick={() => handleCardClick(card.href)}
          >
            <h3 className="text-2xl font-extrabold text-primary mb-1 font-synthnet">{card.title}</h3>
            <p className="text-lg text-text font-medium leading-relaxed font-rubik">{card.description}</p>
            <button className="mt-4 px-6 py-2 bg-primary text-white rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-[#23206F] hover:scale-105 font-synthnet font-bold">Try Now</button>
          </div>
        ))}
      </div>
      
      <div className="mt-auto">
        {/* Footer will be rendered here */}
      </div>
    </div>
  );
} 