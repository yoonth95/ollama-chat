from flask import Blueprint

ollama_api = Blueprint("ollama_api", __name__)

from . import routes  # routes.py에서 라우트 등록
