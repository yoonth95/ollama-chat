from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional, Literal

class ChatMessage(BaseModel):
  role: Literal["system", "user", "assistant"]
  content: str

class ChatRequest(BaseModel):
  model: str
  message: str

class ChatHistory(BaseModel):
  messages: List[ChatMessage]

class ChatResponse(BaseModel):
  success: bool
  message: str
  data: Optional[ChatMessage]
  
class ChatRoomCreate(BaseModel):
  title: str

class ChatRoomResponse(BaseModel):
  id: str
  title: str
  created_at: datetime  
  
  class Config:
    json_encoders = {
      datetime: lambda v: v.isoformat()  # datetime을 ISO 8601 형식으로 직렬화
    }