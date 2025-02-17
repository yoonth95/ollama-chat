from fastapi import APIRouter, HTTPException
from app.services.ollama import OllamaService
from app.schemas.model import ModelList

router = APIRouter()

# 사용 가능한 Ollama 모델 목록 가져오기
@router.get("/models", response_model=ModelList)
async def get_models():  
    try:
        return await OllamaService.get_models()
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))