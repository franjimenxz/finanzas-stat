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
    usuarios_lista = [{
        "legajo": u.legajo,
        "nombre": u.nombre,
        "usuario": u.usuario,
        "email": u.email,
        "rol": u.rol,
        "activo": u.activo
    } for u in usuarios]

    return jsonify({"usuarios": usuarios_lista})

@admin_bp.route('/api/admin/deactivate_user/<int:legajo>', methods=['PATCH'])
@jwt_required()
def deactivate_user(legajo):
    """Desactiva un usuario en lugar de eliminarlo"""
    claims = get_jwt()
    if claims["rol"] != "admin":
        return jsonify({"error": "Acceso denegado"}), 403

    usuario = Usuario.query.filter_by(legajo=legajo).first()
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    usuario.activo = False
    db.session.commit()

    return jsonify({"message": f"Usuario {usuario.usuario} desactivado con éxito"}), 200

@admin_bp.route('/api/admin/reactivate_user/<int:legajo>', methods=['PATCH'])
@jwt_required()
def reactivate_user(legajo):
    """Reactivar un usuario desactivado"""
    claims = get_jwt()
    if claims["rol"] != "admin":
        return jsonify({"error": "Acceso denegado"}), 403

    usuario = Usuario.query.filter_by(legajo=legajo).first()
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    usuario.activo = True 
    db.session.commit()

    return jsonify({"message": f"Usuario {usuario.usuario} reactivado con éxito"}), 200

@admin_bp.route('/api/admin/add_user', methods=['POST'])
@jwt_required()
def add_user():
    """Agregar un nuevo usuario"""
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

    nuevo_usuario = Usuario(
        usuario=usuario,
        nombre=nombre,
        dni=dni,
        email=email,
        rol=rol,
        activo=True  
    )
    nuevo_usuario.contrasena = contrasena
    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"message": "Usuario agregado con éxito"}), 201
