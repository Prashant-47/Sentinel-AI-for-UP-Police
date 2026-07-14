import os
from dotenv import load_dotenv

load_dotenv()


class Config:

    SECRET_KEY = "sentinel-secret-key"

    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

    MAX_CONTENT_LENGTH = 16 * 1024 * 1024