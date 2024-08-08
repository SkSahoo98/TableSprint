const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const upload = require("../middlewares/multer");

// Create a new category
router.post("/", upload, async (req, res) => {
  try {
    const { name, status, sequence } = req.body;
    const image = req.file ? req.file.filename : null;

    const category = await Category.create({ name, status, sequence, image });
    // const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a category
router.put("/:id", async (req, res) => {
  
  console.log("Updating category with ID:", req.params.id);
  console.log("Request body:", req.body);
  console.log("Request image:", req.body.image);
  
  
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated > 0) {
      const updatedCategory = await Category.findOne({
        where: { id: req.params.id },
      });
      // console.log("Updated category:", updatedCategory);
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).send("Category not found");
    }
  } catch (error) {
    // console.log("Error updating category:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Delete a category
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("Category deleted");
    } else {
      res.status(404).send("Category not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
