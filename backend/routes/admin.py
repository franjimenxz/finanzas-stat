from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt
from models import Usuario
from extensions import db 

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/api/admin', methods=['GET'])
@jwt_required()
def admin_dashboard():
    """Panel de Administración - Solo accesible por admins"""
    claims = get_jwt()
    if claims["rol"] != "admin":
        return jsonify({"error": "Acceso denegado"}), 403

    usuarios = Usuario.query.all()
    usuarios_lista = [{"legajo": u.legajo, "nombre": u.nombre, "usuario": u.usuario, "email": u.email, "rol": u.rol} for u in usuarios]

    return jsonify({"usuarios": usuarios_lista})


@admin_bp.route('/api/admin/delete_user/<int:legajo>', methods=['DELETE'])
@jwt_required()
def delete_user(legajo):
    claims = get_jwt()
    if claims["rol"] != "admin":
        return jsonify({"error": "Acceso denegado"}), 403

    usuario = Usuario.query.filter_by(legajo=legajo).first()
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    db.session.delete(usuario)  # Elimina el usuario de la BD
    db.session.commit()  # Guarda los cambios

    return jsonify({"message": "Usuario eliminado con éxito"}), 200

@admin_bp.route('/api/admin/add_user', methods=['POST'])
@jwt_required()
def add_user():
    claims = get_jwt()
    if claims["rol"] != "admin":
        return jsonify({"error": "Acceso denegado"}), 403

    data = request.get_json()
    usuario = data.get("usuario")
    nombre = data.get("nombre")
    dni = data.get("dni")
    email = data.get("email")
    contrasena = data.get("contrasena")
    rol = data.get("rol", "usuario")  # Valor por defecto: usuario

    if not usuario or not nombre or not dni or not email or not contrasena:
        return jsonify({"error": "Faltan datos"}), 400

    nuevo_usuario = Usuario(usuario=usuario, nombre=nombre, dni=dni, email=email, contrasena=contrasena, rol=rol)
    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"message": "Usuario agregado con éxito"}), 201