const express = require("express");
const router = express.Router();

const { query, param, body } = require("express-validator");
const { signup, signin } = require("../controller/UserController");
const { generate } = require("../controller/ProductContoller");

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/test", generate);

module.exports = router;
