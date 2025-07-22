'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function TextAnalysis() {
  const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#23243a] via-[#181824] to-[#2d2c3a] py-12 px-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white/10 rounded-2xl shadow-xl p-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent text-center">Text Analysis</h1>
        <p className="text-lg text-white mb-8 text-center">Enter your text to detect if it's AI-generated or authentic human content</p>
        <div className="w-full flex flex-col items-center mb-8">
          <textarea
            className="w-full min-h-[120px] border-2 border-gray-200 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-purple-400 resize-none mb-4 bg-[#23243a]/80 placeholder-gray-400"
            placeholder="Paste or type your text here..."
          />
        </div>
        <button className="w-full bg-purple-500 text-white font-semibold rounded-lg px-6 py-2 text-lg mb-4 transition-transform transition-colors duration-200 hover:bg-purple-700 hover:scale-105" >Analyze 🔗</button>
        <button onClick={() => router.push('/extension')} className="px-6 py-2 border-2 border-purple-400 text-purple-200 rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-purple-900/20 hover:scale-105">Download Extension</button>
        <button onClick={() => router.push('/deepfake-detection')} className="absolute top-4 right-4 px-4 py-1 border-2 border-purple-400 text-purple-200 rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-purple-900/20 hover:scale-105">&larr; Back</button>
      </div>
    </div>
  )
} 