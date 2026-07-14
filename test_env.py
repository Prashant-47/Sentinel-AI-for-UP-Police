from dotenv import load_dotenv
import os

load_dotenv()

key = os.getenv("GOOGLE_API_KEY")

print("Loaded:", key is not None)
print("Starts with:", key[:6] if key else "None")