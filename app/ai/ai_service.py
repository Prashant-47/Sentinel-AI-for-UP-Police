import json
import re

from google import genai
from google.genai import types

from config import Config


# =====================================================
# Initialize Gemini Client
# =====================================================

client = genai.Client(
    api_key=Config.GOOGLE_API_KEY
)


# =====================================================
# Complaint Analysis Prompt
# =====================================================

SYSTEM_PROMPT = """
You are Sentinel AI.

You are an AI Investigation Assistant developed for Uttar Pradesh Police.

Your task is to analyze a citizen complaint and return ONLY VALID JSON.

Do not write markdown.
Do not write explanations.
Do not wrap JSON inside ```.

Return ONLY the following JSON structure.

{
  "summary": "",
  "complainant": {
    "name": "",
    "phone": ""
  },
  "incident": {
    "location": "",
    "date": "",
    "time": ""
  },
  "crime_category": "",
  "priority": "",
  "vehicle_numbers": [],
  "money": [],
  "missing_information": [],
  "suggested_questions": [],
  "suggested_bns_sections": [],
  "investigation_checklist": [],
  "draft_fir": "",
  "confidence": ""
}
"""


# =====================================================
# AI SERVICE
# =====================================================

class AIService:

    def __init__(self):
        self.client = client

    # =================================================
    # OCR TEXT CORRECTION
    # =================================================

    def correct_ocr_text(self, ocr_text: str):

        prompt = f"""
You are an OCR correction engine for Uttar Pradesh Police.

Your ONLY job is to reconstruct the complaint exactly as written.

Rules:

1. Fix OCR spelling mistakes.
2. Restore missing spaces.
3. Correct broken English words.
4. Correct common OCR mistakes like:
   0 ↔ O
   1 ↔ I
   5 ↔ S
   rn ↔ m
5. Preserve names exactly whenever possible.
6. Preserve dates.
7. Preserve times.
8. Preserve addresses.
9. Preserve vehicle numbers.
10. Preserve phone numbers.
11. NEVER invent information.
12. NEVER summarize.
13. NEVER rewrite the complaint.
14. Return ONLY corrected complaint text.

OCR TEXT:

{ocr_text}
"""

        try:

            response = client.models.generate_content(

                model="models/gemini-3.5-flash",

                contents=prompt,

                config=types.GenerateContentConfig(

                    temperature=0

                )

            )

            return response.text.strip()

        except Exception as e:

            print("OCR Correction Error:", e)

            return ocr_text

    # =================================================
    # COMPLAINT ANALYSIS
    # =================================================

    def analyze_complaint(self, complaint: str):

        prompt = f"""
{SYSTEM_PROMPT}

Complaint:

{complaint}
"""

        try:

            response = client.models.generate_content(

                model="models/gemini-3.5-flash",

                contents=prompt,

                config=types.GenerateContentConfig(

                    temperature=0.2,

                    response_mime_type="application/json",

                    max_output_tokens=4096

                )

            )

            text = response.text.strip()

            # Remove markdown
            text = re.sub(r"```json", "", text)
            text = re.sub(r"```", "", text)
            text = text.strip()

            # -------- Extract only JSON --------
            import json

            start = text.find("{")

            decoder = json.JSONDecoder()

            obj, end = decoder.raw_decode(text[start:])

            return obj

            # Debug
            print("\n=========== GEMINI RESPONSE ===========")
            print(text)
            print("=======================================\n")

            return json.loads(text)

        except Exception as e:

            print("=========== RAW GEMINI OUTPUT ===========")
            print(text)
            print("=========================================")
            print(e)

            return {

                "summary": "Unable to analyze complaint.",

                "complainant": {
                    "name": "",
                    "phone": ""
                },

                "incident": {
                    "location": "",
                    "date": "",
                    "time": ""
                },

                "crime_category": "Unknown",

                "priority": "Unknown",

                "vehicle_numbers": [],

                "money": [],

                "missing_information": [],

                "suggested_questions": [],

                "suggested_bns_sections": [],

                "investigation_checklist": [],

                "draft_fir": "",

                "confidence": "0"

            }