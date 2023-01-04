const express = require("express");
const router = express.Router();
const {
  FetchColor,
} = require("../controller/user_controller/FetchColorController");

router.get("/color", FetchColor);

module.exports = router;
