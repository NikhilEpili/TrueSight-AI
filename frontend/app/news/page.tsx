'use client';

import { useState } from 'react';
import { Search, LinkIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface AnalysisResult {
  is_fake: boolean;
  confidence: number;
  explanation: string;
  warnings?: string[];
  sources?: string[];
}

export default function NewsVerification() {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const analyzeContent = async (type: 'url' | 'text') => {
    setIsAnalyzing(true);
    setError('');
    setResult(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result
      const mockResult: AnalysisResult = {
        is_fake: Math.random() > 0.5,
        confidence: Math.random(),
        explanation: type === 'url' 
          ? 'This article shows signs of potential misinformation based on our analysis of the content, sources, and writing patterns.'
          : 'The provided text contains elements commonly associated with AI-generated or misleading content.',
        warnings: ['Unverified sources', 'Emotional language detected'],
        sources: ['https://example.com/fact-check', 'https://reliable-source.com/verification']
      };

      setResult(mockResult);
    } catch (err) {
      setError('Failed to analyze content. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-lightgray py-12 px-4 relative">
      {/* Back Button */}
      <Link href="/" className="absolute top-6 right-6 z-10">
        <button className="bg-primary hover:bg-[#23206F] text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 transition-all duration-200 hover:scale-105 font-poppins">
          <ArrowLeft size={18} />
          Back to Home
        </button>
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-primary text-center font-synthnet">News Verification</h1>
          <p className="text-lg md:text-2xl text-text font-rubik font-semibold">
            Verify news articles and text content for potential misinformation using our advanced fact-checking system.
          </p>
        </div>
        {/* URL Input */}
        <div className="mb-8">
          <div className="flex gap-4 font-poppins font-semibold">
            <input
              type="url"
              placeholder="Enter article URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-2 border border-bordergray rounded-md bg-white text-black"
            />
            <button
              onClick={() => analyzeContent('url')}
              disabled={!url || isAnalyzing}
              className="bg-primary text-white font-semibold rounded-lg px-9 py-1 text-lg mb-1 transition-transform transition-colors duration-200 hover:bg-[#23206F] hover:scale-110 font-poppins"
            >
              <LinkIcon size={20} />
              Analyze URL
            </button>
          </div>
        </div>
        {/* Text Input */}
        <div className="mb-8">
          <textarea
            placeholder="Or paste article text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-bordergray rounded-md bg-white text-black mb-4 font-poppins font-semibold"
          />
          <button
            onClick={() => analyzeContent('text')}
            disabled={!text || isAnalyzing}
            className="w-full bg-primary text-white font-semibold rounded-lg text-lg mb-1 transition-transform transition-colors duration-200 hover:bg-[#23206F] hover:scale-110 font-poppins"
          >
            <Search size={20} />
            Analyze Text
          </button>
        </div>
        {/* Loading State */}
        {isAnalyzing && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text">Analyzing content...</p>
          </div>
        )}
        {/* Results */}
        {result && (
          <div className="mt-12 p-6 bg-white rounded-lg shadow border border-bordergray">
            <div className="flex items-center justify-center mb-6">
              {result.is_fake ? (
                <div className="text-red-500 text-6xl">⚠️</div>
              ) : (
                <div className="text-green-500 text-6xl">✅</div>
              )}
            </div>
            <h2 className="text-xl font-semibold text-center mb-6 text-black font-poppins">
              {result.is_fake ? 'Potential Misinformation Detected' : 'No Misinformation Detected'}
            </h2>
            <div className="space-y-4">
              {/* Confidence Score */}
              <div className="flex justify-between items-center">
                <span className="text-text">Confidence Score</span>
                <span className="font-semibold text-black">
                  {(result.confidence * 100).toFixed(1)}%
                </span>
              </div>
              {/* Explanation */}
              <div>
                <h3 className="font-semibold text-black mb-2 font-poppins">Analysis</h3>
                <p className="text-text font-rubik">{result.explanation}</p>
              </div>
              {/* Warnings */}
              {result.warnings && result.warnings.length > 0 && (
                <div>
                  <h3 className="font-semibold text-black mb-2 font-poppins">Warnings</h3>
                  <ul className="list-disc list-inside text-red-600">
                    {result.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Sources */}
              {result.sources && result.sources.length > 0 && (
                <div>
                  <h3 className="font-semibold text-black mb-2 font-poppins">Sources</h3>
                  <ul className="space-y-2">
                    {result.sources.map((source, index) => (
                      <li key={index}>
                        <a
                          href={source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {source}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Error Message */}
        {error && (
          <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-md text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
} 