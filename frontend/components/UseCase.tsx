"use client";
import { useEffect, useRef, useState } from 'react';

export default function UseCase() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const leftCards = [
    {
      title: "Digital Forensics",
      desc: "Law enforcement agencies use TrueSight to analyze evidence and verify the authenticity of digital media in criminal investigations."
    },
    {
      title: "Social Media Platforms",
      desc: "Platforms integrate TrueSight to automatically detect and flag deepfake content before it spreads to millions of users."
    },
    {
      title: "Financial Institutions",
      desc: "Banks and fintech companies use TrueSight to verify customer identities and prevent fraud through synthetic media."
    }
  ];

  const useCaseCards = [
    {
      title: "Election Security",
      desc: "Protect democratic processes by detecting manipulated political content and preventing misinformation campaigns."
    },
    {
      title: "Healthcare",
      desc: "Ensure patient privacy and verify medical professionals in telemedicine and remote consultations."
    },
    {
      title: "Education",
      desc: "Maintain academic integrity by detecting AI-generated assignments and preventing cheating in online learning."
    },
    {
      title: "Journalism",
      desc: "Fact-check news content and verify sources to maintain journalistic standards and public trust."
    }
  ];

  const referencePapers = [
    {
      title: "Deepfake-Eval-2024 – Real-World Deepfake Detection Benchmark",
      authors: "Nuria Alina Chandra et al.",
      description: "Introduces a real-world benchmark with deepfakes from social media and user submissions. Evaluates 20+ detectors and finds large performance drops on in-the-wild data.",
      year: "2025",
      link: "https://arxiv.org/abs/2503.02857",
      side: "right"
    },
    {
      title: "Real-Time Deepfake Detection with LaDeDa",
      authors: "Bar Cavia et al.",
      description: "Presents LaDeDa and Tiny-LaDeDa—lightweight models that achieve real-time detection with high accuracy. Suitable for deployment in live communication tools.",
      year: "2024",
      link: "https://arxiv.org/abs/2406.09398",
      side: "left"
    },
    {
      title: "Deepfake Generation and Detection: A Benchmark and Survey",
      authors: "Gan Pei et al.",
      description: "Covers state-of-the-art generation/detection methods, datasets, and evaluation metrics. Helpful for understanding the entire ecosystem.",
      year: "2024",
      link: "https://arxiv.org/abs/2403.17881",
      side: "right"
    },
    {
      title: "Deep Learning for Deepfake Creation and Detection",
      authors: "Various Authors",
      description: "A classic and widely cited foundational survey of deepfake generation and detection techniques using deep learning.",
      year: "2019",
      link: "https://arxiv.org/abs/1909.11573",
      side: "left"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleCards(prev => {
              const newSet = new Set([...prev, index]);
              return Array.from(newSet);
            });
          } else {
            setVisibleCards(prev => {
              const newSet = new Set(prev.filter(i => i !== index));
              return Array.from(newSet);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-lightgray min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-7xl px-4 md:px-8">
        {/* Top Section: Cards + Right Text */}
        <div className="flex flex-col md:flex-row gap-8 py-16">
          {/* Left: Cards (scrollable on mobile) */}
          <div className="flex-1 flex flex-col gap-10 max-w-lg mx-auto md:mx-0 overflow-y-auto scrollbar-hide" style={{ maxHeight: 500 }}>
            {leftCards.map((card, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg p-8 flex flex-col gap-3 items-start border border-bordergray w-full">
                <h3 className="text-2xl font-bold text-primary mb-1 font-poppins">{card.title}</h3>
                <p className="text-lg text-text font-medium leading-relaxed font-rubik">{card.desc}</p>
              </div>
            ))}
          </div>
          {/* Right: Heading and Paragraph */}
          <div className="flex-1 flex flex-col justify-center items-start px-2 md:px-8">
            <div className="uppercase text-primary text-base font-semibold mb-2 tracking-widest font-rubik">How TrueSight can help you</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 leading-tight font-poppins">Improve security and reduce losses due to AI-powered threats</h2>
            <p className="text-lg md:text-xl text-text font-medium max-w-2xl font-rubik">
              Deepfakes are here to stay, getting better in quality and having a worse impact on society at every level. Equipping your organization with TrueSight AI means adopting the best-in-class solution with a multilayer approach for reducing the risks and consequences of AI-powered cyber threats
            </p>
          </div>
        </div>
        
        {/* Platform Section (title + two columns) */}
        <div className="flex flex-col md:flex-row gap-8 py-16 items-center">
          <div className="flex-1 flex flex-col items-start">
            <div className="uppercase text-primary text-base font-semibold mb-2 tracking-widest font-rubik">TrueSight Platform</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 leading-tight font-poppins">One platform for a cross-industry approach</h2>
          </div>
          <div className="flex-1 flex flex-col items-start">
            <p className="text-lg md:text-xl text-text font-medium max-w-2xl font-rubik">
              TrueSight is the only AI-threat detection platform with a cross-industry approach. From digital forensics to law enforcement, KYC vendors, social media platforms, insurance companies, defense and intelligence agencies. We deliver real-time assessment on every type of digital media at scale: video, images, audio and identities.
            </p>
          </div>
        </div>
        
        {/* Use Cases Section (title + 4 cards) */}
        <div className="py-12">
          <div className="uppercase text-primary text-base font-semibold mb-2 tracking-widest font-rubik">Use Cases</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-10 leading-tight font-poppins">Built for your use case</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {useCaseCards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg p-6 md:p-8 flex flex-col gap-3 items-start border border-bordergray transition-transform transition-colors duration-200 hover:bg-lightgray hover:scale-110 cursor-pointer"
              >
                <h3 className="text-lg md:text-xl font-bold text-primary mb-1 font-poppins">{card.title}</h3>
                <p className="text-sm md:text-base text-text font-medium leading-relaxed font-rubik">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Reference Papers Section */}
        <div className="py-16">
          <div className="uppercase text-primary text-base md:text-3xl font-extrabold mb-2 tracking-widest font-synthnet text-center">Research & Development</div>
          {/* Vertical Timeline */}
          <div className="relative mt-16">
            {/* Center Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary to-accent h-full rounded-full hidden md:block"></div>
            
            {/* Timeline Cards */}
            <div className="space-y-8 md:space-y-16">
              {referencePapers.map((paper, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  data-index={i}
                  className={`relative flex items-center ${
                    paper.side === 'left' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white z-10 hidden md:block"></div>
                  
                  {/* Card */}
                  <div
                    className={`w-full md:w-5/12 lg:max-w-md bg-white rounded-3xl shadow-lg p-6 border border-bordergray transition-all duration-700 cursor-pointer hover:bg-lightgray hover:scale-110 ${
                      paper.side === 'left' 
                        ? 'md:mr-auto md:pr-8' 
                        : 'md:ml-auto md:pl-8'
                    } ${
                      visibleCards.includes(i)
                        ? paper.side === 'left'
                          ? 'animate-slide-in-left opacity-100 translate-x-0'
                          : 'animate-slide-in-right opacity-100 translate-x-0'
                        : paper.side === 'left'
                          ? 'opacity-0 -translate-x-full'
                          : 'opacity-0 translate-x-full'
                    }`}
                    onClick={() => window.open(paper.link, '_blank')}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                      <h3 className="text-lg md:text-xl font-bold text-primary font-poppins">
                        {paper.title}
                      </h3>
                      <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold font-synthnet w-fit">
                        {paper.year}
                      </span>
                    </div>
                    <p className="text-text font-semibold mb-3 text-sm font-bevietnampro">
                      {paper.authors}
                    </p>
                    <p className="text-sm text-text font-medium leading-relaxed font-rubik">
                      {paper.description}
                    </p>
                    <div className="mt-4">
                      <div className="bg-primary p-2 rounded-lg hover:scale-110 transition-transform duration-200 w-fit">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 