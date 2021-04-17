"use strict";

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING(50),
    },
    last_name: {
      type: Sequelize.STRING(50),
    },
    birthday: {
      type: Sequelize.DATE,
    },
    password: {
      type: Sequelize.STRING(40),
    },
    gender_id: {
      type: Sequelize.INTEGER,
      field: "gender_id",
    },
  });

  User.associate = function (models) {
    User.belongsTo(models.gender, {
      foreignKey: "gender_id",
    });
  };

  return User;
};

