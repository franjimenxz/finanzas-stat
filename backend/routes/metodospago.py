from flask import Blueprint, request, jsonify
from models import MetodoPago
from flask_jwt_extended import jwt_required, get_jwt
from extensions import db

payment_bp = Blueprint('payment', __name__)

# 🔹 Obtener métodos de pago
@payment_bp.route('/api/payment_methods', methods=['GET'])
def get_payment_methods():
    metodos = MetodoPago.query.all()
    return jsonify({
        "metodos": [{"id": m.id, "nombre": m.nombre} for m in metodos]
    })

# 🔹 Agregar método de pago (solo admin)
@payment_bp.route('/api/payment_methods', methods=['POST'])
@jwt_required()
def add_payment_method():
    claims = get_jwt()
    if claims["rol"] != "admin":
        return jsonify({"error": "Acceso denegado"}), 403

    data = request.get_json()
    nombre = data.get("nombre")

    if not nombre:
        return jsonify({"error": "Nombre del método de pago requerido"}), 400

    nuevo_metodo = MetodoPago(nombre=nombre)
    db.session.add(nuevo_metodo)
    db.session.commit()

    return jsonify({"message": "Método de pago agregado con éxito"}), 201
