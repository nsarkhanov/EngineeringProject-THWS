
module.exports = app => {
  const assembly_sequence_plan_details = require("../controllers/assembly_sequence_plan_details.controllers.js");

  var router = require("express").Router();

  // Create a new document into assembly_sequence_plan_details
  router.post("/", assembly_sequence_plan_details.create);

  // Retrieve all assembly_sequence_plan_details
  router.get("/", assembly_sequence_plan_details.findAll);

  // Retrieve all published assembly_sequence_plan_details
  router.get("/published", assembly_sequence_plan_details.findAllPublished);

  // Retrieve a single Document using just job_number
  // Example: url = "http://localhost:8080/api/assembly_sequence_plan_details/findOne/123456789002"
  router.get("/findOne/:job_number", assembly_sequence_plan_details.findOne);

  // Update a assembly_sequence_plan_details with id
  router.put("/update/:job_number", assembly_sequence_plan_details.update);
  
  // Delete a assembly_sequence_plan_details with id
  router.delete("/delete/:job_number", assembly_sequence_plan_details.delete);

  // Create a new assembly_sequence_plan_details
  router.delete("/delete_all", assembly_sequence_plan_details.deleteAll);

  app.use("/api/assembly_sequence_plan_details", router);
  
};

