"use client";

import { useEffect, useRef, useState } from 'react';
import Footer from "./Footer";

export default function WhyTrueSight() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cardData = [
    {
      title: "Real-time Detection",
      content: "Our advanced AI models analyze content in real-time, providing instant results without compromising on accuracy. Whether it's a live video stream, audio recording, or text content, TrueSight delivers immediate insights to help you make informed decisions."
    },
    {
      title: "Multi-modal Analysis",
      content: "Unlike single-purpose tools, TrueSight employs a comprehensive approach that examines video, audio, and text simultaneously. Our multi-modal analysis ensures that no aspect of digital content goes unchecked, providing a complete picture of authenticity."
    },
    {
      title: "Enterprise-Grade Security",
      content: "Built with enterprise security standards, TrueSight ensures your data remains private and secure. All analysis is performed with end-to-end encryption, and we never store or share your sensitive content with third parties."
    },
    {
      title: "Scalable Infrastructure",
      content: "From individual users to large organizations, TrueSight scales seamlessly to meet your needs. Our cloud-based infrastructure handles millions of requests daily, ensuring consistent performance regardless of your usage volume."
    },
    {
      title: "Continuous Learning",
      content: "Our AI models continuously learn and adapt to new deepfake techniques and emerging threats. With regular updates and improvements, TrueSight stays ahead of the curve, providing you with the most current protection available."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleFeatures(prev => {
              const newSet = new Set([...prev, index]);
              return Array.from(newSet);
            });
          } else {
            setVisibleFeatures(prev => {
              const newSet = new Set(prev.filter(i => i !== index));
              return Array.from(newSet);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="px-0 max-w-none w-full pt-10">
      {/* Hero Section (Image Left, Text Right) */}
      <div className="w-full flex flex-row items-center justify-between min-h-[40vh] px-6 pt-20 pb-8 max-w-7xl mx-auto">
        {/* Left: Image */}
        <div className="flex-1 flex items-center justify-start">
          <img src="/img5.png" alt="Why TrueSight" className="max-w-xs md:max-w-md lg:max-w-lg w-full h-auto rounded-2xl shadow-xl" />
        </div>
        {/* Right: Heading and Paragraph */}
        <div className="flex-1 flex flex-col items-end justify-center text-left">
          <h1 className="font-bold text-purple-400 text-4xl lg:text-7xl mb-6 font-poppins">Why TrueSight?</h1>
          <p className="text-white text-lg md:text-2xl font-normal font-rubik max-w-2xl">
            In an age where artificial intelligence can mimic human faces, voices, and even emotions, TrueSight.AI stands as a vigilant guardian of digital trust. The rise of deepfakes—highly convincing fake media generated using AI—has sparked a wave of scams, impersonation attacks, misinformation, and digital identity abuse, especially in platforms where real-time communication is essential.
          </p>
        </div>
      </div>
      {/* Flashy Centered Statement */}
      <div className="w-full flex justify-center items-center py-8">
        <span className="font-extrabold text-3xl lg:text-5xl text-purple-400  bg-clip-text text-transparent drop-shadow-lg text-center px-4 font-poppins" style={{letterSpacing: '0.02em'}}>
          That's where TrueSight steps in.
        </span>
      </div>
      {/* Second Split Section */}
      <div className="w-full flex flex-row min-h-screen items-stretch mb-0">
        {/* Left: Problem Supporting Statement */}
        <div className="flex-1 flex items-center justify-end pr-8 bg-transparent">
          <p className="font-normal text-white text-2xl lg:text-3xl text-right animate-fade-in-2s max-w-2xl drop-shadow-md font-rubik">
            From fake job interviews with synthetic candidates to impersonated therapy sessions, election misinformation, and manipulated WhatsApp forwards, deepfakes are weaponizing our most trusted communication channels.
          </p>
        </div>
        {/* Right: The Problem We're Solving */}
        <div className="flex-1 flex flex-col items-center justify-center pl-8 bg-transparent">
          <span className="font-bold text-sky-300 text-4xl lg:text-7xl leading-tight animate-zoom-in block text-left w-full max-w-2xl mb-6 font-poppins">
            The Problem We're Solving
          </span>
        </div>
      </div>

      {/* Title for features list */}
      <div className="px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 mt-12 text-white text-left font-poppins text-center">🔐 TrueSight is Different. Here's Why</h2>
        
        {/* Timeline Features Section */}
        <div className="relative mt-16">
          {/* Center Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-400 to-indigo-400 h-full rounded-full"></div>
          
          {/* Timeline Features */}
          <div className="space-y-16">
            {cardData.map((card, i) => (
              <div
                key={card.title}
                ref={(el) => {
                  featureRefs.current[i] = el;
                }}
                data-index={i}
                className={`relative flex items-center ${
                  i % 2 === 0 ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-[#23243a] z-10"></div>
                
                {/* Feature Card */}
                <div
                  className={`w-5/12 max-w-md bg-[#23243a] bg-opacity-80 rounded-3xl shadow-lg p-6 border border-[#3a4be8] transition-all duration-700 hover:bg-indigo-900/40 hover:scale-105 ${
                    i % 2 === 0 
                      ? 'ml-auto pl-8' 
                      : 'mr-auto pr-8'
                  } ${
                    visibleFeatures.includes(i)
                      ? i % 2 === 0
                        ? 'animate-slide-in-right opacity-100 translate-x-0'
                        : 'animate-slide-in-left opacity-100 translate-x-0'
                      : i % 2 === 0
                        ? 'opacity-0 translate-x-full'
                        : 'opacity-0 -translate-x-full'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold font-rubik">
                      {i + 1}
                    </span>
                    <h3 className="text-xl font-bold text-indigo-400 font-poppins">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-200 font-normal leading-relaxed font-rubik">
                    {card.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Future Ahead section */}
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in-2s w-full max-w-3xl mx-auto mt-12">
          <p className="text-lg md:text-xl text-white mb-0">
            <span className="font-bold text-purple-300 text-xl font-rubik">🧭 The Future Ahead :-</span><br />
            .Integrate with major social media platforms.<br />
            .Create educational resources about digital literacy.<br />
            .Partner with law enforcement and fact-checking organizations.<br />
            .Establish industry standards for deepfake detection.<br />
            .Launch a community-driven threat intelligence platform.<br />
            .Provide real-time alerts for emerging deepfake campaigns.<br />
            .Create a comprehensive digital trust ecosystem.
          </p>
        </div>
      </div>
      <br></br>
      <Footer />
    </div>
  );
} 