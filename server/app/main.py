from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from server.app.api.endpoints import model

app = FastAPI(
  title=settings.PROJECT_NAME,
  openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS 설정
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# 라우터 등록
app.include_router(model.router, prefix=settings.API_V1_STR, tags=["model"])