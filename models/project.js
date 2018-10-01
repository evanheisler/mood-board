'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.JSON
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
  };
  return Project;
};