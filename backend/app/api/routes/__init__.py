from fastapi import APIRouter
from .detection import router as detection_router
from .news import router as news_router

router = APIRouter()

router.include_router(detection_router, prefix="/detection", tags=["detection"])
router.include_router(news_router, prefix="/news", tags=["news"]) 