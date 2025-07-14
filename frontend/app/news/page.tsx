'use client'

import { useState } from 'react'
import { Search, AlertCircle, CheckCircle, Link as LinkIcon } from 'lucide-react'

type FactCheckResponse = {
  is_fake: boolean
  confidence: float
  explanation: string
  sources: string[]
  warnings?: string[]
}

export default function NewsVerification() {
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<FactCheckResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeContent = async (type: 'url' | 'text') => {
    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const endpoint = type === 'url' ? '/api/news/article' : '/api/news/text'
      const body = type === 'url' ? { url } : { text }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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
          News Verification
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Verify news articles and text content for potential misinformation using our advanced
          fact-checking system.
        </p>
      </div>

      {/* URL Input */}
      <div className="mb-8">
        <div className="flex gap-4">
          <input
            type="url"
            placeholder="Enter article URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            onClick={() => analyzeContent('url')}
            disabled={!url || isAnalyzing}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 disabled:opacity-50 flex items-center gap-2"
          >
            <LinkIcon size={20} />
            {isAnalyzing ? 'Analyzing...' : 'Verify URL'}
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
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4"
        />
        <button
          onClick={() => analyzeContent('text')}
          disabled={!text || isAnalyzing}
          className="w-full bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Search size={20} />
          {isAnalyzing ? 'Analyzing...' : 'Verify Text'}
        </button>
      </div>

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
            {result.is_fake ? 'Potential Misinformation Detected' : 'No Misinformation Detected'}
          </h2>

          <div className="space-y-6">
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
  )
} 