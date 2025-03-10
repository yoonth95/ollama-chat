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
  
  model_config = {
    "from_attributes": True
  }
  
  def model_dump(self, **kwargs):
    dump = super().model_dump(**kwargs)
    if isinstance(self.created_at, datetime):
      dump['created_at'] = self.created_at.isoformat()
    return dump

class ChatRoomList(BaseModel):
    chat_rooms: List[ChatRoomResponse]