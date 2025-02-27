from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Ingreso, Egreso
from extensions import db
from flask import Response
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import io
from services.verify_users import verifyuser

history_bp = Blueprint('history', __name__)

@history_bp.route('/api/history', methods=['GET'])
@jwt_required()
def get_history():
    error_response = verifyuser()
    if error_response:
        return error_response
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

@history_bp.route('/api/history/download_pdf', methods=['GET'])
@jwt_required()
def download_history_pdf():
    error_response = verifyuser()
    if error_response:
        return error_response
    """Genera un PDF con el historial de ingresos y egresos del usuario"""
    user_id = get_jwt_identity()

    ingresos = Ingreso.query.filter_by(legajousuario=user_id).all()
    egresos = Egreso.query.filter_by(legajousuario=user_id).all()

    # Crear un buffer de memoria para el PDF
    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)
    pdf.setTitle("Historial de Finanzas")

    # Encabezado
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(200, 750, "Historial de Ingresos y Egresos")

    # Sección de Ingresos
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, 720, "Ingresos:")
    pdf.setFont("Helvetica", 10)

    y_position = 700  # Posición inicial

    for ingreso in ingresos:
        pdf.drawString(50, y_position, f"{ingreso.fecha.strftime('%Y-%m-%d')} - {ingreso.descripcion}: ${ingreso.importe}")
        y_position -= 15
        if y_position < 50:  # Salto de página si es necesario
            pdf.showPage()
            pdf.setFont("Helvetica", 10)
            y_position = 750

    # Sección de Egresos
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y_position - 20, "Egresos:")
    pdf.setFont("Helvetica", 10)
    y_position -= 40

    for egreso in egresos:
        pdf.drawString(50, y_position, f"{egreso.fecha.strftime('%Y-%m-%d')} - {egreso.descripcion}: ${egreso.importe} (Método: {egreso.metodo_pago.nombre})")
        y_position -= 15
        if y_position < 50:
            pdf.showPage()
            pdf.setFont("Helvetica", 10)
            y_position = 750

    # Guardar el PDF en memoria
    pdf.save()
    buffer.seek(0)

    # Devolver el PDF como respuesta HTTP
    return Response(buffer, mimetype="application/pdf",
                    headers={"Content-Disposition": "attachment;filename=historial_financiero.pdf"})
