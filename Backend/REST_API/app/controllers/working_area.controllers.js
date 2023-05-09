const { mongoose } = require("../models");
const db = require("../models");
const Working_area = db.working_area;


// Create and Save a new working_area --> tested
exports.create = (req, res) => {

  const job_number = req.params.job_number;
  // Validate request
  if (!req.body.job_number ) {
    res.status(400).send({ message: "job_number cannot be empty!" });
    return;
  }
  // Create a working_area  --> Tested
  const working_area = new Working_area({

    job_number : req.body.job_number,
    human_x : req.body.human_x,
    human_y: req.body.human_y,
    collaborative_x: req.body.collaborative_x,
    collaborative_y: req.body.collaborative_y,
    robot_x: req.body.robot_x,
    robot_y : req.body.robot_y,
    
    published: req.body.published ? req.body.published : false


  });
  
  // Save working_area in the database
  working_area
    .save(working_area)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the working_area."
      });
    });
};


// Retrieve all working_area from the database. --> tested
exports.findAll = (req, res) => {
  const order = req.query.order;
  var condition = order ? { order: { $regex: new RegExp(order), $options: "i" } } : {};

  Working_area.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving working_area."
      });
    });
};

// Find a single working_area with job_number --> tested
exports.findOne = (req, res) => {

  const job_number = req.params.job_number;
  console.log(req.params)

  Working_area.findOne({job_number : job_number}, { useFindAndModify: false })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found working_area with job_number= " + job_number });
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving working_area with job_number=" + job_number });
    });
};

// Delete a working_area with the specified id in the request --> tested
exports.delete = (req, res) => {
  const job_number = req.params.job_number;
  console.log(req.params);
  
  Working_area.findOneAndDelete({job_number : job_number}, { useFindAndModify: false })
  // working_area.findOneAndDelete(req.params.job_number)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete working_area with job_number= ${job_number}. Maybe working_area does not exist!`
        });
      } else {
        res.send({
          message: `working_area with job_number= ${job_number} was deleted successfully!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete working_area with job_number=" + job_number
      });
    });
};


// While creating a new collection's controller, make sure to assign const xxx to all the fields as per the model- it is unlikely to be the same as another  --> tested
exports.update = (req, res) => {

  const job_number = req.params.job_number;
  const human_x = req.body.human_x;
  const human_y = req.body.human_y;
  const collaborative_x= req.body.collaborative_x;
  const collaborative_y = req.body.collaborative_y
  const robot_x = req.body.robot_x;
  const robot_y = req.body.robot_y;
 

  console.log(req.params);
  
  // Syntax: A.findOneAndUpdate(conditions, update, options)
  Working_area.findOneAndUpdate({job_number: job_number}, {job_number: job_number, human_x : human_x, human_y: human_y, collaborative_x: collaborative_x, collaborative_y: collaborative_y, robot_x: robot_x, robot_y: robot_y}, { useFindAndModify: false })
  
// working_area.findOneAndUpdate({job_number: job_number}, { height : height}, {useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update working_area with job_number= ${job_number}. Maybe working_area was not found!`
      });
    } else 
    {
      res.send({
        message: `working_area with job_number= ${job_number} was updated successfully.`
      });
    }
  }) 
};
  

// Delete all working_areas from the database. --> tested
exports.deleteAll = (req, res) => {
  Working_area.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} working_area collection was deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all working_area."
      });
    });
};

// Find all published working_areas --> tested
exports.findAllPublished = (req, res) => {
  Working_area.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving working_areas."
      });
    });
};
