const Products = require("../../model/products");
const FetchCategory = async (req, res) => {
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
};

module.exports = { FetchCategory };
