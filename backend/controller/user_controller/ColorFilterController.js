const Variants = require("../../model/variants");
const Products = require("../../model/products");
const ColorFilter = async (req, res) => {
  try {
    console.log(req.body.colors);
    var ids = await Variants.where("color", "=", req.body.colors).fetchAll({
      columns: ["products_id"],
    });
    ids = ids.toJSON().map((a) => a.products_id);
    await Products.where("id", "IN", ids)
      .fetchPage({
        withRelated: [
          {
            variants: (qb) => {
              qb.where("color", "=", req.body.colors);
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

// await new Variants()
//   .where("color", "=", req.body.colors)
//   .query({
//     groupBy: ["products_id", "color", "price"],
//   })
//   .fetchPage({
//     withRelated: ["products"],
//     columns: ["color", "price", "products_id"],
//   })
//   .then((product) => {
//     res.send(JSON.stringify(product));
//     // let data = product.related('products');
//     console.log(JSON.stringify(product));
//   });
