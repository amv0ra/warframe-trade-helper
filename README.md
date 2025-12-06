# Warframe Trade Helper
Tool for tracking item prices from Warframe Market.

## Installation (Docker)
1. Clone the repository
```console
git clone https://github.com/amv0ra/warframe-trade-helper.git
cd warframe-trade-helper
```
2. Compose with Docker
```console
docker-compose up --build
```
3. Restart the container and go to [localhost:5173](https://localhost:5173)

## Short feature explanation
You can search for items that you want to track and put them onto main page. If the item tracked is a set of items it will both count profit from directly reselling it and AND from buying all the items in the set separately and then selling them as a set.

On 'most profitable sets' page you'll be met with fields 'quantity to show' and 'limit search to'.
'Quantity to show' determines how many sets will be shown on the page.
'Limit search to' limits the amount of sets being analyzed on Warframe Market. The more it searches, the better are the results, but it will basically take forever to do so.
