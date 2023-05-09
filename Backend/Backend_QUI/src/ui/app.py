"""
Project: Data-Logger
Location: Schweinfurt, Germany
Author: Nurlan Sarkhanov
Date: April 22, 2023
"""
import tkinter as tk
from tkinter import ttk
import threading
from src.utilities.utility import *
from src.utilities.constants import *
#create serial connection with esps
ser=serial_connection(port_name=SERIAL_PORT,baudrate=BAUD_RATE)
# stop sending thred
def stop_data_sender_thread():
    # set the event to signal the thread to stop
    stop_event.set()
# send data while unpressed stop_data_sender_thred
def data_sender():
    while not stop_event.is_set():
        # receive data from serial port and log it
        sensor_data = ser.readline().decode()
        if mode_status=="real-time":
            sender(data=sensor_data, userID=userID)
            eeg_sender(userID=userID)
        elif mode_status=="batch":
            finished=sender_batch(data=sensor_data, userID=userID)
            if finished:
                stop_data_sender_thread()

        
def toggle_disabled(real_var,batch_var):
        real_var.set(0)
        batch_var.set(0)
        global mode_status
        mode_status=""

def run():
        # Function to handle start/stop/pause button press
    def start():
        global command, stop_event
        # create an event object to signal the thread to stop
        stop_event = threading.Event()

        # data_logger.commander(ser,command)
        if len(userID)>0 and START_COMMAND=="1" and (mode_status=="batch" or mode_status=="real-time"):
            start_button.config(bg="green")
            canvas.itemconfig(circle, fill="green")
            stop_button.config(bg="white")
            command_sender(ser=ser,cmd=START_COMMAND)
            data_sender_thread = threading.Thread(target=data_sender,)
            data_sender_thread.start()    
    def stop():
        canvas.itemconfig(circle, fill="red")
        start_button.config(bg="white")
        stop_button.config(bg="red")
        stop_data_sender_thread()   # stop thread 
        command_sender(ser=ser,cmd=STOP_COMMAND)
        toggle_disabled(real_var,batch_var)

    def toggle_circle():
        canvas.itemconfigure(circle, state=tk.HIDDEN if canvas.itemcget(circle, "state") == tk.NORMAL else tk.NORMAL)
        window.after(500, toggle_circle)

    def getuser_entry():
        global userID
        userID=user_entry.get()

    def toggle_batch():
        if batch_var.get()==1:
            print("Batch Process is selected.")
            batch_var.set(1)
            real_var.set(0)
            global mode_status
            mode_status="batch"
        else:
            batch_var.set(0)


    def toggle_real_time():
        if real_var.get()==1:
            real_var.set(1)
            batch_var.set(0)
            global mode_status
            mode_status="real-time"
            print("Real-Time process is selected.")
        else:
            real_var.set(0)

    # Create root window
    window = tk.Tk()
    window.title("Status Control")
    window.geometry("600x450")
    # Create user ID input field and save button
    name_label = tk.Label(master=window, text="Vir-Track",font=("bold",20))
    user_label = tk.Label(master=window, text="User ID:")
    user_entry = tk.Entry(master=window)
    save_button = tk.Button(master=window, text="Save",command=getuser_entry)
    batch_var = tk.BooleanVar(value=False)
    real_var = tk.BooleanVar(value=False)
    # Create start/stop/pause buttons
    start_button = tk.Button(master=window, text="START", command=start,height=2,width=6)
    stop_button = tk.Button(master=window, text="STOP", command=stop,height=2,width=6)
    batch_button=tk.Checkbutton(master=window,text="Batch",variable=batch_var,command=toggle_batch)
    real_button=tk.Checkbutton(master=window,text="Real-Time",variable=real_var ,command=toggle_real_time)
    # ading to windows
    name_label.place(relx=0.4,rely=0.15)
    user_label.place(relx=0.3,rely=0.3)
    user_entry.place(relx=0.4,rely=0.3)
    save_button.place(relx=0.62,rely=0.29)

    start_button.place(relx=0.37,rely=0.4)
    stop_button.place(relx=0.54,rely=0.4)
    batch_button.place(relx=0.75,rely=0.4)
    real_button.place(relx=0.75,rely=0.45)
    # Create canvas for status circle
    canvas = tk.Canvas(master=window, width=80, height=80)
    canvas.place(relx=0.44,rely=0.65)
    circle = canvas.create_oval(10, 10, 80, 80, fill="grey", outline="")
    toggle_circle() # Start toggling visibility of circle
    # Start GUI loop
    window.mainloop()


if __name__=="__main__":
    run()