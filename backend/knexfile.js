// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : process.env.PASSWORD,
      database : 'products'
    },
    migrations : {
      directory : __dirname + '/knex/migrations'
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'20221221105018_products.js

};
// exports.up = function(knex) {
//   return knex.schema.createTable('products', (table) => {

//       table.increments('id').primary();

//       table.string("name", 100).notNullable();
//       table.string("slug", 255).notNullable();
//       table.string("featured_image", 255).notNullable();
//       table.string("category", 100).notNullable();
//   })
// };

// exports.down = function(knex) {
// return knex.schema.dropTableIfExists("products");
// };

// exports.up = function(knex) {
//   return knex.schema.createTable('variants', (table) => {
      
//       table.increments("id").primary();

//       table.integer("products_id").unsigned().notNullable();
//       table.foreign("products_id", "variants_product_id").references("id").inTable('products').onDelete("RESTRICT").onUpdate("RESTRICT");

//       table.string('name', 255).notNullable();
//       table.string('description', 255).notNullable();
//       table.string('image', 255).notNullable();
//       table.string('size', 50).notNullable();
//       table.string('color', 50).notNullable();
//       table.float('price').unsigned().notNullable();
//   })
// };

// exports.down = function(knex) {
  // return knex.schema.dropTableIfExists("variants");
// };