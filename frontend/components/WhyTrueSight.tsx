"use client";

import { useEffect, useRef, useState } from 'react';

export default function WhyTrueSight() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const [visibleFutureItems, setVisibleFutureItems] = useState<number[]>([]);
  const [imageAnimation, setImageAnimation] = useState(false);
  const [imageSrc, setImageSrc] = useState('/img5.png');
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const futureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const secondSectionRef = useRef<HTMLDivElement>(null);

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

  const futureItems = [
    "Integrate with major social media platforms",
    "Create educational resources about digital literacy",
    "Partner with law enforcement and fact-checking organizations",
    "Establish industry standards for deepfake detection",
    "Launch a community-driven threat intelligence platform",
    "Provide real-time alerts for emerging deepfake campaigns",
    "Create a comprehensive digital trust ecosystem"
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleFutureItems(prev => {
              const newSet = new Set([...prev, index]);
              return Array.from(newSet);
            });
          } else {
            setVisibleFutureItems(prev => {
              const newSet = new Set(prev.filter(i => i !== index));
              return Array.from(newSet);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    futureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!secondSectionRef.current) return;
      
      const rect = secondSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Start animation when second section comes into view
      if (rect.top <= windowHeight * 0.8 && rect.bottom >= windowHeight * 0.2) {
        setImageAnimation(true);
        setImageSrc('/img7.png');
      } else {
        setImageAnimation(false);
        setImageSrc('/img5.png');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-lightgray min-h-screen w-full flex flex-col items-center px-2 md:px-0 text-text pt-10 overflow-x-hidden">
      {/* Hero Section (Image Left, Text Right) */}
      <div className="w-full flex flex-row items-center justify-between min-h-[40vh] px-6 pt-20 pb-8 max-w-7xl mx-auto">
        {/* Left: Image */}
        <div className="flex-1 flex items-center justify-start">
          <img 
            src="/img5.png" 
            alt="Why TrueSight" 
            className={`max-w-xs md:max-w-md lg:max-w-lg w-full h-auto rounded-2xl shadow-xl transition-all duration-600 ${
              imageAnimation ? 'scale-110' : 'scale-100'
            }`}
            style={{
              transform: imageAnimation ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.6s ease-in-out'
            }}
          />
        </div>
        {/* Right: Heading and Paragraph */}
        <div className="flex-1 flex flex-col items-end justify-center text-left">
          <h1 className="font-bold text-primary text-4xl lg:text-7xl mb-6 font-poppins animate-slide-in-down-slow">Why TrueSight?</h1>
          <p className="text-text text-lg md:text-2xl font-medium font-rubik max-w-2xl animate-fade-in-3s">
            In an age where artificial intelligence can mimic human faces, voices, and even emotions, TrueSight.AI stands as a vigilant guardian of digital trust. The rise of deepfakes—highly convincing fake media generated using AI—has sparked a wave of scams, impersonation attacks, misinformation, and digital identity abuse, especially in platforms where real-time communication is essential.
          </p>
        </div>
      </div>
      <br></br>
      {/* Flashy Centered Statement */}
              <div className="w-full flex justify-center items-center py-8">
          <span className="font-extrabold text-3xl lg:text-5xl text-primary drop-shadow-lg text-center px-4 font-synthnet" style={{letterSpacing: '0.02em'}}>
            That's where TrueSight steps in.
          </span>
        </div>
      {/* Second Split Section */}
      <div ref={secondSectionRef} className="w-full flex flex-row min-h-screen items-stretch mb-0">
        {/* Left: Problem Supporting Statement */}
        <div className="flex-1 flex items-center justify-end pr-8 bg-transparent">
          <div className="flex flex-col items-end justify-center text-left max-w-2xl">
            <h2 className="font-bold text-primary text-4xl lg:text-7xl leading-tight mb-6 font-poppins animate-fade-in-3s">
              The Problem We're Solving
            </h2>
            <p className="font-medium text-text text-2xl lg:text-3xl font-rubik animate-fade-in-3s">
              From fake job interviews with synthetic candidates to impersonated therapy sessions, election misinformation, and manipulated WhatsApp forwards, deepfakes are weaponizing our most trusted communication channels.
            </p>
          </div>
        </div>
        {/* Right: Animated Image */}
        <div className="flex-1 flex items-center justify-start pl-8 bg-transparent">
          <img 
            src={imageSrc} 
            alt="Problem Illustration" 
            className={`max-w-xs md:max-w-md lg:max-w-lg w-full h-auto rounded-2xl shadow-xl transition-all duration-600 ${
              imageAnimation ? 'scale-110' : 'scale-100'
            }`}
            style={{
              transform: imageAnimation ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.6s ease-in-out'
            }}
          />
        </div>
      </div>
      {/* Title for features list */}
      <div className="px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 mt-12 text-text text-left font-synthnet text-center">
          🔐 TrueSight is Different. Here's Why
        </h2>
        {/* Horizontal Timeline Features Section */}
        <div className="relative mt-16">
          {/* Scroll Indicator */}
          <div className="text-center mb-6 text-primary font-sans">
            <p className="text-lg md:text-xl font-semibold font-bevietnampro">← Scroll horizontally to explore our features →</p>
          </div>
          
          {/* Horizontal Timeline Container */}
          <div 
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-8 scroll-smooth" 
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {cardData.map((card, i) => (
              <div
                key={card.title}
                ref={(el) => {
                  featureRefs.current[i] = el;
                }}
                data-index={i}
                className="flex-shrink-0 w-80 md:w-96"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Feature Card */}
                <div
                  className={`bg-white rounded-3xl shadow-lg p-6 border border-bordergray transition-all duration-700 hover:bg-lightgray hover:scale-110 ${
                    visibleFeatures.includes(i)
                      ? 'animate-slide-in-up opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold font-rubik">
                      {i + 1}
                    </span>
                    <h3 className="text-xl font-bold text-primary font-poppins">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-sm text-text font-medium leading-relaxed font-rubik">
                    {card.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Future Ahead section with Simple Text Timeline */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mt-12 mb-8 max-w-4xl mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary font-poppins mb-3">
              🧭 The Future Ahead
            </h2>
            <p className="text-base md:text-lg text-text font-semibold font-rubik">
              Our roadmap for building a comprehensive digital trust ecosystem
            </p>
          </div>
          
          {/* Simple Text Timeline */}
          <div className="space-y-4">
            {futureItems.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  futureRefs.current[i] = el;
                }}
                data-index={i}
                className={`text-base md:text-lg font-medium text-text font-rubik leading-relaxed ${
                  visibleFutureItems.includes(i)
                    ? i % 2 === 0
                      ? 'animate-slide-in-left opacity-100 translate-x-0'
                      : 'animate-slide-in-right opacity-100 translate-x-0'
                    : i % 2 === 0
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                }`}
              >
                • {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 