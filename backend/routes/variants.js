const express = require("express");
const router = express.Router();
const {
  FetchColor,
} = require("../controller/user_controller/FetchColorController");
const {
  FetchVariant,
} = require("../controller/user_controller/FetchVariantsController");


router.get("/", FetchVariant);
router.get("/color", FetchColor);


module.exports = router;
