const express = require("express");
const router = express.Router();
const Subcategory = require("../models/SubCategory");
const Category = require("../models/Category");

// Create a new subcategory
router.post("/", async (req, res) => {
  try {
    const { name, categoryId, sequence } = req.body;
    const image = req.file ? req.file.filename : null;

    const subcategory = await Subcategory.create({
      name,
      categoryId,
      sequence,
      image,
    });
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all subcategories
router.get("/", async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"], // Only fetch the 'name' attribute from the Category model
        },
      ],
    });
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a subcategory
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Subcategory.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedSubcategory = await Subcategory.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json(updatedSubcategory);
    } else {
      res.status(404).send("Subcategory not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a subcategory
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Subcategory.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("Subcategory deleted");
    } else {
      res.status(404).send("Subcategory not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
