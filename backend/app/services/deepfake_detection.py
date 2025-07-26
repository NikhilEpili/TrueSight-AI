"""
Improved Deepfake detection service with proper concurrency and error handling.
"""

import asyncio
import tempfile
import os
from typing import Dict, Any, Optional
import logging
from fastapi import UploadFile, HTTPException
from contextlib import asynccontextmanager

from app.models.text_model import TextDeepfakeDetector
from app.models.image_model import ImageDeepfakeDetector
from app.models.audio_model import AudioDeepfakeDetector
from app.models.video_model import VideoDeepfakeDetector
from app.core.config import settings

logger = logging.getLogger(__name__)

class ImprovedDeepfakeDetectionService:
    """
    Improved service class with proper concurrency handling and error management.
    """
    
    def __init__(self):
        self._detectors = {}
        self._models_loaded = {
            "text": False,
            "image": False,
            "audio": False,
            "video": False
        }
        self._loading_locks = {
            "text": asyncio.Lock(),
            "image": asyncio.Lock(),
            "audio": asyncio.Lock(),
            "video": asyncio.Lock()
        }
    
    async def _load_detector(self, modality: str):
        """Load detector with proper concurrency handling."""
        if self._models_loaded[modality]:
            return self._detectors[modality]
        
        async with self._loading_locks[modality]:
            # Double-check after acquiring lock
            if self._models_loaded[modality]:
                return self._detectors[modality]
            
            try:
                if modality == "text":
                    detector = TextDeepfakeDetector()
                elif modality == "image":
                    detector = ImageDeepfakeDetector()
                elif modality == "audio":
                    detector = AudioDeepfakeDetector()
                elif modality == "video":
                    detector = VideoDeepfakeDetector()
                else:
                    raise ValueError(f"Unknown modality: {modality}")
                
                self._detectors[modality] = detector
                self._models_loaded[modality] = True
                logger.info(f"{modality.capitalize()} model loaded successfully")
                
            except Exception as e:
                logger.error(f"Failed to load {modality} model: {str(e)}")
                raise HTTPException(
                    status_code=500,
                    detail=f"Failed to load {modality} detection model"
                )
        
        return self._detectors[modality]
    
    def _validate_file(self, file: UploadFile, modality: str) -> None:
        """Validate uploaded file."""
        if not file:
            raise HTTPException(
                status_code=400,
                detail=f"File is required for {modality} analysis"
            )
        
        # Check file size
        max_size = getattr(settings, f"MAX_{modality.upper()}_SIZE", 50 * 1024 * 1024)
        if file.size and file.size > max_size:
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Maximum size: {max_size // (1024*1024)}MB"
            )
        
        # Check content type
        supported_types = getattr(settings, f"SUPPORTED_{modality.upper()}_TYPES", [])
        if file.content_type and file.content_type not in supported_types:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type. Supported: {', '.join(supported_types)}"
            )
    
    @asynccontextmanager
    async def _temp_file_context(self, file: UploadFile, suffix: str):
        """Context manager for temporary file handling."""
        temp_file = None
        try:
            # Create temporary file
            temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
            
            # Write file content
            content = await file.read()
            temp_file.write(content)
            temp_file.close()
            
            yield temp_file.name
            
        finally:
            # Clean up
            if temp_file and os.path.exists(temp_file.name):
                os.unlink(temp_file.name)
    
    async def analyze_text(self, text: str) -> Dict[str, Any]:
        """Analyze text for AI-generated content."""
        if not text or not text.strip():
            raise HTTPException(
                status_code=400,
                detail="Text content cannot be empty"
            )
        
        detector = await self._load_detector("text")
        return await detector.analyze(text)
    
    async def analyze_image(self, file: UploadFile) -> Dict[str, Any]:
        """Analyze image for deepfake detection."""
        self._validate_file(file, "image")
        
        async with self._temp_file_context(file, ".jpg") as temp_path:
            detector = await self._load_detector("image")
            return await detector.analyze(temp_path)
    
    async def analyze_audio(self, file: UploadFile) -> Dict[str, Any]:
        """Analyze audio for voice deepfake detection."""
        self._validate_file(file, "audio")
        
        async with self._temp_file_context(file, ".wav") as temp_path:
            detector = await self._load_detector("audio")
            return await detector.analyze(temp_path)
    
    async def analyze_video(self, file: UploadFile) -> Dict[str, Any]:
        """Analyze video for deepfake detection."""
        self._validate_file(file, "video")
        
        async with self._temp_file_context(file, ".mp4") as temp_path:
            detector = await self._load_detector("video")
            return await detector.analyze(temp_path)
    
    async def analyze(self, modality: str, file: Optional[UploadFile] = None, text: Optional[str] = None) -> Dict[str, Any]:
        """
        Main analysis method with improved error handling.
        """
        try:
            # Validate modality
            if modality not in ["text", "image", "audio", "video"]:
                raise HTTPException(
                    status_code=400,
                    detail=f"Unsupported modality: {modality}"
                )
            logger.info(f"[DeepfakeDetectionService] Analyzing modality: {modality}")
            # Route to appropriate analyzer
            if modality == "text":
                result = await self.analyze_text(text)
            elif modality == "image":
                result = await self.analyze_image(file)
            elif modality == "audio":
                result = await self.analyze_audio(file)
            elif modality == "video":
                result = await self.analyze_video(file)
            logger.info(f"[DeepfakeDetectionService] Raw result: {result}")
            # Standardize response format
            response = {
                "modality": modality,
                "classification": result.get("classification", "unknown"),
                "confidence": result.get("confidence", 0.0),
                "is_deepfake": result.get("is_deepfake", False),
                "details": result.get("details", {}),
                "model_used": result.get("model_used", "unknown"),
                "error": result.get("error", None)
            }
            # Propagate intermediates for debug mode
            if "intermediates" in result:
                response["intermediates"] = result["intermediates"]
            return response
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Unexpected error in {modality} analysis: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail=f"Analysis failed: {str(e)}"
            )
    
    def get_loaded_models(self) -> Dict[str, bool]:
        """Get status of loaded models."""
        return self._models_loaded.copy()
    
    def cleanup(self):
        """Cleanup resources."""
        for detector in self._detectors.values():
            if hasattr(detector, '__del__'):
                detector.__del__()
        self._detectors.clear()
        self._models_loaded = {k: False for k in self._models_loaded}

# Global service instance
deepfake_service = ImprovedDeepfakeDetectionService()
