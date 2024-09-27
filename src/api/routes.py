"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from flask_cors import CORS
from api.models import db, Contact, User

api = Blueprint('api', __name__)
CORS(api)

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"msg": "Incorrect email"}), 401
    if not user.check_password(password):
        return jsonify({"msg": "Incorrect password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)

@api.route('/contacts', methods=['GET'])
@jwt_required()
def get_contacts():
    user_id = get_jwt_identity()
    contacts = Contact.query.filter_by(user_id=user_id).all()
    return jsonify([contact.serialize() for contact in contacts]), 200

@api.route('/contacts/<int:id>', methods=['GET'])
@jwt_required()
def get_contact(id):
    user_id = get_jwt_identity()
    contact = Contact.query.filter_by(id=id, user_id=user_id).first()
    if not contact:
        return jsonify({"msg": "Contact not found"}), 404
    return jsonify(contact.serialize()), 200

@api.route('/contacts', methods=['POST'])
@jwt_required()
def create_contact():
    user_id = get_jwt_identity()
    data = request.json
    full_name = data.get('full_name')  
    phone = data.get('phone')
    email = data.get('email')
    address = data.get('address')  

    if not full_name or not phone:
        return jsonify({"msg": "Full name and phone are required"}), 400

    new_contact = Contact(
        full_name=full_name, 
        phone=phone, 
        email=email, 
        address=address, 
        user_id=user_id  
    )
    db.session.add(new_contact)
    db.session.commit()
    return jsonify(new_contact.serialize()), 201

@api.route('/contacts/<int:id>', methods=['PUT'])
@jwt_required()
def update_contact(id):
    user_id = get_jwt_identity()
    contact = Contact.query.filter_by(id=id, user_id=user_id).first()
    if not contact:
        return jsonify({"msg": "Contact not found"}), 404

    data = request.json
    contact.full_name = data.get('full_name', contact.full_name)  
    contact.phone = data.get('phone', contact.phone)
    contact.email = data.get('email', contact.email)
    contact.address = data.get('address', contact.address) 

    db.session.commit()
    return jsonify(contact.serialize()), 200

@api.route('/contacts/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_contact(id):
    user_id = get_jwt_identity()
    contact = Contact.query.filter_by(id=id, user_id=user_id).first()
    if not contact:
        return jsonify({"msg": "Contact not found"}), 404

    db.session.delete(contact)
    db.session.commit()
    return jsonify({"msg": "Contact deleted"}), 200
