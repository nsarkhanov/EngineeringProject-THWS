"""
Project: Data-Logger
Location: Schweinfurt, Germany
Author: Nurlan Sarkhanov
Date: April 22, 2023
"""
import serial
from src.model.models import *
import json,os,time
from datetime import datetime
import requests
from src.utilities.constants import *
from pylsl import StreamInlet, resolve_byprop

def EEG():
    streams = resolve_byprop('type', 'EEG', timeout=LSL_SCAN_TIMEOUT)
    if len(streams) == 0:
        raise(RuntimeError("Can't find EEG stream."))
        
    else:
        inlet = StreamInlet(streams[0], max_chunklen=LSL_EEG_CHUNK)
        sample=inlet.pull_sample()
        return sample

def eeg_sender(userID):
    sample=EEG()
    if sample==None:
        pass
    else:
        brain_pack=brain_sensor_reader(data=sample,userID=userID)
        r=requests.post(url_brain_sensor, brain_pack)
        if r.status_code == 200:  # check if the request was successful
            print(f"Brain  rate sent successfully:{brain_pack}")
        else:
            print(f"Error sending heart rate: {r.status_code}")



class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)
    
class CustomJSONDecoder(json.JSONDecoder):
    def __init__(self, *args, **kwargs):
        super().__init__(object_hook=self.dict_to_object, *args, **kwargs)
        self.pos = 0

    def dict_to_object(self, d):
        # Convert datetime strings to datetime objects
        if "__datetime__" in d:
            return datetime.fromisoformat(d["__datetime__"])
        else:
            return d

    def decode(self, s, **kwargs):
        objs = []
        while self.pos < len(s):
            obj, end_pos = self.raw_decode(s[self.pos:], **kwargs)
            self.pos += end_pos
            objs.append(obj)
        return objs

# Go up one level to the root folder
root_folder = os.path.dirname(os.path.dirname(os.path.dirname( os.path.dirname(__file__))))
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

def data_saver(data,userID):
    esp_data=data.split(",")
    sensorID=esp_data[0]
    batch_data={}
    batch_data["imu_rates"]=imu_sensor_reader(data=esp_data,userID=userID)
    if sensorID=="1":
        batch_data["hear_rate"]=heart_rate_reader(data=esp_data,userID=userID)
        batch_data["skin_rate"]=skin_rate_reader(data=esp_data,userID=userID)
    # Write the batch data to a JSON file
    global batch_path
    batch_path=os.path.join(root_folder,"Data/batch.json")
    with open(batch_path, "a") as f:
        json.dump(batch_data, f,cls=CustomJSONEncoder)
        

def get_size_mb(file_path):
    file_size = os.path.getsize(file_path)
# Convert the file size to a human-readable format (e.g. MB or GB)
    size_in_mb = file_size / (1024 * 1024)
    return size_in_mb
# Set the headers and the JSON data in the request


def read_batch_data():
    # Open the file for reading
    with open(batch_path, 'r') as f:
        # Load the JSON data from the file
        data= json.load(f,cls=CustomJSONDecoder)
    # Collect the IMU, heart rate, and skin data from each item
    for item in data:
        if 'imu_rates' in item:
            r=requests.post(url_imu_sensor, data=item['imu_rates'])
            time.sleep(0.1)
            print("Imu sensor data sent successfully.")
        if 'skin_rate' in item:
            r=requests.post(url_skin_sensor,data=item['skin_rate'])
            time.sleep(0.1)
            print("Skin sensor data sent successfully.")
        if 'hear_rate' in item:
            r=requests.post(url_heart_rate,item['hear_rate'])
            time.sleep(0.1)
            print("Heart rate sensor data sent successfully.")
    print("Chunk data sent successfuly.")
    print(f"Data size:{get_size_mb(batch_path)} mb. Length:{len(data)}")
    print("File is cleaned,start writing again.")



def sender_batch(data,userID):
    data_saver(data,userID)
    # Collect data from sensor
    if get_size_mb(batch_path)>chunk_size:
        read_batch_data()
        return True
    else:
        print(f"Saving data in json.Size: {get_size_mb(batch_path)} (Limit:{chunk_size} mb)")
        