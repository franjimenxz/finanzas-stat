import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'clave_secreta')
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:TheLegends123@localhost/GestionFina'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'supersecreto')


    # URLs de APIs externas (vacías por ahora)
    TICKETS_API_URL = None  # Se llenará cuando esté disponible
    REVIEWS_API_URL = None  # Se llenará cuando esté disponible

    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")  # No pongas aquí directamente el correo
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")  # No pongas aquí directamente la contraseña
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER", MAIL_USERNAME)

