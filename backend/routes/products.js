const express = require("express");
const router = express.Router();
const Products = require("../model/products");

router.get("/", async (req, res) => {
  try {
    await new Products().fetchAll().then((products) => {
      res.send(products.toJSON());
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/add", async (req, res) => {
  try {
    await new Products({
      name: "Leather Driver Saddle Loafers",
      slug: "leather-driver-saddle-loafers-tan",
      featured_image: "image.jpeg",
      category: "Mens Footwear",
    })
      .save()
      .then((product) => {
        res.send(product.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
