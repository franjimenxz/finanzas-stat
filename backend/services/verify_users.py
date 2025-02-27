from flask import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import Usuario

def verifyuser():
    """Función para verificar si el usuario está activo"""
    user_id = get_jwt_identity()
    usuario = Usuario.query.filter_by(legajo=user_id).first()
    
    if not usuario or not usuario.activo:
        return jsonify({"error": "Usuario desactivado, acceso denegado"}), 403
    
    return None
