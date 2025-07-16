from fastapi import APIRouter
from app.api.routes.detection import router as detection_router
from app.api.routes.news import router as news_router

router = APIRouter()

router.include_router(detection_router, prefix="/detection", tags=["detection"])
router.include_router(news_router, prefix="/news", tags=["news"])

# --- Add /verify endpoints for extension compatibility ---
from fastapi import UploadFile, File, HTTPException, Request, Form
from fastapi.responses import JSONResponse
from app.api.routes.news import verify_text as news_verify_text, verify_article
from app.api.routes.detection import detect_image, detect_url
from pydantic import BaseModel

from fastapi import APIRouter as FastAPIRouter
verify_router = FastAPIRouter()

@verify_router.post("/text")
async def verify_text_proxy(request: Request):
    body = await request.json()
    class DummyTextRequest(BaseModel):
        text: str
        context: str = None
    text_request = DummyTextRequest(**body)
    return await news_verify_text(text_request)

@verify_router.post("/image")
async def verify_image_proxy(file: UploadFile = File(...)):
    return await detect_image(file)

@verify_router.post("/url")
async def verify_url_proxy(request: Request):
    body = await request.json()
    url = body.get("url")
    if not url:
        raise HTTPException(status_code=400, detail="Missing 'url' in request body")
    class DummyArticleRequest(BaseModel):
        url: str
        title: str = None
        content: str = None
    article_request = DummyArticleRequest(url=url)
    return await verify_article(article_request)

router.include_router(verify_router, prefix="/verify", tags=["verify"]) 