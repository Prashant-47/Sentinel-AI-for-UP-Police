import re
import spacy

# Load spaCy model once
nlp = spacy.load("en_core_web_sm")


class EntityExtractor:

    def __init__(self):

        # Common locality indicators
        self.location_patterns = [

            r"near\s+([A-Za-z0-9\s]+?)(?:\s+while|\s+when|\s+after|\s+before|,|\.|$)",
            r"at\s+([A-Za-z0-9\s]+?)(?:\s+while|\s+when|\s+after|\s+before|,|\.|$)",
            r"from\s+([A-Za-z0-9\s]+?)(?:\s+while|\s+when|\s+after|\s+before|,|\.|$)",
            r"in\s+([A-Za-z0-9\s]+?)(?:\s+while|\s+when|\s+after|\s+before|,|\.|$)"

        ]

    def extract(self, text):

        doc = nlp(text)

        result = {

            "person": [],
            "location": [],
            "phone_numbers": [],
            "vehicle_numbers": [],
            "money": [],
            "dates": []

        }

        # --------------------------------------
        # spaCy Named Entity Recognition
        # --------------------------------------

        for ent in doc.ents:

            label = ent.label_

            value = ent.text.strip()

            if label == "PERSON":

                if value not in result["person"]:
                    result["person"].append(value)

            elif label in ["GPE", "LOC"]:

                if value not in result["location"]:
                    result["location"].append(value)

            elif label == "DATE":

                # Ignore phone numbers wrongly detected as dates
                if not re.fullmatch(r"\d{10}", value):

                    if value not in result["dates"]:
                        result["dates"].append(value)

            elif label == "MONEY":

                if value not in result["money"]:
                    result["money"].append(value)

        # --------------------------------------
        # Phone Numbers
        # --------------------------------------

        phones = re.findall(
            r'(?:\+91[- ]?)?[6-9]\d{9}',
            text
        )

        result["phone_numbers"] = list(set(phones))

        # --------------------------------------
        # Vehicle Numbers
        # --------------------------------------

        vehicles = re.findall(
            r'[A-Z]{2}[ -]?\d{1,2}[ -]?[A-Z]{1,3}[ -]?\d{4}',
            text.upper()
        )

        result["vehicle_numbers"] = list(set(vehicles))

        # --------------------------------------
        # Money (Regex Backup)
        # --------------------------------------

        money_regex = re.findall(
            r'₹\s?\d+(?:,\d+)*|\d+(?:,\d+)*\s?(?:rupees|rs)',
            text,
            flags=re.IGNORECASE
        )

        for amount in money_regex:

            if amount not in result["money"]:
                result["money"].append(amount)

        # --------------------------------------
        # Rule Based Location Detection
        # --------------------------------------

        for pattern in self.location_patterns:

            matches = re.findall(pattern, text, flags=re.IGNORECASE)

            for location in matches:

                location = location.strip()

                # Remove extra spaces
                location = re.sub(r"\s+", " ", location)

                # Ignore tiny matches
                if len(location) < 3:
                    continue

                # Remove common ending words
                location = re.sub(
                    r"\b(the|a|an)$",
                    "",
                    location,
                    flags=re.IGNORECASE
                ).strip()

                if location not in result["location"]:
                    result["location"].append(location)

        # --------------------------------------
        # Remove duplicates
        # --------------------------------------

        for key in result:

            result[key] = list(dict.fromkeys(result[key]))

        return result