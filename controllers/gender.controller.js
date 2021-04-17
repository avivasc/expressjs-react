
const genderService = require("../services/gender.service");

// Retrieve all Genders from the database.
exports.findAll = async (req, res) => {
  const genders = await genderService.findAll();
  res.send(genders);
};

exports.findOne = async (req, res) => {
  const { params } = req;
  const gender = await genderService.findOne(params.id);
  res.send(gender);
};

