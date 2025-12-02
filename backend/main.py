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

class Prices(BaseModel):
    price_buy: str
    price_sell: str

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

@app.get("/items/{item}")
def get_price(item):
    price_buy = []
    price_sell = []

    for i in requests.get(f'https://api.warframe.market/v2/orders/item/{item}').json()["data"]:
        if i["user"]["status"] == "ingame":
            if i["type"] == "buy":
                price_buy.append(i["platinum"])
            elif i["type"] == "sell":
                price_sell.append(i["platinum"])

    if len(price_buy) > 0:
        price_buy = str(min(price_buy))
    else:
        price_buy = "No buying orders."

    if len(price_sell) > 0:
        price_sell = str(min(price_sell))
    else:
        price_sell = "No selling orders."

    return Prices(price_buy=price_buy, price_sell=price_sell)

if __name__ == "__main__":
    for i in requests.get('https://api.warframe.market/v2/items').json()["data"]:
        memory_db["items"].append(i["slug"])


    uvicorn.run(app, host="0.0.0.0", port=8000)