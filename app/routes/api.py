from flask import Blueprint, jsonify, request

from app.ai.ai_service import AIService

api_bp = Blueprint("api", __name__)

ai = AIService()


@api_bp.route("/api/analyze", methods=["POST"])
def analyze():

    data = request.get_json()

    complaint = data.get("complaint", "")

    result = ai.analyze_complaint(complaint)

    return jsonify(result)