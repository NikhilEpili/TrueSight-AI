# TrueSight-AI: Multiplatform Deepfake Detection Ecosystem

TrueSight-AI is a comprehensive solution for detecting deepfakes and misinformation across multiple platforms in real-time. Our system provides detection capabilities through web applications, browser extensions, and platform integrations.

## 🌟 Features

- **Web Application**
  - Upload and analyze images, videos, and audio files
  - URL verification for news articles
  - Real-time detection with confidence scores
  - Detailed analysis visualization

- **Browser Extension**
  - One-click news article verification
  - Real-time text analysis
  - Seamless integration with popular browsers

- **Platform Integrations**
  - Discord bot for media verification
  - Future support for Zoom, Google Meet, and MS Teams

## 🛠️ Tech Stack

- **Frontend**: React (Next.js)
- **Backend**: FastAPI
- **AI Models**:
  - Image/Video: DINOv2 + Swin Transformer
  - Audio: Wav2Vec 2.0
  - Text: RoBERTa
- **Extensions**: Chrome Extension API, Discord.py

## 📁 Project Structure

```
TrueSight-AI/
├── frontend/           # Next.js web application
├── backend/           # FastAPI server
├── extension/         # Chrome extension
├── discordbot/       # Discord bot integration
└── notebooks/        # Model training and testing notebooks
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- Chrome browser (for extension)
- Discord account (for bot)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/TrueSight-AI.git
cd TrueSight-AI
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

3. Set up the frontend:
```bash
cd frontend
npm install
npm run dev
```

4. Install the Chrome extension:
- Open Chrome
- Go to chrome://extensions/
- Enable Developer Mode
- Click "Load unpacked"
- Select the `extension` directory

5. Set up the Discord bot:
```bash
cd discordbot
pip install -r requirements.txt
python bot.py
```

## 🔑 Environment Variables

Create `.env` files in respective directories with the following variables:

```env
# Backend
MODEL_PATH=path/to/models
API_KEY=your_api_key

# Discord Bot
DISCORD_TOKEN=your_discord_token

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any queries or support, please open an issue in the repository.
