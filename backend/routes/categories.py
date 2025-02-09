from flask import Blueprint, request, jsonify
from models import Categoria  # Manteniendo tu estructura
from flask_jwt_extended import jwt_required, get_jwt

categories_bp = Blueprint('categories', __name__)

@categories_bp.route('/api/categories', methods=['GET'])
def get_categories():
    tipo = request.args.get('tipo')
    if not tipo or tipo not in ['ingreso', 'egreso']:
        return jsonify({"error": "Tipo de categoría inválido"}), 400

    categorias = Categoria.obtener_por_tipo(tipo)  # Método en el modelo
    return jsonify({
        "categories": [{"id": c.id, "nombre": c.nombre} for c in categorias]
    })

@categories_bp.route('/api/categories', methods=['OPTIONS'])
def options_category():
    return '', 204  # Respuesta vacía con código 204 (No Content)


@categories_bp.route('/api/categories', methods=['POST'])
@jwt_required()
def add_category():
    claims = get_jwt()
    if claims["rol"] != "admin":
        return jsonify({"error": "Acceso denegado"}), 403

    data = request.get_json()
    print("Datos recibidos:", data)  # <-- Agregar esta línea para ver qué datos llegan

    nombre = data.get("nombre")
    tipo = data.get("tipo")

    if not nombre or tipo not in ["ingreso", "egreso"]:
        return jsonify({"error": "Datos inválidos"}), 400   

    nueva_categoria = Categoria.crear(nombre, tipo)
    if nueva_categoria:
        return jsonify({"message": "Categoría agregada con éxito"}), 201
    return jsonify({"error": "Error al agregar categoría"}), 500
