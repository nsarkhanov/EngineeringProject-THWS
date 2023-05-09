"""
Project: Data-Logger
Location: Schweinfurt, Germany
Author: Nurlan Sarkhanov
Date: April 22, 2023
"""
# Define endpoint APIs
url_heart_rate = "http://localhost:8080/api/heart_rate/" 
url_imu_sensor = "http://localhost:8080/api/imu_sensor/"
url_brain_sensor="http://localhost:8080/api/brain_sensor/"
url_skin_sensor="http://localhost:8080/api/skin_sensor/"

# chunk size mb  of batch file
chunk_size=10
#serial connection 
########################################### Serial connection and comand for harware ##################################
SERIAL_PORT="/dev/ttyUSB0"  #"/dev/ttyACM0" for linux
BAUD_RATE=115200
START_COMMAND="1"
STOP_COMMAND="0"
# EEG
MUSE_NB_EEG_CHANNELS = 5
MUSE_SAMPLING_EEG_RATE = 256
LSL_EEG_CHUNK = 12

MUSE_NB_PPG_CHANNELS = 3
MUSE_SAMPLING_PPG_RATE = 64
LSL_PPG_CHUNK = 6

MUSE_NB_ACC_CHANNELS = 3
MUSE_SAMPLING_ACC_RATE = 52
LSL_ACC_CHUNK = 1

MUSE_NB_GYRO_CHANNELS = 3
MUSE_SAMPLING_GYRO_RATE = 52
LSL_GYRO_CHUNK = 1

MUSE_ACCELEROMETER_SCALE_FACTOR = 0.0000610352
MUSE_GYRO_SCALE_FACTOR = 0.0074768

MUSE_SCAN_TIMEOUT = 10.5
AUTO_DISCONNECT_DELAY = 3

LSL_SCAN_TIMEOUT = 10
LSL_BUFFER = 360

VIEW_SUBSAMPLE = 2
VIEW_BUFFER = 12