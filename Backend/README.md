# VitTrack Backend README

This repository contains the code for the REST API, embedded system, and database testing/mock sensors for the project. The REST API utilizes change stream for a live connection to the MongoDB database, requiring the setup of a replica set. The following instructions have been tested on Ubuntu 20.04.

## Starting the Database

To start the database, follow these steps:

If you have already set up a replica set using the instructions below, you can run the three `mongod` instances with the following commands:

   `sudo mongod --dbpath /data/rs1 --replSet rs0 --port 27018`

   `sudo mongod --dbpath /data/rs2 --replSet rs0 --port 27019`
   
   `sudo mongod --dbpath /data/rs3 --replSet rs0 --port 27020`

### Troubleshooting

If it doesn' work, check if mongod service is running:`sudo systemctl status mongodb`
	
If not, start the service: `sudo systemctl start mongodb`
	
If it still does not work, stop the service: `sudo systemctl stop mongodb`
	
Remove all the data directories:

   `sudo rm -rf /data/rs1/*`
   
   `sudo rm -rf /data/rs2/*`
   
   `sudo rm -rf /data/rs3/*`
	
Start the service again: `sudo systemctl start mongodb`
	
Follow steps below to create and start a replica set

## Setting up the databse/replica set:

### Installing MongoDB:
First update: `sudo apt-get update`

Then install: `sudo apt-get install mongodb`

Then you can start the mongodb servive by: `sudo systemctl start mongodb`

See if it works by: `sudo systemctl status mongodb`

If you ever have to stop the service use: `sudo systemctl stop mongodb`

### Create and start a replica set:
Next we need a replica set https://www.mongodb.com/docs/manual/replication/ (which is required to make change streans work)

First, create 3 directories to store the data for each mongod instance (node): `mkdir -p /data/rs1 /data/rs2 /data/rs3`

Create the 3 mongod instances all belonging to the replica set "rs0" (no need to create a directory rs0, it is just the name).
Every command has to be run in a seperate terminal.
`sudo mongod --dbpath /data/rs1 --replSet rs0 --port 27018`

`sudo mongod --dbpath /data/rs2 --replSet rs0 --port 27019`

`sudo mongod --dbpath /data/rs3 --replSet rs0 --port 27020`

#### Initiate the replica set
Connect to one of the instances using the MongoDB shell by running: `mongo --port 27018`
Then initiate the replica set: `rs.initiate()`

#### Configure the database in the backend:
Go to .../db.config.js and change the url to point to your data base. If you followed the steps above and want your database to be 
named 'test', just leave it as: `mongodb://localhost:27018,localhost:27019,localhost:27020/test?replicaSet=rs0`

If you used different ports for you mongod instances, replace the ports and if you want a different name, replace 'test' with that name

	
## Starting the REST API/Server
Open a terminal in the REST_API folder and run:
`npm install`

`node server.js`

### Troubleshooting
Try the following:

1. Delete the `node_modules` folder and `package-lock.json` file.
2. Run the command `npm install` to reinstall the dependencies.

## Testing the DB
Under Tests are files for loading data to the data base and mocking sensors (to test live-functionality).

## Running the front end
Follow steps specified in README file of the Frontend directory.
