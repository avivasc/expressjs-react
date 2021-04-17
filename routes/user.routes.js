module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Retrieve all users
  router.get("/", user.findAll);

  // Retrieve a single User with id
  router.get("/:id", user.findOne);

  // Create a new user
  router.post("/", user.create);

  // Update a user by given id
  router.put("/:id", user.update);

  app.use("/api/users", router);
};
