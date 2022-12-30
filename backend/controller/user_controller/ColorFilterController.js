const Variants = require("../../model/variants");
const Products = require("../../model/products");
const ColorFilter = async (req, res) => {
  try {
    console.log(req.body.colors);
    var ids = await Variants.where("color", "=", req.body.attribute).fetchAll({
      columns: ["products_id"],
    });
    ids = ids.toJSON().map((a) => a.products_id);
    await Products.where("id", "IN", ids)
      .fetchPage({
        withRelated: [
          {
            variants: (qb) => {
              qb.where("color", "=", req.body.attribute);
            },
          },
        ],
      })
      .then((products) => {
        res.send(products.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { ColorFilter };

