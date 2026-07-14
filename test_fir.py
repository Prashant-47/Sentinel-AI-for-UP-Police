from app.ai.fir_service import FIRService

fir = FIRService()

result = fir.generate_fir(

    police_station="Kidwai Nagar",

    district="Kanpur Nagar",

    complainant="Rahul Sharma",

    mobile="9876543210",

    complaint="""
My motorcycle UP78AB1234 was stolen yesterday while I was shopping near Kidwai Nagar.

The value of the vehicle is ₹55000.

There were two eyewitnesses.
"""

)

print(result)