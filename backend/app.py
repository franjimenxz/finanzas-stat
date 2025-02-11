from flask import Flask, send_from_directory
from extensions import db, migrate, jwt, cors
from config import Config
from dotenv import load_dotenv
import os

app = Flask(__name__, static_url_path='/STAT/frontend', static_folder='../frontend/dist')

@app.route("/STAT/", defaults={"filename": "index.html"})
@app.route("/STAT/<path:filename>")
def serve_frontend(filename):
    return send_from_directory(app.static_folder, filename)

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

app.register_blueprint(auth_bp, url_prefix='/STAT/api/auth')
app.register_blueprint(dashboard_bp, url_prefix='/STAT/api/dashboard')
app.register_blueprint(payment_bp, url_prefix='/STAT/api/payment')
app.register_blueprint(categories_bp, url_prefix='/STAT/api/categories')
app.register_blueprint(transactions_bp, url_prefix='/STAT/api/transactions')
app.register_blueprint(history_bp, url_prefix='/STAT/api/history')
app.register_blueprint(integrations_bp, url_prefix='/STAT/api/integrations')
app.register_blueprint(admin_bp, url_prefix='/STAT/api/admin')
app.register_blueprint(tickets_bp, url_prefix='/STAT/api/tickets')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
