# Understanding the requests.post() Function
import requests
import json
from datetime import datetime 
'''##############################'''

''' Please hash out according to use- There is a sample POST request and below which a GET request '''

'''##############################'''


''' POST SINGLE DOCUMENT INTO MONGODB '''

# POST API URL
# Please refer to assembly_sequence_plan.routes for url format corresponding to the desired function (create, findOne, delete, etc)
url = "http://localhost:8080/api/imu_sensors/"

raw_data="1,23,4343,543,45,5465,657,7,6868,9,0809,676,75,454,544,5,45,45,45,45"
temp=raw_data.split(",")
# Posting all fields as per assembly_sequence_plan schema
myObj = {
        "date": str(datetime.now()),
        "userID": "54845",
        "sensor_id":temp[0] ,
        "acceleration" : {'x' : '12351', 'y' : '12351', 'z' : '12351'},
        "orientation" : {'x' : '12351', 'y' : '12351', 'z' : '12351'},
        "magnetic": {'x' : '12351', 'y' : '12351', 'z' : '12351'},
        "gyro": {'x' : '12351', 'y' : '12351', 'z' : '12351'},
        "linear": {'x' : '12351', 'y' : '12351', 'z' : '12351'},
        "gravity": {'x' : '12351', 'y' : '12351', 'z' : '12351'}   
}


r = requests.post(url, myObj)

# Outputs the respone
print(r.text)
# print(myObj)

'''##############################'''

''' GET ALL DOCUMENTS FROM MONGODB '''

# # GET API URL
# Please refer to assembly_sequence_plan.routes for url format corresponding to the desired function (create, findOne, delete, etc)
# url = "http://localhost:8080/api/assembly_sequence_plan/"

# r = requests.get(url)
# print(r.text)


'''##############################'''

