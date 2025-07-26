'use client'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { APIService, AnalysisResult } from '../lib/api'

export default function VideoAnalysis() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
      setResult(null)
      
      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select a video file')
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const analysisResult = await APIService.analyzeVideo(selectedFile)
      setResult(analysisResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze video')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#23243a] via-[#181824] to-[#2d2c3a] py-12 px-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white/10 rounded-2xl shadow-xl p-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent text-center">Video Analysis</h1>
        <p className="text-lg text-white mb-8 text-center">Upload your video to detect if it's AI-generated or authentic human content</p>
        
        <div className="w-full flex flex-col items-center mb-8">
          {previewUrl && (
            <div className="w-full mb-4">
              <video 
                src={previewUrl} 
                controls
                className="w-full max-h-64 object-contain rounded-lg border-2 border-purple-400"
              />
            </div>
          )}
          
          {selectedFile && (
            <div className="w-full mb-4 p-4 bg-purple-500/20 border border-purple-400 rounded-lg">
              <div className="text-center text-purple-200">
                <div className="text-lg font-semibold mb-2">📁 Selected File:</div>
                <div className="text-sm">{selectedFile.name}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            </div>
          )}
          
          <label htmlFor="video-upload" className="w-full flex flex-col items-center justify-center border-2 border-dashed border-purple-400 rounded-xl py-8 cursor-pointer hover:border-indigo-400 transition">
            <span className="text-lg text-indigo-300 font-semibold mb-2">
              {selectedFile ? selectedFile.name : 'Choose Video File +'}
            </span>
            <input 
              id="video-upload" 
              ref={fileInputRef}
              type="file" 
              accept="video/*" 
              className="hidden" 
              onChange={handleFileSelect}
              disabled={isAnalyzing}
            />
          </label>
        </div>

        {error && (
          <div className="w-full mb-4 p-4 bg-red-500/20 border border-red-400 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="w-full mb-4 p-4 bg-green-500/20 border border-green-400 rounded-lg">
            <div className="text-center">
              <div className={`text-2xl font-bold mb-2 ${result.classification === 'real' ? 'text-green-400' : 'text-red-400'}`}>
                {result.classification === 'real' ? '✅ AUTHENTIC' : '❌ FAKE'}
              </div>
              <div className="text-white mb-2">Confidence: {(result.confidence * 100).toFixed(1)}%</div>
              <div className="text-gray-300 text-sm">{result.message}</div>
            </div>
          </div>
        )}

        <button 
          onClick={handleAnalyze}
          disabled={isAnalyzing || !selectedFile}
          className="w-full bg-purple-500 text-white font-semibold rounded-lg px-6 py-2 text-lg mb-4 transition-transform transition-colors duration-200 hover:bg-purple-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" 
        >
          {isAnalyzing ? 'Analyzing... 🔄' : 'Analyze 🔗'}
        </button>
        
        <button onClick={() => router.push('/extension')} className="mt-4 px-6 py-2 border-2 border-purple-400 text-purple-200 rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-purple-900/20 hover:scale-105">Download Extension</button>
        <button onClick={() => router.push('/deepfake-detection')} className="absolute top-4 right-4 px-4 py-1 border-2 border-purple-400 text-purple-200 rounded-xl font-semibold transition-transform transition-colors duration-200 hover:bg-purple-900/20 hover:scale-105">&larr; Back</button>
      </div>
    </div>
  )
} 