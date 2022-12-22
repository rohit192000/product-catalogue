const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const Products = require('../model/products')

router.get("/", async (req, res) => {
  try {
    await new Products().fetchAll().then((products) => {
      res.send(products.toJSON());
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/add", productController);

module.exports = router;
