const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

const {
  FetchCategory,
} = require("../controller/user_controller/FetchCategoryController");
const {
  FetchProduct,
} = require("../controller/user_controller/FetchProductController");
const { Search } = require("../controller/user_controller/SearchController");
const Products = require("../model/products");
const variants = require("../model/variants");

router.get("/limit/:limit", FetchProduct);

router.post("/add", productController);

router.get("/categories", FetchCategory);

router.get("/search/:name", Search);

module.exports = router;
