module.exports = app => {
    const heart_rate = require("../controllers/heart_rate_sensor.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", heart_rate.create);
  
    // Retrieve all heart rates
    router.get("/", heart_rate.findAll);

    // Retrieve all heart rates with certain user id
    router.get("/:userID", heart_rate.findAllByUserId);
  
    // Retrieve all published skill_humans
    router.get("/published", heart_rate.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", heart_rate.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", heart_rate.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", heart_rate.delete);
  
    // Create a new Tutorial
    router.delete("/", heart_rate.deleteAll);
  
    app.use("/api/heart_rate", router);
  };