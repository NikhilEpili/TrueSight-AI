'use client'
import React from 'react';
import Footer from './Footer';

const leftCards = [
  {
    title: 'Detect AI alterations at scale',
    desc: 'Deepfake videos, images, audio, and identities are hard for the human eye to detect. Sensity uses the most advanced AI and deep learning technology to reveal what is unseen.',
  },
  {
    title: 'Phishing Attack Prevention',
    desc: `Deepfake technology can be used to create highly convincing phishing campaigns that impersonate trusted figures. Integrating Sensity’s API into antivirus, social monitoring and threat intelligence platforms can help identify and block these attempts, protecting users from divulging personal and financial information.`,
  },
  {
    title: 'Election Security',
    desc: `To safeguard the integrity of democratic processes intelligence agencies can monitor and detect deepfake content aimed at undermining elections. This includes false statements, misleading representations of political figures, or manipulated audio and video designed to influence voter behavior of perceptions`,
  },
];

const onboardingCard = {
  title: 'Secure Customer Onboarding',
  desc: `Implement deepfake detection algorithms during the customer onboarding process to ensure that the biometric data (face and voice) provided is genuine and has not been manipulated.`,
};

const useCaseCards = [
  {
    title: 'Digital Forensics',
    desc: 'Our cutting-edge Deepfake Detection Solution is designed specifically for digital forensics companies seeking to empower their detection capabilities with the latest in deep learning technologies.',
  },
  {
    title: 'Intelligence',
    desc: 'As digital deception continues to rise, our cutting-edge deepfake detection solution provides law enforcement vendors with a powerful weapon to combat online scams.',
  },
  {
    title: 'Cybersecurity',
    desc: 'Synthetic media and deepfakes are increasingly weaponized for social engineering attacks, corporate communication poisoning, phishing campaigns, and sophisticated fraud schemes.',
  },
  {
    title: 'KYC',
    desc: 'KYC vendors face an unprecedented challenge: the rise of sophisticated deepfakes that threaten to compromise facial recognition and liveness check, pivotal components of biometric identity verification.',
  },
];

export default function UseCase() {
  return (
    <div className="bg-gradient-to-br from-[#23243a] via-[#181824] to-[#2d2c3a] min-h-screen w-full flex flex-col items-center px-2 md:px-0 text-white">
      {/* Top Section: Cards + Right Text */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 py-16">
        {/* Left: Cards (scrollable on mobile) */}
        <div className="flex-1 flex flex-col gap-6 max-w-lg mx-auto md:mx-0 overflow-y-auto scrollbar-none" style={{ maxHeight: 500 }}>
          {leftCards.map((card, i) => (
            <div key={i} className="bg-[#23243a] bg-opacity-80 rounded-3xl shadow-lg p-8 flex flex-col gap-3 items-start border border-[#3a4be8] min-w-[320px] max-w-full">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-1">{card.title}</h3>
              <p className="text-lg text-gray-200 font-normal leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
        {/* Right: Heading and Paragraph */}
        <div className="flex-1 flex flex-col justify-center items-start px-2 md:px-8">
          <div className="uppercase text-indigo-300 text-base font-semibold mb-2 tracking-widest">How TrueSight can help you</div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-8 leading-tight">Improve security and reduce losses due to AI-powered threats</h2>
          <p className="text-xl text-gray-200 font-medium max-w-2xl">
            Deepfakes are here to stay, getting better in quality and having a worse impact on society at every level. Equipping your organization with TrueSight AI means adopting the best-in-class solution with a multilayer approach for reducing the risks and consequences of AI-powered cyber threats
          </p>
        </div>
      </div>

    

      {/* Platform Section (title + two columns) */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 py-16 items-center">
        <div className="flex-1 flex flex-col items-start">
          <div className="uppercase text-indigo-300 text-base font-semibold mb-2 tracking-widest">TrueSight Platform</div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-8 leading-tight">One platform for a cross-industry approach</h2>
        </div>
        <div className="flex-1 flex flex-col items-start">
          <p className="text-xl text-gray-200 font-medium max-w-2xl">
            TrueSight is the only AI-threat detection platform with a cross-industry approach. From digital forensics to law enforcement, KYC vendors, social media platforms, insurance companies, defense and intelligence agencies. We deliver real-time assessment on every type of digital media at scale: video, images, audio and identities.
          </p>
        </div>
      </div>

      {/* Use Cases Section (title + 4 cards) */}
      <div className="w-full max-w-7xl py-12">
        <div className="uppercase text-indigo-300 text-base font-semibold mb-2 tracking-widest">Use Cases</div>
        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-10 leading-tight">Built for your use case</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCaseCards.map((card, i) => (
            <div
              key={i}
              className="bg-[#23243a] bg-opacity-80 rounded-3xl shadow-lg p-8 flex flex-col gap-3 items-start border border-[#3a4be8] min-w-[220px] max-w-full transition-transform transition-colors duration-200 hover:bg-indigo-900/40 hover:scale-105 cursor-pointer"
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-1">{card.title}</h3>
              <p className="text-base text-gray-200 font-normal leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
} 