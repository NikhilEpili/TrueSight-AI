'use client';

import { Download, Shield, Zap, Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Extension() {
  const features = [
    {
      name: 'Real-time Detection',
      description: 'Instantly detect deepfakes and misinformation while browsing the web.',
      icon: Zap,
    },
    {
      name: 'Privacy First',
      description: 'All analysis happens locally - your data never leaves your device.',
      icon: Shield,
    },
    {
      name: 'Cross-platform',
      description: 'Works on Chrome, Firefox, Safari, and Edge browsers.',
      icon: Globe,
    },
  ];

  const steps = [
    {
      title: 'Download the Extension',
      description: 'Click the download button above to get the TrueSight browser extension for your preferred browser.',
    },
    {
      title: 'Install the Extension',
      description: 'Follow your browser\'s installation prompts to add TrueSight to your extensions.',
    },
    {
      title: 'Start Browsing Safely',
      description: 'The extension will automatically scan content and alert you to potential deepfakes or misinformation.',
    },
  ];

  return (
    <div className="min-h-screen bg-lightgray py-12 px-4 relative">
      {/* Back Button */}
      <Link href="/" className="absolute top-6 right-6 z-10">
        <button className="bg-primary hover:bg-[#23206F] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 transition-all duration-200 hover:scale-105 font-poppins">
          <ArrowLeft size={18} />
          Back to Home
        </button>
      </Link>
      
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-primary text-center font-synthnet">TrueSight Browser Extension</h1>
        <p className="text-lg text-text mb-8 font-rubik">
          Verify information instantly while browsing with our powerful browser extension.
        </p>
        <button className="font-semibold bg-primary text-white px-8 py-3 rounded-md hover:bg-[#23206F] flex items-center gap-2 mx-auto font-poppins">
          <Download size={20} />
          Download Extension
        </button>
      </div>
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="p-6 bg-white rounded-lg shadow border border-bordergray transition duration-200 hover:bg-lightgray hover:shadow-xl hover:border-primary font-rubik hover:scale-110"
          >
            <feature.icon className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-lg text-primary mb-2 font-poppins">
              {feature.name}
            </h3>
            <p className="font-semibold text-text font-rubik">{feature.description}</p>
          </div>
        ))}
      </div>
      {/* Installation Steps */}
      <div className="bg-white rounded-lg shadow border border-bordergray p-8 mb-16">
        <h2 className="text-2xl font-bold text-primary mb-8 text-center font-poppins">
          Installation Guide
        </h2>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary mb-2 font-poppins">
                  {step.title}
                </h3>
                <p className="font-semibold text-text font-rubik">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Demo Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-8 font-poppins">
          See It in Action
        </h2>
        <div className="bg-lightgray rounded-lg p-4 aspect-video flex items-center justify-center">
          <p className="text-text font-rubik">Extension Demo Video/Screenshot</p>
        </div>
      </div>
    </div>
  );
} 