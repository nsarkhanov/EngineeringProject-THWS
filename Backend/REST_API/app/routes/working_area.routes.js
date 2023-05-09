
module.exports = app => {
  const working_area = require("../controllers/working_area.controllers.js");

  var router = require("express").Router();

  // Create a new document into working_area
  router.post("/", working_area.create);

  // Retrieve all working_area
  router.get("/", working_area.findAll);

  // Retrieve all published working_area
  router.get("/published", working_area.findAllPublished);

  // Retrieve a single Document using just job_number
  // Example: url = "http://localhost:8080/api/working_area/findOne/123456789002"
  router.get("/findOne/:job_number", working_area.findOne);

  // Update a working_area with id
  router.put("/update/:job_number", working_area.update);
  
  // Delete a working_area with id
  router.delete("/delete/:job_number", working_area.delete);

  // Create a new working_area
  router.delete("/delete_all", working_area.deleteAll);

  app.use("/api/working_area", router);
  
};

