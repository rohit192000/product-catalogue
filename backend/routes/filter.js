const express = require("express");
const router = express.Router();
const FilterController = require("../controller/user_controller/FilterController")

router.post('/:offset', FilterController);

module.exports = router;