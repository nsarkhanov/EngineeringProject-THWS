const db = require("../models");
const Brain_Sensor = db.brain_sensor; //get the model Brain_Sensor from collection Brain_Sensor in DB


// Create and Save a new brain_sensor --> tested
exports.create = (req, res) => {

  const date = req.params.date;
  // Validate request
  if (!req.body.date ) {
    res.status(400).send({ message: "date cannot be empty!" });
    return;
  }
  // Create an instance brain_sensor  --> Tested
  const brain_sensor = new Brain_Sensor({

    date: req.body.date,
    userID: req.body.userID,
    TP9: req.body.TP9,
    AF7: req.body.AF7,
    AF8: req.body.AF8,
    TP10: req.body.TP10,
    RightAUX: req.body.RightAUX,
    published: req.body.published ? req.body.published : false
  });
  
  // Save brain_sensor in the database
  brain_sensor
    .save(brain_sensor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the brain_sensor."
      });
    });
};


// Retrieve all brain_sensor from the database. --> tested
exports.findAll = (req, res) => {
  const order = req.query.order;
  var condition = order ? { order: { $regex: new RegExp(order), $options: "i" } } : {};

  Brain_Sensor.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving brain_sensor."
      });
    });
};

// Find a single brain_sensor with date --> tested
exports.findOne = (req, res) => {

  const date = req.params.date;
  console.log(req.params)

  Brain_Sensor.findOne({date : date}, { useFindAndModify: false })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found brain_sensor with date= " + date });
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving brain_sensor with date=" + date });
    });
};

// Delete a brain_sensor with the specified date in the request --> tested
exports.delete = (req, res) => {
  const date = req.params.date;
  console.log(req.params);
  
  Brain_Sensor.findOneAndDelete({date : date}, { useFindAndModify: false })
  // brain_sensor.findOneAndDelete(req.params.date)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete brain_sensor with date= ${date}. Maybe brain_sensor does not exist!`
        });
      } else {
        res.send({
          message: `brain_sensor with date= ${date} was deleted successfully!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete brain_sensor with date=" + date
      });
    });
};


// While creating a new collection's controller, make sure to assign const xxx to all the fields as per the model- it is unlikely to be the same as another  --> tested
exports.update = (req, res) => {

  const date = req.params.date;
  const userID = req.body.userID;
  const TP9= req.body.TP9;
  const AF7= req.body.AF7;
  const AF8= req.body.AF8;
  const TP10= req.body.TP10;
  const RightAUX= req.body.RightAUX;
  console.log(req.params);


// Syntax: A.findOneAndUpdate(conditions, update, options)
Brain_Sensor.findOneAndUpdate({date: date}, {date: date, userID: userID, TP9 : TP9, AF7 : AF7, AF8: AF8, TP10 : TP10, RightAUX: RightAUX}, { useFindAndModify: false }) 
  // brain_sensor.findOneAndUpdate({date: date}, { height : height}, {useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update brain_sensor with date= ${date}. Maybe brain_sensor was not found!`
      });
    } else 
    {
      res.send({
        message: `brain_sensor with date= ${date} was updated successfully.`
      });
    }
  }) 
};
  

// Retrieve all Brain_Sensor from the database with certain id
// careful: someone decided to write userID instead of userId
exports.findAllByUserId = (req, res) => {
  const userID = req.params.userID;
  console.log(userID + ` type ${userID}: ` + typeof(userID));
  Brain_Sensor.find({ userID: userID })
    .then(data => {
      if (!data || data.length === 0) {
        res.status(404).send({ message: `No Brain_Sensor data found for userId ${userID}` });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Heart_Rate data for userId ${userID}`
      });
    });
};

// Delete all brain_sensors from the database. --> tested
exports.deleteAll = (req, res) => {
  Brain_Sensor.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} brain_sensor collection was deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all brain_sensor."
      });
    });
};

// Find all published brain_sensors --> tested
exports.findAllPublished = (req, res) => {
  Brain_Sensor.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving brain_sensors."
      });
    });
};
