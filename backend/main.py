import uvicorn
import requests
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import helper_functions

class Query(BaseModel):
    value: str

class Items(BaseModel):
    items: List

class Prices(BaseModel):
    price_buy: str
    price_sell: str
    items_in_set: List

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

memory_items = {"items": []}
memory_tracked = {"tracked": []}

@app.get("/items")
def get_items():

    return Items(items=memory_items["items"])

@app.get("/items/{item}")
def get_price(item):
    result = helper_functions.fetch_price(item)

    return Prices(price_buy=result["price_buy"], price_sell=result["price_sell"], items_in_set=result["items_in_set"])

@app.get("/tracking")
def get_tracked_items():
    tracked = []
    for item in memory_tracked["tracked"]:

        tracked.append({item: helper_functions.fetch_price(item)})

    return Items(items=tracked)

@app.post("/tracking/{item}")
def add_tracked_item(item):
    if item not in memory_tracked["tracked"]:
        memory_tracked["tracked"].append(item)

@app.post("/tracking/delete/{item}")
def delete_tracked_item(item):
    if item in memory_tracked["tracked"]:
        memory_tracked["tracked"].remove(item)


if __name__ == "__main__":
    for i in requests.get('https://api.warframe.market/v2/items').json()["data"]:
        memory_items["items"].append(i["slug"])

    uvicorn.run(app, host="0.0.0.0", port=8000)