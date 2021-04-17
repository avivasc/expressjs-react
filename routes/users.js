var express = require("express");
var router = express.Router();

const userService = require("../services/user.service");
const genderService = require("../services/gender.service");

router.get("/", async function (req, res, next) {
  const users = await userService.findAll();
  res.render("users", { title: "user CRUD", users });
});

router.get("/add", async function (req, res, next) {
  const genders = await genderService.findAll();
  res.render("users/add", { genders });
});

router.get("/edit/(:id)", async function (req, res, next) {
  const { params } = req;
  const user = await userService.findOne(params.id);
  const genders = await genderService.findAll();
  res.render("users/edit", {
    user,
    genders,
  });
});

router.post("/add", async function (req, res, next) {
  const { body } = req;

  const userToCreate = {
    first_name: body.first_name,
    last_name: body.last_name,
    gender_id: body.gender_id,
    password: body.password,
    birthday: body.birthday,
  };

  const userCreated = await userService.create(userToCreate);

  if (userCreated) {
    res.redirect("/users");
  } else {
    res.render("users/add", {
      message: `An error occurred trying to create the user`,
    });
  }
});

router.post("/update/:id", async function (req, res, next) {
  const { params, body } = req;

  const userToUpdate = {
    first_name: body.first_name,
    last_name: body.last_name,
    gender_id: body.gender_id,
    birthday: body.birthday,
  };

  const num = await userService.update(params.id, userToUpdate);
  if (num) {
    res.redirect("/users");
  } else {
    res.render("users/edit", {
      message: `An error occurred trying to update the user with id=${params.id}`,
    });
  }
});

module.exports = router;
