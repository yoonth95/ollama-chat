from sqlalchemy.orm import Session
from app.db.models.chat import ChatRoom
from app.schemas.chat import ChatRoomCreate

class ChatCrud:
  @staticmethod
  def create_chat_room(db: Session, chat_room_data: ChatRoomCreate):
    new_room = ChatRoom(title=chat_room_data.title)
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room

  @staticmethod
  def get_chat_rooms(db: Session, page: int, limit: int):
    offset = (page - 1) * limit
    return (
      db.query(ChatRoom)
      .order_by(ChatRoom.created_at.desc())
      .offset(offset)
      .limit(limit)
      .all()
    )

  @staticmethod
  def delete_chat_room(db: Session, room_id: str):
    room = db.query(ChatRoom).filter(ChatRoom.id == room_id).first()
    if room:
      db.delete(room)
      db.commit()
      return True
    return False