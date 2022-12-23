const bookshelf = require("./dbconfig");

const Variants = bookshelf.Model.extend({
  tableName: "variants",

  products: function () {
    return this.belongsTo("Products", "products_id", "id");
  },
});

module.exports = bookshelf.model("Variants", Variants);
