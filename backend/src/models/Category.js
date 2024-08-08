const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  sequence: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Category;
