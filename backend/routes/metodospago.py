
from flask import Blueprint, request, jsonify
from models import MetodoPago  # Asegúrate de importar tu modelo de métodos de pago

payment_bp = Blueprint('payment', __name__)

@payment_bp.route('/api/payment_methods', methods=['GET'])
def get_payment_methods():
    # Obtiene todos los métodos de pago
    methods = MetodoPago.query.all()
    return jsonify({
        "paymentMethods": [{"id": method.id, "nombre": method.nombre} for method in methods]
    })
