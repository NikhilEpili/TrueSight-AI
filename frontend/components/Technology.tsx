'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Footer from './Footer'

const models = [
  'EfficientNetV2',
  'Wav2Vec2',
  'BERT',
  'YOLOv8',
  'ResNet50',
  'CLIP',
];

const threatActors = [
  { label: 'ADVERSARY AGENCY', icon: '🎯' },
  { label: 'CYBER CRIMINAL', icon: '👽' },
  { label: 'CYBER SOLDIER', icon: '💣' },
  { label: 'FAKE NEWS OUTLET', icon: '📕' },
  { label: 'FRAUDSTER', icon: '🌐' },
  { label: 'HACKTIVIST', icon: '💻' },
];

const webIcons = [
  '🏦', '📱', '📸', '🛒', '❌',
  '💳', '👽', '₿', '🎵', '✈️',
];

const threatList = [
  'Deepfake injection attack',
  'Impersonation',
  'Influence campaign',
  'Scam',
  'Phishing',
  'Deception tactic',
  'Defamation',
];

export default function Technology() {
  const [dangerHover, setDangerHover] = useState(false);

  // Layout constants
  const centerX = 450;
  const centerY = 400;
  const radius = 400;
  const circleRadius = 0;
  const actorCount = threatActors.length;

  return (
    <div className="bg-gradient-to-br from-[#23243a] via-[#181824] to-[#2d2c3a] min-h-screen w-full flex flex-col items-center text-white">
      {/* Top Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-24 pt-20 pb-10">
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
          <h1 className="text-6xl md:text-7xl font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6 leading-tight animate-slide-in-down-long leading-none pb-2" style={{ display: 'inline-block' }}>Technology</h1>
          <p className="text-xl md:text-2xl text-white mb-10 font-medium">
            Building a real-time deepfake detection ecosystem across video, audio, and text requires a synergistic stack of powerful, scalable, and lightweight technologies. At TrueSight, we've carefully curated each part of our tech stack to maximize accuracy, speed, usability, and cross-platform compatibility.
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
          <Image src="/img3.png" alt="Technology Illustration" width={520} height={400} className="rounded-2xl shadow-xl" />
        </div>
      </div>

      {/* Marquee Section */}
      <div className="w-full bg-[#23243a] bg-opacity-60 py-4 overflow-hidden flex items-center">
        <div className="text-indigo-300 font-bold text-lg mr-8 ml-8 whitespace-nowrap">Models we use:</div>
        <div className="flex-1 overflow-x-hidden">
          <div className="flex ts-marquee gap-16">
            {models.concat(models).map((model, idx) => (
              <span key={idx} className="text-indigo-200 text-lg font-semibold tracking-wide whitespace-nowrap">{model}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Since 2025 Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-20">
        <div className="flex-1 flex flex-col items-start justify-center max-w-2xl">
          <div className="uppercase text-white text-lg font-semibold mb-2 tracking-widest">Our Technology</div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6 leading-tight">Since 2025 leaders in deepfake detection</h2>
        </div>
        <div className="flex-1 flex items-center justify-center max-w-xl">
          <p className="text-2xl text-white font-medium">
            We strongly believe there is no way to build an effective technology without a deep understanding of the threat landscape. Where bad actors operate, what they do to achieve their goals and how they deploy harmful digital media
          </p>
        </div>
      </div>

      {/* Flowchart Section */}
      <div className="w-full flex flex-col items-center py-12">
        <div className="relative w-full max-w-5xl flex flex-col items-center" style={{ minHeight: 500 }}>
          {/* SVG Curved Lines */}
          <svg className="absolute left-0 right-0 mx-auto top-0 z-0" width="100%" height="420" viewBox="0 0 900 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }}>
            {threatActors.map((_, idx) => {
              // Arrange actors in a semi-circle above the center
              const angle = Math.PI + (Math.PI * idx) / (actorCount - 1);
              const x1 = centerX + radius * Math.cos(angle);
              const y1 = centerY + radius * Math.sin(angle) - 120;
              // Control point for curve
              const cpx = (x1 + centerX) / 2;
              const cpy = y1 + (centerY - y1) * 0.5 - 60;
              return (
                <path
                  key={idx}
                  d={`M ${x1} ${y1} Q ${cpx} ${cpy} ${centerX} ${centerY}`}
                  stroke="#eab308" strokeWidth="2" fill="none" className="opacity-70" />
              );
            })}
          </svg>
          {/* Circles */}
          <div className="relative w-full" style={{ height: 420, zIndex: 1 }}>
            {threatActors.map((actor, idx) => {
              // Arrange actors in a semi-circle above the center
              const angle = Math.PI + (Math.PI * idx) / (actorCount - 1);
              const x = centerX + radius * Math.cos(angle) - circleRadius;
              const y = centerY + radius * Math.sin(angle) - 120 - circleRadius;
              return (
                <div
                  key={actor.label}
                  className="absolute flex flex-col items-center cursor-pointer group"
                  style={{ left: x, top: y, width: 120, height: 120 }}
                >
                  <div className="w-28 h-28 flex items-center justify-center rounded-full bg-white shadow-lg border-4 border-indigo-200 text-5xl mb-2 transition-transform duration-200 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white">
                    {actor.icon}
                  </div>
                  <div className="text-center text-[#e53935] font-bold text-md mt-2 group-hover:text-indigo-400 transition-colors duration-200" style={{ letterSpacing: 1 }}>{actor.label}</div>
                </div>
              );
            })}
            {/* Central Danger Circle */}
            <div
              className={`absolute left-1/2 top-[320px] -translate-x-1/2 flex flex-col items-center justify-center transition-all duration-300 z-10 ${dangerHover ? 'scale-[1.5]' : 'scale-100'}`}
              onMouseEnter={() => setDangerHover(true)}
              onMouseLeave={() => setDangerHover(false)}
              style={{ transitionProperty: 'transform' }}
            >
              <div className={`relative rounded-full bg-yellow-300 border-4 border-yellow-400 flex flex-col items-center justify-center font-bold text-3xl md:text-4xl text-[#23243a] transition-all duration-300 w-32 h-32 ${dangerHover ? 'w-72 h-72' : ''}`}
                style={{ transitionProperty: 'width, height, font-size, background, border' }}
              >
                <span className="select-none text-4xl md:text-5xl">⚠️</span>
              </div>
            </div>
          </div>
          {/* WEB and icons below */}
          <div className="flex flex-col items-center mt-[60px]">
            <div className="w-px h-12 bg-yellow-400 mb-2"></div>
            <div className="text-indigo-300 font-bold text-lg mb-4">WEB</div>
            <div className="grid grid-cols-5 gap-4">
              {webIcons.map((icon, idx) => (
                <div key={idx} className="w-14 h-14 bg-[#23243a] rounded-lg flex items-center justify-center text-3xl text-white shadow-md">
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 