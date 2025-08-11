// API service for TrueSight-AI backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface AnalysisResult {
  modality: string;
  classification: 'real' | 'fake';
  confidence: number;
  message: string;
}

export interface AnalysisError {
  error: string;
  message: string;
}

export class APIService {
  static async analyzeText(text: string): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append('modality', 'text');
    formData.append('text', text);

    const response = await fetch(`${API_BASE_URL}/api/v1/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  static async analyzeImage(file: File): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append('modality', 'image');
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/v1/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  static async analyzeAudio(file: File): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append('modality', 'audio');
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/v1/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  static async analyzeVideo(file: File): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append('modality', 'video');
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/v1/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  static async checkHealth(): Promise<{ status: string; service: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
} 