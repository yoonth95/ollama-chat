from database.models import User
from database.db import db

def get_users():
    users = User.query.all()
    return [{"id": user.id, "name": user.name} for user in users]

def create_user(data):
    new_user = User(name=data["name"])
    db.session.add(new_user)
    db.session.commit()
    return {"id": new_user.id, "name": new_user.name}
