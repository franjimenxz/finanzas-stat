from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.external_services import report_ticket

tickets_bp = Blueprint('tickets', __name__)

@tickets_bp.route('/api/external/tickets', methods=['POST'])
@jwt_required()
def report_issue():
    """ Recibe el reporte desde el frontend y lo envía a la API Mock """
    data = request.get_json()
    descripcion = data.get("description", "").strip()

    if not descripcion or len(descripcion) < 5:
        return jsonify({"error": "La descripción debe tener al menos 5 caracteres."}), 400

    usuario = get_jwt_identity()  # Obtener el usuario autenticado

    result, status_code = report_ticket(usuario, descripcion)
    return jsonify(result), status_code
