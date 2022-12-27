const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const Products = require("../model/products");
const variants = require("../model/variants");

router.get("/limit/:limit", async (req, res) => {
  try {
    await new Products()
    .fetchPage({
      pageSize : 10,
      page : 1,
      offset : req.params.limit,
      limit: 10,
      withRelated: "variants",
    })
    .then((products) => {
        if(req.params.limit >= products.pagination.rowCount){
          res.send(" ")
          return;
        }
        res.send(JSON.stringify(products));
        console.log(products)
        console.log(products.pagination.rowCount)
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/add", productController);

router.get("/categories", async (req, res) => {
  try {
    await new Products()
      .query({
        groupBy: "category",
      })
      .fetchAll({ columns: ["category"] })
      .then((category) => {
        console.log(category.toJSON());
        res.send(category.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/category/filter", async (req, res) => {
  try {
    await Products.where("category", "IN", req.body.categories)
      .fetchPage({ withRelated: "variants" })
      .then((category) => {
        res.send(category.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
});

router.get("/search/:name", async (req, res) => {
  try {
    await new Products()
      .where("name", "REGEXP", "^" + req.params.name)
      .fetchAll({ withRelated: "variants" })
      .then((data) => {
        res.send(data.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
