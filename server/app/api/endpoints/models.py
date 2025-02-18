from fastapi import APIRouter, HTTPException
import logging
from app.services.ollama import OllamaService
from app.schemas.model import ModelList

router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 사용 가능한 Ollama 모델 목록 가져오기
@router.get("/models", response_model=ModelList)
async def get_models():
    logger.info("🔍 클라이언트에서 모델 목록 요청 받음")
    
    try:
        models = await OllamaService.get_models()
        logger.info(f"✅ 모델 응답 성공: {models}")
        return models
    except Exception as e:
        logger.error(f"🚨 모델 조회 오류: {e}")
        raise HTTPException(status_code=503, detail=str(e))