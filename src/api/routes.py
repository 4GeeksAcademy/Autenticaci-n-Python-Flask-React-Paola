"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from api.models import db, Contact

contacts_bp = Blueprint('contacts', __name__)

api = Blueprint('api', __name__)

@api.route('/some-route', methods=['GET'])
def some_route():
    return "Hello from API"

@contacts_bp.route('/contacts', methods=['GET'])
@jwt_required()
def get_contacts():
    contacts = Contact.query.all()
    return jsonify([contact.serialize() for contact in contacts]), 200

@contacts_bp.route('/contacts/<int:id>', methods=['GET'])
@jwt_required()
def get_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({"msg": "Contact not found"}), 404
    return jsonify(contact.serialize()), 200

@contacts_bp.route('/contacts', methods=['POST'])
@jwt_required()
def create_contact():
    data = request.json
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')

    if not name or not phone:
        return jsonify({"msg": "Name and phone are required"}), 400

    new_contact = Contact(name=name, phone=phone, email=email)
    db.session.add(new_contact)
    db.session.commit()
    return jsonify(new_contact.serialize()), 201

@contacts_bp.route('/contacts/<int:id>', methods=['PUT'])
@jwt_required()
def update_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({"msg": "Contact not found"}), 404

    data = request.json
    contact.name = data.get('name', contact.name)
    contact.phone = data.get('phone', contact.phone)
    contact.email = data.get('email', contact.email)

    db.session.commit()
    return jsonify(contact.serialize()), 200

@contacts_bp.route('/contacts/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({"msg": "Contact not found"}), 404

    db.session.delete(contact)
    db.session.commit()
    return jsonify({"msg": "Contact deleted"}), 200
