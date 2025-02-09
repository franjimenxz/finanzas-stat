from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Ingreso, Egreso, db

transactions_bp = Blueprint('transactions', __name__)

@transactions_bp.route('/api/add_income', methods=['POST'])
@jwt_required()
def add_income():
    """Agregar un ingreso"""
    user_id = get_jwt_identity()
    data = request.get_json()

    if not all([data.get('descripcion'), data.get('importe'), data.get('idcategoria')]):
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    nuevo_ingreso = Ingreso(
        descripcion=data['descripcion'],
        importe=data['importe'],
        idcategoria=data['idcategoria'],
        legajousuario=user_id
    )

    db.session.add(nuevo_ingreso)
    db.session.commit()
    return jsonify({"message": "Ingreso registrado correctamente"}), 201

@transactions_bp.route('/api/add_expense', methods=['POST'])
@jwt_required()
def add_expense():
    """Agregar un egreso"""
    user_id = get_jwt_identity()
    data = request.get_json()

    if not all([data.get('descripcion'), data.get('importe'), data.get('idcategoria'), data.get('idMetodoPago')]):
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    nuevo_egreso = Egreso(
        descripcion=data['descripcion'],
        importe=data['importe'],
        idcategoria=data['idcategoria'],
        idMetodoPago=data['idMetodoPago'],
        legajousuario=user_id
    )

    db.session.add(nuevo_egreso)
    db.session.commit()
    return jsonify({"message": "Egreso registrado correctamente"}), 201

@transactions_bp.route('/api/incomes', methods=['GET'])
@jwt_required()
def get_incomes():
    """Obtener ingresos del usuario autenticado"""
    user_id = get_jwt_identity()
    ingresos = Ingreso.query.filter_by(legajousuario=user_id).all()
    
    return jsonify([{
        "codigo": i.codigo,
        "descripcion": i.descripcion,
        "importe": i.importe,
        "fecha": i.fecha.strftime("%Y-%m-%d"),
        "categoria": i.categoria.nombre
    } for i in ingresos])

@transactions_bp.route('/api/expenses', methods=['GET'])
@jwt_required()
def get_expenses():
    """Obtener egresos del usuario autenticado"""
    user_id = get_jwt_identity()
    egresos = Egreso.query.filter_by(legajousuario=user_id).all()
    
    return jsonify([{
        "codigo": e.codigo,
        "descripcion": e.descripcion,
        "importe": e.importe,
        "fecha": e.fecha.strftime("%Y-%m-%d"),
        "categoria": e.categoria.nombre,
        "metodo_pago": e.metodo_pago.nombre
    } for e in egresos])
