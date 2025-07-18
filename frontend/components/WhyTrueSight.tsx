import React from 'react'
import Footer from './Footer'

const cardData = [
  {
    title: '✅ Real-Time Detection, Where It Matters Most',
    content:
      'Unlike traditional tools, TrueSight embeds deepfake detection directly into the platforms we use daily—Google Meet, WhatsApp, browsers, and even online classrooms or test environments. This means threats are flagged as they appear, not after they spread.',
  },
  {
    title: '🧬 Multimodal Deepfake Detection',
    content:
      'Most tools focus on one medium. TrueSight handles all three major threat types:\n.Video & Image Deepfakes (via DINOv2 + Swin Transformer)\n.Synthetic Voice Attacks (via Wav2Vec 2.0)\n.AI-Generated Text Misinformation (via RoBERTa)',
  },
  {
    title: '🌐 Cross-Platform Ecosystem',
    content:
      'TrueSight offers a Web Dashboard, Chrome Extension, and WhatsApp Bot, with integrations in progress for Discord, Slack, and professional workspace tools. No matter where misinformation spreads, TrueSight can counter it.',
  },
  {
    title: '💡 Explainable AI You Can Trust',
    content:
      'With visual heatmaps, confidence scores, and an intuitive UI, users not only detect deepfakes—they understand why something was flagged. Transparency builds trust.',
  },
  {
    title: '🚀 Lightweight, Scalable, and Ready for All',
    content:
      'Designed to run even on modest devices, TrueSight is API-first, Dockerized, and modular—meaning it can scale across use cases from education to governance to enterprise security.',
  },
  {
    title: '👥 For Everyone',
    content:
      'Whether you\'re an HR manager vetting candidates, a government official defending election integrity, or a mental health professional conducting online therapy—TrueSight empowers you to see through the illusion.',
  },
]

export default function WhyTrueSight() {
  return (
    <div className="px-0 max-w-none w-full">
      {/* Hero Split Section */}
      <div className="w-full flex flex-row min-h-screen items-stretch mb-0">
        {/* Left: Why TrueSight? */}
        <div className="flex-1 flex items-center justify-end pr-8 bg-transparent">
          <span className="font-extrabold text-pink-300 text-4xl lg:text-7xl leading-tight animate-zoom-in block text-left w-full max-w-2xl">
            🧠 Why TrueSight?
          </span>
        </div>
        {/* Right: Description */}
        <div className="flex-1 flex items-center justify-start pl-8 bg-transparent">
          <p className="text-white text-2xl lg:text-3xl font-normal text-left animate-fade-in-2s max-w-2xl">
            In an age where artificial intelligence can mimic human faces, voices, and even emotions, TrueSight.AI stands as a vigilant guardian of digital trust. The rise of deepfakes—highly convincing fake media generated using AI—has sparked a wave of scams, impersonation attacks, misinformation, and digital identity abuse, especially in platforms where real-time communication is essential.
          </p>
        </div>
      </div>
      {/* Flashy Centered Statement */}
      <div className="w-full flex justify-center items-center py-8">
        <span className="font-extrabold text-3xl lg:text-5xl bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse text-center px-4" style={{letterSpacing: '0.02em'}}>
          That’s where TrueSight steps in.
        </span>
      </div>
      {/* Second Split Section */}
      <div className="w-full flex flex-row min-h-screen items-stretch mb-0">
        {/* Left: Problem Supporting Statement */}
        <div className="flex-1 flex items-center justify-end pr-8 bg-transparent">
          <p className="font-normal text-white text-2xl lg:text-3xl text-right animate-fade-in-2s max-w-2xl drop-shadow-md">
          From fake job interviews with synthetic candidates to impersonated therapy sessions, election misinformation, and manipulated WhatsApp forwards, deepfakes are weaponizing our most trusted communication channels.
          </p>
        </div>
        {/* Right: The Problem We're Solving */}
        <div className="flex-1 flex flex-col items-center justify-center pl-8 bg-transparent">
          <span className="font-extrabold text-sky-300 text-4xl lg:text-7xl leading-tight animate-zoom-in block text-left w-full max-w-2xl mb-6">
            🔍 The Problem We’re Solving
          </span>
          
        </div>
      </div>
      {/* Title for features list */}
      <div className="px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 mt-12 text-white text-left">🔐 TrueSight is Different. Here's Why</h2>
        {/* Features as ordered list */}
        <ol className="list-decimal list-inside space-y-6 text-white text-lg md:text-xl mb-12">
          {cardData.map((card, idx) => (
            <li key={card.title} className="pl-2">
              <span className="font-bold text-indigo-300">{card.title}</span>
              <div className="whitespace-pre-wrap text-white text-base md:text-lg font-sans bg-transparent border-0 p-0 m-0 mt-1">{card.content}</div>
            </li>
          ))}
        </ol>
        {/* The Future Ahead section */}
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in-2s w-full max-w-3xl mx-auto mt-12">
          <p className="text-lg md:text-xl text-white mb-0">
            <span className="font-bold text-purple-300 text-xl">🧭 The Future Ahead :-</span><br />
            .TrueSight is only getting smarter. We aim to:<br />
            .Expand language support for global voice analysis.<br />
            .Create a reputation scoring system via blockchain for media trust.<br />
            .Build advanced tools for social media deepfake detection.<br />
            .Enhance explainability through intuitive visual reporting.<br />
            <span className="block mt-2">Together, we can preserve truth and protect identity—one pixel, waveform, and sentence at a time.</span>
          </p>
        </div>
      </div>
      <br></br>
      <Footer />
    </div>
  )
} 