#!/usr/bin/env python3
"""
TrueSight-AI FastAPI server with ML models.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, Form, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import asyncio
import tempfile
import shutil

# Import our ML models
from app.models.text_model import TextDeepfakeDetector
from app.models.image_model import ImageDeepfakeDetector
from app.models.audio_model import AudioDeepfakeDetector
from app.models.video_model import VideoDeepfakeDetector

app = FastAPI(
    title="TrueSight-AI Deepfake Detection API",
    description="Advanced deepfake detection across multiple modalities",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model instances (lazy loading)
text_detector = None
image_detector = None
audio_detector = None
video_detector = None

def get_text_detector():
    global text_detector
    if text_detector is None:
        text_detector = TextDeepfakeDetector()
    return text_detector

def get_image_detector():
    global image_detector
    if image_detector is None:
        image_detector = ImageDeepfakeDetector()
    return image_detector

def get_audio_detector():
    global audio_detector
    if audio_detector is None:
        audio_detector = AudioDeepfakeDetector()
    return audio_detector

def get_video_detector():
    global video_detector
    if video_detector is None:
        video_detector = VideoDeepfakeDetector()
    return video_detector

@app.get("/")
def root():
    return {"message": "TrueSight-AI Deepfake Detection API is running!"}

@app.get("/health")
def health():
    return {"status": "healthy", "service": "truesight-ai"}

@app.post("/analyze")
async def analyze(
    modality: str = Form(...),
    text: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    debug: Optional[bool] = Form(False)
):
    try:
        if modality == "text":
            if not text:
                raise HTTPException(status_code=400, detail="Text content is required for text analysis")
            detector = get_text_detector()
            result = await detector.analyze(text)
        elif modality == "image":
            if not file:
                raise HTTPException(status_code=400, detail="Image file is required for image analysis")
            with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp_file:
                shutil.copyfileobj(file.file, tmp_file)
                tmp_path = tmp_file.name
            try:
                detector = get_image_detector()
                result = await detector.analyze(tmp_path)
            finally:
                os.unlink(tmp_path)
        elif modality == "audio":
            if not file:
                raise HTTPException(status_code=400, detail="Audio file is required for audio analysis")
            with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp_file:
                shutil.copyfileobj(file.file, tmp_file)
                tmp_path = tmp_file.name
            try:
                detector = get_audio_detector()
                result = await detector.analyze(tmp_path)
            finally:
                os.unlink(tmp_path)
        elif modality == "video":
            if not file:
                raise HTTPException(status_code=400, detail="Video file is required for video analysis")
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp_file:
                shutil.copyfileobj(file.file, tmp_file)
                tmp_path = tmp_file.name
            try:
                detector = get_video_detector()
                result = await detector.analyze(tmp_path)
            finally:
                os.unlink(tmp_path)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported modality: {modality}")
        # Always set classification based on is_deepfake if not present
        classification = result.get("classification")
        if classification is None:
            is_deepfake = result.get("is_deepfake", False)
            classification = "fake" if is_deepfake else "real"
        # Debug log
        import logging
        logging.info(f"[DEBUG] /analyze result: {result}, classification: {classification}")
        response = {
            "modality": modality,
            "classification": classification,
            "confidence": result.get("confidence", 0.0),
            "is_deepfake": result.get("is_deepfake", False),
            "details": result.get("details", {}),
            "error": result.get("error", None),
            "model_used": result.get("model_used", "unknown")
        }
        if debug and "intermediates" in result:
            response["debug"] = result["intermediates"]
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting TrueSight-AI Deepfake Detection API...")
    print("📍 http://localhost:8000")
    print("📚 http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000) 