from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Ingreso, Egreso, Categoria
from extensions import db
from sqlalchemy import func, extract
from datetime import datetime, timedelta
from services.verify_users import verifyuser

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/api/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    error_response = verifyuser()
    if error_response:
        return error_response 
    """Obtener estadísticas detalladas del usuario autenticado con filtro opcional por fecha"""
    user_id = get_jwt_identity()
    fecha = request.args.get("fecha")  

    print(f"Usuario autenticado en backend: {user_id}, Fecha seleccionada: {fecha}")


    ingresos_query = db.session.query(Ingreso).filter_by(legajousuario=user_id)
    egresos_query = db.session.query(Egreso).filter_by(legajousuario=user_id)

    if fecha:
        ingresos_query = ingresos_query.filter(Ingreso.fecha == fecha)
        egresos_query = egresos_query.filter(Egreso.fecha == fecha)


    ingresos_totales = db.session.query(func.sum(Ingreso.importe)).filter(Ingreso.legajousuario == user_id).scalar() or 0
    egresos_totales = db.session.query(func.sum(Egreso.importe)).filter(Egreso.legajousuario == user_id).scalar() or 0

    if fecha:
        ingresos_totales = db.session.query(func.sum(Ingreso.importe)).filter(Ingreso.legajousuario == user_id, Ingreso.fecha == fecha).scalar() or 0
        egresos_totales = db.session.query(func.sum(Egreso.importe)).filter(Egreso.legajousuario == user_id, Egreso.fecha == fecha).scalar() or 0

    balance = ingresos_totales - egresos_totales


    ingresos_por_categoria = db.session.query(
        Categoria.nombre, func.sum(Ingreso.importe)
    ).join(Ingreso).filter(Ingreso.legajousuario == user_id).group_by(Categoria.nombre).all()

    egresos_por_categoria = db.session.query(
        Categoria.nombre, func.sum(Egreso.importe)
    ).join(Egreso).filter(Egreso.legajousuario == user_id).group_by(Categoria.nombre).all()

    ingresos_json = [{"categoria": i[0], "total": i[1]} for i in ingresos_por_categoria]
    egresos_json = [{"categoria": e[0], "total": e[1]} for e in egresos_por_categoria]


    ingresos_mensuales = db.session.query(
        extract('year', Ingreso.fecha), extract('month', Ingreso.fecha), func.sum(Ingreso.importe)
    ).filter(Ingreso.legajousuario == user_id).group_by(extract('year', Ingreso.fecha), extract('month', Ingreso.fecha)).all()

    egresos_mensuales = db.session.query(
        extract('year', Egreso.fecha), extract('month', Egreso.fecha), func.sum(Egreso.importe)
    ).filter(Egreso.legajousuario == user_id).group_by(extract('year', Egreso.fecha), extract('month', Egreso.fecha)).all()

    ingresos_mensuales_json = [{"year": i[0], "month": i[1], "total": i[2]} for i in ingresos_mensuales]
    egresos_mensuales_json = [{"year": e[0], "month": e[1], "total": e[2]} for e in egresos_mensuales]

    dias_con_ingresos = db.session.query(Ingreso.fecha).filter(Ingreso.legajousuario == user_id).distinct().count()
    dias_con_egresos = db.session.query(Egreso.fecha).filter(Egreso.legajousuario == user_id).distinct().count()

    promedio_ingresos = ingresos_totales / dias_con_ingresos if dias_con_ingresos else 0
    promedio_egresos = egresos_totales / dias_con_egresos if dias_con_egresos else 0


    fecha_actual = datetime.utcnow()
    primer_dia_mes = fecha_actual.replace(day=1)

    gasto_mas_alto = db.session.query(func.max(Egreso.importe)).filter(
        Egreso.legajousuario == user_id, Egreso.fecha >= primer_dia_mes).scalar() or 0

    gasto_mas_bajo = db.session.query(func.min(Egreso.importe)).filter(
        Egreso.legajousuario == user_id, Egreso.fecha >= primer_dia_mes).scalar() or 0

    fecha_hace_7_dias = fecha_actual - timedelta(days=7)

    gastos_ultimos_7_dias = db.session.query(
        Egreso.fecha, func.sum(Egreso.importe)
    ).filter(Egreso.legajousuario == user_id, Egreso.fecha >= fecha_hace_7_dias).group_by(Egreso.fecha).all()

    tendencia_gastos_json = [{"fecha": g[0].strftime("%Y-%m-%d"), "total": g[1]} for g in gastos_ultimos_7_dias]

    return jsonify({
        "ingresos_totales": ingresos_totales,
        "egresos_totales": egresos_totales,
        "balance": balance,
        "ingresos_por_categoria": ingresos_json,
        "egresos_por_categoria": egresos_json,
        "ingresos_mensuales": ingresos_mensuales_json,
        "egresos_mensuales": egresos_mensuales_json,
        "promedio_ingresos_diarios": promedio_ingresos,
        "promedio_egresos_diarios": promedio_egresos,
        "gasto_mas_alto_mes": gasto_mas_alto,
        "gasto_mas_bajo_mes": gasto_mas_bajo,
        "tendencia_gastos_ultimos_7_dias": tendencia_gastos_json,
        "mensaje": "Acceso autorizado",
        "usuario_id": user_id
    }), 200
