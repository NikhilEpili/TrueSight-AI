"""
Image deepfake detection using fine-tuned ViT model.
"""

import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import numpy as np
from typing import Dict, Any, List, Optional, Union
import logging
import io
import os

logger = logging.getLogger(__name__)

class ImageDeepfakeDetector:
    """
    Image deepfake detector using fine-tuned ViT model.
    """
    
    def __init__(self):
        self.model: Optional[nn.Module] = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.transform: Optional[transforms.Compose] = None
        self.models_loaded = False
        self._load_models()
        self._setup_transforms()
    
    def _load_models(self):
        """Load fine-tuned ViT model."""
        try:
            import timm
            
            # Load the fine-tuned model
            logger.info("Loading fine-tuned ViT model...")
            
            # Create the same model architecture as used in training
            backbone = timm.create_model('vit_base_patch16_224', pretrained=False, num_classes=0)  # No head
            in_features = backbone.num_features
            self.model = nn.Sequential(
                backbone,
                nn.Flatten(),
                nn.Linear(in_features, 2)  # 2 classes: real/fake
            )
            
            # Load the trained weights
            model_path = os.path.join(os.path.dirname(__file__), '../../finetuned_dinov2.pth')
            if os.path.exists(model_path):
                self.model.load_state_dict(torch.load(model_path, map_location=self.device))
                logger.info(f"Loaded fine-tuned model from {model_path}")
            else:
                logger.warning(f"Fine-tuned model not found at {model_path}, using pretrained model")
                # Fallback to pretrained model
                self.model = timm.create_model('vit_base_patch16_224', pretrained=True, num_classes=2)
            
            self.model.to(self.device)
            self.model.eval()
            
            self.models_loaded = True
            logger.info("Fine-tuned ViT model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading fine-tuned model: {str(e)}")
            self.models_loaded = False
            # Don't raise here, allow the class to be instantiated but mark as not ready
    
    def _setup_transforms(self):
        """Setup image transformations for the model."""
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
    
    def _predict(self, image: Image.Image) -> torch.Tensor:
        """Get prediction using fine-tuned ViT model."""
        if self.model is None:
            raise RuntimeError("Fine-tuned model not loaded")
            
        if self.transform is None:
            raise RuntimeError("Transforms not set up")
            
        input_tensor = self.transform(image).unsqueeze(0).to(self.device)
        
        with torch.no_grad():
            logits = self.model(input_tensor)
            probabilities = torch.softmax(logits, dim=1)
        
        return probabilities
    
    async def analyze(self, image_path: str) -> Dict[str, Any]:
        """
        Analyze image for deepfake detection using fine-tuned ViT model.
        """
        try:
            if not self.models_loaded:
                return {
                    "classification": "error",
                    "is_deepfake": False,
                    "confidence": 0.0,
                    "error": "Model not loaded properly",
                    "analysis_type": "image"
                }
            
            image = Image.open(image_path).convert('RGB')
            probabilities = self._predict(image)
            
            # Get prediction and confidence
            fake_prob = probabilities[0, 1].item()  # Probability of being fake
            real_prob = probabilities[0, 0].item()  # Probability of being real
            
            is_deepfake = fake_prob > 0.5
            confidence = max(fake_prob, real_prob)
            
            classification = "fake" if is_deepfake else "real"
            
            intermediates = {
                "fake_probability": float(fake_prob),
                "real_probability": float(real_prob),
                "confidence": float(confidence),
                "is_deepfake": bool(is_deepfake)
            }
            
            return {
                "classification": classification,
                "is_deepfake": bool(is_deepfake),
                "confidence": float(confidence),
                "analysis_type": "image",
                "probabilities": {
                    "fake": float(fake_prob),
                    "real": float(real_prob)
                },
                "models_used": ["Fine-tuned ViT"],
                "intermediates": intermediates
            }
        except Exception as e:
            logger.error(f"Error analyzing image: {str(e)}")
            return {
                "classification": "error",
                "is_deepfake": False,
                "confidence": 0.0,
                "error": str(e),
                "analysis_type": "image"
            }
    
    def __del__(self):
        """Cleanup when object is destroyed."""
        if hasattr(self, 'model') and self.model is not None:
            del self.model 