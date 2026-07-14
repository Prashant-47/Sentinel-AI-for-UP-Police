from flask import Flask
from config import Config

def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    from app.routes.home import home_bp
    from app.routes.complaint import complaint_bp
    from app.routes.api import api_bp
    from app.routes.fir import fir_bp
    from app.routes.ocr import ocr_bp

    app.register_blueprint(home_bp)
    app.register_blueprint(complaint_bp)
    app.register_blueprint(api_bp)
    app.register_blueprint(fir_bp)
    app.register_blueprint(ocr_bp)

    return app