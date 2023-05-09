const db = require("../models");
const Criteria = db.criteria;

// Create and Save a new criteria
exports.create = (req, res) => {
  // Validate request
  if (!req.body.order) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a criteria
  const criteria = new Criteria({

    order : req.body.order,
    sequence : req.body.sequence,
    weight_value: req.body.weight_value,
    assembly_sequence: req.body.assembly_sequence,
    criteria_type : req.body.criteria_type,
    published: req.body.published ? req.body.published : false
  });

  // Save criteria in the database
  criteria
    .save(criteria)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the criteria."
      });
    });
};

// Retrieve all criterias from the database.
exports.findAll = (req, res) => {
  const order = req.query.order;
  var condition = order ? { order: { $regex: new RegExp(order), $options: "i" } } : {};

  Criteria.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving criterias."
      });
    });
};

// Find a single criteria with an id
exports.findOne = (req, res) => {
  const sequence_ = req.params.id;
  const order_ = req.params.data;
  //console.log(req.params)

  Criteria.find({sequence: sequence_, order: order_})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found criteria with sequence " + sequence });
      else {
        res.send(data);
      }
      
      
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving criteria with id=" + sequence });
    });
};

// Update a criteria by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const _sequence = req.params.id;
  const _order = req.body.order
  const _weight_value = req.body.weight_value
  const _criteria_type = req.body.criteria_type
  console.log(_criteria_type)

  Criteria.updateOne({sequence: _sequence, order: _order}, {weight_value : _weight_value, criteria_type: _criteria_type})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update criteria with id=${sequence}. Maybe criteria was not found!`
        });
      } else res.send({ message: "criteria was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating criteria with id=" + sequence + err
      });
    });

};


// Delete a criteria with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Criteria.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete criteria with id=${id}. Maybe criteria was not found!`
        });
      } else {
        res.send({
          message: "criteria was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete criteria with id=" + id
      });
    });
};

// Delete all criterias from the database.
exports.deleteAll = (req, res) => {
  Criteria.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} criterias were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all criterias."
      });
    });
};

// Find all published criterias
exports.findAllPublished = (req, res) => {
  Criteria.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving criterias."
      });
    });
};
