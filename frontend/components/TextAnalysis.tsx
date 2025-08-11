"use client";
import { useRouter } from 'next/navigation';

export default function TextAnalysis() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lightgray py-12 px-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center border border-bordergray">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-primary text-center font-synthnet">Text Analysis</h1>
        <p className="font-medium text-lg text-text mb-8 text-center font-rubik">Enter your text to detect if it's AI-generated or authentic human content</p>
        <div className="w-full flex flex-col items-center mb-8">
          <textarea
            placeholder="Enter your text here..."
            className="w-full h-32 p-4 bg-lightgray border border-primary rounded-xl text-black placeholder-gray-400 resize-none focus:outline-none focus:border-accent font-rubik"
          />
        </div>
        <button className="w-full bg-primary text-white font-semibold rounded-lg px-6 py-2 text-lg mb-4 transition-transform transition-colors duration-200 hover:bg-[#23206F] hover:scale-110 font-poppins">Analyze 🎗️</button>
        <button onClick={() => router.push('/extension')} className="mt-4 px-6 py-2 border-2 border-primary text-primary rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-[#23206F] hover:text-white hover:scale-110 font-rubik">Download Extension</button>
        <button onClick={() => router.push('/deepfake-detection')} className="absolute top-4 right-4 px-4 py-1 border-2 border-primary text-primary rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-[#23206F] hover:text-white hover:scale-110 font-rubik">&larr; Back</button>
      </div>
    </div>
  );
} 