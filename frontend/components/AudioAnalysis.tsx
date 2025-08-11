"use client";
import { useRouter } from 'next/navigation';

export default function AudioAnalysis() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lightgray py-12 px-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center border border-bordergray">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-primary text-center font-synthnet">Audio Analysis</h1>
        <p className="font-medium text-lg text-text mb-8 text-center font-rubik">Upload your audio file to detect if it's AI-generated or authentic human content</p>
        <div className="w-full flex flex-col items-center mb-8">
          <label htmlFor="audio-upload" className="w-full flex flex-col items-center justify-center border-2 border-dashed border-primary rounded-xl py-8 cursor-pointer hover:border-accent transition">
            <span className="text-lg text-primary font-semibold mb-2 font-rubik">Choose Audio File +</span>
            <input id="audio-upload" type="file" accept="audio/*" className="hidden" />
          </label>
        </div>
        <button className="w-full bg-primary text-white font-semibold rounded-lg px-6 py-2 text-lg mb-4 transition-transform transition-colors duration-200 hover:bg-[#23206F] hover:scale-110 font-poppins">Analyze 🎗️</button>
        <button onClick={() => router.push('/extension')} className="mt-4 px-6 py-2 border-2 border-primary text-primary rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-[#23206F] hover:text-white hover:scale-110 font-rubik">Download Extension</button>
        <button onClick={() => router.push('/deepfake-detection')} className="absolute top-4 right-4 px-4 py-1 border-2 border-primary text-primary rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-[#23206F] hover:text-white hover:scale-110 font-rubik">&larr; Back</button>
      </div>
    </div>
  );
} 