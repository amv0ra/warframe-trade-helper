import requests

def fetch_price(item):
    result = {"price_buy": [], "price_sell": []}

    for i in requests.get(f'https://api.warframe.market/v2/orders/item/{item}').json()["data"]:
        if i["user"]["status"] == "ingame":
            if i["type"] == "buy":
                result["price_buy"].append(i["platinum"])
            elif i["type"] == "sell":
                result["price_sell"].append(i["platinum"])

    if len(result["price_buy"]) > 0:
        result["price_buy"] = str(min(result["price_buy"]))
    else:
        result["price_buy"] = "No buying orders."

    if len(result["price_sell"]) > 0:
        result["price_sell"] = str(min(result["price_sell"]))
    else:
        result["price_sell"] = "No selling orders."


    
    return result
