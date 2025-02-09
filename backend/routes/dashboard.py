from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Ingreso, Egreso, Categoria
from extensions import db
from sqlalchemy import func

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/api/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    """Obtener estadísticas del usuario autenticado con filtro opcional por fecha"""
    user_id = get_jwt_identity()
    fecha = request.args.get("fecha")  # 📌 Obtener la fecha desde la URL

    print(f"Usuario autenticado en backend: {user_id}, Fecha seleccionada: {fecha}")

    # Filtrar ingresos y egresos por fecha si se proporciona
    ingresos_query = db.session.query(Ingreso).filter_by(legajousuario=user_id)
    egresos_query = db.session.query(Egreso).filter_by(legajousuario=user_id)

    if fecha:
        ingresos_query = ingresos_query.filter(Ingreso.fecha == fecha)
        egresos_query = egresos_query.filter(Egreso.fecha == fecha)

    # Obtener totales
    ingresos_totales = db.session.query(func.sum(Ingreso.importe)).filter(Ingreso.legajousuario == user_id)
    egresos_totales = db.session.query(func.sum(Egreso.importe)).filter(Egreso.legajousuario == user_id)

    if fecha:
        ingresos_totales = ingresos_totales.filter(Ingreso.fecha == fecha)
        egresos_totales = egresos_totales.filter(Egreso.fecha == fecha)

    ingresos_totales = ingresos_totales.scalar() or 0
    egresos_totales = egresos_totales.scalar() or 0

    # Obtener ingresos y egresos por categoría
    ingresos_por_categoria = db.session.query(
        Categoria.nombre, func.sum(Ingreso.importe)
    ).join(Ingreso).filter(Ingreso.legajousuario == user_id)

    egresos_por_categoria = db.session.query(
        Categoria.nombre, func.sum(Egreso.importe)
    ).join(Egreso).filter(Egreso.legajousuario == user_id)

    if fecha:
        ingresos_por_categoria = ingresos_por_categoria.filter(Ingreso.fecha == fecha)
        egresos_por_categoria = egresos_por_categoria.filter(Egreso.fecha == fecha)

    ingresos_por_categoria = ingresos_por_categoria.group_by(Categoria.nombre).all()
    egresos_por_categoria = egresos_por_categoria.group_by(Categoria.nombre).all()

    # Transformar en JSON
    ingresos_json = [{"categoria": i[0], "total": i[1]} for i in ingresos_por_categoria]
    egresos_json = [{"categoria": e[0], "total": e[1]} for e in egresos_por_categoria]

    return jsonify({
        "ingresos_totales": ingresos_totales,
        "egresos_totales": egresos_totales,
        "ingresos_por_categoria": ingresos_json,
        "egresos_por_categoria": egresos_json,
        "mensaje": "Acceso autorizado",
        "usuario_id": user_id
    }), 200
