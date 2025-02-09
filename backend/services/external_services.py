import requests
from config import Config

def get_tickets(user_id):
    """Simula la obtención de tickets desde la API externa"""
    if Config.TICKETS_API_URL:
        url = f"{Config.TICKETS_API_URL}/tickets?user_id={user_id}"
        response = requests.get(url)
        return response.json() if response.status_code == 200 else None
    else:
        # Simulación hasta que la API esté lista
        return [{"id": 1, "subject": "Simulación de ticket", "description": "Descripción de prueba", "status": "pendiente"}]

def get_reviews():
    """Simula la obtención de reseñas desde la API externa"""
    if Config.REVIEWS_API_URL:
        url = f"{Config.REVIEWS_API_URL}/reviews"
        response = requests.get(url)
        return response.json() if response.status_code == 200 else None
    else:
        # Simulación hasta que la API esté lista
        return [{"id": 1, "user_id": 2, "rating": 5, "comment": "Sistema excelente"}]
