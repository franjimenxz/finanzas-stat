from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import Usuario, db
from werkzeug.security import check_password_hash
from sqlalchemy.exc import IntegrityError

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    """Registro de usuarios"""
    data = request.get_json()

    if not all([data.get('usuario'), data.get('nombre'), data.get('dni'), data.get('contrasena')]):
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    nuevo_usuario = Usuario(
        usuario=data['usuario'],
        nombre=data['nombre'],
        dni=data['dni'],
        rol='usuario'
    )
    nuevo_usuario.set_password(data['contrasena'])

    try:
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({"message": "Usuario registrado exitosamente"}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Usuario o DNI ya registrado"}), 400

@auth_bp.route('/api/login', methods=['POST'])
def login():
    """Inicio de sesión y generación de token JWT"""
    data = request.get_json()
    usuario = Usuario.query.filter_by(usuario=data.get('usuario')).first()

    if not usuario or not usuario.check_password(data.get('contrasena')):
        return jsonify({"error": "Credenciales incorrectas"}), 401

    access_token = create_access_token(identity=str(usuario.legajo))
    return jsonify({"access_token": access_token, "usuario": usuario.usuario, "rol": usuario.rol})
