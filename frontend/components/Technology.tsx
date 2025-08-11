'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import CurvedLoop from './CurvedLoop';

const models = [
  'EfficientNetV2',
  'Wav2Vec2',
  'BERT',
  'YOLOv8',
  'ResNet50',
  'CLIP',
];

const threatActors = [
  { label: 'ADVERSARY AGENCY', icon: '🎯', href: 'https://www.realitydefender.com/' },
  { label: 'CYBER CRIMINAL', icon: '👽', href: 'https://www.getreallabs.ai/' },
  { label: 'CYBER SOLDIER', icon: '💣', href: 'https://deepware.ai/' },
  { label: 'FAKE NEWS OUTLET', icon: '📕', href: 'https://www.stopfake.org/' },
  { label: 'FRAUDSTER', icon: '🌐', href: 'https://vastav.ai/' },
  { label: 'HACKTIVIST', icon: '💻', href: 'https://www.sensity.ai/' },
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
    <div className="bg-lightgray min-h-screen w-full flex flex-col items-center text-text">
      {/* Top Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-24 pt-20 pb-10">
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl">
          <h1 className="text-6xl md:text-7xl font-bold text-primary mb-6 leading-tight animate-slide-in-down-slow font-poppins" style={{ display: 'inline-block' }}>Technology</h1>
          <p className="text-xl md:text-2xl text-text mb-10 font-medium font-rubik">
            Building a real-time deepfake detection ecosystem across video, audio, and text requires a synergistic stack of powerful, scalable, and lightweight technologies. At TrueSight, we've carefully curated each part of our tech stack to maximize accuracy, speed, usability, and cross-platform compatibility.
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
          <Image src="/img3.png" alt="Technology Illustration" width={520} height={400} className="rounded-2xl shadow-xl" />
        </div>
      </div>
      {/* Curved Loop Section */}
      <div className="w-full bg-[#F5F6FA] py-16 overflow-hidden flex flex-col items-center border-t border-bordergray relative">
        <div className="text-primary font-bold text-4xl mb-12 whitespace-nowrap font-poppins z-10">ACTIVE MODELS</div>
        <div className="w-full h-40 relative">
          <CurvedLoop 
            marqueeText={models.join(" ✦ ")}
            speed={1.5}
            curveAmount={200}
            direction="left"
            interactive={true}
            className="font-poppins"
          />
        </div>
      </div>
      {/* Since 2025 Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-20">
        <div className="flex-1 flex flex-col items-start justify-center max-w-2xl">
          <div className="uppercase text-text text-lg font-semibold mb-2 tracking-widest font-bevietnam">Our Technology</div>
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight font-poppins">Since 2025 leaders in deepfake detection</h2>
        </div>
        <div className="flex-1 flex items-center justify-center max-w-xl">
          <p className="text-2xl text-text font-medium font-rubik">
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
                <a
                  key={actor.label}
                  href={actor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute flex flex-col items-center cursor-pointer group font-rubik font-medium"
                  style={{ left: x, top: y, width: 120, height: 120 }}
                >
                  <div className="w-28 h-28 flex items-center justify-center rounded-full bg-white shadow-lg border-4 border-indigo-200 text-5xl mb-2 transition-transform duration-200 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white">
                    {actor.icon}
                  </div>
                  <div className="text-center text-[#e53935] font-extrabold font-poppins text-md mt-2 group-hover:text-indigo-400 transition-colors duration-200" style={{ letterSpacing: 1 }}>{actor.label}</div>
                </a>
              );
            })}
            {/* Central Danger Circle */}
            <div
              className={`absolute left-1/2 top-[320px] -translate-x-1/2 flex flex-col items-center justify-center transition-all duration-300 z-10 `}
              onMouseEnter={() => setDangerHover(true)}
              onMouseLeave={() => setDangerHover(false)}
              style={{ transitionProperty: 'transform' }}
            >
              <div className={`relative rounded-full bg-black border-4 border-yellow-400 flex flex-col items-center justify-center font-bold text-3xl md:text-2xl text-[#23243a] transition-all duration-300 w-32 h-32 hover:scale-150`}
                style={{ transitionProperty: 'width, height, font-size, background, border' }}
              >
                <span className="select-none text-3xl md:text-5xl">⚠️</span>
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
    </div>
  );
}
