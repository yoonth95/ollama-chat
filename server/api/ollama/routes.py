from flask import jsonify, request
from . import users_api
from .controllers import get_users, create_user

@users_api.route("/", methods=["GET"])
def get_all_users():
    return jsonify(get_users())

@users_api.route("/", methods=["POST"])
def add_user():
    return jsonify(create_user(request.json))
