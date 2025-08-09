#!/usr/bin/env python3
"""
Simple test server for deepfake detection API
"""

import sys
import os
import logging
import tempfile
import shutil
from pathlib import Path

from fastapi import FastAPI, Form, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import asyncio

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="TrueSight-AI Test API",
    description="Simple deepfake detection test server",
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

@app.get("/")
def root():
    return {"message": "TrueSight-AI Test API is running!"}

@app.get("/health")
def health():
    return {"status": "healthy", "service": "truesight-ai-test"}

@app.post("/api/v1/analyze")
async def analyze(
    modality: str = Form(...),
    text: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    debug: Optional[bool] = Form(False)
):
    """
    Test analysis endpoint with mock results
    """
    try:
        logger.info(f"Received analysis request for modality: {modality}")
        
        if modality == "text":
            if not text:
                raise HTTPException(status_code=400, detail="Text content is required for text analysis")
            logger.info(f"Analyzing text: {text[:50]}...")
            
            # Mock text analysis
            fake_probability = 0.3 if len(text) > 100 else 0.7
            result = {
                "modality": "text",
                "classification": "fake" if fake_probability > 0.5 else "real",
                "confidence": fake_probability,
                "is_deepfake": fake_probability > 0.5,
                "details": {
                    "text_length": len(text),
                    "analysis_method": "mock"
                },
                "model_used": "Mock RoBERTa",
                "error": None
            }
            
        elif modality in ["image", "video", "audio"]:
            if not file:
                raise HTTPException(status_code=400, detail=f"File is required for {modality} analysis")
            
            logger.info(f"Analyzing {modality} file: {file.filename}")
            
            # Read file to validate it's not empty
            content = await file.read()
            if len(content) == 0:
                raise HTTPException(status_code=400, detail="Empty file uploaded")
            
            # Mock analysis based on file size
            fake_probability = 0.8 if len(content) > 1000000 else 0.2  # Larger files = more likely fake
            result = {
                "modality": modality,
                "classification": "fake" if fake_probability > 0.5 else "real",
                "confidence": fake_probability,
                "is_deepfake": fake_probability > 0.5,
                "details": {
                    "file_size": len(content),
                    "filename": file.filename,
                    "content_type": file.content_type,
                    "analysis_method": "mock"
                },
                "model_used": f"Mock {modality.capitalize()} Model",
                "error": None
            }
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported modality: {modality}")
        
        logger.info(f"Analysis result: {result['classification']} with confidence {result['confidence']:.2f}")
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Analysis failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting TrueSight-AI Test API...")
    print("📍 http://localhost:8000")
    print("📚 http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")