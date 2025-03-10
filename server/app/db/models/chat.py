import uuid
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.db.database import Base
from app.utils.datetime_utils import get_kst_time

## 채팅방 테이블
class ChatRoom(Base):
  __tablename__ = "chat_rooms"

  id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4())) # 채팅방 고유 ID
  title = Column(String, nullable=False)  # 채팅방 제목
  created_at = Column(DateTime(timezone=True), default=get_kst_time) # 생성일

  messages = relationship("ChatMessage", back_populates="room", cascade="all, delete-orphan") # 메시지 관계 (1:N)

## 채팅 메시지 테이블
class ChatMessage(Base):
  __tablename__ = "chat_messages"

  id = Column(Integer, primary_key=True, index=True)  # 메시지 ID
  room_id = Column(Integer, ForeignKey("chat_rooms.id"), nullable=False)  # 어떤 채팅방인지
  role = Column(String, nullable=False)  # "user" 또는 "assistant"
  content = Column(Text, nullable=False)  # 채팅 메시지 내용
  timestamp = Column(DateTime, default=datetime.now(timezone.utc))  # 전송 시간

  room = relationship("ChatRoom", back_populates="messages")
