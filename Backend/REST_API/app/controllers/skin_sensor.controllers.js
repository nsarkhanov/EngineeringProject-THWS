const db = require("../models");
const Skin_Sensor = db.skin_sensor;

// Create and Save a new Skin_Sensor
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Skin_Sensor
  const skin_sensor = new Skin_Sensor({
    userID:req.body.userID,
    date:req.body.date,
    rate: req.body.rate,
    published: req.body.published ? req.body.published : false
  });


  // Save Skin_Sensor in the database
  skin_sensor
    .save(skin_sensor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Skin_Sensor."
      });
    });
};

// Retrieve all Skin_Sensor from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Skin_Sensor.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Skin_Sensor."
      });
    });
};

// Retrieve all Skin_Sensor from the database with certain id
// careful: someone decided to write userID instead of userId
exports.findAllByUserId = (req, res) => {
  console.log("Getting skin sensor data");
  const userID = req.params.userID;

  Skin_Sensor.find({ userID: userID })
    .then(data => {
      if (!data || data.length === 0) {
        res.status(404).send({ message: `No Skin_Sensor data found for userId ${userID}` });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Skin_Sensor data for userId ${userID}`
      });
    });
};

// Find a single Skin_Sensor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Skin_Sensor.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Skin_Sensor with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Skin_Sensor with id=" + id });
    });
};

// Update a Skin_Sensor by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Skin_Sensor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Skin_Sensor with id=${id}. Maybe Skin_Sensor was not found!`
        });
      } else res.send({ message: "Skin_Sensor was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Skin_Sensor with id=" + id
      });
    });
};

// Delete a Skin_Sensor with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Skin_Sensor.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Skin_Sensor with id=${id}. Maybe Skin_Sensor was not found!`
        });
      } else {
        res.send({
          message: "Skin_Sensor was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Skin_Sensor with id=" + id
      });
    });
};

// Delete all Skin_Sensor from the database.
exports.deleteAll = (req, res) => {
  Skin_Sensor.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Skin_Sensor were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Skin_Sensor."
      });
    });
};

// Find all published Skill_humans
exports.findAllPublished = (req, res) => {
  Skin_Sensor.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Skin_Sensor."
      });
    });
};
