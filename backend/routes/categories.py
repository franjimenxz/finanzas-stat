# routes/categories.py
from flask import Blueprint, request, jsonify
from models import Categoria  # Asegúrate de importar tu modelo
  
categories_bp = Blueprint('categories', __name__)
  
@categories_bp.route('/api/categories', methods=['GET'])
def get_categories():
    tipo = request.args.get('tipo')
    if not tipo or tipo not in ['ingreso', 'egreso']:
        return jsonify({"error": "Tipo de categoría inválido"}), 400
    
    categorias = Categoria.query.filter_by(tipo=tipo).all()
    return jsonify({
        "categories": [{"id": c.id, "nombre": c.nombre} for c in categorias]
    })
