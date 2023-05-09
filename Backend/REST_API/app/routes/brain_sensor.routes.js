
module.exports = app => {
  const brain_sensor = require("../controllers/brain_sensor.controllers.js");

  var router = require("express").Router();

  // Create a new document into brain_sensor
  router.post("/", brain_sensor.create);

  // Retrieve all brain_sensor
  router.get("/", brain_sensor.findAll);

  // Retrieve all heart rates with certain user id
  router.get("/:userID", brain_sensor.findAllByUserId);

  // Retrieve all published brain_sensor
  router.get("/published", brain_sensor.findAllPublished);

  // Retrieve a single Document using just date
  // Example: url = "http://localhost:8080/api/brain_sensor/findOne/123456789002"
  router.get("/findOne/:date", brain_sensor.findOne);

  // Update a brain_sensor with date
  router.put("/update/:date", brain_sensor.update);
  
  // Delete a brain_sensor with date
  router.delete("/delete/:date", brain_sensor.delete);

  router.delete("/delete_all", brain_sensor.deleteAll);

  router.delete("/", brain_sensor.deleteAll);


  app.use("/api/brain_sensor", router);
  
};

