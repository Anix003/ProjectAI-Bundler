from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not set")

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev, you can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health():
    return {
        "status": "healthy",
        "service": "ProjectAI-Bundler Backend",
        "model": GEMINI_MODEL,
    }


def generate_json(prompt: str):
    full_prompt = f"""
You must respond ONLY in valid JSON format with the following keys:
"category", "department", "summary", "date",
"priority", "status", "address".

Do not include explanations or markdown formatting.
Return ONLY valid JSON with double quotes.

User query:
{prompt}
"""

    model = genai.GenerativeModel(GEMINI_MODEL)
    response = model.generate_content(full_prompt)

    if not response or not response.text:
        raise ValueError("Empty response from Gemini API")

    text = response.text.strip()

    # Clean markdown fences if present
    if text.startswith("```"):
        text = text.strip("`")
        text = text.replace("json", "").strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse JSON: {e}")


@app.post("/classify")
def classify(user_query: str = Form(...)):
    if not user_query or not user_query.strip():
        return JSONResponse(
            status_code=400,
            content={"error": "User query cannot be empty"},
        )

    try:
        structured = generate_json(user_query)
        return JSONResponse(status_code=200, content=structured)
    except ValueError as e:
        return JSONResponse(status_code=400, content={"error": str(e)})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
