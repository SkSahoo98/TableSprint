const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create a new product
router.post("/", async (req, res) => {
  try {
    const { name, categoryId, subcategoryId, status } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = await Product.create({
      name,
      categoryId,
      subcategoryId,
      status,
      image,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProduct = await Product.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("Product deleted");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
