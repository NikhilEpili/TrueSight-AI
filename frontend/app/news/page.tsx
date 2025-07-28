'use client';

import { useState } from 'react';
import { Search, LinkIcon } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <br>
        </br>
        <h1 className="text-7xl font-bold text-gray-900 text-7xl md:text-6xl font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6 leading-tight animate-fade-in-2s leading-none pb-2 font-poppins mb-4 font-poppins bg-gradient-to-r from-purple-400 to-indigo-400">
          News Verification
        </h1>
        <p className="text-5x1 md:text-2xl text-gray-600 dark:text-gray-300 font-rubik font-semibold">
          Verify news articles and text content for potential misinformation using our advanced
          fact-checking system.
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
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            onClick={() => analyzeContent('url')}
            disabled={!url || isAnalyzing}
            className=" bg-purple-500 text-white font-semibold rounded-lg px-9 py-1 text-lg mb-1 transition-transform transition-colors duration-200 hover:bg-purple-700 hover:scale-105 font-poppins"
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
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4 font-poppins font-semibold"
        />
        <button
          onClick={() => analyzeContent('text')}
          disabled={!text || isAnalyzing}
          className="w-full bg-purple-500 text-white font-semibold rounded-lg text-lg mb-1 transition-transform transition-colors duration-200 hover:bg-purple-700 hover:scale-105 font-poppins"
        >
          <Search size={20} />
          Analyze Text
        </button>
      </div>

      {/* Loading State */}
      {isAnalyzing && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Analyzing content...</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center justify-center mb-6">
            {result.is_fake ? (
              <div className="text-red-500 text-6xl">⚠️</div>
            ) : (
              <div className="text-green-500 text-6xl">✅</div>
            )}
          </div>
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
            {result.is_fake ? 'Potential Misinformation Detected' : 'No Misinformation Detected'}
          </h2>
          <div className="space-y-4">
            {/* Confidence Score */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Confidence Score</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
            {/* Explanation */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">{result.explanation}</p>
            </div>
            {/* Warnings */}
            {result.warnings && result.warnings.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Warnings</h3>
                <ul className="list-disc list-inside text-red-600 dark:text-red-400">
                  {result.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Sources */}
            {result.sources && result.sources.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Sources</h3>
                <ul className="space-y-2">
                  {result.sources.map((source, index) => (
                    <li key={index}>
                      <a
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
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
        <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-center">
          {error}
        </div>
      )}
    </div>
  );
} 