from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Ingreso, Egreso
from extensions import db

history_bp = Blueprint('history', __name__)

@history_bp.route('/api/history', methods=['GET'])
@jwt_required()
def get_history():
    """Obtener el historial completo del usuario autenticado"""
    user_id = get_jwt_identity()

    ingresos = Ingreso.query.filter_by(legajousuario=user_id).all()
    egresos = Egreso.query.filter_by(legajousuario=user_id).all()

    history_data = {
        "ingresos": [{
            "codigo": i.codigo,
            "descripcion": i.descripcion,
            "importe": i.importe,
            "fecha": i.fecha.strftime("%Y-%m-%d"),
            "categoria": i.categoria.nombre
        } for i in ingresos],
        "egresos": [{
            "codigo": e.codigo,
            "descripcion": e.descripcion,
            "importe": e.importe,
            "fecha": e.fecha.strftime("%Y-%m-%d"),
            "categoria": e.categoria.nombre,
            "metodo_pago": e.metodo_pago.nombre
        } for e in egresos]
    }

    return jsonify(history_data), 200
@history_bp.route('/api/history/delete_income/<int:codigo>', methods=['DELETE'])
@jwt_required()
def delete_income(codigo):
    """Eliminar un ingreso"""
    user_id = get_jwt_identity()
    ingreso = Ingreso.query.filter_by(codigo=codigo, legajousuario=user_id).first()

    if not ingreso:
        return jsonify({"error": "Ingreso no encontrado"}), 404

    db.session.delete(ingreso)
    db.session.commit()
    return jsonify({"message": "Ingreso eliminado"}), 200

@history_bp.route('/api/history/delete_expense/<int:codigo>', methods=['DELETE'])
@jwt_required()
def delete_expense(codigo):
    """Eliminar un egreso"""
    user_id = get_jwt_identity()
    egreso = Egreso.query.filter_by(codigo=codigo, legajousuario=user_id).first()

    if not egreso:
        return jsonify({"error": "Egreso no encontrado"}), 404

    db.session.delete(egreso)
    db.session.commit()
    return jsonify({"message": "Egreso eliminado"}), 200
