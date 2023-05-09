# Understanding the requests.post() Function
import requests
# from API_test_scripts.sensor_connection import sensors_connection
from datetime import datetime

'''##############################'''

''' Please hash out according to use- There is a sample POST request and below which a GET request '''

'''##############################'''



''' POST SINGLE DOCUMENT INTO MONGODB '''

# POST API URL
# Please refer to heart_rate.routes for url format corresponding to the desired function (create, findOne, delete, etc)
url = "http://localhost:8080/api/heart_rate/"

# data_obj=sensors_connection.Heart_Rate()
# Posting all fields as per heart_rate schema
count=10
while count>0:
    # rate=data_obj.read_data()
    myObj = {
            "userID":"4",
            "date":str(datetime.now()),
            "rate": 23 
    }
    count-=1
    print(myObj)
    r = requests.post(url, myObj)
    print("sent")

# data_obj=heart_rate_sensor.Heart_Rate()
# data_obj.read_data()

# print(data_obj.read_data())

# r = requests.post(url, myObj)

# Outputs the respone
# print(r.text)


'''##############################'''

''' GET ALL DOCUMENTS FROM MONGODB '''

# # GET API URL
# Please refer to heart_rate.routes for url format corresponding to the desired function (create, findOne, delete, etc)
# url = "http://localhost:8080/api/heart_rate/"

# r = requests.get(url)
# print(r.text)


'''##############################'''
