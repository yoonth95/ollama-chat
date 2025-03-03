from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.services.chat_service import ChatService
from app.utils.response import create_response
from app.utils.handle_exceptions import handle_exceptions
from app.schemas.chat import ChatRequest
from app.db.database import get_db
import logging

router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
        
@router.post("/chat/create-room")
@handle_exceptions
async def create_new_chat(request: ChatRequest, db: Session = Depends(get_db)):
  logger.info(f"📩 클라이언트 채팅방 생성: {request}")
  
  if not request.message:
    return JSONResponse(content=create_response(False, "질문을 입력해주세요.", None), status_code=400)

  if not request.model:
    return JSONResponse(content=create_response(False, "모델을 선택해주세요.", None), status_code=400)
  
  # ChatService에서 채팅방 생성 서비스 호출
  response = await ChatService.create_chat_room_service(db)

  return JSONResponse(content=create_response(True, "채팅방 생성 완료", response), status_code=200)