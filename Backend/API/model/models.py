"""
Project: Data-Logger
Location: Schweinfurt, Germany
Author: Nurlan Sarkhanov
Date: May 4, 2023
"""
from datetime import datetime
#read data from skin sensor data. 
def skin_rate_reader(data, userID):
    date = datetime.now()
    if len(data) >20:
        skin_rate = data[19] # extract heart rate value and convert to integer
        skin_pack = {"userID": userID, "rate": skin_rate, "date": date}
        return skin_pack
    else:
        print("Data is not getting correctly yet.")


#read data from imu sensor data. 
def imu_sensor_reader(data,userID):
    sensorID=data[0]
    date=datetime.now()
    if len(data) >= 18:
        acceleration= [data[1],data[7],data[13]]
        orientation = [data[2],data[8],data[14]]
        gyro=         [data[3],data[9],data[15]]
        magnetic=     [data[4],data[10],data[16]]
        linear=       [data[5],data[11],data[17]]
        if len(data) ==19:
            gravity= [data[6],data[12],data[18][:-2]]
        else:
            gravity= [data[6],data[12],data[18]]
        imu_pack={"userID":userID,"sensorID":sensorID,"acceleration":acceleration,
                "orientation":orientation,"gyro":gyro,"magnetic":magnetic,
                "linear":linear,"gravity":gravity,"date":date}
        return imu_pack
    else:
        print("Data is not getting correctly yet.")
        
#read data from heart sensor data. 
def heart_rate_reader(data, userID):
    date = datetime.now()
    if len(data) >20:
        heart_rate = data[20][:-3]
        heart_pack = {"userID": userID, "rate": heart_rate, "date": date}
        return heart_pack
    else:
        print("Data is not getting correctly yet.")



#read data from brain sensor data. 
def brain_sensor_reader(data,userID):
    if len(data)>0:
        TP9=data[0][0]
        AF7=data[0][1]
        AF8=data[0][2]
        TP10=data[0][3]
        RightAUX= data[0][4]
        brain_sensor={"userID":userID,"TP9":TP9,"AF7":AF7,
                  "AF8":AF8,"TP10":TP10,"RightAUX":RightAUX,"date":datetime.fromtimestamp(data[1])}
        return brain_sensor
    else:
        print("Data is not getting correctly yet.")






