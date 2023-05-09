module.exports = app => {
    const dimension_per_component = require("../controllers/dimension_per_component.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new document into dimension_per_component
    router.post("/", dimension_per_component.create);
  
    // Retrieve all dimension_per_component
    router.get("/", dimension_per_component.findAll);
  
    // Retrieve all published dimension_per_component
    router.get("/published", dimension_per_component.findAllPublished);
  
    // Retrieve a single Document using just uuid
    // Example: url = "http://localhost:8080/api/dimension_per_component/findOne/123456789002"
    router.get("/findOne/:uuid", dimension_per_component.findOne);
  
    // Update a dimension_per_component with id
    router.put("/update/:uuid", dimension_per_component.update);
    
    // Delete a dimension_per_component with id
    router.delete("/delete/:uuid", dimension_per_component.delete);
  
    // Create a new dimension_per_component
    router.delete("/delete_all", dimension_per_component.deleteAll);
  
    app.use("/api/dimension_per_component", router);
  };