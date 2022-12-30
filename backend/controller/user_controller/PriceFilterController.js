const Variants = require("../../model/variants");
const Products = require("../../model/products")
const PriceFilter = async (req, res) => {
  try {
    var high = Number(req.body.price.high);
    let low = Number(req.body.price.low);
    console.log(low > high);
    if (low > high) {
      console.log("low is high");
    }
    var ids = await new Variants("price")
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
        columns: ["products_id"],
      });
    ids = ids.toJSON().map((a) => a.products_id);
    await Products.where("id", "IN", ids)
      .fetchPage({
        withRelated: ["variants"]
      })
      .then((products) => {
        res.send(products.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { PriceFilter };
