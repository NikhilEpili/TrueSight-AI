import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import numpy as np
from tqdm import tqdm
import json
from transformers import RobertaTokenizer, RobertaForSequenceClassification
import random

# Paths - Update these to your text dataset paths
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../text_dataset'))
TRAIN_REAL_FILE = os.path.join(DATA_DIR, 'train_real.jsonl')
TRAIN_FAKE_FILE = os.path.join(DATA_DIR, 'train_fake.jsonl')
TEST_REAL_FILE = os.path.join(DATA_DIR, 'test_real.jsonl')
TEST_FAKE_FILE = os.path.join(DATA_DIR, 'test_fake.jsonl')
MODEL_SAVE_PATH = 'finetuned_roberta_text.pth'

# Hyperparameters
BATCH_SIZE = 16
NUM_EPOCHS = 8
LR = 2e-5  # Lower learning rate for transformer fine-tuning
NUM_CLASSES = 2
MAX_LENGTH = 512  # Maximum sequence length for RoBERTa
WARMUP_STEPS = 100

# Device
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

class TextDataset(Dataset):
    def __init__(self, real_file, fake_file, tokenizer, max_length=512):
        self.samples = []
        self.labels = []
        self.tokenizer = tokenizer
        self.max_length = max_length
        
        # Load real texts (label 0)
        if os.path.exists(real_file):
            with open(real_file, 'r', encoding='utf-8') as f:
                for line in f:
                    data = json.loads(line.strip())
                    text = data.get('text', '')
                    if text.strip():  # Only add non-empty texts
                        self.samples.append(text)
                        self.labels.append(0)
        
        # Load fake/AI-generated texts (label 1)
        if os.path.exists(fake_file):
            with open(fake_file, 'r', encoding='utf-8') as f:
                for line in f:
                    data = json.loads(line.strip())
                    text = data.get('text', '')
                    if text.strip():  # Only add non-empty texts
                        self.samples.append(text)
                        self.labels.append(1)
    
    def __len__(self):
        return len(self.samples)
    
    def __getitem__(self, idx):
        text = self.samples[idx]
        label = self.labels[idx]
        
        # Tokenize text
        encoding = self.tokenizer(
            text,
            truncation=True,
            padding='max_length',
            max_length=self.max_length,
            return_tensors='pt'
        )
        
        return {
            'input_ids': encoding['input_ids'].squeeze(0),
            'attention_mask': encoding['attention_mask'].squeeze(0)
        }, label

def load_jsonl_data(file_path):
    """Load data from JSONL file."""
    data = []
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f:
                data.append(json.loads(line.strip()))
    return data

# Initialize RoBERTa model and tokenizer
print("Loading RoBERTa model...")
model_name = "roberta-base"
tokenizer = RobertaTokenizer.from_pretrained(model_name)
model = RobertaForSequenceClassification.from_pretrained(
    model_name,
    num_labels=NUM_CLASSES
)

# Add special tokens if needed
special_tokens = ['<human>', '<ai>', '<fake>', '<real>']
tokenizer.add_special_tokens({'additional_special_tokens': special_tokens})
model.resize_token_embeddings(len(tokenizer))

# Datasets and loaders
train_dataset = TextDataset(TRAIN_REAL_FILE, TRAIN_FAKE_FILE, tokenizer, MAX_LENGTH)
test_dataset = TextDataset(TEST_REAL_FILE, TEST_FAKE_FILE, tokenizer, MAX_LENGTH)

print(f"Train text samples found: {len(train_dataset)}")
print(f"Test text samples found: {len(test_dataset)}")

train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=0)
test_loader = DataLoader(test_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=0)

# Move model to device
model = model.to(DEVICE)

# Loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=LR, weight_decay=0.01)

# Learning rate scheduler with warmup
total_steps = len(train_loader) * NUM_EPOCHS
scheduler = optim.lr_scheduler.OneCycleLR(
    optimizer, 
    max_lr=LR, 
    total_steps=total_steps,
    pct_start=WARMUP_STEPS/total_steps
)

# Training and evaluation loops
def train_one_epoch(model, loader, optimizer, criterion, scheduler):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0
    
    for inputs, labels in tqdm(loader, desc='Train', leave=False):
        # Move inputs to device
        input_ids = inputs['input_ids'].to(DEVICE)
        attention_mask = inputs['attention_mask'].to(DEVICE)
        labels = labels.to(DEVICE)
        
        optimizer.zero_grad()
        
        # Forward pass
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        loss = criterion(outputs.logits, labels)
        
        loss.backward()
        optimizer.step()
        scheduler.step()
        
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
            input_ids = inputs['input_ids'].to(DEVICE)
            attention_mask = inputs['attention_mask'].to(DEVICE)
            labels = labels.to(DEVICE)
            
            # Forward pass
            outputs = model(input_ids=input_ids, attention_mask=attention_mask)
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
    
    train_loss, train_acc = train_one_epoch(model, train_loader, optimizer, criterion, scheduler)
    test_loss, test_acc = evaluate(model, test_loader, criterion)
    
    print(f'Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.4f}')
    print(f'Test Loss: {test_loss:.4f} | Test Acc: {test_acc:.4f}')
    print(f'Learning Rate: {scheduler.get_last_lr()[0]:.2e}')
    
    if test_acc > best_acc:
        best_acc = test_acc
        torch.save(model.state_dict(), MODEL_SAVE_PATH)
        print(f'Best model saved with acc: {best_acc:.4f}')

print('Training complete.')
print(f'Best test accuracy: {best_acc:.4f}')

# Save tokenizer for inference
tokenizer.save_pretrained('./roberta_text_tokenizer')
print("Tokenizer saved for inference.") 