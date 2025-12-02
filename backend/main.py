import uvicorn
import requests
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class Query(BaseModel):
    value: str

class Items(BaseModel):
    items: List

app = FastAPI(debug=True)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory_db = {"items": []}

@app.get("/items")
def get_items():

    return Items(items=memory_db["items"])

@app.get("/{slug}")
def redirect_to_item(slug: str):
    return {"slug": slug}

if __name__ == "__main__":
    for i in requests.get('https://api.warframe.market/v2/items').json()["data"]:
        memory_db["items"].append(i["i18n"]["en"]["name"])


    uvicorn.run(app, host="0.0.0.0", port=8000)