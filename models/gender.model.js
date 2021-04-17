"use strict";

module.exports = (sequelize, Sequelize) => {
  const Gender = sequelize.define("gender", {
    gender_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(10),
    },
  });

  return Gender;
};

