from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from ...core.logger import logger
from ...services.news import analyze_article, analyze_text

router = APIRouter()

class ArticleRequest(BaseModel):
    url: str
    title: Optional[str] = None
    content: Optional[str] = None

class TextRequest(BaseModel):
    text: str
    context: Optional[str] = None

class FactCheckResponse(BaseModel):
    is_fake: bool
    confidence: float
    explanation: str
    sources: List[str]
    warnings: Optional[List[str]] = None

@router.post("/article", response_model=FactCheckResponse)
async def verify_article(article: ArticleRequest):
    """
    Analyze a news article for potential misinformation.
    Can accept either a URL or article content directly.
    """
    try:
        result = await analyze_article(
            url=article.url,
            title=article.title,
            content=article.content
        )
        return result
    except Exception as e:
        logger.error(f"Error analyzing article: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/text", response_model=FactCheckResponse)
async def verify_text(text_request: TextRequest):
    """
    Analyze a piece of text for potential misinformation.
    Optionally accepts context to improve accuracy.
    """
    try:
        result = await analyze_text(
            text=text_request.text,
            context=text_request.context
        )
        return result
    except Exception as e:
        logger.error(f"Error analyzing text: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 