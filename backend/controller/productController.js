const Products = require("../model/products");
const convertFile = require("../controller/base64_to_image");
const variantController = require("./variantController");

module.exports = async (req, res) => {
  try {
    let base64 = req.body.featured_image.file.base64;
    let image = req.body.featured_image.fileName;
    convertFile(base64, image);
    let data = req.body;
    await new Products({
      name: data.name,
      slug: data.slug,
      featured_image: data.featured_image.fileName,
      category: data.category,
    })
      .save()
      .then((product) => {
        variantController(product.toJSON(), req.body.variants);
        res.send(product.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
};
