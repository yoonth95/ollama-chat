from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
import logging
from app.services.model_service import ModelService
from app.schemas.model import ModelNameRequest
from app.utils.response import create_response
from app.utils.handle_exceptions import handle_exceptions

router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

## 다운 받은 모델 조회
@router.get("/models")
@handle_exceptions
async def get_models():
  logger.info("🔍 클라이언트에서 모델 목록 요청 받음")

  return await ModelService.get_models()
  # models = await ModelService.get_models()
  # logger.info(f"models content: {models.model_dump()}")
  # return JSONResponse(content=create_response(True, "모델 목록 조회 성공", models.model_dump()), status_code=200)

## 모델 다운로드
@router.get("/model/download")
@handle_exceptions
async def model_download(model_name: str = Query(..., description="다운로드할 모델 이름")):
  logger.info(f"🔍 클라이언트에서 모델 다운로드 요청 받음: {model_name}")
  
  return await ModelService.model_download(model_name)
    
## 모델 다운로드 취소
@router.post("/model/download-cancel")
@handle_exceptions
async def model_download_cancel(request: ModelNameRequest):
  logger.info(f"🔍 클라이언트에서 모델 다운로드 취소")
  
  return await ModelService.model_download_cancel(request.model_name)

## 모델 삭제
@router.delete("/model/delete/{model_name}")
@handle_exceptions
async def model_delete(model_name: str):
  logger.info(f"🔍 클라이언트에서 모델 삭제 요청 받음")
  
  return await ModelService.model_delete(model_name)