const db = require("../models");
const Skill_robot = db.skill_robots;

// Create and Save a new skill_robot
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a skill_robot
  const skill_robot = new Skill_robot({
    description: req.body.description,
    range_of_motion: req.body.range_of_motion,
    payload: req.body.payload,
    speed: req.body.speed,
    acceleration: req.body.acceleration,
    gripper: req.body.gripper,
    skills: req.body.skills,
    published: req.body.published ? req.body.published : false
  });

  // Save skill_robot in the database
  skill_robot
    .save(skill_robot)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the skill_robot."
      });
    });
};

// Retrieve all skill_robots from the database.
exports.findAll = (req, res) => {
  const description = req.query.descrip;
  var condition = description ? { description: { $regex: new RegExp(description), $options: "i" } } : {};

  Skill_robot.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving skill_robots."
      });
    });
};

// Find a single skill_robot with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Skill_robot.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found skill_robot with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving skill_robot with id=" + id });
    });
};

// Update a skill_robot by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Skill_robot.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update skill_robot with id=${id}. Maybe skill_robot was not found!`
        });
      } else res.send({ message: "skill_robot was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating skill_robot with id=" + id
      });
    });
};

// Delete a skill_robot with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Skill_robot.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete skill_robot with id=${id}. Maybe skill_robot was not found!`
        });
      } else {
        res.send({
          message: "skill_robot was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete skill_robot with id=" + id
      });
    });
};

// Delete all skill_robots from the database.
exports.deleteAll = (req, res) => {
  Skill_robot.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} skill_robots were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all skill_robots."
      });
    });
};

// Find all published skill_robots
exports.findAllPublished = (req, res) => {
  Skill_robot.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving skill_robots."
      });
    });
};