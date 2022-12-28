const express = require("express");
const router = express.Router();
const Variants = require("../model/variants");
router.get("/", async (req, res) => {
  try {
    await new Variants().fetchAll().then((variants) => {
      res.send(variants.toJSON());
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/color", async (req, res) => {
  try {
    await new Variants()
      .query({
        groupBy: "color",
      })
      .fetchAll({ columns: ["color"] })
      .then((color) => {
        res.send(color.toJSON());
        console.log(color.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/color/filter", async (req, res) => {
  try {
    await new Variants()
      .where("color", "IN", req.body.colors)
      .query({
        groupBy: ["products_id", "color", "price"],
      })
      .fetchPage({
        withRelated: ["products"],
        columns: ["color", "price", "products_id"],
      })
      .then((product) => {
        res.send(JSON.stringify(product));
        // let data = product.related('products');
        console.log(JSON.stringify(product));
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/price/filter", async (req, res) => {
  try {
    var high = Number(req.body.price.high);
    let low = Number(req.body.price.low);
    console.log(low > high);
    if (low > high) {
      console.log("low is high");
    }
    await new Variants("price")
      .query(function (qb) {
        if (low > high && low !== 0) {
          qb.where("price", ">", low);
        } else if (low === 0 && high !== 0) {
          qb.where("price", "<", high);
        } else {
          qb.whereBetween("price", [low, high]);
        }
      })
      .query({
        groupBy: ["products_id", "color", "price"],
      })
      .query({
        orderBy: "price",
      })
      .fetchAll({
        withRelated: "products",
        columns: ["color", "price", "products_id"],
      })
      .then((product) => {
        res.send(product.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
