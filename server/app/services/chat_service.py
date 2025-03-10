import json
from sqlalchemy.orm import Session
from typing import List
from app.schemas.chat import ChatRoomResponse, ChatRoomCreate
from app.db.crud.chat import ChatCrud

class ChatService:
  @staticmethod
  async def create_chat_room_service(db: Session) -> ChatRoomResponse:
    # "새 채팅"으로 기본 채팅방 생성
    new_room = ChatCrud.create_chat_room(db, ChatRoomCreate(title="새 채팅"))
    
    response = ChatRoomResponse(
      id=new_room.id,
      title=new_room.title,
      created_at=new_room.created_at
    )
    
    return json.loads(response.model_dump_json())
  
  @staticmethod
  async def get_chat_rooms_service(db: Session, page: int, limit: int) -> List[dict]:
    chat_rooms = ChatCrud.get_chat_rooms(db, page, limit)
    return [ChatRoomResponse.model_validate(room).model_dump() for room in chat_rooms]
  
  @staticmethod
  async def delete_chat_room_service(db: Session, room_id: str) -> bool:
    return ChatCrud.delete_chat_room(db, room_id)
    