'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, Image, Video, Music } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface AnalysisResult {
  is_fake: boolean;
  confidence: number;
  analysis: {
    [key: string]: number;
  };
}

export default function MediaAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setResult(null);
      setError('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.avi', '.mov'],
      'audio/*': ['.mp3', '.wav', '.m4a']
    },
    multiple: false
  });

  const analyzeFile = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock result
      const mockResult: AnalysisResult = {
        is_fake: Math.random() > 0.5,
        confidence: Math.random(),
        analysis: {
          'face_consistency': Math.random(),
          'audio_sync': Math.random(),
          'compression_artifacts': Math.random(),
          'metadata_analysis': Math.random(),
          'deep_learning_score': Math.random()
        }
      };

      setResult(mockResult);
    } catch (err) {
      setError('Failed to analyze file. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="h-8 w-8" />;
    if (file.type.startsWith('video/')) return <Video className="h-8 w-8" />;
    if (file.type.startsWith('audio/')) return <Music className="h-8 w-8" />;
    return <FileText className="h-8 w-8" />;
  };

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

      {/* File Upload Area */}
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

      {/* Loading State */}
      {isAnalyzing && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Analyzing media file...</p>
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
                <span className="font-semibold text-gray-900 dark:text-white">
                  {(value * 100).toFixed(1)}%
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
  );
} 