from pydantic import BaseModel
from typing import List, Optional

class ModelInfo(BaseModel):
  name: str
  size: Optional[int]
  modified_at: Optional[str]
  
class ModelList(BaseModel):
  models: List[ModelInfo]
  
class ModelNameRequest(BaseModel):
  model_name: str