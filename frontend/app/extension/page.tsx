'use client'

import { Download, Chrome, Shield, FileSearch } from 'lucide-react'
import Image from 'next/image'

export default function Extension() {
  const features = [
    {
      name: 'One-Click Verification',
      description: 'Select any text or article and verify it instantly with our AI-powered system.',
      icon: Shield,
    },
    {
      name: 'Real-time Analysis',
      description: 'Get immediate feedback on the credibility of news articles and social media posts.',
      icon: FileSearch,
    },
    {
      name: 'Cross-Platform Support',
      description: 'Works seamlessly across major news sites and social media platforms.',
      icon: Chrome,
    },
  ]

  const steps = [
    {
      title: 'Download Extension',
      description: 'Click the download button to get the latest version of TrueSight Browser Extension.',
    },
    {
      title: 'Install in Chrome',
      description: 'Open Chrome, go to chrome://extensions, enable Developer Mode, and load the unpacked extension.',
    },
    {
      title: 'Start Using',
      description: 'Select any text or article, right-click, and choose "Verify with TrueSight" from the context menu.',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          TrueSight Browser Extension
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Verify information instantly while browsing with our powerful browser extension.
        </p>
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-500 flex items-center gap-2 mx-auto">
          <Download size={20} />
          Download Extension
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <feature.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {feature.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Installation Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Installation Guide
        </h2>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
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
  )
} 