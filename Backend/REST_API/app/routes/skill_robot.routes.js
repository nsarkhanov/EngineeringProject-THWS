module.exports = app => {
    const skill_robots = require("../controllers/skill_robot.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", skill_robots.create);
  
    // Retrieve all skill_robots
    router.get("/", skill_robots.findAll);
  
    // Retrieve all published skill_robots
    router.get("/published", skill_robots.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", skill_robots.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", skill_robots.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", skill_robots.delete);
  
    // Create a new Tutorial
    router.delete("/", skill_robots.deleteAll);
  
    app.use("/api/skill_robot", router);
  };