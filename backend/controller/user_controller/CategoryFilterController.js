const Products = require("../../model/products");

const CategoryFilter = async (req, res) => {
  try {
    await Products.where("category", "IN", req.body.categories)
      .fetchPage({ withRelated: "variants" })
      .then((category) => {
        res.send(category.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { CategoryFilter };
