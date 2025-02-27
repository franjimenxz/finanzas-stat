import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'clave_secreta')
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI', 'postgresql://postgres:TheLegends123@localhost/gestionfina')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'supersecreto')


    # URLs de APIs externas (vacías por ahora)
    TICKETS_API_URL = None  # Se llenará cuando esté disponible
    REVIEWS_API_URL = None  # Se llenará cuando esté disponible

    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")  # No poner directamente el correo
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")  # No poner directamente la contraseña
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER", MAIL_USERNAME)

    MOCK_TICKETS_URL = "https://fd2a4979-0e60-4fe0-a20c-6c7033adeea0.mock.pstmn.io/reporte"
    MOCK_REVIEWS_URL = "https://70c1f424-979c-485d-b613-b680f4137e29.mock.pstmn.io/registrarReview"
    MOCK_USER_URL = "https://d7eeb8cd-b270-44e8-afa9-f7e3ee92bbed.mock.pstmn.io/api/nuevoUsuario"