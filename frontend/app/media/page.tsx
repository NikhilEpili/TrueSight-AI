'use client'

import { useState } from 'react'
import { Upload, AlertCircle, CheckCircle } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

type AnalysisResult = {
  is_fake: boolean
  confidence: number
  analysis: {
    [key: string]: boolean
  }
}

export default function MediaAnalysis() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
    setResult(null)
    setError(null)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mpeg', '.quicktime'],
      'audio/*': ['.mp3', '.wav'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
  })

  const analyzeFile = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      let endpoint = ''
      if (file.type.startsWith('image/')) {
        endpoint = '/api/detection/image'
      } else if (file.type.startsWith('video/')) {
        endpoint = '/api/detection/video'
      } else if (file.type.startsWith('audio/')) {
        endpoint = '/api/detection/audio'
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Media Analysis
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Upload an image, video, or audio file to detect potential manipulation using our advanced AI
          models.
        </p>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500'
          }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          {isDragActive
            ? 'Drop the file here'
            : 'Drag and drop a file here, or click to select a file'}
        </p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Supports images (JPEG, PNG, GIF), videos (MP4), and audio (MP3, WAV)
        </p>
      </div>

      {/* File Info & Analysis Button */}
      {file && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Selected file: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </p>
          <button
            onClick={analyzeFile}
            disabled={isAnalyzing}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 disabled:opacity-50"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze File'}
          </button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center justify-center mb-6">
            {result.is_fake ? (
              <AlertCircle className="h-12 w-12 text-red-500" />
            ) : (
              <CheckCircle className="h-12 w-12 text-green-500" />
            )}
          </div>
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
            {result.is_fake ? 'Potential Manipulation Detected' : 'No Manipulation Detected'}
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Confidence Score</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
            {Object.entries(result.analysis).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  {key.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
                <span
                  className={`font-semibold ${
                    value ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {value ? 'Detected' : 'Not Detected'}
                </span>
              </div>
            ))}
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
  )
} 