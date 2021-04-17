const db = require("../models");
const User = db.user;
const Gender = db.gender;

exports.findAll = async () => {
  return User.findAll({ include: Gender });
};

exports.findOne = async (id) => {
  return User.findByPk(id);
};

exports.update = async (id, user) => {
  let currentUser = await User.findByPk(id);
  if (currentUser) {
    currentUser = { ...currentUser, ...user };
  }

  const updatedUser = await User.update(currentUser, { where: { user_id: id } });
  return User.findByPk(id);
};

exports.create = async (user) => {
  return User.create(user);
};
