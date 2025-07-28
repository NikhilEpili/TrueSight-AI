'use client';

import { Download, Shield, Zap, Globe } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <br></br>
        <h1 className="text-7xl font-bold text-gray-900 text-7xl md:text-6xl font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6 leading-tight animate-fade-in-2s leading-none pb-2 font-poppins mb-4 font-poppins bg-gradient-to-r from-purple-400 to-indigo-400">
          TrueSight Browser Extension
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-rubik">
          Verify information instantly while browsing with our powerful browser extension.
        </p>
        <button className="font-semibold bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-500 flex items-center gap-2 mx-auto font-poppins">
          <Download size={20} />
          Download Extension
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm  transition-shadow hover:scale-105"
          >
            <feature.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-4 hover:scale-105" />
            <h3 className="font-bold text-lg font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
              {feature.name}
            </h3>
            <p className="font-semibold text-gray-600 dark:text-gray-300 font-rubik">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Installation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center font-poppins">
          Installation Guide
        </h2>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <div>
                <h3 className="font-bold text-lg font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                  {step.title}
                </h3>
                <p className="font-semibold text-gray-600 dark:text-gray-300 font-rubik">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          See It in Action
        </h2>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 aspect-video flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-300">Extension Demo Video/Screenshot</p>
        </div>
      </div>
    </div>
  );
} 