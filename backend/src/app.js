const express = require("express");
const cors = require('cors')
const path = require("path");
require("./db/index");

const app = express();
app.use(cors())
const sequelize = require("./db/index");
const Category = require("./models/Category");
const Subcategory = require("./models/SubCategory");
const Product = require("./models/Product");
const User = require("./models/user");
const categoryRoutes = require("./controller/CategoryController");
const subcategoryRoutes = require("./controller/SubcategoryController");
const productRoutes = require("./controller/ProductContoller");

const auth = require("./middlewares/requireAuth");

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "uploads")));

app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/products", productRoutes);

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // Use `force: true` only in development
    res.send("Database connected and synced!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).send("Database connection failed");
  }
});

// 404
app.use((req, res, next) => {
  return res
    .status(404)
    .json({ error: 1, msg: "request page " + req.url + " Not found." });
});

// 500 - Any server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ error: 1, msg: "Something broke!" });
});

module.exports = app;
