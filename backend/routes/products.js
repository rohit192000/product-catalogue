const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

const {
  FetchCategory,
} = require("../controller/user_controller/FetchCategoryController");
const {
  FetchProduct,
} = require("../controller/user_controller/FetchProductController");
router.get("/limit/:limit", FetchProduct);

router.post("/add", productController);

router.get("/categories", FetchCategory);

module.exports = router;
