import aiohttp
from aiohttp import ClientError
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse
from app.core.config import settings
from app.schemas.model import ModelInfo, ModelList
from app.utils.stream_model_download import stream_model_download
from app.utils.response import create_response
from app.utils.download_manager import active_downloads

class ModelService:
  @staticmethod
  async def get_models() -> ModelList:
    async with aiohttp.ClientSession() as session:
      async with session.get(f"{settings.OLLAMA_API_BASE_URL}/api/tags") as response:                
        data = await response.json()
        models = [
          ModelInfo(
            name=model["name"],
            size=model.get("size"),
            modified_at=model.get("modified_at")
          )
          for model in data.get("models", [])  # models 없을 경우 빈 리스트 반환
        ]
        
        return ModelList(models=models)

  @staticmethod
  async def post_models(model_name: str) -> StreamingResponse:
    ## 모델 다운로드 여부 체크
    async with aiohttp.ClientSession() as session:
      async with session.get(f"{settings.OLLAMA_API_BASE_URL}/api/tags") as response:
        data = await response.json()
        if len(data['models']) > 0 and model_name == data['models'][0]['model']:
          return JSONResponse(content=create_response(False, "이미 설치된 모델입니다.", None), status_code=400)

    ## 모델 다운로드
    return StreamingResponse(stream_model_download(model_name), media_type="application/json")
  
  @staticmethod
  async def post_cancel_model_download(model_name: str):
    if model_name in active_downloads:
      task = active_downloads.pop(model_name)
      task.cancel()
      return JSONResponse(content=create_response(True, "다운로드 취소", None), status_code=200)
  
    return JSONResponse(content=create_response(True, "해당 모델이 다운로드가 되고 있지 않습니다.", None), status_code=404)