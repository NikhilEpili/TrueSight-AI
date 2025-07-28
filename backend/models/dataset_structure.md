# Dataset Structure for Training Scripts

## 1. Video Dataset (SDFVD2.0)
```
SDFVD2.0/
├── real/
│   ├── train/
│   │   ├── real_v41_aug_0.mp4
│   │   ├── real_v41_aug_1.mp4
│   │   └── ...
│   └── test/
│       ├── real_v41_aug_0.mp4
│       └── ...
└── fake/
    ├── train/
    │   ├── fake_vs41_aug_0.mp4
    │   ├── fake_vs41_aug_1.mp4
    │   └── ...
    └── test/
        ├── fake_vs41_aug_0.mp4
        └── ...
```

## 2. Audio Dataset
```
audio_dataset/
├── real/
│   ├── train/
│   │   ├── real_audio_1.wav
│   │   ├── real_audio_2.wav
│   │   └── ...
│   └── test/
│       ├── real_audio_1.wav
│       └── ...
└── fake/
    ├── train/
    │   ├── fake_audio_1.wav
    │   ├── fake_audio_2.wav
    │   └── ...
    └── test/
        ├── fake_audio_1.wav
        └── ...
```

**Supported Audio Formats:** `.wav`, `.mp3`, `.flac`, `.m4a`

## 3. Text Dataset
```
text_dataset/
├── train_real.jsonl
├── train_fake.jsonl
├── test_real.jsonl
└── test_fake.jsonl
```

**JSONL Format Example:**
```json
{"text": "This is a real human-written text sample."}
{"text": "Another real text example with natural language patterns."}
```

## Training Commands

### Video Training
```bash
cd backend
python models/finetune_dinov2_video.py
```

### Audio Training
```bash
cd backend
python models/finetune_audio_wav2vec.py
```

### Text Training
```bash
cd backend
python models/finetune_text_roberta.py
```

## Model Outputs

After training, the following model files will be created:
- `finetuned_dinov2_video_sdfvd2.pth` - Video model
- `finetuned_wav2vec_audio.pth` - Audio model  
- `finetuned_roberta_text.pth` - Text model
- `roberta_text_tokenizer/` - Text tokenizer directory

## Key Features

### Video Training
- **16 frames per video** (increased from 8)
- **Smart frame sampling** with temporal and motion weighting
- **SDFVD2.0 dataset** with augmented videos
- **ViT backbone** with frame aggregation

### Audio Training
- **Wav2Vec 2.0 model** for voice deepfake detection
- **16kHz sample rate** processing
- **1-second audio segments**
- **Cosine annealing scheduler**

### Text Training
- **RoBERTa model** for AI-generated text detection
- **512 token sequence length**
- **Special tokens** for better detection
- **OneCycleLR scheduler** with warmup

