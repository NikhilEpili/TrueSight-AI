from pydantic_settings import BaseSettings
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "TrueSight-AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS - FIXED: Use environment variable instead of "*"
    BACKEND_CORS_ORIGINS: List[str] = os.getenv(
        "BACKEND_CORS_ORIGINS", 
        "http://localhost:3000,http://127.0.0.1:3000"
    ).split(",")
    
    # Model paths
    MODEL_PATH: str = os.getenv("MODEL_PATH", "models")
    
    # Supported file types - FIXED: More comprehensive list
    SUPPORTED_IMAGE_TYPES: List[str] = [
        "image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp"
    ]
    SUPPORTED_VIDEO_TYPES: List[str] = [
        "video/mp4", "video/mpeg", "video/quicktime", "video/avi", "video/mov"
    ]
    SUPPORTED_AUDIO_TYPES: List[str] = [
        "audio/mpeg", "audio/wav", "audio/x-wav", "audio/mp3", "audio/ogg"
    ]
    
    # File size limits (in bytes) - FIXED: More reasonable limits
    MAX_IMAGE_SIZE: int = 20 * 1024 * 1024  # 20MB
    MAX_VIDEO_SIZE: int = 200 * 1024 * 1024  # 200MB
    MAX_AUDIO_SIZE: int = 100 * 1024 * 1024  # 100MB
    
    # Model loading settings
    ENABLE_MODEL_CACHING: bool = os.getenv("ENABLE_MODEL_CACHING", "true").lower() == "true"
    MODEL_CACHE_SIZE: int = int(os.getenv("MODEL_CACHE_SIZE", "2"))
    
    # Rate limiting
    RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))
    
    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    
    class Config:
        case_sensitive = True

settings = Settings()
