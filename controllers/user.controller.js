const userService = require("../services/user.service");

exports.findAll = async (req, res) => {
  const users = await userService.findAll();
  res.send(users);
};

exports.findOne = async (req, res) => {
  const { params } = req;
  const user = await userService.findOne(params.id);
  res.send(user);
};


exports.create = async (req, res) => {
  const { body } = req;

  const userToCreate = {
    first_name: body.first_name,
    last_name: body.last_name,
    gender_id: body.gender_id,
    password: body.password,
    birthday: body.birthday,
  };

  if (!body.first_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const userCreated = await userService.create(userToCreate);
  res.send(userCreated);
};

exports.update = async (req, res) => {
  const { params, body } = req;
  console.log(req);
  const userToUpdate = {
    first_name: body.first_name,
    last_name: body.last_name,
    gender_id: body.gender_id,
    birthday: body.birthday,
  };
  console.log(userToUpdate);
  const updatedUser = await userService.update(params.id, userToUpdate);
  res.send(updatedUser);
};
