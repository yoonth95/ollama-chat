import json
from sqlalchemy.orm import Session
from app.schemas.chat import ChatRoomResponse, ChatRoomCreate
from app.db.crud.chat import create_chat_room
from app.utils.datetime_utils import convert_to_kst

class ChatService:
  @staticmethod
  async def create_chat_room_service(db: Session) -> ChatRoomResponse:
    # "새 채팅"으로 기본 채팅방 생성
    new_room = create_chat_room(db, ChatRoomCreate(title="새 채팅"))
    
    response = ChatRoomResponse(
      id=new_room.id,
      title=new_room.title,
      created_at=convert_to_kst(new_room.created_at)
    )
    
    return json.loads(response.model_dump_json())
  
  # @staticmethod
  # async def stream_chat(model: str, question: str) -> StreamingResponse:
  #   url = f"{settings.OLLAMA_API_BASE_URL}/api/chat"
  #   payload = {"model": model, "messages": [{"role": "user", "content": question}]}

  #   async with aiohttp.ClientSession() as session:
  #     async with session.post(url, json=payload) as response:
  #       async for line in response.content.iter_any():
  #         yield line.decode("utf-8")