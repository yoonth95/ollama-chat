from fastapi import APIRouter
import logging
from app.services.ollama import OllamaService
from app.utils.response import create_response
from aiohttp import ClientError

router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.get("/models")
async def get_models():
    logger.info("🔍 클라이언트에서 모델 목록 요청 받음")

    try:
        models = await OllamaService.get_models()
        logger.info(f"✅ 모델 응답 성공: {models}")
        return create_response(True, "모델 목록 조회 성공", models)

    except ClientError as e:
        logger.error(f"🚨 Ollama 접속 오류: {e}")
        return create_response(False, "Ollama 서비스가 실행되지 않았습니다. 설치 또는 실행 상태를 확인하세요.", None, 503)

    except Exception as e:
        logger.error(f"🚨 모델 조회 오류: {e}")
        return create_response(False, "서버 오류", None, 500)


# 네트워크 관련 오류만 따로 처리하려면 ClientError를 사용
# 모든 예외를 한 번에 처리하려면 Exception을 사용
# 가장 좋은 방법은 ClientError와 Exception을 함께 사용하여 정확한 예외 처리
