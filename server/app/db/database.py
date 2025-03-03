from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# SQLite 데이터베이스 파일 경로 설정
DATABASE_URL = settings.DATABASE_URL

# SQLAlchemy 엔진 생성
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# 세션 로컬 클래스 생성
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 베이스 클래스 선언
Base = declarative_base()

def init_db():
  Base.metadata.create_all(bind=engine)
  
# 의존성으로 사용할 세션 함수
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()