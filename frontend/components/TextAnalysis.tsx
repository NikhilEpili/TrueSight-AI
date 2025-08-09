"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { APIService } from '../lib/api_improved';

export default function TextAnalysis() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const onAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await APIService.analyzeText(text);
      setResult(res);
    } catch (e: any) {
      setError(e.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#23243a] via-[#181824] to-[#2d2c3a] py-12 px-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white/10 rounded-2xl shadow-xl p-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-indigo-400 text-center font-poppins">Text Analysis</h1>
        <p className="text-lg text-white mb-8 text-center font-rubik">Enter your text to detect if it's AI-generated or authentic human content</p>
        <div className="w-full flex flex-col items-center mb-8">
          <textarea
            placeholder="Enter your text here..."
            className="w-full h-32 p-4 bg-white/10 border border-purple-400 rounded-xl text-white placeholder-gray-300 resize-none focus:outline-none focus:border-indigo-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button onClick={onAnalyze} disabled={!text.trim() || loading} className="w-full bg-purple-500 disabled:bg-purple-800 disabled:opacity-60 text-white font-semibold rounded-lg px-6 py-2 text-lg mb-4 transition-transform transition-colors duration-200 hover:bg-purple-700 hover:scale-105 font-poppins">{loading ? 'Analyzing...' : 'Analyze 🔗'}</button>
        {error && <div className="w-full text-red-400 text-sm mb-2">{error}</div>}
        {result && (
          <div className="w-full mt-2 p-4 bg-white/5 rounded-lg border border-purple-400 text-white text-sm">
            <div className="mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                result.classification === 'fake' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}>
                {result.classification === 'fake' ? '🚨 AI-GENERATED' : '✅ HUMAN-WRITTEN'}
              </span>
            </div>
            <div>Classification: <span className="font-semibold">{result.classification}</span></div>
            <div>Confidence: <span className="font-semibold">{Math.round(result.confidence * 100)}%</span></div>
            {result.model_used && <div>Model: <span className="font-semibold">{result.model_used}</span></div>}
            {result.details && (
              <div className="mt-2 text-xs text-gray-300">
                <div>Details: {JSON.stringify(result.details, null, 2)}</div>
              </div>
            )}
          </div>
        )}
        <button onClick={() => router.push('/extension')} className="mt-4 px-6 py-2 border-2 border-purple-400 text-purple-200 rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-purple-900/20 hover:scale-105 font-rubik">Download Extension</button>
        <button onClick={() => router.push('/deepfake-detection')} className="absolute top-4 right-4 px-4 py-1 border-2 border-purple-400 text-purple-200 rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-purple-900/20 hover:scale-105 font-rubik">&larr; Back</button>
      </div>
    </div>
  );
} 