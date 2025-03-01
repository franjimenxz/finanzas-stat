from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.external_services import report_ticket, obtener_usuario_desde_bd

tickets_bp = Blueprint('tickets', __name__)

@tickets_bp.route('/api/external/tickets', methods=['POST'])
@jwt_required()
def create_ticket():
    """ Recibe un ticket desde el frontend y lo envía a la API Mock """
    data = request.get_json()
    user_id = get_jwt_identity()  

    descripcion = data.get("description", "").strip()

    if not descripcion:
        return jsonify({"error": "La descripción del problema es obligatoria."}), 400


    usuario = obtener_usuario_desde_bd(user_id)

    if not usuario or not usuario.get("nombre") or not usuario.get("dni"):
        return jsonify({"error": "No se encontró el usuario o su DNI"}), 400

    nombre = usuario.get("nombre")
    dni = usuario.get("dni")  

    
    result, status_code = report_ticket(nombre, dni, descripcion)
    return jsonify(result), status_code



@tickets_bp.route('/api/external/tickets/simulacion', methods=['POST'])
@jwt_required()
def create_ticket_simulacion():
    data = request.get_json()
    if not data.nombre or not data.dni or not data.descripcion:
        return jsonify({"error": "Datos insuficientes"}), 400
    
    return jsonify({
                        "Mensaje" : "Se ha registrado el reporte, a la brevedad sera respondido",
                        "Usuario" : data.nombre,
                        "contrasena": data.dni,
                        "reporte" : data.descripcion
                    })