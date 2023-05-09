module.exports = app => {
    const assembly_sequence_step_detail = require("../controllers/assembly_sequence_step_detail.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", assembly_sequence_step_detail.create);
  
    // Retrieve all assembly_sequence_step_detail
    router.get("/", assembly_sequence_step_detail.findAll);
  
    // Retrieve all published assembly_sequence_step_detail
    router.get("/published", assembly_sequence_step_detail.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", assembly_sequence_step_detail.findOne);
  
    // Update a Tutorial with id
    //router.put("/:id", assembly_sequence_step_detail.update);
    
    // Delete a Tutorial with id
    router.delete("/:id", assembly_sequence_step_detail.delete);
  
    // Create a new Tutorial
    router.delete("/", assembly_sequence_step_detail.deleteAll);
  
    app.use("/api/assembly_sequence_step_detail", router);
  };