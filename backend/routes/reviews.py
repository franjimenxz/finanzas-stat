from flask import Blueprint, request, jsonify
from services.external_services import send_review, obtener_usuario_desde_bd
from flask_jwt_extended import jwt_required, get_jwt_identity

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/api/external/reviews', methods=['POST'])

@jwt_required()
def post_review():
    """ Recibe la review desde el frontend y la envía a la API Mock """
    data = request.get_json()
    user_id = get_jwt_identity() 
    
    stars = data.get("stars", 0)
    descripcion = data.get("description", "").strip()


    usuario = obtener_usuario_desde_bd(user_id)

    if not usuario or not usuario.get("dni"):
        return jsonify({"error": "No se encontró el usuario o el DNI"}), 400  

    nombre = usuario.get("nombre")
    dni = usuario.get("dni")

    if not 1 <= stars <= 5:
        return jsonify({"error": "La calificación debe estar entre 1 y 5 estrellas"}), 400

    result, status_code = send_review(nombre, dni, stars, descripcion)
    return jsonify(result), status_code