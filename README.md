# Product Catalogue

Product Catalogue is a project which have front-end built on **React** and **Material-UI** library. It's backend uses **Node** and **Express** app for interaction with **database** and create routes.

This project uses **MySQL** database and run queries using **Bookshelf ORM** and uses **knex migration** for creating tables. 

Now this project running on localhost and database on **phpMyAdmin**.

This project consist of two modules **Admin** and **User**.

# Installation

Clone this repository by running below command :-

```terminal
$ git clone https://gitlab.com/rohitsamal.mvteams/product_catalogue.git
```
then go to the frontend directory :-
```terminal
$ cd product-catalogue/frontend
```

Now run `npm i` or `npm install`. It will install all dependencies.

Now goto the backend directory :- 
```terminal
$ cd ../backend
```

Run `npm i ` or `npm install` to install all dependencies.


# Database

1. Go to browser and open your **localhost://phpmyadmin** and create your database named **products**.

2. Now create tables using **knex migration**. 

3. First we have to configure our **knex**.

4. So for this you can use your own knex configurations or use the one in the code.

If you want to create your own knex configurations then follow the below steps, If not then skip this step. Now if you want to use my migrations just run `knex migrate:up` in backend to run the migrations. It will create all the tables needed.

### Knex Configurations and Migrations

1. **Knex Configurations :**

    - Install `knex@0.21.19` globally.
        ```terminal
        $ npm i -g knex@0.21.19
        ```

    - Check knex version using 
        ```terminal
        $ knex --version
        ```

    - Now move to backend directory.

    - Now run `knex init` to create `knexfile.js` which will use various configuration settings for module and migrations.

        ```terminal
        $ knex init
        ```

    - Your `knexfile.js` will be created in the current folder. Change configurations according to the requirement.

        <details>
        <summary>knexfile.js</summary>
        <p>

        ```js
        // Update with your config settings.

        module.exports = {
          development: {
            client: "mysql",
            connection: {
              host: "localhost",
              user: "root",
              password: process.env.PASSWORD,
              database: "products",
            },
            migrations: {
              directory: __dirname + "/knex/migrations",
            },
          },

          staging: {
            client: "mysql",
            connection: {
              host: "localhost",
              user: "root",
              password: process.env.PASSWORD,
              database: "products",
            },
            pool: {
              min: 2,
              max: 10,
            },
            migrations: {
              directory: __dirname + "/knex/migrations",
            },
          },

          production: {
            client: "mysql",
            connection: {
              host: "localhost",
              user: "root",
              password: process.env.PASSWORD,
              database: "products",
            },
            pool: {
              min: 2,
              max: 10,
            },
            migrations: {
              directory: __dirname + "/knex/migrations",
            },
          },
        };

        ```
        </p>
        </details>
    - In this file there is configuration define for three environments :- _development_ , _staging_, and _production_.

    - We will use development environment only as we are working on localhost.

    - `development` key contains your configurations for database and migrations.

    - `client` is the database name you want to connect.

    - In `connection` define host, user, password and database name you've created in your `localhost/phpmyadmin`.

    - In `migrations` define your directory in which migration will store. 

    - `__dirname` it will store the `/knex/migrations` in current working directory. In our case it is `backend`.

2. **Knex Migrations :**

    - Knex Migration helps us to create tables by using the _Knex Migration CLI_.

    - To create migartions run `knex migrate:make migration_name`

        ```console
        $ knex migrate:make products
        ```

        Output :-

        ```console
        Using environment: development
        Using environment: development
        Using environment: development
        Created Migration: /var/www/html/product_catalogue/backend/knex/migrations/20221221112736_products.js
        ```

    - It will automatically build your migration in the folder **backend/knex/migrations/migration_name**.

    - After that your directory structure will look like this :
        ```
        backend
        ├── app.js
        ├── bin
        │   └── www
        ├── knex
        │   └── migrations
        │       ├── 20221221112736_products.js

        ```

    - Initially **20221221112736_products.js** file have only predefined template.

        ```js

        exports.up = function(knex) {
        };

        exports.down = function(knex) {
        };

        ```

    - Now we have to write queries to create tables.

        ```js

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

        ```

    - In **exports.up** you will return your query to create tables. Here I've created tableName `products` and in the function I've define the table structure.

    - **table.increments("id").primary()** will create table with column "id" which is primary key and AUTO_INCREMENT and "name" which is varchar(255).

    - In **exports.down** you will return the query to drop tables.

    - Now run `knex migrate:latest --env development` or `knex migrate:up migration_name` to run the migration which will create the table in database.

        ```terminal
        $ knex migrate:latest --env development
        OR
        $ knex migrate:up 20221221112736_products.js
        ```

    - `knex migrate:latest` will run the latest migration while `knex migrate:up` will run the first migration.

    - After that your table structure will look like this.

        | Name | Type | Collation | Attributes | Null | Default | Comments | Extra | Action
       | --- | --- | --- | --- | --- | --- | --- | --- | --- |
        id | int | --- | UNSIGNED | No | None | --- | AUTO_INCREMENT | --- |
        name | varchar(100) | utf8mb4_0900_ai_ci	 | --- | No | None | --- | --- | --- |
        slug | varchar(255) | utf8mb4_0900_ai_ci	 | --- | No | None | --- | --- | --- |
        featured_image | varchar(255) | utf8mb4_0900_ai_ci	 | --- | No | None | --- | --- | --- |
        category | varchar(100) | utf8mb4_0900_ai_ci	 | --- | No | None | --- | --- | --- |


    - Now if you want to use my migrations just run `knex migrate:up` to run the [migrations](https://gitlab.com/rohitsamal.mvteams/product_catalogue/-/blob/main/backend/knex/migrations/). It will create all the tables needed.

### Database Structure

1. **products table :**  Structure has given above. primary key id.

2. **variants table :** 

    | Name | Type | Collation | Attributes | Null | Default | Comments | Extra | Action
    | --- | --- | --- | --- | --- | --- | --- | --- | --- |
    | id | int | --- | UNSIGNED | No | None | --- | AUTO_INCREMENT | --- |
    | products_id | int | --- | UNSIGNED | No | None | --- | --- | --- |
    description | text | utf8mb4_0900_ai_ci	 | --- | No | None | --- | --- | --- |
    image | varchar(255) | utf8mb4_0900_ai_ci	 | --- | No | None | --- | --- | --- |
    size | varchar(50) | utf8mb4_0900_ai_ci	 | --- | No | None | --- | --- | --- |
    color | varchar(50) | utf8mb4_0900_ai_ci	 | --- | No | None | --- | --- | --- |
    price | float(8,2) | utf8mb4_0900_ai_ci	 | UNSIGNED | No | None | --- | --- | --- |

    PRIMARY KEY : id

    FOREIGN KEY : products_id   

    REFERENCES products table

    RELATION with products table (many-to-one)

### Bookshelf Configurations

- Bookshelf is a JavaScript ORM for Node.js, built on the Knex SQL query builder. It features both Promise-based and traditional callback interfaces, transaction support, eager/nested-eager relation loading, polymorphic associations, and support for one-to-one, one-to-many, and many-to-many relations.

- Now to perform various queries on tables using our **express** app  we have to first connect our backend to database usind **Bookshelf** configurations. 

- Now create configuration file in the backend directory. I have created my configuration in **\backend\model\dbconfig.js** file.

    ```js
    const knex = require("knex")({
      debug: true,
      client: "mysql",
      connection: {
        host: "localhost",
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: "products",
      },
    });
    
    const bookshelf = require('bookshelf')(knex);
    
    module.exports = bookshelf;
    ```
- Now we will use these configurations to create our database models and relation between different tables.

### Database Models

- Database Models helps us to run various queries on the database and define relations between different tables.

- This project uses two models **Products** and **Variants**.

    <details><summary>products.js</summary>

    ```js
    const bookshelf = require('./dbconfig');
    const Variants = require('./variants')
    const Products = bookshelf.model("Products", {
        tableName : 'products',

        variants : function(){
            return this.hasMany(Variants, 'products_id', 'id')      
        }
    })

    module.exports = Products;
    ```
    </details>

    <details><summary>variants.js</summary>
    
    ```js
    const bookshelf = require("./dbconfig");

    const Variants = bookshelf.Model.extend({
      tableName: "variants",

      products: function () {
        return this.belongsTo("Products", "products_id", "id");
      },
    });

    module.exports = bookshelf.model("Variants", Variants);
    ```
    </details>

    - Products and Variants are a model for the respective tables. In which I have define the relation with another table to perform relation queries.


    - **tableName** is the name of table whose model is created.


    - **functions** define relations between different tables that its has one-to-one , many-to-one etc.

- Now our all configuration are complete. Now create **routes** for the API.

# Routes and Controllers: 

- I've created my Routes in a **routes** directory and Controllers in a **controller** directory in backend folder.

### Routes :
- I've used **express Router** to define routes. To use these routes I've called them in **app.js** file.

    ```js
    const productsRouter = require('./routes/products');
    const variantsRouter = require('./routes/variants');
    const filterRouter = require('./routes/filter')

    app.use('/filter', filterRouter);
    app.use('/products', productsRouter);
    app.use('/variants', variantsRouter);
    ```

- This project uses three routes which are defined below.

    <details><summary>products.js</summary>

    ```js
    const express = require("express");
    const router = express.Router();
    const productController = require("../controller/admin_controller/productController");

    const {
      FetchCategory,
    } = require("../controller/user_controller/FetchCategoryController");

    router.post("/add", productController);

    router.get("/categories", FetchCategory);

    module.exports = router;
    ```
    </details>

    <details><summary>variants.js</summary>

    ```js
    const express = require("express");
    const router = express.Router();
    const {
      FetchColor,
    } = require("../controller/user_controller/FetchColorController");

    router.get("/color", FetchColor);

    module.exports = router;
    ```
    </details>

    <details><summary>filter.js</summary>

    ```js
    const express = require("express");
    const router = express.Router();
    const FilterController = require("../controller/user_controller/FilterController")

    router.post('/:offset', FilterController);

    module.exports = router;
    ```
    </details>

### Controllers :

- Controllers are used to define specific (req, res) functions for different routes. We can define controllers for other controllers also.

- In my routes I've imported controllers needed for the specific routes.

- This project has two directory in **controller** folder named **admin_controller** and **user_controller**.

- **admin_controller** has number of controller in different files. 

    - In the file **productController.js**, I've defined controller which adds the product data in database using database models. This controller again uses two more controller **variantController.js** for adding the variants and **base64_to_image.js** to convert the base64 file to image file and add in the backend folder **backend/public/images**.

        <details><summary>productController.js</summary>

        ```js
        const Products = require("../../model/products");
        const convertFile = require("./base64_to_image");
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
        ```
        </details>

    - **variantController.js** has controller responsible for adding the variants in the database. It uses the result from productController to fetch products_id whose variants has to be stored in the database. It also uses base64_to_image controller.

        <details><summary>variantController.js</summary>
        ```js
        const Variants = require("../../model/variants");
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
        ```
        </details>

    - **base64_to_image.js** controller has controller defined which is responsible for converting the base64 format to image format and save that image in the backend filder public/images using **fs** module. In frontend we can fetch these images by calling url `http://localhost:3001/images/image_name`.

        <details><summary>base64_to_image.js</summary>

        ```js
        const fs = require("fs");
        
        module.exports = (base64, fileName) => {
          let base64Image = base64.split(";base64,").pop();
          fs.writeFile(
            "public/images/" + fileName,
            base64Image,
            { encoding: "base64" },
            function (err) {
              console.log("File created");
            }
          );
        };
        
        ```
        </details>

- **user_controller** has controllers related to the user module. 

    - **FetchCategoryController.js** and **FetchColorController.js** has controllers defined which fetch the category and color names from the database using database models **Products** and **Variants**.

        <details><summary>FetchCategoryController.js</summary>

        ```js
        const Products = require("../../model/products");
        const FetchCategory = async (req, res) => {
          try {
            await new Products()
              .query({
                groupBy: "category",
              })
              .fetchAll({ columns: ["category"] })
              .then((category) => {
                console.log(category.toJSON());
                res.send(category.toJSON());
              });
          } catch (err) {
            console.log(err);
          }
        };

        module.exports = { FetchCategory };
        ```
        </details>

        <details><summary>FetchColorController.js</summary>

        ```js
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
        ```
        </details>

    - **FilterController.js**  has controller defined which is responsible for various filters on the user module. It uses both the database models. It has many different queries according to the different filters. These queries will run according to the conditions that which filter is selected. This controller responsible for fetch data according to the filters selected from the user module and send response as a Products data. I will be defining every query in the user module.

        <details><summary>FilterController.js</summary>

        ```js
        const Products = require("../../model/products");
        const Variants = require("../../model/variants");
        
        const FilterController = async (req, res) => {
          console.log("Search Filter : ", req.body.searchFilter);
          try {
            if (req.body.page) {
              var p = req.body.page;
            } else {
              var p = 1;
            }
        
            var products = await Products;
        
            // if the color filter is selcted
            if (req.body.colorFilter && req.body.colorFilter.length !== 0) {
              var ids = await Variants.where(
                "color",
                "IN",
                req.body.colorFilter
              ).fetchAll({ columns: ["products_id"] });
              ids = ids.toJSON().map((a) => a.products_id);
        
              products = products.where("id", "IN", ids);
            }
        
            // if the price filter is selcted
            if (req.body.priceFilter.low !== "" || req.body.priceFilter.high !== "") {
              var high = Number(req.body.priceFilter.high);
              let low = Number(req.body.priceFilter.low);
              console.log(`Price Filter after number ${low} and ${high}`);
              var ids = await Variants.query(function (qb) {
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
        
            // if the category filter is selected
            if (req.body.categoryFilter && req.body.categoryFilter.length !== 0) {
              products = products.where("category", "IN", req.body.categoryFilter);
            }
        
            // if the search filter is selected
            if (req.body.searchFilter && req.body.searchFilter !== "") {
              products = products.where("name", "REGEXP", "^" + req.body.searchFilter);
            }
        
            // It will fetch the last result even one filter is seleted or multiple.
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
              limit: 10,
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
        
        ```
        </details>
