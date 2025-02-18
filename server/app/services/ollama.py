import httpx
from app.core.config import settings
from app.schemas.model import ModelInfo, ModelList

class OllamaService:
    @staticmethod
    async def get_models() -> ModelList:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{settings.OLLAMA_API_BASE_URL}/api/tags")
            response.raise_for_status()
            
            models = [
                ModelInfo(
                    name=model["name"],
                    size=model.get("size"),
                    modified_at=model.get("modified_at")
                )
                for model in response.json().get("models", [])  # models 없을 경우 빈 리스트 반환
            ]
            
            return ModelList(models=models)
