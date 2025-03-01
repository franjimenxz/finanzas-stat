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

@reviews_bp.route('/api/external/reviews/Simulacion/crearUsuario', methods=['POST'])
@jwt_required()
def post_review_crearUsuario():
    data = request.get_json()
    if not data.usuario or not data.dni:
        return jsonify({"error": "Datos insuficientes"}), 400
    
    return jsonify({
                        "Mensaje" : "Se ha registrado el usuario con exito",
                        "Usuario" : data.nombre,
                        "contrasena": data.dni,
                        "idUsuario" : 5 #Ejemplo de Id de usuario en sistema externo
                    })

@reviews_bp.route('/api/external/reviews/Simulacion/crearReview', methods=['POST'])
@jwt_required()
def post_review_crearReview():
    data = request.get_json()
    if not data.id or not data.stars or not data.stars or not data.description:
        return jsonify({"error": "Datos insuficientes"}), 400
    
    return jsonify({
                        "Mensaje" : "Se ha registrado la review",
                        "idUsuario" : data.id,
                        "stars": data.stars,
                        "description" : data.description
                    })