exports.up = function (knex) {
  return knex.schema.createTable("variants", (table) => {
    table.increments("id").primary();

    table.integer("products_id").unsigned().notNullable();
    table
      .foreign("products_id", "variants_product_id")
      .references("id")
      .inTable("products")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");

    table.text("description", 255).notNullable();
    table.string("image", 255).notNullable();
    table.string("size", 50).notNullable();
    table.string("color", 50).notNullable();
    table.float("price").unsigned().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("variants");
};
