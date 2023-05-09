#!/bin/bash

# Define the virtual environment directory
app_DIR="/home/nurlan/Desktop/Vit_Tracker/Backend"


# Define the command to run in each terminal
COMMAND1="sudo mongod --dbpath /data/rs1 --replSet rs0 --port 27018"
COMMAND2="sudo mongod --dbpath /data/rs2 --replSet rs0 --port 27019"
COMMAND3="sudo mongod --dbpath /data/rs3 --replSet rs0 --port 27020"
COMMAND4="node  /home/nurlan/Desktop/Vit_Tracker/Backend/REST_API/server.js"
COMMAND5="sudo mongo --port 27018"
COMMAND6="source ${app_DIR}/venv/bin/activate && python ${app_DIR}/Backend_QUI/main.py"

# Define the number of terminals to open
NUM_TERMINALS=7

# Loop through and open each terminal
for i in $(seq 1 $NUM_TERMINALS); do
  eval "COMMAND=\$COMMAND$i"
  gnome-terminal --title="Terminal $i" --disable-factory -- bash  -c  "sleep 1; $COMMAND; exec bash" &
  done

# Keep all terminal windows open after executing the command
read -p "Press Enter to close all windows."
