from pprint import pprint

from app.ai.ai_service import AIService

ai = AIService()

complaint = """
My name is Rahul Sharma.

My motorcycle UP78AB1234 was stolen yesterday near Kidwai Nagar while I was shopping.

The vehicle cost ₹55000.

Please contact me on 9876543210.

There were two eyewitnesses.
"""

result = ai.analyze_complaint(complaint)

print("\n")
print("=" * 70)
print("SENTINEL AI RESPONSE")
print("=" * 70)

pprint(result)

print("=" * 70)