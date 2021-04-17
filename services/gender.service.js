const db = require("../models");
const Gender = db.gender;

exports.findAll = async () => {
  return Gender.findAll();
};
