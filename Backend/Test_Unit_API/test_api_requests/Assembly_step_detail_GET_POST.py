import requests

'''##############################'''

''' Please hash out according to use- There is a sample POST request and below which a GET request '''

'''##############################'''



''' POST SINGLE DOCUMENT INTO MONGODB '''

# POST API URL
# Please refer to assembly_sequence_plan.routes for url format corresponding to the desired function (create, findOne, delete, etc)
url = "http://localhost:8080/api/assembly_sequence_step_detail/"



# Posting all fields as per assembly_sequence_plan schema
myObj1 = {
        "job_number": "00001",

        "components": ["12351", "12352"],

        "assembly_step" : "12341",

        "assembly_step_actions": "{'xA1' : 'REACH 12351', 'xA2' : 'Grasp 12351', 'xA3' : 'Carry 12351', 'xA4' : 'Release 12351', 'xB1' : 'REACH 12352', 'xB2' : 'Grasp 12352', 'xB3' : 'Carry 12352', 'xB4' : 'Release 12352'}"
}

myObj2 = {
        "job_number": "00001",

        "components": ["12353", "12354"],

        "assembly_step" : "12342",

        "assembly_step_actions": "{'yA1' : 'REACH 12353', 'yA2' : 'Grasp 12353', 'yA3' : 'Carry 12353', 'yA4' : 'Release 12353', 'yB1' : 'REACH 12354', 'yB2' : 'Grasp 12354', 'yB3' : 'Carry 12354', 'yB4' : 'Release 12354'}"
}

myObj3 = {
        "job_number": "00001",

        "components": ["12355", "12356"],

        "assembly_step" : "12343",

        "assembly_step_actions": "{'zA1' : 'REACH 12355', 'zA2' : 'Grasp 12355', 'zA3' : 'Carry 12355', 'zA4' : 'Release 12355', 'zB1' : 'REACH 12356', 'zB2' : 'Grasp 12356', 'zB3' : 'Carry 12356', 'zB4' : 'Release 12356'}"
}




r = requests.post(url, myObj1)

# Outputs the respone
print(r.text)


'''##############################'''

''' GET ALL DOCUMENTS FROM MONGODB '''

# # GET API URL