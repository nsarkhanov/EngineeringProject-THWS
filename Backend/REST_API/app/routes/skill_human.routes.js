module.exports = app => {
    const skill_humans = require("../controllers/skill_human.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", skill_humans.create);
  
    // Retrieve all skill_humans
    router.get("/", skill_humans.findAll);
  
    // Retrieve all published skill_humans
    router.get("/published", skill_humans.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", skill_humans.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", skill_humans.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", skill_humans.delete);
  
    // Create a new Tutorial
    router.delete("/", skill_humans.deleteAll);
  
    app.use("/api/skill_human", router);
  };