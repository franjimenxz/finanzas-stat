from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.external_services import get_tickets, get_reviews

integrations_bp = Blueprint('integrations', __name__)

@integrations_bp.route('/api/external/tickets', methods=['GET'])
@jwt_required()
def fetch_tickets():
    """Endpoint para obtener tickets desde la API externa (o simulación)"""
    user_id = get_jwt_identity()
    tickets = get_tickets(user_id)
    return jsonify(tickets), 200

@integrations_bp.route('/api/external/reviews', methods=['GET'])
def fetch_reviews():
    """Endpoint para obtener reseñas desde la API externa (o simulación)"""
    reviews = get_reviews()
    return jsonify(reviews), 200
