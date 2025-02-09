class Config:
    SECRET_KEY = 'clave_secreta'
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:TheLegends123@localhost/GestionFina'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'supersecreto'

    # URLs de APIs externas (vacías por ahora)
    TICKETS_API_URL = None  # Se llenará cuando esté disponible
    REVIEWS_API_URL = None  # Se llenará cuando esté disponible
