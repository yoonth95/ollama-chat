import requests
from app.core.config import settings
from app.schemas.model import ModelInfo, ModelList

class OllamaService:
    @staticmethod
    async def get_models() -> ModelList:
        try:
            response = requests.get(f"{settings.OLLAMA_API_BASE_URL}/api/tags")
            response.raise_for_status()
            
            # Ollama API 응답을 ModelInfo 형식으로 변환
            models = [
                ModelInfo(
                    name=model['name'],
                    size=model.get('size'),
                    modified_at=model.get('modified_at')
                )
                for model in response.json().get('models', [])
            ]
            
            return ModelList(models=models)
        except requests.exceptions.RequestException as e:
            raise Exception(f"Failed to fetch models: {str(e)}")