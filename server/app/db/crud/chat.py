from sqlalchemy.orm import Session
from app.db.models.chat import ChatRoom
from app.schemas.chat import ChatRoomCreate

def create_chat_room(db: Session, chat_room_data: ChatRoomCreate):
  new_room = ChatRoom(title=chat_room_data.title)
  db.add(new_room)
  db.commit()
  db.refresh(new_room)
  return new_room