const express = require("express");
const router = express.Router();
const {
  ColorFilter,
} = require("../controller/user_controller/ColorFilterController");
const {
  FetchColor,
} = require("../controller/user_controller/FetchColorController");
const {
  FetchVariant,
} = require("../controller/user_controller/FetchVariantsController");
const {
  PriceFilter,
} = require("../controller/user_controller/PriceFilterController");

router.get("/", FetchVariant);
router.get("/color", FetchColor);

router.post("/color/filter", ColorFilter);
router.post("/price/filter", PriceFilter);

module.exports = router;
