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
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["*"]
    
    # Model paths
    MODEL_PATH: str = os.getenv("MODEL_PATH", "models")
    
    # Supported file types
    SUPPORTED_IMAGE_TYPES: List[str] = ["image/jpeg", "image/png", "image/gif"]
    SUPPORTED_VIDEO_TYPES: List[str] = ["video/mp4", "video/mpeg", "video/quicktime"]
    SUPPORTED_AUDIO_TYPES: List[str] = ["audio/mpeg", "audio/wav", "audio/x-wav"]
    
    # File size limits (in bytes)
    MAX_IMAGE_SIZE: int = 10 * 1024 * 1024  # 10MB
    MAX_VIDEO_SIZE: int = 100 * 1024 * 1024  # 100MB
    MAX_AUDIO_SIZE: int = 50 * 1024 * 1024  # 50MB
    
    class Config:
        case_sensitive = True

settings = Settings() 