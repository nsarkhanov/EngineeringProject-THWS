"""
Project: Data-Logger
Location: Schweinfurt, Germany
Author: Nurlan Sarkhanov
Date: April 22, 2023
"""
import serial
from model.models  import *
import requests
# from pylsl import StreamInlet, resolve_byprop
from utilities.constants import *
import serial.tools.list_ports

# def EEG():
#     streams = resolve_byprop('type', 'EEG', timeout=LSL_SCAN_TIMEOUT)
#     if len(streams) == 0:
#         raise(RuntimeError("Can't find EEG stream."))
#     else:
#         inlet = StreamInlet(streams[0], max_chunklen=LSL_EEG_CHUNK)
#         sample=inlet.pull_sample()
#         return sample

# def eeg_sender(userID):
#     sample=EEG()
#     brain_pack=brain_sensor_reader(data=sample,userID=userID)
#     r=requests.post(url_brain_sensor, brain_pack)
#     if r.status_code == 200:  # check if the request was successful
#         print(f"Brain  rate sent successfully:{brain_pack}")
#     else:
#         print(f"Error sending heart rate: {r.status_code}")



# # Open a serial connection to the Arduino
def serial_connection(port_name:str,baudrate=115200):
    ser = serial.Serial(port_name,baudrate=baudrate) 
    return ser

# Send command to board to start
def command_sender(ser,cmd):
    # Send a start command to the Arduino
    ser.write(cmd.encode())
# real time sender      
def sender(data,userID):
    esp_data=data.split(",")
    sensorID=esp_data[0]
    if sensorID=="1":
        heart_pack=heart_rate_reader(data=esp_data,userID=userID)
        skin_pack=skin_rate_reader(data=esp_data,userID=userID)
        r=requests.post(url_heart_rate, heart_pack)
        if r.status_code == 200:  # check if the request was successful
            print(f"Heart rate sent successfully:{heart_pack}")
        else:
            print(f"Error sending heart rate: {r.status_code}")
        r=requests.post(url_skin_sensor, skin_pack)
        if r.status_code == 200:  # check if the request was successful
            print(f"Skin rate sent successfully:{skin_pack}")
        else:
            print(f"Error sending skin rate: {r.status_code}")
    imu_pack=imu_sensor_reader(data=esp_data,userID=userID)
    r=requests.post(url_imu_sensor, imu_pack)
    if r.status_code == 200:  # check if the request was successful
        print(f"IMU rates sent successfully:{imu_pack}")
    else:
        print(f"Error sending imu rates: {r.status_code}")


def stream_data(data,userID):
    esp_data=data.split(",")
    sensorID=esp_data[0]
    batch_data={}
    if sensorID=="1":
        batch_data["hear_rate"]=heart_rate_reader(data=esp_data,userID=userID)
        batch_data["skin_rate"]=skin_rate_reader(data=esp_data,userID=userID)
    batch_data["imu_rates"]=imu_sensor_reader(data=esp_data,userID=userID)
    return batch_data
        
