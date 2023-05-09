const db = require("../models");
const Skill_human = db.skill_humans;

// Create and Save a new Skill_human
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Skill_human
  const skill_human = new Skill_human({
    name: req.body.name,
    surname: req.body.surname,
    size: req.body.size,
    arm_length: req.body.arm_length,
    priority_arm: req.body.priority_arm,
    skills: req.body.skills,
    published: req.body.published ? req.body.published : false
  });

  // Save Skill_human in the database
  skill_human
    .save(skill_human)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Skill_human."
      });
    });
};

// Retrieve all Skill_humans from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Skill_human.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Skill_humans."
      });
    });
};

// Find a single Skill_human with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Skill_human.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Skill_human with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Skill_human with id=" + id });
    });
};

// Update a Skill_human by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Skill_human.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Skill_human with id=${id}. Maybe Skill_human was not found!`
        });
      } else res.send({ message: "Skill_human was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Skill_human with id=" + id
      });
    });
};

// Delete a Skill_human with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Skill_human.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Skill_human with id=${id}. Maybe Skill_human was not found!`
        });
      } else {
        res.send({
          message: "Skill_human was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Skill_human with id=" + id
      });
    });
};

// Delete all Skill_humans from the database.
exports.deleteAll = (req, res) => {
  Skill_human.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Skill_humans were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Skill_humans."
      });
    });
};

// Find all published Skill_humans
exports.findAllPublished = (req, res) => {
  Skill_human.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Skill_humans."
      });
    });
};
