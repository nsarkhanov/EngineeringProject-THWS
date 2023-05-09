# Understanding the requests.post() Function
import requests

'''##############################'''

''' Please hash out according to use- There is a sample POST request and below which a GET request '''

'''##############################'''



''' POST SINGLE DOCUMENT INTO MONGODB '''

# POST API URL
# Please refer to assembly_sequence_plan.routes for url format corresponding to the desired function (create, findOne, delete, etc)
url = "http://localhost:8080/api/assembly_sequence_plan_details/"


# Posting all fields as per assembly_sequence_plan schema
myObj = {
        "job_number": "00001",

        "job_name": "Duplo_Assembly_Plan",

        "job_assignment" : {'12341' : 'Human', '12342' : 'Robot', '12343' : 'Human' },

        "assembly_sequence_plan": "{'12341' : 'Joining Duplo_8x2 with Duplo_2x2_blue to sub-assembly 1', '12342' : 'Joining Duplo_4x2 with Duplo_2x2_red to sub-assembly 2', '12343' : 'Joining sub-assembly 1 with sub-assembly 2 and component Duplo_2x2_green to final product' }", 
        
        "assembly_sequence_step_components": "{'12341' : ['12351', '12352'], '12342' : ['12353', '12354'], '12343' : ['12361','12362', '12355'] }", 

        "components": "{'12351' : 'Duplo_8x2', '12352' : 'Duplo_2x2_blue', '12353' : 'Duplo_4x2', '12354' : 'Duplo_2x2_red', '12355' : 'Duplo_2x2_green'  }", 

        "sub_assembly": "{'12341' : {'12361' : 'DUPLO_BG_1'}, '12342' : {'12362' : 'DUPLO_BG_2'} }", 

        "final_product": "{'12343' :{'12370' : 'Final_Product'}}"

}


r = requests.post(url, myObj)

# Outputs the respone
print(r.text)


'''##############################'''

''' GET ALL DOCUMENTS FROM MONGODB '''

# # GET API URL
# Please refer to assembly_sequence_plan.routes for url format corresponding to the desired function (create, findOne, delete, etc)
# url = "http://localhost:8080/api/assembly_sequence_plan/"

# r = requests.get(url)
# print(r.text)


'''##############################'''
