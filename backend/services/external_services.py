import requests
from config import Config
from models import Usuario
def report_ticket(usuario, dni, descripcion):
    """ Envía un reporte de problema a la API Mock usando los datos del usuario autenticado """
    payload = {
        "usuario": usuario, 
        "contrasena": dni,  
        "reporte": descripcion
    }

    try:
        response = requests.post(Config.MOCK_TICKETS_URL, json=payload) #Esta redirijido a una api propia para simular sin el uso de postman

        if response.status_code not in (200, 201):
            return {"error": "Error al enviar el reporte", "detalle": response.text}, response.status_code

        return {"mensaje": "Reporte enviado con éxito"}, 201

    except requests.exceptions.RequestException as e:
        return {"error": "Error de conexión con la API Mock", "detalle": str(e)}, 500
    
    
def send_review(usuario, dni, stars, descripcion):
    """ Registra un usuario y su review en la API Mock """
    try:
        response_usuario = requests.post(
            Config.MOCK_USER_URL, json={"Usuario": usuario, "DNI": dni}
        )

        # Aceptar tanto 200 como 201 como respuesta exitosa
        if response_usuario.status_code not in (200, 201):
            return {
                "error": "Error al registrar usuario",
                "detalle": response_usuario.text,
            }, response_usuario.status_code

        id_usuario = response_usuario.json().get("idUsuario")
        if not id_usuario:
            return {"error": "No se recibió idUsuario en la respuesta"}, 500


        data_review = {"id": id_usuario, "stars": stars, "description": descripcion}
        response_review = requests.post(
            Config.MOCK_REVIEWS_URL, json=data_review
        )

        # Aceptar tanto 200 como 201 como respuesta exitosa
        if response_review.status_code not in (200, 201):
            return {
                "error": "Error al registrar review",
                "detalle": response_review.text,
            }, response_review.status_code

        return {"mensaje": "Usuario y review registrados con éxito"}, 201

    except requests.exceptions.RequestException as e:
        return {
            "error": "Error de conexión con las APIs",
            "detalle": str(e)
        }, 500
        
        
def obtener_usuario_desde_bd(user_id):
    """ Obtiene el nombre y DNI de un usuario autenticado desde la base de datos """
    usuario = Usuario.query.filter_by(legajo=user_id).first()
    return {"nombre": usuario.nombre, "dni": usuario.dni} if usuario else None