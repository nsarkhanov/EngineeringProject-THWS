import requests

'''##############################'''

''' Please hash out according to use- Here is a sample POST request and below which a sample GET request '''

'''##############################'''


''' POST / Upload single image '''

# POST API URL
# Please refer to picture.routes for url format corresponding to the desired function (create, findOne, delete, etc)

# url = "http://localhost:8080/api/picture/upload"

# payload={}

# # Specify image location path for upload
# files=[
#   ('file',('3830031-738-1024.jpg',open('./Duplo_images _without_bg','rb'),'image/jpeg'))
# ]
# headers = {}

# response = requests.request("POST", url, headers=headers, data=payload, files=files)

# # Outputs the respone
# print(response.text)


'''##############################'''

''' Download Image FROM MONGODB '''

'''##############################'''

# GET API URL
# format http://localhost:8080/api/picture/download/ :file_name as per database collection
url = "http://localhost:8080/api/picture/download/arrow_white-removebg-preview.png"

payload={}
# files={}
headers = {}

# response = requests.request("GET", url, headers=headers, data=payload, files=files)
response = requests.request("GET", url, headers=headers, data=payload)

if response.status_code == 200:
        # specify download location path and name, can be download as jpeg or png
    with open("./test.png", 'wb') as f:
        f.write(response.content)

'''##############################'''
