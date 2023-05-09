const { mongoose } = require("../models");
const db = require("../models");
const Assembly_sequence_plan_details = db.assembly_sequence_plan_details;


// Create and Save a new assembly_sequence_plan_details --> tested
exports.create = (req, res) => {

  const job_number = req.params.job_number;
  // Validate request
  if (!req.body.job_number ) {
    res.status(400).send({ message: "job_number cannot be empty!" });
    return;
  }
  // Create a assembly_sequence_plan_details  --> Tested
  const assembly_sequence_plan_details = new Assembly_sequence_plan_details({

    job_number : req.body.job_number,
    job_name : req.body.job_name,
    job_assignment: req.body.job_assignment,
    assembly_sequence_plan: req.body.assembly_sequence_plan,
    assembly_sequence_step_components: req.body.assembly_sequence_step_components,
    components: req.body.components,
    sub_assembly : req.body.sub_assembly,
    final_product : req.body.final_product,
    published: req.body.published ? req.body.published : false

  });
  
  // Save assembly_sequence_plan_details in the database
  assembly_sequence_plan_details
    .save(assembly_sequence_plan_details)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the assembly_sequence_plan_details."
      });
    });
};


// Retrieve all assembly_sequence_plan_details from the database. --> tested
exports.findAll = (req, res) => {
  const order = req.query.order;
  var condition = order ? { order: { $regex: new RegExp(order), $options: "i" } } : {};

  Assembly_sequence_plan_details.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving assembly_sequence_plan_details."
      });
    });
};

// Find a single assembly_sequence_plan_details with job_number --> tested
exports.findOne = (req, res) => {

  const job_number = req.params.job_number;
  console.log(req.params)

  Assembly_sequence_plan_details.findOne({job_number : job_number}, { useFindAndModify: false })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found assembly_sequence_plan_details with job_number= " + job_number });
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving assembly_sequence_plan_details with job_number=" + job_number });
    });
};

// Delete a assembly_sequence_plan_details with the specified id in the request --> tested
exports.delete = (req, res) => {
  const job_number = req.params.job_number;
  console.log(req.params);
  
  Assembly_sequence_plan_details.findOneAndDelete({job_number : job_number}, { useFindAndModify: false })
  // assembly_sequence_plan_details.findOneAndDelete(req.params.job_number)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete assembly_sequence_plan_details with job_number= ${job_number}. Maybe assembly_sequence_plan_details does not exist!`
        });
      } else {
        res.send({
          message: `assembly_sequence_plan_details with job_number= ${job_number} was deleted successfully!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete assembly_sequence_plan_details with job_number=" + job_number
      });
    });
};


// While creating a new collection's controller, make sure to assign const xxx to all the fields as per the model- it is unlikely to be the same as another  --> tested
exports.update = (req, res) => {

  const job_number = req.params.job_number;
  const job_name = req.body.job_name;
  const job_assignment = req.body.job_assignment;
  const assembly_sequence_plan= req.body.assembly_sequence_plan;
  const assembly_sequence_step_components = req.body.assembly_sequence_step_components
  const components = req.body.components;
  const sub_assembly = req.body.sub_assembly;
  const final_product = req.body.final_product;

  console.log(req.params);
  
  // Syntax: A.findOneAndUpdate(conditions, update, options)
  Assembly_sequence_plan_details.findOneAndUpdate({job_number: job_number}, {job_number: job_number, job_name : job_name, job_assignment: job_assignment, assembly_sequence_plan: assembly_sequence_plan, assembly_sequence_step_components: assembly_sequence_step_components, components: components, sub_assembly: sub_assembly, final_product: final_product}, { useFindAndModify: false })
  
// assembly_sequence_plan_details.findOneAndUpdate({job_number: job_number}, { height : height}, {useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update assembly_sequence_plan_details with job_number= ${job_number}. Maybe assembly_sequence_plan_details was not found!`
      });
    } else 
    {
      res.send({
        message: `assembly_sequence_plan_details with job_number= ${job_number} was updated successfully.`
      });
    }
  }) 
};
  

// Delete all assembly_sequence_plan_detailss from the database. --> tested
exports.deleteAll = (req, res) => {
  Assembly_sequence_plan_details.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} assembly_sequence_plan_details collection was deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all assembly_sequence_plan_details."
      });
    });
};

// Find all published assembly_sequence_plan_detailss --> tested
exports.findAllPublished = (req, res) => {
  Assembly_sequence_plan_details.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving assembly_sequence_plan_detailss."
      });
    });
};
