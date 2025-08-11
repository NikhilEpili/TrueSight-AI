"""
Audio deepfake detection using Wav2Vec 2.0 model for voice deepfake detection.
"""

import torch
import torch.nn as nn
from transformers import Wav2Vec2ForSequenceClassification, Wav2Vec2FeatureExtractor
import numpy as np
from typing import Dict, Any
import logging
import io

logger = logging.getLogger(__name__)

# Try to import audio processing libraries
try:
    import librosa
    LIBROSA_AVAILABLE = True
except ImportError:
    LIBROSA_AVAILABLE = False
    logger.warning("librosa not available. Audio analysis will be limited.")

try:
    import soundfile as sf
    SOUNDFILE_AVAILABLE = True
except ImportError:
    SOUNDFILE_AVAILABLE = False
    logger.warning("soundfile not available. Audio analysis will be limited.")

class AudioDeepfakeDetector:
    """
    Audio deepfake detector using Wav2Vec 2.0 model for voice deepfake detection.
    """
    
    def __init__(self):
        if not LIBROSA_AVAILABLE or not SOUNDFILE_AVAILABLE:
            logger.error("Cannot initialize AudioDeepfakeDetector: missing audio processing libraries")
            raise ImportError("librosa and soundfile are required for audio analysis")
            
        self.model = None
        self.feature_extractor = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.sample_rate = 16000  # Wav2Vec 2.0 expects 16kHz
        self.models_loaded = False
        self._load_model()
    
    def _load_model(self):
        """Load the Wav2Vec 2.0 model for audio deepfake detection."""
        try:
            # Using a pre-trained Wav2Vec 2.0 model
            # You can replace this with your fine-tuned model
            model_name = "facebook/wav2vec2-base"  # Placeholder - replace with actual model
            self.feature_extractor = Wav2Vec2FeatureExtractor.from_pretrained(model_name)
            self.model = Wav2Vec2ForSequenceClassification.from_pretrained(
                model_name,
                num_labels=2  # real vs fake
            )
            self.model.to(self.device)  # type: ignore
            self.model.eval()
            self.models_loaded = True
            logger.info("Audio model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading audio model: {str(e)}")
            self.models_loaded = False
            # Don't raise here, allow the class to be instantiated but mark as not ready
    
    def _preprocess_audio(self, audio_path: str) -> np.ndarray:
        """
        Preprocess audio data for Wav2Vec 2.0 model.
        
        Args:
            audio_path: Path to audio file
            
        Returns:
            Preprocessed audio array
        """
        try:
            # Load audio from file path
            audio, sr = sf.read(audio_path)
            
            # Convert to mono if stereo
            if len(audio.shape) > 1:
                audio = np.mean(audio, axis=1)
            
            # Resample to 16kHz if necessary
            if sr != self.sample_rate:
                audio = librosa.resample(audio, orig_sr=sr, target_sr=self.sample_rate)
            
            # Normalize audio
            audio = librosa.util.normalize(audio)
            
            return audio
            
        except Exception as e:
            logger.error(f"Error preprocessing audio: {str(e)}")
            raise
    
    def _extract_audio_features(self, audio: np.ndarray) -> torch.Tensor:
        """
        Extract features from audio using Wav2Vec 2.0.
        
        Args:
            audio: Preprocessed audio array
            
        Returns:
            Audio features tensor
        """
        if self.feature_extractor is None:
            raise RuntimeError("Feature extractor not loaded")
            
        # Prepare input for Wav2Vec 2.0
        inputs = self.feature_extractor(
            audio,
            sampling_rate=self.sample_rate,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=16000  # 1 second at 16kHz
        ).to(self.device)
        
        return inputs
    
    async def analyze(self, audio_path: str) -> Dict[str, Any]:
        """
        Analyze audio for deepfake detection.
        """
        try:
            if not self.models_loaded:
                return {
                    "is_deepfake": False,
                    "confidence": 0.0,
                    "error": "Models not loaded properly",
                    "analysis_type": "audio"
                }
            audio = self._preprocess_audio(audio_path)
            inputs = self._extract_audio_features(audio)
            assert self.model is not None
            with torch.no_grad():
                outputs = self.model(input_values=inputs["input_values"])
                logits = outputs.logits
                probabilities = torch.softmax(logits, dim=1)
                predicted_class = torch.argmax(probabilities, dim=1).item()
                confidence = probabilities[0][predicted_class].item()
            logging.info(f"[AudioDeepfakeDetector] Preprocessed audio shape: {audio.shape}")
            logging.info(f"[AudioDeepfakeDetector] Logits: {logits}")
            logging.info(f"[AudioDeepfakeDetector] Probabilities: {probabilities}")
            logging.info(f"[AudioDeepfakeDetector] Predicted class: {predicted_class}, Confidence: {confidence}")
            intermediates = {
                "preprocessed_audio": audio.tolist() if hasattr(audio, 'tolist') else str(audio),
                "logits": logits.cpu().numpy().tolist(),
                "probabilities": probabilities.cpu().numpy().tolist(),
                "predicted_class": predicted_class,
                "confidence": confidence
            }
            is_deepfake = predicted_class == 1
            return {
                "is_deepfake": bool(is_deepfake),
                "confidence": float(confidence),
                "analysis_type": "audio",
                "audio_length": len(audio) / self.sample_rate,
                "model_used": "Wav2Vec 2.0",
                "predicted_class": predicted_class,
                "intermediates": intermediates
            }
        except Exception as e:
            logger.error(f"Error analyzing audio: {str(e)}")
            return {
                "is_deepfake": False,
                "confidence": 0.0,
                "error": str(e),
                "analysis_type": "audio"
            }
    
    def __del__(self):
        """Cleanup when object is destroyed."""
        if hasattr(self, 'model') and self.model is not None:
            del self.model
        if hasattr(self, 'feature_extractor') and self.feature_extractor is not None:
            del self.feature_extractor 