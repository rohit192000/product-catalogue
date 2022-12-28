const Variants = require("../../model/variants");

const ColorFilter = async (req, res) => {
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
};

module.exports = { ColorFilter };
