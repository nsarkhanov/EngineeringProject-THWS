# Understanding the requests.post() Function
import requests

'''##############################'''

''' Please hash out according to use- Here is a sample POST request and below which a sample GET request '''

'''##############################'''


''' POST SINGLE DOCUMENT INTO MONGODB '''

# POST API URL
# Please refer to dimension_per_component.routes for url format corresponding to the desired function (create, findOne, delete, etc)

url = "http://localhost:8080/api/dimension_per_component"



# Posting all fields as per dimension_per_component schema
myObj = {
        "uuid": "12351",
        "height": "2",
        "width": "2",
        "depth": "8",
        "color": "",
        "parent_reference": "", 
        "gripping_points": "", 
        "weight": "", 
        "force": "", 
        "center_of_gravity": "", 
}


r = requests.post(url, myObj)

# Outputs the respone
print(r.text)

'''##############################'''


''' GET ALL DOCUMENTS FROM MONGODB '''

# # GET API URL
# Please refer to dimension_per_component.routes for url format corresponding to the desired function (create, findOne, delete, etc)
# url = "http://localhost:8080/api/dimension_per_component/"

# r = requests.get(url)
# print(r.text)


'''##############################'''
