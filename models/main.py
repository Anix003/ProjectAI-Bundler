from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import requests
import json

app = FastAPI()
templates = Jinja2Templates(directory="templates")

def generate_json(prompt, model="llama3.2:3b"):
    url = "http://localhost:11434/api/generate"

    full_prompt = f"""
You must respond ONLY in JSON format with keys:
category, department, summary, date, priority, status, address.
Do not include explanations, use double quotes for json.

User query:
{prompt}
"""

    data = {
        "model": model,
        "prompt": full_prompt,
        "stream": False
    }

    response = requests.post(url, json=data)
    result = response.json()

    # Log or raise error if "response" is missing
    if "response" not in result:
        raise KeyError(f"Model did not return 'response'. Actual: {result}")

    return result["response"]


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("form.html", {"request": request})

@app.post("/classify", response_class=HTMLResponse)
def classify(request: Request, user_query: str = Form(...)):
    try:
        raw_result = generate_json(user_query)  # Returns just result["response"]
        structured = json.loads(raw_result)
        return templates.TemplateResponse("result.html", {"request": request, "data": structured})
    except KeyError as e:
        return templates.TemplateResponse("result.html", {"request": request, "data": {"error": f"Missing key: {e}"}})
    except Exception as e:
        return templates.TemplateResponse("result.html", {"request": request, "data": {"error": str(e)}})
