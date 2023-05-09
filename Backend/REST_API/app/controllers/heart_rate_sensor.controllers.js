const db = require("../models");
const Heart_Rate = db.heart_rate;

// Create and Save a new Heart_Rate
exports.create = (req, res) => {
  // Validate request
  if (!req.body.rate) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Heart_Rate
  const heart_rate = new Heart_Rate({
    userID:req.body.userID,
    date:req.body.date,
    rate: req.body.rate,
    published: req.body.published ? req.body.published : false
  });

  // Save Heart_Rate in the database
  heart_rate
    .save(heart_rate)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Heart_Rate."
      });
    });
};

// Retrieve all Heart_Rate from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Heart_Rate.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Heart_Rate."
      });
    });
};

// Retrieve all Heart_Rate from the database with certain id
// careful: someone decided to write userID instead of userId
exports.findAllByUserId = (req, res) => {
  const userID = req.params.userID;
  console.log("Getting heart rate data");
  Heart_Rate.find({ userID: userID })
    .then(data => {
      if (!data || data.length === 0) {
        res.status(404).send({ message: `No Heart_Rate data found for userId ${userID}` });
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


// Find a single Heart_Rate with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Heart_Rate.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Heart_Rate with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Heart_Rate with id=" + id });
    });
};

// Update a Heart_Rate by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Heart_Rate.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Heart_Rate with id=${id}. Maybe Heart_Rate was not found!`
        });
      } else res.send({ message: "Heart_Rate was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Heart_Rate with id=" + id
      });
    });
};

// Delete a Heart_Rate with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Heart_Rate.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Heart_Rate with id=${id}. Maybe Heart_Rate was not found!`
        });
      } else {
        res.send({
          message: "Heart_Rate was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Heart_Rate with id=" + id
      });
    });
};

// Delete all Heart_Rate from the database.
exports.deleteAll = (req, res) => {
  Heart_Rate.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Heart_Rate were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Heart_Rate."
      });
    });
};

// Find all published Skill_humans
exports.findAllPublished = (req, res) => {
  Heart_Rate.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Heart_Rate."
      });
    });
};
