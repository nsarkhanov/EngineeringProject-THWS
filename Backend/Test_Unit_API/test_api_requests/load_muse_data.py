import json
import requests

url = "http://localhost:8080/api/brain_sensor/"

with open("../assest/brain_sensor.json", "r") as f:
    muse_data = json.load(f)

for hr in muse_data:
    r = requests.post(url, json=hr)
    print("Posted:", hr)
