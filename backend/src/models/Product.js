const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");
const Category = require("./Category");
const Subcategory = require("./SubCategory");

const Product = sequelize.define("Product", {
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
  subcategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Subcategory,
      key: "id",
    },
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
});

Category.hasMany(Product, { foreignKey: "categoryId" });
Subcategory.hasMany(Product, { foreignKey: "subcategoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });
Product.belongsTo(Subcategory, { foreignKey: "subcategoryId" });

module.exports = Product;
