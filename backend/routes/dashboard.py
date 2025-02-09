from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Ingreso, Egreso
from extensions import db
from sqlalchemy import func

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/api/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    user_id = get_jwt_identity()
    print(f"Usuario autenticado en backend: {user_id}")
    
    ingresos_totales = db.session.query(func.sum(Ingreso.importe)).filter_by(legajousuario=user_id).scalar() or 0
    egresos_totales = db.session.query(func.sum(Egreso.importe)).filter_by(legajousuario=user_id).scalar() or 0

    return jsonify({
        "ingresos_totales": ingresos_totales,
        "egresos_totales": egresos_totales,
        "mensaje": "Acceso autorizado",
        "usuario_id": user_id
    })
