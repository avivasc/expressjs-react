module.exports = (app) => {
  const gender = require("../controllers/gender.controller.js");

  var router = require("express").Router();

  // Retrieve all genders
  router.get("/", gender.findAll);

  // Retrieve a single Gender with id
  router.get("/:id", gender.findOne);

  app.use("/api/genders", router);
};
