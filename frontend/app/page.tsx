'use client';

import Link from 'next/link';
import { Shield, FileSearch, Globe, Zap, Eye, Brain } from 'lucide-react';
import Footer from '../components/Footer';
import { useAuth } from '../components/Providers';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  
  const features = [
    {
      name: 'Media Analysis',
      description: 'Advanced AI-powered detection of deepfakes in images, videos, and audio with real-time analysis.',
      icon: Shield,
      href: '/deepfake-detection',
      protected: true,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'News Verification',
      description: 'Fact-check news articles and text content using state-of-the-art misinformation detection.',
      icon: FileSearch,
      href: '/news',
      protected: true,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Browser Extension',
      description: 'Instant fact-checking while browsing with our powerful browser extension.',
      icon: Globe,
      href: '/extension',
      protected: false,
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const stats = [
    { label: 'Accuracy Rate', value: '99.2%', icon: Zap },
    { label: 'Detection Speed', value: '< 2s', icon: Eye },
    { label: 'AI Models', value: '15+', icon: Brain },
  ];

  const handleFeatureClick = (feature: any) => {
    router.push(feature.href);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold gradient-text leading-tight">
              Detect Deepfakes & Misinformation in Real-time
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              TrueSight empowers you to identify synthetic media and false information using cutting-edge AI technology. 
              Analyze videos, images, audio, and text within seconds with unparalleled accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button 
                onClick={() => router.push('/deepfake-detection')}
                className="btn-primary"
              >
                Start Analysis
              </button>
              <button className="btn-secondary">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="card text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comprehensive Protection
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to verify digital content and stay protected in an era of sophisticated manipulation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className="card group cursor-pointer hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => handleFeatureClick(feature)}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.name}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deepfake Info Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              What are Deepfakes?
            </h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Deepfakes are highly realistic media—such as videos, images, or audio—created or manipulated using advanced artificial intelligence, 
                particularly deep learning techniques. The name stems from blending "deep learning" and "fake."
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Key Characteristics:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2 mt-1">•</span>
                      <span>AI-generated synthetic media that appears convincingly real</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2 mt-1">•</span>
                      <span>Can show people saying or doing things they never did</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2 mt-1">•</span>
                      <span>Uses neural networks trained on large datasets</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">Detection Methods:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2 mt-1">•</span>
                      <span>Pixel-level inconsistency analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2 mt-1">•</span>
                      <span>Facial expression and movement patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2 mt-1">•</span>
                      <span>Audio-visual synchronization checks</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Protect Yourself?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust TrueSight to verify digital content and combat misinformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push('/deepfake-detection')}
                className="btn-primary"
              >
                Start Free Analysis
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 