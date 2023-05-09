import json
import requests

url = "http://localhost:8080/api/imu_sensor/"

with open("../assest/imu_sensor.json", "r") as f:
    imu_data = json.load(f)

for hr in imu_data:
    r = requests.post(url, json=hr)
    print("Posted:", hr)
