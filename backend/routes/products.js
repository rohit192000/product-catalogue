const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const Products = require("../model/products");
const variants = require("../model/variants");

router.get("/", async (req, res) => {
  try {
    await new Products().fetchAll({withRelated : 'variants'}).then((products) => {
      res.send(JSON.stringify(products));
      console.log(JSON.stringify(products))
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/add", productController);

router.get("/category", async (req, res) => {
  try {
    await new Products("category")
      .query({
        groupBy: "category",
      })
      .fetchAll()
      .then((category) => {
        res.send(category.toJSON());
        console.log(category.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/category/filter", async (req, res) => {
  try {
    await Products.where("category", "IN", req.body.categories)
      .fetchPage({withRelated : 'variants'})
      .then((category) => {
        res.send(category.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
