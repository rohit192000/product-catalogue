const Products = require("../../model/products");
const Search = async (req, res) => {
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
};

module.exports = { Search };
