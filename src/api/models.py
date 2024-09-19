import os
import sys
import re
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, redirect, url_for, flash, abort
from sqlalchemy.orm import validates
from datetime import datetime, timedelta
from itsdangerous import URLSafeTimedSerializer
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=True)
    last_name = db.Column(db.String(80), nullable=True)
    password = db.Column(db.String(80), unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'
    
    def generate_password(self, password):
        return bcrypt.generate_password_hash(password)
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def create_user(self,  password, is_active=True):
        hashed_password = self.generate_password(password).decode('utf-8')
        new_user = User(
            password = hashed_password,
            is_active =is_active   
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user
        
    def serialize(self):
        return {
            "id": self.id,
            'is_active': self.is_active
            # do not serialize the password, i ts a security breach
        }