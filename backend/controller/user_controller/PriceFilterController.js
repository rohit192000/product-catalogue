const Variants = require("../../model/variants");

const PriceFilter = async (req, res) => {
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
};

module.exports = { PriceFilter };
