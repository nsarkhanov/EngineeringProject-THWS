module.exports = app => {
    const criteria_catalogue = require("../controllers/criteria_assembly.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", criteria_catalogue.create);
  
    // Retrieve all criteria_catalogue
    router.get("/", criteria_catalogue.findAll);
  
    // Retrieve all published criteria_catalogue
    router.get("/published", criteria_catalogue.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id/:data", criteria_catalogue.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", criteria_catalogue.update);
    
    // Delete a Tutorial with id
    router.delete("/:id", criteria_catalogue.delete);
  
    // Create a new Tutorial
    router.delete("/", criteria_catalogue.deleteAll);
  
    app.use("/api/criteria_catalogue", router);
  };