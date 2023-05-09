import json
import requests

url = "http://localhost:8080/api/heart_rate/"

with open("../assest/heart_rates.json", "r") as f:
    heart_rates = json.load(f)

for hr in heart_rates:
    r = requests.post(url, json=hr)
    print("Posted:", hr)
