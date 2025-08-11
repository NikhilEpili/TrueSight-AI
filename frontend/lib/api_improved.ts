// Improved API service for TrueSight-AI backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface AnalysisResult {
  modality: string;
  classification: 'real' | 'fake' | 'unknown';
  confidence: number;
  is_deepfake: boolean;
  details: Record<string, any>;
  model_used: string;
  error?: string;
}

export interface AnalysisError {
  error: string;
  detail: string;
}

class ImprovedAPIService {
  private static async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  private static validateFile(file: File, maxSize: number, allowedTypes: string[]): void {
    if (file.size > maxSize) {
      throw new Error(`File too large. Maximum size: ${maxSize / (1024 * 1024)}MB`);
    }
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Unsupported file type. Allowed: ${allowedTypes.join(', ')}`);
    }
  }

  static async analyzeText(text: string): Promise<AnalysisResult> {
    if (!text || !text.trim()) {
      throw new Error('Text content cannot be empty');
    }

    const formData = new FormData();
    formData.append('modality', 'text');
    formData.append('text', text);

    const response = await fetch(`${API_BASE_URL}/api/v1/analyze`, {
      method: 'POST',
      body: formData,
    });

    return this.handleResponse(response);
  }

  static async analyzeImage(file: File): Promise<AnalysisResult> {
    this.validateFile(file, 20 * 1024 * 1024, [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'
    ]);

    const formData = new FormData();
    formData.append('modality', 'image');
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/v1/analyze`, {
      method: 'POST',
      body: formData,
    });

    return this.handleResponse(response);
  }

  static async analyzeAudio(file: File): Promise<AnalysisResult> {
    this.validateFile(file, 100 * 1024 * 1024, [
      'audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp3', 'audio/ogg'
    ]);

    const formData = new FormData();
    formData.append('modality', 'audio');
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/v1/analyze`, {
      method: 'POST',
      body: formData,
    });

    return this.handleResponse(response);
  }

  static async analyzeVideo(file: File): Promise<AnalysisResult> {
    this.validateFile(file, 200 * 1024 * 1024, [
      'video/mp4', 'video/mpeg', 'video/quicktime', 'video/avi', 'video/mov'
    ]);

    const formData = new FormData();
    formData.append('modality', 'video');
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/v1/analyze`, {
      method: 'POST',
      body: formData,
    });

    return this.handleResponse(response);
  }

  static async checkHealth(): Promise<{ status: string; service: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return this.handleResponse(response);
  }
}

export const APIService = ImprovedAPIService; 