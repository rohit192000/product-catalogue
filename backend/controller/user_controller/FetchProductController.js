const Products = require("../../model/products");
const FetchProduct = async (req, res) => {
  try {
    await new Products()
      .fetchPage({
        pageSize: 10,
        page: 1,
        offset: req.params.limit,
        limit: 10,
        withRelated: "variants",
      })
      .then((products) => {
        if (req.params.limit >= products.pagination.rowCount) {
          res.send(" ");
          return;
        }
        res.send(JSON.stringify(products));
        console.log(products);
        console.log(products.pagination.rowCount);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { FetchProduct };
