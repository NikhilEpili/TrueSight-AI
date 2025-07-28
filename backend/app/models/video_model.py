"""
Video deepfake detection using fine-tuned ViT model with frame aggregation.
"""

import numpy as np
from typing import Dict, Any, List
import logging
import io
from PIL import Image
import asyncio
import tempfile
import os
import torch
import torch.nn as nn
from torchvision import transforms

logger = logging.getLogger(__name__)

# Try to import cv2, but handle gracefully if not available
try:
    import cv2
    CV2_AVAILABLE = True
except ImportError:
    CV2_AVAILABLE = False
    logger.warning("opencv-python not available. Video analysis will not work.")

class VideoDeepfakeDetector:
    """Video deepfake detector using fine-tuned ViT model with frame aggregation."""
    
    def __init__(self):
        if not CV2_AVAILABLE:
            logger.error("Cannot initialize VideoDeepfakeDetector: opencv-python not available")
            raise ImportError("opencv-python is required for video analysis")
            
        self.model: nn.Module = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.transform: transforms.Compose = None
        self.frames_per_video = 16  # Increased from 8 to 16 for better accuracy
        self.models_loaded = False
        self._load_models()
        self._setup_transforms()
        
    def _load_models(self):
        """Load fine-tuned video model."""
        try:
            import timm
            
            # Load the fine-tuned video model
            logger.info("Loading fine-tuned video ViT model...")
            
            # Create the same model architecture as used in video training
            backbone = timm.create_model('vit_base_patch16_224', pretrained=False, num_classes=0)  # No head
            in_features = backbone.num_features
            
            class VideoClassifier(nn.Module):
                def __init__(self, backbone, in_features, num_classes, frames_per_video):
                    super().__init__()
                    self.backbone = backbone
                    self.head = nn.Linear(in_features, num_classes)
                    self.frames_per_video = frames_per_video
                def forward(self, x):  # x: [B, N, 3, H, W]
                    B, N, C, H, W = x.shape
                    x = x.view(B*N, C, H, W)
                    feats = self.backbone(x)  # [B*N, F]
                    feats = feats.view(B, N, -1)  # [B, N, F]
                    feats = feats.mean(dim=1)  # [B, F]
                    out = self.head(feats)  # [B, num_classes]
                    return out
            
            self.model = VideoClassifier(backbone, in_features, 2, self.frames_per_video)
            
            # Load the trained weights
            model_path = os.path.join(os.path.dirname(__file__), '../../finetuned_dinov2_video_sdfvd2.pth')
            if os.path.exists(model_path):
                self.model.load_state_dict(torch.load(model_path, map_location=self.device))
                logger.info(f"Loaded fine-tuned video model from {model_path}")
            else:
                logger.warning(f"Fine-tuned video model not found at {model_path}, using pretrained model")
                # Fallback to pretrained model
                self.model = timm.create_model('vit_base_patch16_224', pretrained=True, num_classes=2)
            
            self.model.to(self.device)
            self.model.eval()
            
            self.models_loaded = True
            logger.info("Fine-tuned video ViT model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading fine-tuned video model: {str(e)}")
            self.models_loaded = False
    
    def _setup_transforms(self):
        """Setup image transformations for the model."""
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        
    def _sample_frames(self, video_path: str) -> List[np.ndarray]:
        """Sample frames from video file."""
        try:
            cap = cv2.VideoCapture(video_path)
            if not cap.isOpened():
                logger.error(f"Could not open video file: {video_path}")
                return []
            
            frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            idxs = np.linspace(0, frame_count-1, self.frames_per_video, dtype=int)
            frames = []
            
            for idx in idxs:
                cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
                ret, frame = cap.read()
                if not ret:
                    continue
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                frame = cv2.resize(frame, (224, 224))
                frames.append(frame)
            
            cap.release()
            
            # If not enough frames, repeat last
            while len(frames) < self.frames_per_video:
                if frames:
                    frames.append(frames[-1])
                else:
                    # Create a black frame if no frames were read
                    frames.append(np.zeros((224, 224, 3), dtype=np.uint8))
            
            return frames[:self.frames_per_video]
            
        except Exception as e:
            logger.error(f"Error extracting frames: {str(e)}")
            return []
        
    async def analyze(self, file_path: str) -> Dict[str, Any]:
        """
        Analyze video for deepfake detection using fine-tuned ViT model.
        
        Args:
            file_path: Path to the video file
            
        Returns:
            Dictionary with analysis results
        """
        try:
            if not self.models_loaded:
                return {
                    "is_deepfake": False,
                    "confidence": 0.0,
                    "error": "Model not loaded properly",
                    "analysis_type": "video",
                    "frames_analyzed": 0
                }
            
            logger.info(f"Starting video analysis for: {file_path}")
            
            # Extract frames from video
            frames = self._sample_frames(file_path)
            
            if not frames:
                return {
                    "is_deepfake": False,
                    "confidence": 0.0,
                    "error": "No frames could be extracted from video",
                    "analysis_type": "video",
                    "frames_analyzed": 0
                }
            
            # Process frames
            processed_frames = []
            for frame in frames:
                frame_pil = Image.fromarray(frame)
                processed_frame = self.transform(frame_pil)
                processed_frames.append(processed_frame)
            
            # Stack frames into video tensor
            video_tensor = torch.stack(processed_frames).unsqueeze(0)  # [1, N, 3, H, W]
            video_tensor = video_tensor.to(self.device)
            
            # Get prediction
            with torch.no_grad():
                logits = self.model(video_tensor)
                probabilities = torch.softmax(logits, dim=1)
            
            # Get prediction and confidence
            fake_prob = probabilities[0, 1].item()  # Probability of being fake
            real_prob = probabilities[0, 0].item()  # Probability of being real
            
            is_deepfake = fake_prob > 0.5
            confidence = max(fake_prob, real_prob)
            
            intermediates = {
                "fake_probability": float(fake_prob),
                "real_probability": float(real_prob),
                "confidence": float(confidence),
                "is_deepfake": bool(is_deepfake),
                "frames_processed": len(frames)
            }
            
            return {
                "is_deepfake": bool(is_deepfake),
                "confidence": float(confidence),
                "analysis_type": "video",
                "frames_analyzed": len(frames),
                "probabilities": {
                    "fake": float(fake_prob),
                    "real": float(real_prob)
                },
                "models_used": ["Fine-tuned Video ViT"],
                "details": {
                    "total_frames_extracted": len(frames),
                    "frames_analyzed": len(frames),
                    "avg_confidence": float(confidence),
                    "max_confidence": float(confidence)
                },
                "intermediates": intermediates
            }
            
        except Exception as e:
            logger.error(f"Error analyzing video: {str(e)}")
            return {
                "is_deepfake": False,
                "confidence": 0.0,
                "error": str(e),
                "analysis_type": "video",
                "frames_analyzed": 0
            }
    
    def __del__(self):
        """Cleanup when object is destroyed."""
        if hasattr(self, 'model') and self.model is not None:
            del self.model 