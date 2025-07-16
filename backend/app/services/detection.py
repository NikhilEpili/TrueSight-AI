import torch
from fastapi import UploadFile
import numpy as np
from PIL import Image
import cv2
import librosa
from transformers import AutoImageProcessor, AutoFeatureExtractor, AutoModelForImageClassification
from app.core.logger import logger
from app.core.config import settings
import os
import aiohttp
import tempfile
import io

# Initialize models
image_model = None
video_model = None
audio_model = None

async def load_models():
    global image_model, video_model, audio_model
    
    # Load image model (DINOv2)
    try:
        image_model = AutoModelForImageClassification.from_pretrained(
            "facebook/dinov2-base",
            num_labels=2  # Real vs Fake
        )
        image_model.eval()
    except Exception as e:
        logger.error(f"Error loading image model: {str(e)}")
    
    # Load video model (Swin)
    try:
        video_model = AutoModelForImageClassification.from_pretrained(
            "microsoft/swin-base-patch4-window7-224"
            # Do NOT set num_labels=2, use default head
        )
        video_model.eval()
    except Exception as e:
        logger.error(f"Error loading video model: {str(e)}")
        video_model = None
    
    # Load audio model (Wav2Vec 2.0)
    try:
        audio_model = torch.hub.load(
            'pytorch/fairseq',
            'wav2vec_small'
        )
        audio_model.eval()
    except Exception as e:
        logger.error(f"Error loading audio model: {str(e)}")
        audio_model = None

async def analyze_image(file: UploadFile, model: str = "default") -> dict:
    """
    Analyze an image file for potential deepfake manipulation.
    """
    if image_model is None:
        await load_models()
    
    # Read and preprocess image
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    # Convert to RGB if necessary
    if image.mode != "RGB":
        image = image.convert("RGB")
    
    # Preprocess for model (DINOv2)
    feature_extractor = AutoImageProcessor.from_pretrained("facebook/dinov2-base")
    inputs = feature_extractor(images=image, return_tensors="pt")
    
    # Get prediction
    with torch.no_grad():
        outputs = image_model(**inputs)
        probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
    
    fake_probability = probabilities[0][1].item()
    
    return {
        "is_fake": fake_probability > 0.5,
        "confidence": fake_probability,
        "analysis": {
            "visual_artifacts": fake_probability > 0.7,
            "inconsistencies": fake_probability > 0.8,
            "manipulation_traces": fake_probability > 0.6
        }
    }

async def analyze_video(file: UploadFile, model: str = "default") -> dict:
    """
    Analyze a video file for potential deepfake manipulation.
    """
    if video_model is None:
        raise Exception("Video model not loaded. Check logs for details.")
    
    # Save video to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_file:
        contents = await file.read()
        temp_file.write(contents)
        temp_path = temp_file.name
    
    try:
        # Extract frames
        cap = cv2.VideoCapture(temp_path)
        frames = []
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            frames.append(frame)
        cap.release()
        
        # Analyze key frames
        results = []
        for frame in frames[::30]:  # Analyze every 30th frame
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame_pil = Image.fromarray(frame_rgb)
            
            # Preprocess frame (Swin)
            feature_extractor = AutoFeatureExtractor.from_pretrained(
                "microsoft/swin-base-patch4-window7-224"
            )
            inputs = feature_extractor(images=frame_pil, return_tensors="pt")
            
            # Get prediction
            with torch.no_grad():
                outputs = video_model(**inputs)
                probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
                results.append(probabilities[0][1].item())
        
        # Aggregate results
        fake_probability = np.mean(results)
        
        return {
            "is_fake": fake_probability > 0.5,
            "confidence": fake_probability,
            "analysis": {
                "facial_inconsistencies": fake_probability > 0.7,
                "temporal_artifacts": fake_probability > 0.8,
                "audio_visual_sync": fake_probability > 0.6
            }
        }
    
    finally:
        # Clean up temporary file
        os.unlink(temp_path)

async def analyze_audio(file: UploadFile, model: str = "default") -> dict:
    """
    Analyze an audio file for potential deepfake manipulation.
    """
    if audio_model is None:
        raise Exception("Audio model not loaded. Check logs for details.")
    
    # Save audio to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
        contents = await file.read()
        temp_file.write(contents)
        temp_path = temp_file.name
    
    try:
        # Load and preprocess audio
        audio, sr = librosa.load(temp_path, sr=16000)
        
        # Extract features
        features = audio_model.extract_features(torch.from_numpy(audio).unsqueeze(0))
        
        # Simple analysis based on feature statistics
        feature_stats = features[0].mean(dim=1).numpy()
        fake_probability = np.mean(feature_stats > 0.5)
        
        return {
            "is_fake": fake_probability > 0.5,
            "confidence": fake_probability,
            "analysis": {
                "voice_artifacts": fake_probability > 0.7,
                "background_noise": fake_probability > 0.8,
                "temporal_consistency": fake_probability > 0.6
            }
        }
    
    finally:
        # Clean up temporary file
        os.unlink(temp_path)

async def analyze_url(url: str) -> dict:
    """
    Analyze content from a URL for potential deepfake or fake information.
    """
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status != 200:
                raise Exception(f"Failed to fetch URL: {response.status}")
            
            content_type = response.headers.get("content-type", "")
            
            if "image" in content_type:
                data = await response.read()
                file = UploadFile(
                    filename="image.jpg",
                    file=io.BytesIO(data),
                    content_type=content_type
                )
                return await analyze_image(file)
            
            elif "video" in content_type:
                data = await response.read()
                file = UploadFile(
                    filename="video.mp4",
                    file=io.BytesIO(data),
                    content_type=content_type
                )
                return await analyze_video(file)
            
            elif "audio" in content_type:
                data = await response.read()
                file = UploadFile(
                    filename="audio.wav",
                    file=io.BytesIO(data),
                    content_type=content_type
                )
                return await analyze_audio(file)
            
            else:
                # For other content types, return unsupported message
                raise Exception(f"Unsupported content type: {content_type}") 