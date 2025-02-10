from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.external_services import get_tickets, report_issue

tickets_bp = Blueprint('tickets', __name__)

@tickets_bp.route('/api/tickets', methods=['GET'])
@jwt_required()
def obtener_tickets():
    """ Obtener los tickets de un usuario autenticado """
    user_id = get_jwt_identity()
    tickets = get_tickets(user_id)
    return jsonify({"tickets": tickets}), 200

@tickets_bp.route('/api/tickets', methods=['POST'])
@jwt_required()
def crear_ticket():
    """ Reportar un problema """
    user_id = get_jwt_identity()
    data = request.get_json()
    descripcion = data.get("description")

    if not descripcion:
        return jsonify({"error": "La descripción es obligatoria"}), 400

    resultado = report_issue(user_id, descripcion)
    return jsonify(resultado), 201 if "error" not in resultado else 400
