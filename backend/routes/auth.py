from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import Usuario, db
from werkzeug.security import check_password_hash
from sqlalchemy.exc import IntegrityError
from services.email_services import enviar_email

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    """Registro de usuarios con email"""
    data = request.get_json()

    if not all([data.get('usuario'), data.get('nombre'), data.get('dni'), data.get('contrasena'), data.get('email')]):
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    nuevo_usuario = Usuario(
        usuario=data['usuario'],
        nombre=data['nombre'],
        dni=data['dni'],
        email=data['email'],  # 📌 Nuevo campo
        rol=data.get('rol','usuario')
    )
    nuevo_usuario.set_password(data['contrasena'])

    try:
        db.session.add(nuevo_usuario)
        db.session.commit()

        # 📌 Enviar correo de bienvenida
        asunto = "Registro exitoso en Finanzas-Stat"
        mensaje = f"Hola {data['nombre']}, tu registro fue exitoso en Finanzas-Stat."
        enviar_email(data['email'], asunto, mensaje)

        return jsonify({"message": "Usuario registrado exitosamente y correo enviado"}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Usuario, DNI o Email ya registrado"}), 400

@auth_bp.route('/api/login', methods=['POST'])
def login():
    """Inicio de sesión y generación de token JWT"""
    data = request.get_json()
    print("📩 Datos recibidos:", data.get('usuario'))  

    usuario = Usuario.query.filter_by(usuario=data.get('usuario')).first()
    print("🔍 Usuario encontrado:", usuario)  

    if not usuario:
        print("❌ Usuario no encontrado")
        return jsonify({"error": "Credenciales incorrectas"}), 401

    print("🔐 Contraseña ingresada:", data.get('contrasena'))
    print("💾 Contraseña almacenada:", usuario.contrasena)
    print("✅ Verificación de contraseña:", check_password_hash(usuario.contrasena, data.get('contrasena')))

    if not check_password_hash(usuario.contrasena, data.get('contrasena')):
        print("❌ Contraseña incorrecta")
        return jsonify({"error": "Credenciales incorrectas"}), 401

    access_token = create_access_token(identity=str(usuario.legajo), additional_claims={"rol": usuario.rol})
    print("🔑 Token generado:", access_token)
    return jsonify({"access_token": access_token, "usuario": usuario.usuario, "rol": usuario.rol})

