const Variants = require("../../model/variants");

const FetchColor = async (req, res) => {
  try {
    await new Variants()
      .query({
        groupBy: "color",
      })
      .fetchAll({ columns: ["color"] })
      .then((color) => {
        res.send(color.toJSON());
        console.log(color.toJSON());
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { FetchColor };
