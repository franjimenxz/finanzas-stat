import requests
from config import Config

def get_tickets(user_id):
    """
    Obtiene los tickets del usuario desde la API externa.
    Si la API no está disponible, devuelve una respuesta simulada.
    """
    if Config.TICKETS_API_URL:
        url = f"{Config.TICKETS_API_URL}/api/tickets?user_id={user_id}"

        try:
            response = requests.get(url, timeout=5)  # Timeout de 5 segundos
            if response.status_code == 200:
                data = response.json()
                return data.get("tickets", [])  # Asegurar que devuelve una lista de tickets
            else:
                return {"error": "No se pudo obtener los tickets", "detalles": response.text}
        except requests.exceptions.RequestException as e:
            return {"error": "Error de conexión con el sistema de tickets", "detalles": str(e)}

    # Simulación si la API no está disponible
    return [
        {"id": 1, "subject": "Simulación de ticket", "description": "Descripción de prueba", "status": "pendiente"},
        {"id": 2, "subject": "Otro ticket simulado", "description": "Otro problema de prueba", "status": "resuelto"}
    ]


def report_issue(user_id, descripcion):
    """
    Reporta un problema enviándolo a la API externa.
    Si la API no está disponible, devuelve un error.
    """
    if Config.TICKETS_API_URL:
        url = f"{Config.TICKETS_API_URL}/api/tickets"

        payload = {
            "user_id": user_id,
            "description": descripcion
        }

        try:
            response = requests.post(url, json=payload, timeout=5)  # Timeout de 5 segundos
            if response.status_code in [200, 201]:  # Éxito al crear el ticket
                return response.json()
            else:
                return {"error": "No se pudo enviar el ticket", "detalles": response.text}
        except requests.exceptions.RequestException as e:
            return {"error": "Error de conexión con el sistema de tickets", "detalles": str(e)}

    return {"error": "API de tickets no configurada"}


def get_reviews():
    """Simula la obtención de reseñas desde la API externa"""
    if Config.REVIEWS_API_URL:
        url = f"{Config.REVIEWS_API_URL}/reviews"
        response = requests.get(url)
        return response.json() if response.status_code == 200 else None
    else:
        # Simulación hasta que la API esté lista
        return [{"id": 1, "user_id": 2, "rating": 5, "comment": "Sistema excelente"}]
