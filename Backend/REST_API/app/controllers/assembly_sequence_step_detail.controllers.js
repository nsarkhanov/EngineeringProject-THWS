const db = require("../models");
const Assembly_sequence_step_detail = db.assembly_sequence_step_detail;

// Create and Save a new assembly_sequence_step_detail ---> tested
exports.create = (req, res) => {
  // Validate request
  if (!req.body.job_number) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a assembly_sequence_step_detail
  const assembly_sequence_step_detail = new Assembly_sequence_step_detail({

    job_number: req.body.job_number,
    components: req.body.components,
    assembly_step: req.body.assembly_step,
    assembly_step_actions: req.body.assembly_step_actions,
    published: req.body.published ? req.body.published : false
    
  });

  // Save assembly_sequence_step_detail in the database
  assembly_sequence_step_detail
    .save(assembly_sequence_step_detail)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the assembly_sequence_step_detail."
      });
    });
};

// Retrieve all assembly_sequence_step_details from the database. --> tested
exports.findAll = (req, res) => {
  const order = req.query.order;
  var condition = order ? { order: { $regex: new RegExp(order), $options: "i" } } : {};

  Assembly_sequence_step_detail.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving assembly_sequence_step_details."
      });
    });
};

// Find a single assembly_sequence_step_detail with an id --> tested
exports.findOne = (req, res) => {
  const step_uuid_ = req.params.id;
  
  //console.log(step_uuid_)

  Assembly_sequence_step_detail.find({assembly_step: step_uuid_,})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found assembly_sequence_step_detail with sequence " + sequence });
      else {
        res.send(data);
      }
      
      
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving assembly_sequence_step_detail with id=" + sequence });
    });
};


//TODO needs 
// Update a assembly_sequence_step_detail by the id in the request 
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }

//   const _sequence = req.params.id;
//   const _order = req.body.order
//   const _weight_value = req.body.weight_value
//   const _assembly_sequence_step_detail_type = req.body.assembly_sequence_step_detail_type
//   console.log(_assembly_sequence_step_detail_type)

//   Assembly_sequence_step_detail.updateOne({sequence: _sequence, order: _order}, {weight_value : _weight_value, assembly_sequence_step_detail_type: _assembly_sequence_step_detail_type})
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update assembly_sequence_step_detail with id=${sequence}. Maybe assembly_sequence_step_detail was not found!`
//         });
//       } else res.send({ message: "assembly_sequence_step_detail was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating assembly_sequence_step_detail with id=" + sequence + err
//       });
//     });

// };


// Delete a assembly_sequence_step_detail with the specified id in the request ---> tested
exports.delete = (req, res) => {
  const id = req.params.id;

  Assembly_sequence_step_detail.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete assembly_sequence_step_detail with id=${id}. Maybe assembly_sequence_step_detail was not found!`
        });
      } else {
        res.send({
          message: "assembly_sequence_step_detail was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete assembly_sequence_step_detail with id=" + id
      });
    });
};

// Delete all assembly_sequence_step_details from the database.
exports.deleteAll = (req, res) => {
  Assembly_sequence_step_detail.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} assembly_sequence_step_details were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all assembly_sequence_step_details."
      });
    });
};

// Find all published assembly_sequence_step_details
exports.findAllPublished = (req, res) => {
  Assembly_sequence_step_detail.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving assembly_sequence_step_details."
      });
    });
};
