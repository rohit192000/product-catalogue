const Products = require("../../model/products");
const Variants = require("../../model/variants");

const FilterController = async (req, res) => {
  console.log("Price Filter : ", req.body.priceFilter);
  try {
    if (req.body.page) {
      var p = req.body.page;
    } else {
      var p = 1;
    }

    var products = await Products;

    if (req.body.colorFilter && req.body.colorFilter.length !== 0) {
      var ids = await Variants.where(
        "color",
        "IN",
        req.body.colorFilter
      ).fetchAll({ columns: ["products_id"] });
      ids = ids.toJSON().map((a) => a.products_id);

      products = products.where("id", "IN", ids);
    }

    if (req.body.priceFilter.low !== "" || req.body.priceFilter.high !== "") {
      var high = Number(req.body.priceFilter.high);
      let low = Number(req.body.priceFilter.low);
      console.log(`Price Filter after number ${low} and ${high}`);
      var ids = await Variants
        .query(function (qb) {
          if (low !== 0 && low > high) {
            console.log("only low value");
            qb.where("price", ">", low);
          } else if (low === 0 && high !== 0) {
            console.log("only high value");
            qb.where("price", "<", high);
          } else {
            console.log("both value");

            qb.whereBetween("price", [low, high]);
          }
        })
        .query({
          groupBy: "products_id",
        })
        .fetchAll({
          columns: ["products_id"],
        });
      ids = ids.toJSON().map((a) => a.products_id);
      products = products.where("id", "IN", ids);
    }

    if (req.body.categoryFilter && req.body.categoryFilter.length !== 0) {
      products = products.where("category", "IN", req.body.categoryFilter);
    }
    var results = await products.query("orderBy", "id", "asc").fetchPage({
      withRelated: [
        {
          variants: (qb) => {
            if (req.body.colorFilter && req.body.colorFilter.length !== 0) {
              console.log("ColorFIlter is there");
              qb.where("color", "IN", req.body.colorFilter);
            } else {
              console.log("color filter empty");
              if (
                req.body.priceFilter.low === 0 &&
                req.body.priceFilter.high === 0
              ) {
                qb.column(
                  "id",
                  "products_id",
                  "description",
                  "image",
                  "size",
                  "color",
                  "price"
                );
              }
            }
          },
        },
      ],
      pageSize: 10,
      limit : 10,
      page: p,
      offset: req.params.offset,
    });
    results = results.toJSON();

    res.status(200).send({
      message: "Filtered Products",
      data: results,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = FilterController;
