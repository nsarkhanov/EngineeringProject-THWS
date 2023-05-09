
module.exports = app => {
    const skin_sensor = require("../controllers/skin_sensor.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new document into skin_sensor
    router.post("/", skin_sensor.create);

    // Retrieve all skin rates with certain user id
    router.get("/:userID", skin_sensor.findAllByUserId);
  
    // // Retrieve all skin_sensor
    router.get("/", skin_sensor.findAll);
  
    // // Retrieve all published skin_sensor
    // router.get("/published", skin_sensor.findAllPublished);
  
    // // Retrieve a single Document using just date
    // // Example: url = "http://localhost:8080/api/skin_sensor/findOne/123456789002"
    // router.get("/findOne/:date", skin_sensor.findOne);
  
    // // Update a skin_sensor with date
    // router.put("/update/:date", skin_sensor.update);
    
    // // Delete a skin_sensor with date
    // router.delete("/delete/:date", skin_sensor.delete);
  
    router.delete("/", skin_sensor.deleteAll);
  
    app.use("/api/skin_sensor", router);
    
  };
  
  