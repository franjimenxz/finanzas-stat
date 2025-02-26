from flask import Flask, send_from_directory
from extensions import db, migrate, jwt, cors
from config import Config
from dotenv import load_dotenv
import os

app = Flask(__name__)

app.config.from_object(Config)
load_dotenv()

db.init_app(app)
migrate.init_app(app, db)
jwt.init_app(app)
cors.init_app(app)

# Registra Blueprints con prefijo /STAT/api
from routes.auth import auth_bp
from routes.dashboard import dashboard_bp
from routes.categories import categories_bp
from routes.metodospago import payment_bp
from routes.transactions import transactions_bp
from routes.history import history_bp
from routes.integrations import integrations_bp
from routes.admin import admin_bp
from routes.tickets import tickets_bp
from routes.review import valoracion_bp

app.register_blueprint(auth_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(payment_bp)
app.register_blueprint(categories_bp)
app.register_blueprint(transactions_bp)
app.register_blueprint(history_bp)
app.register_blueprint(integrations_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(tickets_bp)
app.register_blueprint(valoracion_bp)
if __name__ == '__main__':
    app.run(debug=True)
