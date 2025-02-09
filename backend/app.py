from flask import Flask
from extensions import db, migrate, jwt, cors
from config import Config

from routes.auth import auth_bp
from routes.dashboard import dashboard_bp
from routes.transactions import transactions_bp
from routes.history import history_bp
from routes.integrations import integrations_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate.init_app(app, db)
jwt.init_app(app)
cors.init_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(transactions_bp)
app.register_blueprint(history_bp)  # 📌 NUEVO: Historial
app.register_blueprint(integrations_bp)

if __name__ == '__main__':
    app.run(debug=True)
