const express = require("express");
const router = express.Router();
const homeController = require("../controllers/picture.home");
const uploadController = require("../controllers/picture.controllers");

let routes = app => {
  // router.get("/all", homeController.getHome);

  // Upload a new files into picture
  router.post("/upload", uploadController.uploadFiles);

  // Retrieve all picture metadata
  router.get("/", uploadController.getListFiles);

  // Download single picture using file_name
  router.get("/download/:name", uploadController.download);

  return app.use("/api/picture", router);

};

module.exports = routes;