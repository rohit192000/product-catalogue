const Products = require("../../model/products");

const CategoryFilter = async (req, res) => {
  try {
    await Products.where("category", "IN", req.body.attribute)
      .query({
        groupBy: "id",
      })
      .fetchPage({ withRelated: "variants", limit: 10, offset : req.params.offset })
      .then((category) => {
        res.send(category.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { CategoryFilter };
