import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import numpy as np
from tqdm import tqdm
import librosa
import soundfile as sf
from transformers import Wav2Vec2ForSequenceClassification, Wav2Vec2FeatureExtractor

# Paths - Update these to your audio dataset paths
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../audio_dataset'))
TRAIN_REAL_DIR = os.path.join(DATA_DIR, 'real', 'train')
TRAIN_FAKE_DIR = os.path.join(DATA_DIR, 'fake', 'train')
TEST_REAL_DIR = os.path.join(DATA_DIR, 'real', 'test')
TEST_FAKE_DIR = os.path.join(DATA_DIR, 'fake', 'test')
MODEL_SAVE_PATH = 'finetuned_wav2vec_audio.pth'

# Hyperparameters
BATCH_SIZE = 8
NUM_EPOCHS = 15
LR = 2e-5  # Lower learning rate for transformer fine-tuning
NUM_CLASSES = 2
SAMPLE_RATE = 16000  # Wav2Vec 2.0 expects 16kHz
MAX_AUDIO_LENGTH = 16000  # 1 second at 16kHz

# Device
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

class AudioDataset(Dataset):
    def __init__(self, real_dir, fake_dir, feature_extractor, max_length=16000):
        self.samples = []
        self.labels = []
        self.feature_extractor = feature_extractor
        self.max_length = max_length
        
        # Real audio files (label 0)
        if os.path.isdir(real_dir):
            for fname in os.listdir(real_dir):
                if fname.lower().endswith(('.wav', '.mp3', '.flac', '.m4a')):
                    self.samples.append(os.path.join(real_dir, fname))
                    self.labels.append(0)
        
        # Fake audio files (label 1)
        if os.path.isdir(fake_dir):
            for fname in os.listdir(fake_dir):
                if fname.lower().endswith(('.wav', '.mp3', '.flac', '.m4a')):
                    self.samples.append(os.path.join(fake_dir, fname))
                    self.labels.append(1)
    
    def __len__(self):
        return len(self.samples)
    
    def __getitem__(self, idx):
        audio_path = self.samples[idx]
        label = self.labels[idx]
        
        # Load and preprocess audio
        audio = self._load_audio(audio_path)
        
        # Prepare input for Wav2Vec 2.0
        inputs = self.feature_extractor(
            audio,
            sampling_rate=SAMPLE_RATE,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=self.max_length
        )
        
        return inputs, label
    
    def _load_audio(self, audio_path):
        """Load and preprocess audio file."""
        try:
            # Load audio
            audio, sr = sf.read(audio_path)
            
            # Convert to mono if stereo
            if len(audio.shape) > 1:
                audio = np.mean(audio, axis=1)
            
            # Resample to 16kHz if necessary
            if sr != SAMPLE_RATE:
                audio = librosa.resample(audio, orig_sr=sr, target_sr=SAMPLE_RATE)
            
            # Normalize audio
            audio = librosa.util.normalize(audio)
            
            # Truncate or pad to max_length
            if len(audio) > self.max_length:
                audio = audio[:self.max_length]
            else:
                # Pad with zeros
                padding = self.max_length - len(audio)
                audio = np.pad(audio, (0, padding), 'constant')
            
            return audio
            
        except Exception as e:
            print(f"Error loading audio {audio_path}: {e}")
            # Return silence if loading fails
            return np.zeros(self.max_length)

# Initialize Wav2Vec 2.0 model and feature extractor
print("Loading Wav2Vec 2.0 model...")
model_name = "facebook/wav2vec2-base"
feature_extractor = Wav2Vec2FeatureExtractor.from_pretrained(model_name)
model = Wav2Vec2ForSequenceClassification.from_pretrained(
    model_name,
    num_labels=NUM_CLASSES
)

# Datasets and loaders
train_dataset = AudioDataset(TRAIN_REAL_DIR, TRAIN_FAKE_DIR, feature_extractor, MAX_AUDIO_LENGTH)
test_dataset = AudioDataset(TEST_REAL_DIR, TEST_FAKE_DIR, feature_extractor, MAX_AUDIO_LENGTH)

print(f"Train audio files found: {len(train_dataset)}")
print(f"Test audio files found: {len(test_dataset)}")

train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=0)
test_loader = DataLoader(test_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=0)

# Move model to device
model = model.to(DEVICE)

# Loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=LR, weight_decay=0.01)

# Learning rate scheduler
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=NUM_EPOCHS)

# Training and evaluation loops
def train_one_epoch(model, loader, optimizer, criterion):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0
    
    for inputs, labels in tqdm(loader, desc='Train', leave=False):
        # Move inputs to device
        input_values = inputs['input_values'].to(DEVICE)
        attention_mask = inputs.get('attention_mask', None)
        if attention_mask is not None:
            attention_mask = attention_mask.to(DEVICE)
        
        labels = labels.to(DEVICE)
        
        optimizer.zero_grad()
        
        # Forward pass
        outputs = model(input_values=input_values, attention_mask=attention_mask)
        loss = criterion(outputs.logits, labels)
        
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item() * labels.size(0)
        _, preds = torch.max(outputs.logits, 1)
        correct += (preds == labels).sum().item()
        total += labels.size(0)
    
    return running_loss / total, correct / total

def evaluate(model, loader, criterion):
    model.eval()
    running_loss = 0.0
    correct = 0
    total = 0
    
    with torch.no_grad():
        for inputs, labels in tqdm(loader, desc='Eval', leave=False):
            # Move inputs to device
            input_values = inputs['input_values'].to(DEVICE)
            attention_mask = inputs.get('attention_mask', None)
            if attention_mask is not None:
                attention_mask = attention_mask.to(DEVICE)
            
            labels = labels.to(DEVICE)
            
            # Forward pass
            outputs = model(input_values=input_values, attention_mask=attention_mask)
            loss = criterion(outputs.logits, labels)
            
            running_loss += loss.item() * labels.size(0)
            _, preds = torch.max(outputs.logits, 1)
            correct += (preds == labels).sum().item()
            total += labels.size(0)
    
    return running_loss / total, correct / total

# Main training loop
best_acc = 0.0
print("Starting training...")

for epoch in range(NUM_EPOCHS):
    print(f'Epoch {epoch+1}/{NUM_EPOCHS}')
    
    train_loss, train_acc = train_one_epoch(model, train_loader, optimizer, criterion)
    test_loss, test_acc = evaluate(model, test_loader, criterion)
    
    # Update learning rate
    scheduler.step()
    
    print(f'Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.4f}')
    print(f'Test Loss: {test_loss:.4f} | Test Acc: {test_acc:.4f}')
    print(f'Learning Rate: {scheduler.get_last_lr()[0]:.2e}')
    
    if test_acc > best_acc:
        best_acc = test_acc
        torch.save(model.state_dict(), MODEL_SAVE_PATH)
        print(f'Best model saved with acc: {best_acc:.4f}')

print('Training complete.')
print(f'Best test accuracy: {best_acc:.4f}') 