from google import genai
from config import Config

client = genai.Client(api_key=Config.GOOGLE_API_KEY)

print("Available Models:\n")

for model in client.models.list():
    print(model.name)