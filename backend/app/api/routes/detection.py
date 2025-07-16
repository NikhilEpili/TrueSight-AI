from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from typing import Optional
from app.core.logger import logger
from app.services.detection import (
    analyze_image,
    analyze_video,
    analyze_audio,
    analyze_url
)
from app.core.config import settings

router = APIRouter()

@router.post("/image")
async def detect_image(
    file: UploadFile = File(...),
    model: Optional[str] = Form("default")
):
    """
    Analyze an image file for potential deepfake manipulation.
    """
    if file.content_type not in settings.SUPPORTED_IMAGE_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type. Supported types: {settings.SUPPORTED_IMAGE_TYPES}"
        )
    
    try:
        result = await analyze_image(file, model)
        return result
    except Exception as e:
        logger.error(f"Error analyzing image: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/video")
async def detect_video(
    file: UploadFile = File(...),
    model: Optional[str] = Form("default")
):
    """
    Analyze a video file for potential deepfake manipulation.
    """
    if file.content_type not in settings.SUPPORTED_VIDEO_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type. Supported types: {settings.SUPPORTED_VIDEO_TYPES}"
        )
    
    try:
        result = await analyze_video(file, model)
        return result
    except Exception as e:
        logger.error(f"Error analyzing video: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/audio")
async def detect_audio(
    file: UploadFile = File(...),
    model: Optional[str] = Form("default")
):
    """
    Analyze an audio file for potential deepfake manipulation.
    """
    if file.content_type not in settings.SUPPORTED_AUDIO_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type. Supported types: {settings.SUPPORTED_AUDIO_TYPES}"
        )
    
    try:
        result = await analyze_audio(file, model)
        return result
    except Exception as e:
        logger.error(f"Error analyzing audio: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/url")
async def detect_url(url: str):
    """
    Analyze content from a URL for potential deepfake or fake information.
    """
    try:
        result = await analyze_url(url)
        return result
    except Exception as e:
        logger.error(f"Error analyzing URL: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 