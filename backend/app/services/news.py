from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import aiohttp
from bs4 import BeautifulSoup
from typing import Optional, Dict, List
from app.core.logger import logger
import numpy as np

# Initialize models
text_model = None
tokenizer = None

async def load_models():
    global text_model, tokenizer
    
    try:
        model_name = "roberta-base"
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        text_model = AutoModelForSequenceClassification.from_pretrained(
            model_name,
            num_labels=2  # Real vs Fake
        )
        text_model.eval()
    except Exception as e:
        logger.error(f"Error loading text model: {str(e)}")

async def fetch_article_content(url: str) -> Dict[str, str]:
    """
    Fetch and parse article content from a URL.
    """
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status != 200:
                raise Exception(f"Failed to fetch article: {response.status}")
            
            html = await response.text()
            soup = BeautifulSoup(html, 'html.parser')
            
            # Extract title
            title = soup.find('title')
            title = title.text if title else ""
            
            # Extract main content (this is a simple implementation)
            # In production, you'd want a more robust article extraction
            content = []
            for p in soup.find_all('p'):
                if len(p.text.split()) > 10:  # Skip short paragraphs
                    content.append(p.text)
            
            return {
                "title": title,
                "content": "\n".join(content)
            }

async def analyze_article(
    url: str,
    title: Optional[str] = None,
    content: Optional[str] = None
) -> Dict:
    """
    Analyze a news article for potential misinformation.
    """
    if text_model is None:
        await load_models()
    
    # If content not provided, fetch it
    if not content:
        article_data = await fetch_article_content(url)
        title = title or article_data["title"]
        content = article_data["content"]
    
    # Combine title and content for analysis
    full_text = f"{title}\n\n{content}" if title else content
    
    # Tokenize and analyze
    inputs = tokenizer(
        full_text,
        return_tensors="pt",
        truncation=True,
        max_length=512
    )
    
    with torch.no_grad():
        outputs = text_model(**inputs)
        probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
    
    fake_probability = probabilities[0][1].item()
    
    # Analyze different aspects of the text
    analysis_results = analyze_text_aspects(full_text)
    
    return {
        "is_fake": fake_probability > 0.5,
        "confidence": fake_probability,
        "explanation": generate_explanation(fake_probability, analysis_results),
        "sources": find_supporting_sources(full_text),
        "warnings": generate_warnings(analysis_results)
    }

async def analyze_text(text: str, context: Optional[str] = None) -> Dict:
    """
    Analyze a piece of text for potential misinformation.
    """
    if text_model is None:
        await load_models()
    
    # Combine text with context if provided
    full_text = f"{context}\n\n{text}" if context else text
    
    # Tokenize and analyze
    inputs = tokenizer(
        full_text,
        return_tensors="pt",
        truncation=True,
        max_length=512
    )
    
    with torch.no_grad():
        outputs = text_model(**inputs)
        probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
    
    fake_probability = probabilities[0][1].item()
    
    # Analyze different aspects of the text
    analysis_results = analyze_text_aspects(full_text)
    
    return {
        "is_fake": fake_probability > 0.5,
        "confidence": fake_probability,
        "explanation": generate_explanation(fake_probability, analysis_results),
        "sources": find_supporting_sources(full_text),
        "warnings": generate_warnings(analysis_results)
    }

def analyze_text_aspects(text: str) -> Dict[str, float]:
    """
    Analyze different aspects of the text for potential red flags.
    """
    # This is a simplified implementation
    # In production, you'd want more sophisticated analysis
    return {
        "emotional_language": np.random.random(),
        "source_credibility": np.random.random(),
        "fact_density": np.random.random(),
        "clickbait_score": np.random.random()
    }

def generate_explanation(probability: float, analysis: Dict[str, float]) -> str:
    """
    Generate a human-readable explanation of the analysis results.
    """
    if probability > 0.8:
        return "High likelihood of misinformation. Multiple red flags detected."
    elif probability > 0.5:
        return "Some signs of potential misinformation. Exercise caution."
    else:
        return "No significant signs of misinformation detected."

def find_supporting_sources(text: str) -> List[str]:
    """
    Find relevant sources to support the fact-checking.
    """
    # This is a placeholder
    # In production, you'd want to implement actual source finding
    return [
        "https://example.com/fact-check-1",
        "https://example.com/fact-check-2"
    ]

def generate_warnings(analysis: Dict[str, float]) -> List[str]:
    """
    Generate specific warnings based on the analysis results.
    """
    warnings = []
    
    if analysis["emotional_language"] > 0.7:
        warnings.append("High use of emotional language detected")
    
    if analysis["source_credibility"] < 0.3:
        warnings.append("Low source credibility score")
    
    if analysis["clickbait_score"] > 0.7:
        warnings.append("Clickbait-style language detected")
    
    return warnings if warnings else None 