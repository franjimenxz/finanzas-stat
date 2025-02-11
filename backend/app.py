from flask import Flask, send_from_directory
from extensions import db, migrate, jwt, cors
from config import Config
from dotenv import load_dotenv

from routes.auth import auth_bp
from routes.dashboard import dashboard_bp
from routes.categories import categories_bp
from routes.metodospago import payment_bp
from routes.transactions import transactions_bp
from routes.history import history_bp
from routes.integrations import integrations_bp
from routes.admin import admin_bp
from routes.tickets import tickets_bp

import os
frontend_folder= os.path.join(os.getcwd(),"../frontend")
app = Flask(__name__,static_folder=frontend_folder)



@app.route("/", defaults={"filename":"index.html"})
@app.route("/<path:filename>")
def serve_frontend(filename):
       return send_from_directory(app.static_folder, filename)


app.config.from_object(Config)
load_dotenv()


db.init_app(app)
migrate.init_app(app, db)
jwt.init_app(app)
#cors.init_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(payment_bp)
app.register_blueprint(categories_bp)
app.register_blueprint(transactions_bp)
app.register_blueprint(history_bp)  # 📌 NUEVO: Historial
app.register_blueprint(integrations_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(tickets_bp)

if __name__ == '__main__':
    app.run(debug=True)
