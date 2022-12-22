const Variants = require("../model/variants");
const convertFile = require("./base64_to_image")

module.exports = (product, variants) => {
  variants.forEach(async (variant) => {
    let base64V = variant.image.file.base64;
    let variantImage = variant.image.fileName;
    convertFile(base64V, variantImage);
    await new Variants({
      products_id: product.id,
      description: variant.description,
      image: variant.image.fileName,
      size: variant.size,
      color: variant.color,
      price: variant.price,
    })
      .save()
      .catch((err) => {
        console.log(err);
      });
  });
};
