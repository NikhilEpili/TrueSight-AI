"""
Main analysis endpoint for deepfake detection across all modalities.
"""

from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from fastapi.responses import JSONResponse
from typing import Optional
import logging

from app.services.deepfake_detection import deepfake_service
from app.core.logger import logger

router = APIRouter()

@router.post("/analyze")
async def analyze_content(
    modality: str = Form(..., description="Type of content to analyze: text, image, audio, or video"),
    file: Optional[UploadFile] = File(None, description="File to analyze (required for image, audio, video)"),
    text: Optional[str] = Form(None, description="Text content to analyze (required for text modality)"),
    debug: Optional[bool] = Form(False, description="Return intermediate outputs for debugging")
):
    """
    Analyze content for deepfake detection across different modalities.
    
    - **modality**: Type of content to analyze ("text", "image", "audio", "video")
    - **file**: Uploaded file (required for image, audio, video modalities)
    - **text**: Text content (required for text modality)
    - **debug**: If true, return intermediate outputs for debugging
    
    Returns analysis results including classification and confidence score.
    """
    try:
        # Validate modality
        valid_modalities = ["text", "image", "audio", "video"]
        if modality not in valid_modalities:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid modality. Must be one of: {valid_modalities}"
            )
        
        # Validate inputs based on modality
        if modality == "text":
            if not text or not text.strip():
                raise HTTPException(
                    status_code=400,
                    detail="Text content is required for text modality"
                )
        else:
            if not file:
                raise HTTPException(
                    status_code=400,
                    detail=f"File upload is required for {modality} modality"
                )
            
            # Validate file types
            if modality == "image":
                if not file.content_type or not file.content_type.startswith("image/"):
                    raise HTTPException(
                        status_code=400,
                        detail="File must be an image for image modality"
                    )
            elif modality == "audio":
                if not file.content_type or not file.content_type.startswith("audio/"):
                    raise HTTPException(
                        status_code=400,
                        detail="File must be an audio file for audio modality"
                    )
            elif modality == "video":
                if not file.content_type or not file.content_type.startswith("video/"):
                    raise HTTPException(
                        status_code=400,
                        detail="File must be a video file for video modality"
                    )
        
        # Perform analysis
        result = await deepfake_service.analyze(
            modality=modality,
            file=file,
            text=text
        )
        
        # If debug, add intermediate outputs if available
        if debug and "intermediates" in result:
            result["debug"] = result["intermediates"]
        
        # Check for analysis errors
        if result.get("classification") == "error":
            raise HTTPException(
                status_code=500,
                detail=result.get("error", "Analysis failed")
            )
        
        return JSONResponse(content=result)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in analyze endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@router.get("/models/status")
async def get_model_status():
    """
    Get the status of loaded models.
    
    Returns information about which models are currently loaded in memory.
    """
    try:
        loaded_models = deepfake_service.get_loaded_models()
        return {
            "models_status": loaded_models,
            "message": "Model status retrieved successfully"
        }
    except Exception as e:
        logger.error(f"Error getting model status: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving model status: {str(e)}"
        )

@router.get("/health")
async def health_check():
    """
    Health check endpoint for the analysis service.
    
    Returns basic health information about the service.
    """
    try:
        loaded_models = deepfake_service.get_loaded_models()
        return {
            "status": "healthy",
            "service": "deepfake-detection",
            "models_loaded": sum(loaded_models.values()),
            "total_models": len(loaded_models)
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return {
            "status": "unhealthy",
            "error": str(e)
        } 