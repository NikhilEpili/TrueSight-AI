# TrueSight-AI: Advanced Deepfake Detection Platform

TrueSight-AI is a comprehensive deepfake detection platform that uses state-of-the-art machine learning models to detect deepfakes across multiple modalities: **images**, **videos**, **audio**, and **text**.

## 🚀 Features

- **Multi-Modal Detection**: Detect deepfakes in images, videos, audio, and text
- **Fine-Tuned Models**: Uses custom-trained ViT (Vision Transformer) models for superior accuracy
- **Real-Time API**: FastAPI-based REST API for easy integration
- **Web Interface**: Modern React/Next.js frontend
- **Browser Extension**: Chrome extension for real-time detection
- **Discord Bot**: Bot integration for Discord servers

## 📁 Project Structure

```
TrueSight-AI/
├── backend/                 # FastAPI backend server
│   ├── app/
│   │   ├── models/         # ML model implementations
│   │   ├── api/           # API routes
│   │   └── services/      # Business logic
│   ├── models/            # Training scripts
│   └── main_with_ml.py    # Main server file
├── frontend/              # React/Next.js frontend
├── extension/             # Chrome browser extension
├── discordbot/           # Discord bot
├── Dataset/              # Training datasets
├── SDFVD/               # Video dataset
├── finetuned_dinov2.pth  # Fine-tuned image model
├── finetuned_dinov2_video.pth  # Fine-tuned video model
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Python 3.9+ (recommended for compatibility)
- CUDA-capable GPU (optional, for faster inference)
- Node.js 16+ (for frontend)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TrueSight-AI
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Install additional dependencies**
   ```bash
   pip install torch torchvision timm opencv-python pillow fastapi uvicorn python-multipart
   ```

### Environment Variables Setup

**Important**: Copy the following environment variables format, add your own credentials, and save it as a `.env` file in the root directory before running the project.

```bash
# TrueSight-AI Environment Variables
# Copy this file to .env and update with your own credentials

# API Configuration
SECRET_KEY=your-secret-key-here-change-this-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# CORS Settings
BACKEND_CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Model Configuration
MODEL_PATH=models
ENABLE_MODEL_CACHING=true
MODEL_CACHE_SIZE=2

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60

# Logging
LOG_LEVEL=INFO

# File Upload Limits (in bytes)
MAX_IMAGE_SIZE=20971520
MAX_VIDEO_SIZE=209715200
MAX_AUDIO_SIZE=104857600

# Database Configuration (if needed in future)
# DB_USER=your_username
# DB_PASSWORD=your_password
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=your_database_name

# External API Keys (if needed in future)
# GEMINI_API_KEY=your_gemini_api_key_here
# OPENAI_API_KEY=your_openai_api_key_here

# Discord Bot Configuration (if using Discord bot)
# DISCORD_TOKEN=your_discord_bot_token_here

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Steps to set up environment variables:**
1. Copy the above format
2. Create a new file named `.env` in the root directory
3. Paste the format and update the values with your own credentials
4. Save the file

### Model Training (Optional)

If you want to train your own models:

1. **Prepare your dataset** in the following structure:
   ```
   Dataset/
   ├── train/
   │   ├── real/     # Real images/videos
   │   └── fake/     # Fake images/videos
   └── test/
       ├── real/
       └── fake/
   ```

2. **Train image model**
   ```bash
   cd backend/models
   python finetune_dinov2_image.py
   ```

3. **Train video model**
   ```bash
   cd backend/models
   python finetune_dinov2_video.py
   ```

## 🚀 Running the Backend API

### Start the Server

```bash
cd backend
python main_with_ml.py
```

The API will be available at:
- **API Server**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

### API Endpoints

#### 1. Health Check
```bash
GET /health
```
Returns server status.

#### 2. Analyze Content
```bash
POST /analyze
```

**Parameters:**
- `modality` (required): "image", "video", "audio", or "text"
- `file` (required for image/video/audio): Upload file
- `text` (required for text): Text content to analyze
- `debug` (optional): Enable debug mode for detailed output

**Example Usage:**

**Image Analysis:**
```bash
curl -X POST "http://localhost:8000/analyze" \
  -H "Content-Type: multipart/form-data" \
  -F "modality=image" \
  -F "file=@path/to/image.jpg"
```

**Video Analysis:**
```bash
curl -X POST "http://localhost:8000/analyze" \
  -H "Content-Type: multipart/form-data" \
  -F "modality=video" \
  -F "file=@path/to/video.mp4"
```

**Text Analysis:**
```bash
curl -X POST "http://localhost:8000/analyze" \
  -H "Content-Type: multipart/form-data" \
  -F "modality=text" \
  -F "text=Your text content here"
```

**Response Format:**
```json
{
  "modality": "image",
  "classification": "fake",
  "confidence": 0.85,
  "is_deepfake": true,
  "details": {
    "frames_analyzed": 1,
    "avg_confidence": 0.85
  },
  "probabilities": {
    "fake": 0.85,
    "real": 0.15
  },
  "model_used": "Fine-tuned ViT",
  "error": null
}
```

## 🎯 Model Information

### Image Detection
- **Model**: Fine-tuned ViT (Vision Transformer)
- **Architecture**: ViT-Base-Patch16-224
- **Training**: Custom dataset with real/fake images
- **Accuracy**: ~79% on test set

### Video Detection
- **Model**: Fine-tuned ViT with frame aggregation
- **Architecture**: ViT-Base-Patch16-224 + temporal aggregation
- **Frames**: 8 frames per video
- **Training**: SDFVD (Synthetic DeepFake Video Dataset)

### Audio Detection
- **Model**: Pre-trained audio models
- **Features**: Mel-spectrogram analysis

### Text Detection
- **Model**: Transformer-based text analysis
- **Features**: Linguistic pattern detection

## 🔧 Configuration

### Environment Variables
- `CUDA_VISIBLE_DEVICES`: Specify GPU device (e.g., "0")
- `MODEL_PATH`: Custom model path (optional)

### Model Paths
The system automatically looks for fine-tuned models in:
- `finetuned_dinov2.pth` (image model)
- `finetuned_dinov2_video.pth` (video model)

If not found, it falls back to pre-trained models.

## 🧪 Testing the API

### Using curl
```bash
# Test image analysis
curl -X POST "http://localhost:8000/analyze" \
  -H "Content-Type: multipart/form-data" \
  -F "modality=image" \
  -F "file=@test_image.jpg"

# Test video analysis
curl -X POST "http://localhost:8000/analyze" \
  -H "Content-Type: multipart/form-data" \
  -F "modality=video" \
  -F "file=@test_video.mp4"
```

### Using Python
```python
import requests

# Test image analysis
with open('test_image.jpg', 'rb') as f:
    files = {'file': f}
    data = {'modality': 'image'}
    response = requests.post('http://localhost:8000/analyze', files=files, data=data)
    print(response.json())
```

## 🐛 Troubleshooting

### Common Issues

1. **Port 8000 already in use**
   ```bash
   # Kill existing process
   netstat -ano | findstr :8000
   taskkill /PID <PID> /F
   ```

2. **Model not found**
   - Ensure fine-tuned models are in the root directory
   - Check file permissions

3. **CUDA out of memory**
   - Reduce batch size in model loading
   - Use CPU-only mode

4. **Import errors**
   - Ensure you're in the correct directory
   - Check Python path and virtual environment

5. **Environment variables not loaded**
   - Ensure `.env` file is in the root directory
   - Check that all required variables are set

### Debug Mode
Enable debug mode for detailed output:
```bash
curl -X POST "http://localhost:8000/analyze" \
  -F "modality=image" \
  -F "file=@image.jpg" \
  -F "debug=true"
```

## 📊 Performance

- **Image Analysis**: ~100ms per image
- **Video Analysis**: ~2-5 seconds per video (depending on length)
- **Audio Analysis**: ~500ms per audio clip
- **Text Analysis**: ~50ms per text

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Vision Transformer (ViT) by Google Research
- DINOv2 by Meta AI
- SDFVD dataset contributors
- FastAPI community

---

**TrueSight-AI** - Advanced Deepfake Detection for a Safer Digital World 🌍
