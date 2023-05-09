const { mongoose } = require("../models");
const db = require("../models");
const Dimension_per_component = db.dimension_per_component;


// Create and Save a new dimension_per_component --> tested
exports.create = (req, res) => {

  const uuid = req.params.uuid;
  // Validate request
  if (!req.body.uuid ) {
    res.status(400).send({ message: "uuid cannot be empty!" });
  
  
    return;
  }
  // Create a dimension_per_component
  const dimension_per_component = new Dimension_per_component({

    uuid : req.body.uuid,
    height : req.body.height,
    width: req.body.width,
    depth: req.body.depth,
    color : req.body.color,
    parent_reference : req.body.parent_reference,
    gripping_points : req.body.gripping_points,
    weight : req.body.weight,
    force : req.body.force,
    center_of_gravity : req.body.center_of_gravity,
    published: req.body.published ? req.body.published : false
  });
  
  // Save dimension_per_component in the database
  dimension_per_component
    .save(dimension_per_component)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the dimension_per_component."
      });
    });
};


// Retrieve all dimension_per_component from the database. --> tested
exports.findAll = (req, res) => {
  const order = req.query.order;
  var condition = order ? { order: { $regex: new RegExp(order), $options: "i" } } : {};

  Dimension_per_component.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving dimension_per_component."
      });
    });
};
 
// Find a single dimension_per_component with uuid --> tested
exports.findOne = (req, res) => {

  const uuid = req.params.uuid;
  console.log(req.params)
  
  Dimension_per_component.findOne({uuid : uuid}, { useFindAndModify: false })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found dimension_per_component with uuid= " + uuid });
      
      else {
        res.send(data);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving dimension_per_component with uuid=" + uuid });
    });
};

// Delete a dimension_per_component with the specified id in the request --> tested
exports.delete = (req, res) => {
  const uuid = req.params.uuid;
  console.log(req.params);
  
  Dimension_per_component.findOneAndDelete({uuid : uuid}, { useFindAndModify: false })
  // Dimension_per_component.findOneAndDelete(req.params.uuid)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete dimension_per_component with uuid= ${uuid}. Maybe dimension_per_component does not exist!`
        });
      } else {
        res.send({
          message: `dimension_per_component with uuid= ${uuid} was deleted successfully!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete dimension_per_component with uuid=" + uuid
      });
    });
};


// While creating a new collection's controller, make sure to assign const xxx to all the fields as per the model- it is unlikely to be the same as another  --> tested
exports.update = (req, res) => {

  const uuid = req.params.uuid;
  const height = req.body.height;
  const width= req.body.width;
  const depth = req.body.depth
  const color = req.body.color;
  const parent_reference = req.body.parent_reference;
  const gripping_points = req.body.gripping_points;
  const weight = req.body.weight;
  const force = req.body.force;
  const center_of_gravity = req.body.center_of_gravity;
  console.log(req.params);
  
  // Syntax: A.findOneAndUpdate(conditions, update, options)
  Dimension_per_component.findOneAndUpdate({uuid: uuid}, {uuid: uuid, height : height, width: width, depth: depth, color: color, parent_reference: parent_reference, gripping_points: gripping_points, gripping_points: gripping_points, weight: weight, force: force, center_of_gravity: center_of_gravity  }, { useFindAndModify: false })
  
// Dimension_per_component.findOneAndUpdate({uuid: uuid}, { height : height}, {useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update dimension_per_component with uuid= ${uuid}. Maybe dimension_per_component was not found!`
      });
    } else 
    {
      res.send({
        message: `dimension_per_component with uuid= ${uuid} was updated successfully.`
      });
    }
  }) 
};
  

// Delete all dimension_per_components from the database. --> tested
exports.deleteAll = (req, res) => {
  Dimension_per_component.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} dimension_per_component collection was deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all dimension_per_component."
      });
    });
};

// Find all published dimension_per_components --> tested
exports.findAllPublished = (req, res) => {
  Dimension_per_component.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving dimension_per_components."
      });
    });
};
