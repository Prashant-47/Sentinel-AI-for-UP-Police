from flask import Blueprint, render_template, request, jsonify

from app.ai.fir_service import FIRService

fir_bp = Blueprint("fir", __name__)

fir_service = FIRService()


# --------------------------------------------------
# FIR Generator Page
# --------------------------------------------------

@fir_bp.route("/fir")
def fir_page():

    return render_template("fir.html")


# --------------------------------------------------
# AI FIR Generation API
# --------------------------------------------------

@fir_bp.route("/api/generate-fir", methods=["POST"])
def generate_fir():

    try:

        data = request.get_json()

        police_station = data.get("police_station", "")
        district = data.get("district", "")
        complainant = data.get("complainant", "")
        mobile = data.get("mobile", "")
        complaint = data.get("complaint", "")

        result = fir_service.generate_fir(

            police_station=police_station,

            district=district,

            complainant=complainant,

            mobile=mobile,

            complaint=complaint

        )

        return jsonify({
            "success": True,
            "data": result
})

    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500