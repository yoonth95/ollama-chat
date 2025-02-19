from typing import Any

def create_response(ok: bool, message: str, data: Any = None, status: int = 200):
    return {
        "ok": ok,
        "message": message,
        "data": data,
        "status": status
    }
