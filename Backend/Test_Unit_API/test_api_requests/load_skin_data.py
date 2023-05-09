import json
import requests


url = "http://localhost:8080/api/skin_sensor/"

with open("../assest/skin_sensor.json", "r") as f:
    skin_data = json.load(f)

for hr in skin_data:
    r = requests.post(url, json=hr)
    print("Posted:", hr)


