
module.exports = app => {
    const imu_sensor = require("../controllers/imu_sensor.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new document into imu_sensor
    router.post("/", imu_sensor.create);
  
    // Retrieve all imu_sensor
    router.get("/", imu_sensor.findAll);

    // Retrieve all imu data with certain user id
    router.get("/:userID", imu_sensor.findAllByUserId);
  
    // // Retrieve all published imu_sensor
    // router.get("/published", imu_sensor.findAllPublished);
  
    // // Retrieve a single Document using just job_number
    // // Example: url = "http://localhost:8080/api/imu_sensor/findOne/123456789002"
    // router.get("/findOne/:date", imu_sensor.findOne);
  
    // // Update a imu_sensor with id
    // router.put("/update/:date", imu_sensor.update);
    
    // // Delete a imu_sensor with id
    // router.delete("/delete/:date", imu_sensor.delete);
  
    // Create a new imu_sensor
    router.delete("/", imu_sensor.deleteAll);
  
    app.use("/api/imu_sensor", router);
    
  };
  
  