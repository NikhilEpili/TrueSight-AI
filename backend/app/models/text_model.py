"""
Text deepfake detection using RoBERTa model for AI-generated text detection.
"""

import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

class TextDeepfakeDetector:
    """
    Text deepfake detector using RoBERTa model for AI-generated text detection.
    """
    
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self._load_model()
    
    def _load_model(self):
        """Load the RoBERTa model for AI-generated text detection."""
        try:
            # Using RoBERTa for synthetic/AI-generated text detection
            model_name = "roberta-base"
            self.tokenizer = AutoTokenizer.from_pretrained(model_name)
            self.model = AutoModelForSequenceClassification.from_pretrained(
                model_name,
                num_labels=2  # real vs AI-generated
            )
            self.model.to(self.device)
            self.model.eval()
            logger.info("RoBERTa model loaded successfully for text analysis")
        except Exception as e:
            logger.error(f"Error loading RoBERTa model: {str(e)}")
            raise
    
    async def analyze(self, text: str) -> Dict[str, Any]:
        """
        Analyze text for AI-generated content.
        
        Args:
            text: Input text to analyze
            
        Returns:
            Dictionary containing analysis results
        """
        try:
            if not text or len(text.strip()) == 0:
                return {
                    "classification": "invalid",
                    "confidence": 0.0,
                    "error": "Empty or invalid text input"
                }
            
            if self.tokenizer is None or self.model is None:
                return {
                    "classification": "error",
                    "confidence": 0.0,
                    "error": "Model not loaded properly"
                }
            
            # Type assertions for Pyright
            assert self.tokenizer is not None
            assert self.model is not None
            
            # Tokenize input text
            inputs = self.tokenizer(  # type: ignore
                text,
                truncation=True,
                padding=True,
                max_length=512,
                return_tensors="pt"
            ).to(self.device)
            logging.info(f"[TextDeepfakeDetector] Preprocessed input: {inputs}")
            
            # Get model predictions
            with torch.no_grad():
                outputs = self.model(**inputs)  # type: ignore
                logits = outputs.logits
                probabilities = torch.softmax(logits, dim=1)
                predicted_class = torch.argmax(probabilities, dim=1).item()
                confidence = probabilities[0, predicted_class].item()  # type: ignore
            logging.info(f"[TextDeepfakeDetector] Logits: {logits}")
            logging.info(f"[TextDeepfakeDetector] Probabilities: {probabilities}")
            logging.info(f"[TextDeepfakeDetector] Predicted class: {predicted_class}, Confidence: {confidence}")
            
            # Map prediction to result
            classification = "fake" if predicted_class == 1 else "real"
            
            intermediates = {
                "inputs": {k: v.tolist() if hasattr(v, 'tolist') else str(v) for k, v in inputs.items()},
                "logits": logits.cpu().numpy().tolist(),
                "probabilities": probabilities.cpu().numpy().tolist(),
                "predicted_class": predicted_class,
                "confidence": confidence
            }
            
            return {
                "classification": classification,
                "confidence": confidence,
                "text_length": len(text),
                "model_used": "RoBERTa",
                "intermediates": intermediates
            }
            
        except Exception as e:
            logger.error(f"Error analyzing text: {str(e)}")
            return {
                "classification": "error",
                "confidence": 0.0,
                "error": str(e)
            }
    
    def __del__(self):
        """Cleanup when object is destroyed."""
        if hasattr(self, 'model') and self.model is not None:
            del self.model
        if hasattr(self, 'tokenizer') and self.tokenizer is not None:
            del self.tokenizer 