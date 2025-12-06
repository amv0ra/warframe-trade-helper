import requests

def handle_no_orders(result, quantity=1):
    if "price_buy" in result:
        if len(result["price_buy"]) > 0:
            result["price_buy"] = str(sorted(result["price_buy"])[0]*quantity)
        else:
            result["price_buy"] = "No buying orders."

    if len(result["price_sell"]) > 0:
        result["price_sell"] = str(sorted(result["price_sell"])[0]*quantity)
    else:
        result["price_sell"] = "No selling orders."

    return result

def pack_items(item):
    items_in_set = []
    for v in requests.get(f'https://api.warframe.market/v2/item/{item}/set').json()["data"]["items"]:
        if v["slug"] != item:
            items_in_set.append({v["slug"]: handle_other(v["slug"], isSet=True, set=item)})
    return items_in_set

def handle_other(item, isSet=False, set=None):
    result = {"price_buy": [], "price_sell": []}
    for i in requests.get(f'https://api.warframe.market/v2/orders/item/{item}').json()["data"]:
        if i["user"]["status"] == "ingame":
            if i["type"] == "buy":
                result["price_buy"].append(i["platinum"])
            elif i["type"] == "sell":
                result["price_sell"].append(i["platinum"])
    quantity = 1
    if isSet:
        for v in requests.get(f'https://api.warframe.market/v2/item/{set}/set').json()["data"]["items"]:
            if "quantityInSet" in v and v["slug"] == item:
                quantity = v["quantityInSet"]

    result = handle_no_orders(result, quantity)
    return result

def fetch_price(item):
    
    result = {"price_buy": [], "price_sell": []}
    
    result = handle_other(item)
    result["items_in_set"] = []
    if "set" in requests.get(f'https://api.warframe.market/v2/item/{item}').json()["data"]["tags"]:
        items_in_set = pack_items(item)
        result["items_in_set"] = items_in_set

    return result

def scrub_most_profitable(items, primeOnly=False, amountToShow=0, limitTo=0):
    most_profitable = []
    for item in items:
        if limitTo > 0:
            if len(most_profitable) == limitTo:
                break

        

        if primeOnly:
            if "_prime_set" not in item:
                continue
        else:
            if "set" not in requests.get(f'https://api.warframe.market/v2/item/{item}').json()["data"]["tags"]:
                continue
 
        result = {"price_sell": [], "items_in_set_price": 0}
        for i in requests.get(f'https://api.warframe.market/v2/orders/item/{item}').json()["data"]:
            if i["user"]["status"] == "ingame":
                if i["type"] == "sell":
                    result["price_sell"].append(i["platinum"])
                        
        items_in_set = pack_items(item)
        fault = False
        for part in items_in_set:
            if list(part.values())[0]["price_sell"] != "No buying orders.":
                result["items_in_set_price"] += int(list(part.values())[0]["price_sell"])
            else:
                fault = True
                break

        if fault:
            continue
                
        result = handle_no_orders(result)

        profit = 0
        if result["price_sell"] != "No selling orders.":
            profit = int(result["price_sell"]) - result["items_in_set_price"]
        else:
            profit = "No order."
        

        most_profitable.append({item: profit})
        for i in range(len(most_profitable)-1):
            for j in range(len(most_profitable)-i-1):
                if [x for x in most_profitable[j].values()][0] < [x for x in most_profitable[j+1].values()][0]:
                    most_profitable[j], most_profitable[j+1] = most_profitable[j+1], most_profitable[j]
 
    if amountToShow <= 0 or amountToShow > len(most_profitable):
        return most_profitable
    else:
        return most_profitable[:amountToShow]

    