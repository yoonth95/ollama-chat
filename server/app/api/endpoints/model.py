from fastapi import APIRouter
import logging
from server.app.services.model_service import ModelService
from app.utils.response import create_response
from aiohttp import ClientError
from fastapi.responses import JSONResponse
from app.schemas.model import ModelNameRequest

router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

## 다운 받은 모델 조회
@router.get("/models")
async def get_models():
  logger.info("🔍 클라이언트에서 모델 목록 요청 받음")

  try:
    models = await ModelService.get_models()
    logger.info(f"models content: {models.model_dump()}")
    return JSONResponse(content=create_response(True, "모델 목록 조회 성공", models.model_dump()), status_code=200)
    
  except ClientError as e:
    logger.error(f"🚨 Ollama 접속 오류: {e}")
    return JSONResponse(content=create_response(False, "Ollama 서비스가 실행되지 않았습니다. 설치 또는 실행 상태를 확인하세요.", None), status_code=503)

  except Exception as e:
    logger.error(f"🚨 모델 조회 오류: {e}")
    return JSONResponse(content=create_response(False, "서버 오류", None), status_code=500)

## 모델 다운로드
@router.post("/model/download")
async def post_models(request: ModelNameRequest):
  logger.info(f"🔍 클라이언트에서 모델 다운로드 요청 받음: {request.model_name}")
  
  try:
    return await ModelService.post_models(request.model_name)
    
  except ClientError as e:
    logger.error(f"🚨 Ollama 접속 오류: {e}")
    return JSONResponse(content=create_response(False, "Ollama 서비스가 실행되지 않았습니다. 설치 또는 실행 상태를 확인하세요.", None), status_code=503)

  except Exception as e:
    logger.error(f"🚨 모델 조회 오류: {e}")
    return JSONResponse(content=create_response(False, "서버 오류", None), status_code=500)

## 모델 다운로드 취소
@router.post("/model/download-cancel")
async def cancel_model_download(request: ModelNameRequest):
  logger.info(f"🔍 클라이언트에서 모델 다운로드 취소")
  
  return await ModelService.post_cancel_model_download(request.model_name)