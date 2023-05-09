import threading

# create an event object to signal the thread to stop
stop_event = threading.Event()

def stop_data_sender_thread():
    # set the event to signal the thread to stop
    stop_event.set()

def data_receiver():
    while not stop_event.is_set():
        # receive data from serial port and log it
        print("here")

# create the thread
data_sender_thread = threading.Thread(target=data_receiver,)
data_sender_thread.start()

# # call stop_data_sender_thread() to stop the thread
# stop_data_sender_thread()
