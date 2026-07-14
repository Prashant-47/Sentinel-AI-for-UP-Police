import os
import uuid

from flask import (
    Blueprint,
    render_template,
    request,
    jsonify,
    current_app
)

from werkzeug.utils import secure_filename

from app.ai.ocr_service import OCRService


ocr_bp = Blueprint("ocr", __name__)

ocr_service = OCRService()


# ==========================================
# OCR PAGE
# ==========================================

@ocr_bp.route("/ocr")
def ocr_page():

    return render_template("ocr.html")


# ==========================================
# OCR API
# ==========================================

@ocr_bp.route("/api/ocr", methods=["POST"])
def process_ocr():

    try:

        if "image" not in request.files:

            return jsonify({

                "success": False,

                "error": "No image uploaded."

            }), 400

        file = request.files["image"]

        if file.filename == "":

            return jsonify({

                "success": False,

                "error": "No image selected."

            }), 400

        upload_folder = os.path.join(
            current_app.root_path,
            "uploads"
        )

        os.makedirs(upload_folder, exist_ok=True)

        filename = (
            str(uuid.uuid4())
            + "_"
            + secure_filename(file.filename)
        )

        image_path = os.path.join(
            upload_folder,
            filename
        )

        file.save(image_path)

        result = ocr_service.analyze_image(
            image_path
        )

        try:
            os.remove(image_path)
        except:
            pass

        return jsonify(result)

    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500