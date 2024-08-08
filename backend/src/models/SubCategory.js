const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");
const Category = require("./Category");

const Subcategory = sequelize.define("Subcategory", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: "id",
    },
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sequence: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Category.hasMany(Subcategory, { foreignKey: "categoryId" });
Subcategory.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Subcategory;
