import json
import re

from google import genai
from google.genai import types

from config import Config


client = genai.Client(
    api_key=Config.GOOGLE_API_KEY
)


SYSTEM_PROMPT = """
You are Sentinel AI.

You are an expert Investigation Officer of Uttar Pradesh Police.

Generate a professional FIR draft.

Return ONLY VALID JSON.

Never return markdown.

Schema:

{
    "fir_number":"",
    "police_station":"",
    "district":"",
    "complainant":"",
    "mobile":"",
    "crime_category":"",
    "priority":"",
    "bns_sections":[],
    "fir_narrative":"",
    "investigation_notes":[],
    "next_actions":[]
}
"""


class FIRService:

    def generate_fir(

        self,

        police_station,

        district,

        complainant,

        mobile,

        complaint

    ):

        prompt = f"""
{SYSTEM_PROMPT}

Police Station:

{police_station}

District:

{district}

Complainant:

{complainant}

Mobile:

{mobile}

Complaint:

{complaint}

Generate a detailed FIR.

The FIR should:

1. Be legally formatted.

2. Mention complainant.

3. Mention police station.

4. Identify crime category.

5. Suggest appropriate BNS sections.

6. Draft a professional FIR narrative.

7. Suggest investigation notes.

8. Suggest immediate next actions.

Return ONLY JSON.
"""

        try:

            response = client.models.generate_content(

                model="models/gemini-3.5-flash",

                contents=prompt,

                config=types.GenerateContentConfig(

                    temperature=0.2,

                    response_mime_type="application/json"

                )

            )

            text = response.text.strip()

            text = re.sub(r"```json", "", text)

            text = re.sub(r"```", "", text)

            text = text.strip()

            data = json.loads(text)

            if not data.get("fir_number"):

                data["fir_number"] = "AUTO-GENERATED"

            if not data.get("police_station"):

                data["police_station"] = police_station

            if not data.get("district"):

                data["district"] = district

            if not data.get("complainant"):

                data["complainant"] = complainant

            if not data.get("mobile"):

                data["mobile"] = mobile

            return data

        except Exception as e:

            print(e)

            return {

                "fir_number": "AUTO-GENERATED",

                "police_station": police_station,

                "district": district,

                "complainant": complainant,

                "mobile": mobile,

                "crime_category": "Unknown",

                "priority": "Unknown",

                "bns_sections": [],

                "fir_narrative": "Unable to generate FIR.",

                "investigation_notes": [],

                "next_actions": []

            }