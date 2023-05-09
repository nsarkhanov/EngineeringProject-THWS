const { mongoose } = require("../models");
const db = require("../models");
const IMU_Sensor = db.imu_sensor;


// Create and Save a new imu_sensor --> tested
exports.create = (req, res) => {
  const date = req.params.date;
  // Validate request
  if (!req.body.date ) {
    res.status(400).send({ message: "date cannot be empty!" });
    return;
  }
  // Create a imu_sensor  --> Tested
  const imu_sensor = new IMU_Sensor({
    
    userID : req.body.userID,
    sensorID: req.body.sensorID,
    acceleration: req.body.acceleration,
    orientation: req.body.orientation,
    gyro: req.body.gyro,
    magnetic : req.body.magnetic,
    linear : req.body.linear,
    gravity : req.body.gravity,
    date : req.body.date,
    published: req.body.published ? req.body.published : false

  });
  
  // Save imu_sensor in the database
  imu_sensor
    .save(imu_sensor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the imu_sensor."
      });
    });
};


// Retrieve all imu_sensor from the database. --> tested
exports.findAll = (req, res) => {
  const order = req.query.order;
  var condition = order ? { order: { $regex: new RegExp(order), $options: "i" } } : {};

  IMU_Sensor.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving imu_sensor."
      });
    });
};


// Retrieve all IMU_Sensor from the database with certain id
// careful: someone decided to write userID instead of userId
exports.findAllByUserId = (req, res) => {
  const userID = req.params.userID;
  console.log(userID + ` type ${userID}: ` + typeof(userID));
  IMU_Sensor.find({ userID: userID })
    .then(data => {
      if (!data || data.length === 0) {
        res.status(404).send({ message: `No IMU_Sensor data found for userId ${userID}` });
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

// Find a single imu_sensor with date --> tested
exports.findOne = (req, res) => {

  const date = req.params.date;
  console.log(req.params)

  IMU_Sensor.findOne({date : date}, { useFindAndModify: false })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found imu_sensor with date= " + date });
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving imu_sensor with date=" + date });
    });
};

// Delete a imu_sensor with the specified id in the request --> tested
exports.delete = (req, res) => {
  const date = req.params.date;
  console.log(req.params);
  
  IMU_Sensor.findOneAndDelete({date : date}, { useFindAndModify: false })
  // imu_sensor.findOneAndDelete(req.params.date)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete imu_sensor with date= ${date}. Maybe imu_sensor does not exist!`
        });
      } else {
        res.send({
          message: `imu_sensor with date= ${date} was deleted successfully!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete imu_sensor with date=" + date
      });
    });
};


// // While creating a new collection's controller, make sure to assign const xxx to all the fields as per the model- it is unlikely to be the same as another  --> tested
// exports.update = (req, res) => {

//   const date = req.params.date;
//   const userID = req.body.userID;
//   const sensorID = req.body.sensorID;
//   const acceleration= req.body.acceleration;
//   const orientation = req.body.orientation
//   const gyro = req.body.gyro;
//   const magnetic = req.body.magnetic;
//   const linear = req.body.linear;
//   const gravity = req.body.gravity;
//   console.log(req.params);
  
//   // Syntax: A.findOneAndUpdate(conditions, update, options)
//   IMU_Sensor.findOneAndUpdate({date: date}, {date: date, userID : userID, 
//     job_assignment: job_assignment, 
//     assembly_sequence_plan: assembly_sequence_plan, 
//     assembly_sequence_step_components: assembly_sequence_step_components, 
//     components: components, sub_assembly: sub_assembly, final_product: final_product}, 
//     { useFindAndModify: false })
  
// // imu_sensor.findOneAndUpdate({date: date}, { height : height}, {useFindAndModify: false })
//   .then(data => {
//     if (!data) {
//       res.status(404).send({
//         message: `Cannot update imu_sensor with date= ${date}. Maybe imu_sensor was not found!`
//       });
//     } else 
//     {
//       res.send({
//         message: `imu_sensor with date= ${date} was updated successfully.`
//       });
//     }
//   }) 
// };
  

// Delete all imu_sensor  from the database
exports.deleteAll = (req, res) => {
  IMU_Sensor.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} imu_sensor collection was deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all imu_sensor "
      });
    });
};

// // Find all published imu_sensor  --> tested
// exports.findAllPublished = (req, res) => {
//   IMU_Sensor.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving imu_sensor ."
//       });
//     });
// };
