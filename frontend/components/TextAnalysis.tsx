"use client";
import { useRouter } from 'next/navigation';

export default function TextAnalysis() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#23243a] via-[#181824] to-[#2d2c3a] py-12 px-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white/10 rounded-2xl shadow-xl p-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent text-center font-poppins">Text Analysis</h1>
        <p className="text-lg text-white mb-8 text-center font-rubik">Enter your text to detect if it's AI-generated or authentic human content</p>
        <div className="w-full flex flex-col items-center mb-8">
          <textarea
            placeholder="Enter your text here..."
            className="w-full h-32 p-4 bg-white/10 border border-purple-400 rounded-xl text-white placeholder-gray-300 resize-none focus:outline-none focus:border-indigo-400"
          />
        </div>
        <button className="w-full bg-purple-500 text-white font-semibold rounded-lg px-6 py-2 text-lg mb-4 transition-transform transition-colors duration-200 hover:bg-purple-700 hover:scale-105 font-poppins">Analyze 🔗</button>
        <button onClick={() => router.push('/extension')} className="mt-4 px-6 py-2 border-2 border-purple-400 text-purple-200 rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-purple-900/20 hover:scale-105 font-rubik">Download Extension</button>
        <button onClick={() => router.push('/deepfake-detection')} className="absolute top-4 right-4 px-4 py-1 border-2 border-purple-400 text-purple-200 rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-purple-900/20 hover:scale-105 font-rubik">&larr; Back</button>
      </div>
    </div>
  );
} 