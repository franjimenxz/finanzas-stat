from flask import Blueprint, request, jsonify
from models import Usuario
import requests

valoracion_bp = Blueprint('valoracion', __name__)

# 📌 Simulación de API externa (en el futuro cambiar a la URL real)
REGISTER_URL = "http://localhost:8000/register/"
REVIEW_URL = "http://localhost:8000/posts/3/reviews/"

@valoracion_bp.route('/api/review', methods=['POST'])
def registrar_valoracion():
    try:
        data = request.get_json()
        id_usuario = data.get('idUsuario')
        stars = data.get('stars')
        description = data.get('description')

        if not id_usuario or not stars or not description:
            return jsonify({'message': 'Faltan campos obligatorios'}), 400

        # Buscar usuario en la base de datos
        usuario = Usuario.query.get(id_usuario)
        if not usuario:
            return jsonify({'message': 'Usuario no encontrado'}), 404

        #  Simulación del registro de usuario en la API externa
        register_data = {
            "email": usuario.correo,
            "username": usuario.nombre,
            "password": usuario.dni  # Usamos el DNI como clave
        }

        try:
            response = requests.post(REGISTER_URL, json=register_data, timeout=5)
            response_data = response.json()
            token = response_data.get("token")

            if not token:
                return jsonify({'message': 'No se recibió token del sistema externo'}), 500

        except requests.exceptions.RequestException:
            return jsonify({'message': 'Error de conexión con la API de calificaciones'}), 503

        #  Simulación de envío de la calificación
        review_data = {
            "comment": description,
            "rating": stars
        }

        headers = {
            "Authorization": f"Token {token}",
            "Content-Type": "application/json"
        }

        try:
            review_response = requests.post(REVIEW_URL, json=review_data, headers=headers, timeout=5)

            if review_response.status_code != 201:
                return jsonify({'message': 'Error al registrar la valoración en la API externa', 'error': review_response.text}), 500

        except requests.exceptions.RequestException:
            return jsonify({'message': 'No se pudo registrar la valoración en la API externa'}), 503

        return jsonify({'message': 'Valoración registrada exitosamente'}), 201

    except Exception as e:
        return jsonify({'message': 'Error en el servidor', 'error': str(e)}), 500
