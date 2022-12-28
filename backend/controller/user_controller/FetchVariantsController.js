const Variants = require("../../model/variants");

const FetchVariant = async (req, res) => {
  try {
    await new Variants().fetchAll().then((variants) => {
      res.send(variants.toJSON());
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { FetchVariant };
