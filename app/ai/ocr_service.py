import re
import cv2
import easyocr
import numpy as np

from PIL import Image

from app.ai.ai_service import AIService


class OCRService:

    def __init__(self):

        # OCR Reader
        # Supports English and Hindi
        self.reader = easyocr.Reader(
            ['en', 'hi'],
            gpu=False
        )

        self.ai = AIService()

    # --------------------------------------------------

    def preprocess_image(self, image_path):

        image = cv2.imread(image_path)

        if image is None:
            raise Exception("Unable to read image.")

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        gray = cv2.fastNlMeansDenoising(gray)

        gray = cv2.resize(
            gray,
            None,
            fx=2,
            fy=2,
            interpolation=cv2.INTER_CUBIC
        )

        gray = cv2.equalizeHist(gray)

        thresh = cv2.threshold(
            gray,
            0,
            255,
            cv2.THRESH_BINARY + cv2.THRESH_OTSU
        )[1]

        return thresh
    # --------------------------------------------------

    from PIL import Image

    def extract_text(self, image_path):

        image = Image.open(image_path)

        prompt = """
    Extract ALL text from this image.

    Rules:

    - Return exactly what is written.
    - Preserve names.
    - Preserve dates.
    - Preserve phone numbers.
    - Preserve vehicle numbers.
    - Preserve punctuation.
    - Preserve line breaks whenever possible.
    - Do NOT summarize.
    - Do NOT explain.
    - Do NOT invent words.

    Return ONLY the extracted text.
    """

        response = self.ai.client.models.generate_content(

            model="models/gemini-3.5-flash",

            contents=[
                prompt,
                image
            ]

        )

        return response.text.strip()

    # --------------------------------------------------

    def clean_text(self, text):

        text = re.sub(r"\s+", " ", text)

        text = text.replace("|", "I")
        text = text.replace("0", "O")
        text = text.replace("₹°", "₹")

        text = text.replace("Utar", "Uttar")
        text = text.replace("Praadesh", "Pradesh")

        return text.strip()

    # --------------------------------------------------

    def analyze_image(self, image_path):

        raw_text = self.extract_text(image_path)

        corrected_text = self.ai.correct_ocr_text(
            raw_text
        )

        ai_result = self.ai.analyze_complaint(
            corrected_text
        )

        return {

            "success": True,

            "ocr_text": corrected_text,

            "raw_ocr": raw_text,

            "analysis": ai_result

        }


        