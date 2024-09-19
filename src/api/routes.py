"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from flask_login import LoginManager, login_user
from config import Config
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

 
api = Blueprint('api', __name__)
CORS(api)



login_manager = LoginManager(api)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Allow CORS requests to this API
@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200

@api.route('/user/<int:id>', methods=['PUT'])
@jwt_required()
def edit_user(id):
    request_body = request.json
    user = User.query.get(id)
    if user is None:
        return jsonify({"msg": "User not found"}), 404

    if "name" in request_body:
        user.name = request_body["name"]
    if "last_name" in request_body:
        user.last_name = request_body["last_name"]

    db.session.commit()

    return jsonify({"msg": "User updated", "user": user.serialize()}), 200

@api.route('/user/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user():
    user = User.query.get(id)
    if user is None:
        return jsonify({"msg": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "User deleted"}), 200

@api.route('/register', methods=['POST'])
@jwt_required()
def register():
    data_user = request.json
    user = User()
    new_user = user.create_user( password=data_user["password"])
    print(new_user)
    return jsonify({"msg": "Your registration has been successful, congratulations!"})
 
@api.route('/login', methods=['POST'])
@jwt_required()
def login(): 
    data_user = request.json
    user = User()
    if user and user.check_password(password=data_user["password"]):
        access_token = create_access_token(identity=user.serialize())
        return jsonify({"token": access_token, "msg": "WELCOME!"})
    else:
        return jsonify({"msg": "Invalid email or password"}), 401
    return jsonify(response_body), 200
