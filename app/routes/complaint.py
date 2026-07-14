from flask import Blueprint, render_template

complaint_bp = Blueprint("complaint", __name__)

@complaint_bp.route("/complaint")
def complaint():

    return render_template("complaint.html")