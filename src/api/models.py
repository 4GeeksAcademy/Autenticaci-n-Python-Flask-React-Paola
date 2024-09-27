from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)  
    last_name = db.Column(db.String(80), nullable=True)  
    password = db.Column(db.String(80), nullable=False)  
    contacts = db.relationship('Contact', backref='user', lazy=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.name}>'
    
    def generate_password(self, password):
        return bcrypt.generate_password_hash(password)
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def create_user(self, name, last_name, password, is_active=True):
        hashed_password = self.generate_password(password).decode('utf-8')
        new_user = User(
            name=name,
            last_name=last_name,
            password=hashed_password,
            is_active=is_active  
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user
        
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            'is_active': self.is_active
            # do not serialize the password, i ts a security breach
        }

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)  
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=True)
    address = db.Column(db.String(200), nullable=True)  
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Contact {self.full_name}>'

    def new_contact(self, full_name, phone, email, address, user_id):
        new_contact = Contact(
            full_name=full_name,
            phone=phone,
            email=email,  
            address=address,
            user_id=user_id 
        )
        db.session.add(new_contact)
        db.session.commit()
        return new_contact 

    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.full_name,  
            "phone": self.phone,
            "email": self.email,
            "address": self.address, 
            "user_id": self.user_id
        }
