import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
import timm
import cv2
import numpy as np
from tqdm import tqdm
from PIL import Image

# Paths
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../SDFVD'))
TRAIN_REAL_DIR = os.path.join(DATA_DIR, 'real', 'train')
TRAIN_FAKE_DIR = os.path.join(DATA_DIR, 'fake', 'train')
TEST_REAL_DIR = os.path.join(DATA_DIR, 'real', 'test')
TEST_FAKE_DIR = os.path.join(DATA_DIR, 'fake', 'test')
MODEL_SAVE_PATH = 'finetuned_dinov2_video.pth'

# Hyperparameters
BATCH_SIZE = 4  # Fewer videos per batch due to memory
NUM_EPOCHS = 10
LR = 1e-4
IMG_SIZE = 224
NUM_CLASSES = 2
FRAMES_PER_VIDEO = 8

# Device
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Transforms
transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

class VideoDataset(Dataset):
    def __init__(self, real_dir, fake_dir, frames_per_video=8, transform=None):
        self.samples = []
        self.labels = []
        self.transform = transform
        self.frames_per_video = frames_per_video
        # Real videos (label 0)
        if os.path.isdir(real_dir):
            for fname in os.listdir(real_dir):
                if fname.lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
                    self.samples.append(os.path.join(real_dir, fname))
                    self.labels.append(0)
        # Fake videos (label 1)
        if os.path.isdir(fake_dir):
            for fname in os.listdir(fake_dir):
                if fname.lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
                    self.samples.append(os.path.join(fake_dir, fname))
                    self.labels.append(1)
    def __len__(self):
        return len(self.samples)
    def __getitem__(self, idx):
        video_path = self.samples[idx]
        label = self.labels[idx]
        frames = self._sample_frames(video_path)
        processed = [self.transform(Image.fromarray(frame)) for frame in frames]
        video_tensor = torch.stack(processed)  # [N, 3, H, W]
        return video_tensor, label
    def _sample_frames(self, video_path):
        cap = cv2.VideoCapture(video_path)
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        idxs = np.linspace(0, frame_count-1, self.frames_per_video, dtype=int)
        frames = []
        for idx in idxs:
            cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
            ret, frame = cap.read()
            if not ret:
                continue
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame = cv2.resize(frame, (IMG_SIZE, IMG_SIZE))
            frames.append(frame)
        cap.release()
        # If not enough frames, repeat last
        while len(frames) < self.frames_per_video:
            frames.append(frames[-1])
        return frames

# Datasets and loaders
train_dataset = VideoDataset(TRAIN_REAL_DIR, TRAIN_FAKE_DIR, frames_per_video=FRAMES_PER_VIDEO, transform=transform)
test_dataset = VideoDataset(TEST_REAL_DIR, TEST_FAKE_DIR, frames_per_video=FRAMES_PER_VIDEO, transform=transform)
print(f"Train videos found: {len(train_dataset)}")
print(f"Test videos found: {len(test_dataset)}")
train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=0)
test_loader = DataLoader(test_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=0)

# Model: ViT backbone + classification head
backbone = timm.create_model('vit_base_patch16_224', pretrained=True, num_classes=0)  # No head
in_features = backbone.num_features

class VideoClassifier(nn.Module):
    def __init__(self, backbone, in_features, num_classes, frames_per_video):
        super().__init__()
        self.backbone = backbone
        self.head = nn.Linear(in_features, num_classes)
        self.frames_per_video = frames_per_video
    def forward(self, x):  # x: [B, N, 3, H, W]
        B, N, C, H, W = x.shape
        x = x.view(B*N, C, H, W)
        feats = self.backbone(x)  # [B*N, F]
        feats = feats.view(B, N, -1)  # [B, N, F]
        feats = feats.mean(dim=1)  # [B, F]
        out = self.head(feats)  # [B, num_classes]
        return out

model = VideoClassifier(backbone, in_features, NUM_CLASSES, FRAMES_PER_VIDEO).to(DEVICE)

# Loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=LR)

# Training and evaluation loops
def train_one_epoch(model, loader, optimizer, criterion):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0
    for videos, labels in tqdm(loader, desc='Train', leave=False):
        videos, labels = videos.to(DEVICE), labels.to(DEVICE)
        optimizer.zero_grad()
        outputs = model(videos)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        running_loss += loss.item() * videos.size(0)
        _, preds = torch.max(outputs, 1)
        correct += (preds == labels).sum().item()
        total += labels.size(0)
    return running_loss / total, correct / total

def evaluate(model, loader, criterion):
    model.eval()
    running_loss = 0.0
    correct = 0
    total = 0
    with torch.no_grad():
        for videos, labels in tqdm(loader, desc='Eval', leave=False):
            videos, labels = videos.to(DEVICE), labels.to(DEVICE)
            outputs = model(videos)
            loss = criterion(outputs, labels)
            running_loss += loss.item() * videos.size(0)
            _, preds = torch.max(outputs, 1)
            correct += (preds == labels).sum().item()
            total += labels.size(0)
    return running_loss / total, correct / total

# Main training loop
best_acc = 0.0
for epoch in range(NUM_EPOCHS):
    print(f'Epoch {epoch+1}/{NUM_EPOCHS}')
    train_loss, train_acc = train_one_epoch(model, train_loader, optimizer, criterion)
    test_loss, test_acc = evaluate(model, test_loader, criterion)
    print(f'Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.4f}')
    print(f'Test Loss: {test_loss:.4f} | Test Acc: {test_acc:.4f}')
    if test_acc > best_acc:
        best_acc = test_acc
        torch.save(model.state_dict(), MODEL_SAVE_PATH)
        print(f'Best model saved with acc: {best_acc:.4f}')

print('Training complete.')
print(f'Best test accuracy: {best_acc:.4f}') 