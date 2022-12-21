exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();

    table.string("name", 100).notNullable();
    table.string("slug", 255).notNullable();
    table.string("featured_image", 255).notNullable();
    table.string("category", 100).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products");
};
