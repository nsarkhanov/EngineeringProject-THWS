import json
import requests
import time
from datetime import datetime

url = "http://localhost:8080/api/brain_sensor/"

threshold_date = datetime.fromisoformat("2023-04-25T14:13:40.334275")

r = requests.delete(url)
print(r)
time.sleep(5)

with open("../assest/brain_sensor.json", "r") as f:
    skin_sensor = json.load(f)

for hr in skin_sensor:
    hr_date = datetime.fromisoformat(hr["date"])
    r = requests.post(url, json=hr)
    if hr_date > threshold_date:
    	time.sleep(0.01)  
    print("Posted:", hr)
