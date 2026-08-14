import os
import requests
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY", "").strip()

if not api_key:
    print("❌ ERROR: No hay llave en el archivo .env")
    exit()

url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent"

headers = {
    "Content-Type": "application/json",
    "x-goog-api-key": api_key
}

payload = {
    "contents": [{"parts": [{"text": "¡Conexión establecida exitosamente!"}]}]
}

print("🚀 Disparando con modelo actualizado...")
try:
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        data = response.json()
        texto = data['candidates'][0]['content']['parts'][0]['text']
        print("✅ ¡CONEXIÓN EXITOSA MI VALE!")
        print(texto)
    else:
        print(f"💥 Error HTTP {response.status_code}:", response.text)
except Exception as e:
    print(f"💥 Error en la petición: {e}")
