const express = require("express");
const router = express.Router();
const productController = require("../controller/admin_controller/productController");

const {
  FetchCategory,
} = require("../controller/user_controller/FetchCategoryController");

router.post("/add", productController);

router.get("/categories", FetchCategory);

module.exports = router;
