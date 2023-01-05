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

After this modify database, knex configuration and bookshelf configuration according to requirement.

Open terminal and go to the frontend folder and run `npm start` to run the app in the browser. By default user module will open. To open admin add `/admin` in the url.


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

# Modules

- This project has two modules **Admin** for adding products and **User** for display of the products and filter products.

- These modules are in the folder having path `frontend/src/components/`. The directory structure of these modules are :-

  ```
  components
  ├── Admin
  │   ├── AddImage.js
  │   ├── Form.js
  │   ├── Variant.js
  │   └── VariantModal.js
  └── User
      ├── CustomHooks
      │   └── useDidMountEffect.js
      ├── Filter
      │   ├── Blueprint.js
      │   ├── CategoryFilter.js
      │   ├── ColorFilter.js
      │   ├── PriceFilter.js
      │   ├── ProductFilter.js
      |   └── SearchBar.js
      ├── Homepage.js
      └── Images.js
  
  ```


- I've created route for the `admin` and `user` module in `App.js` file in `src` folder. I've used code splitting for dynamically importing those modules using `lazy` and `Suspense` module from react.

- By code splitting means this will import only those files which user needed at that time. For example, If admin goes to the react app in browser then it will only import admin module not the user module and vice-versa.

- It will help in lowering the server load on first render and render page in less time.

  ```js

    import React, { Suspense, lazy } from "react";
    import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    const Homepage = lazy(() => import("./components/User/Homepage"));
    const Form = lazy(() => import("./components/Admin/Form"));
    const VariantModal = lazy(() => import("./components/Admin/VariantModal"));
    const App = () => {
      console.log(window.location.href);
      return (
        <div className="App" style={{ background: "#dfd3c3" }}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/admin" element={<Form />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/VariantModal" element={<VariantModal />} />
              </Routes>
            </Suspense>
          </Router>
        </div>
      );
    };

    export default App;

  ```


#### Admin Module

- This module is responsible for adding the products and its variants in the database.

- This module consists of **form** for adding products, **modal** for adding variants, **table** for displaying variants to be added and **addImage** components for converting the image file into base64 format.

- I've defined components below :- 

  - **Form**

    - This component will be responsible for displaying the form and is the main component for the admin module. All other components will be imported in this component.
    - This component uses three react `hooks`, `useState`, `useEffect` and `useref`.

    - This component contains five states `variants` in which array of variants will be added, `product` in which product data will be added, `file` in which images will be added, `add` and `add1` both are dependencies for different `useEffect`. It is also contains one useRef variable `image` for conrolling image TextField.

      ```js

      const [variants, setVariants] = useState([]);
      const image = useRef();
      const [product, setProduct] = useState({
        name: "",
        slug: "",
        featured_image: "",
        category: "",
        variants: [],
      });
      const [file, setFile] = useState({
        fileName: "",
        file: "",
      });
      const [add, setAdd] = useState(false);
      const [add1, setAdd1] = useState(false);
      ```

    - This component uses Material-UI components `Box`, `TextField`, `Stack` and `Button`.

    - This component contains 3 `TextField` for `Product Name`, `Product Category`, `Image` and `Add Product` button for submitting the final data.

    - `Product Name` TextField has `onChange` event which sets the product name in the `product` state.

      ```js
        <TextField
          id="standard-basic"
          label="Product Name"
          variant="standard"
          type="text"
          name="product_name"
          value={product.name}
          onChange={(e) =>
            setProduct((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
      ```

    - `Product Category` TextField has `onChange` event which sets the category name in `product` state.

    - `Image` TextField has `onChange` event which calls the function `addFile` which uses code splitting to dynamic import the `AddImage` component and call the `saveFile` function from the imported component which takes the two parameters `event` from the image field and `setFile1` function from the `file` state. This `saveFile` function convers the image file into base64 format. `Image` TextField has also have `inputRef` which has `image` variable set to it  by using this variable I've empty the value if image on successfully added the products.

      ```js
        const addFile = (e) => {
          import("./AddImage").then((addImage) => {
            addImage.saveFile1(e, setFile);
            console.log(image.current.value);
          });
        };

      ``` 

    - This component also contains another component `Variant` which displays the variants to be addded in the `Table` and contains modal for display the form in which variant details will be added and imported from the current working folder. I've  passed the `variant` state as a props.


    - `Add Product` button has onClick events which calls the `addProduct` function which changes the state `add` from false to true which in returns call the `useEffect` with dependency `add`. 
    
    - This useEffect will check the condition that `add` is true or not. If true then it checks the condition that all fields are filled or not. If not then it will alert the user with message `Please fill all the fields` and change the state `add` to false.

    - If all fields are filled then it set the state `product` with required values and change the state `add` to false and `add1` to true which is also a dependency  of another useEffect.

      ```js

        useEffect(() => {
          // console.log(add);
          if (add) {
            if (product.name !== "" && file !== "" && variants.length !== 0) {
              setProduct((prevState) => ({
                ...prevState,
                slug: product.name
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .replace(/[^\w-]+/g, ""),
                featured_image: file,
                variants: variants,
              }));
              setAdd((prevState) => false);
              setAdd1((prevState) => true);
            } else {
              setAdd((prevState) => false);
              alert("Please fill all the fields");
            }
          }
        }, [add]);
      ```

    - When above `useEffect` will change state `add1` to true it will run another `useEffect`. This useEffect will check if add1 is true or not. If true then it will send the `axios` post request to the url `http://localhost:3001/products/add` with state `product`. This request will call the api from the backend which adds the product.

      ```js
        router.post("/add", productController);
      ```
    
    - This request will fetch add the products in database. After successfully added the request this will clear all the field and alert to the user that `Product has been added successfully`.

      ```js

        useEffect(() => {
          if (add1) {
            // console.log(product);
            axios
              .post("http://localhost:3001/products/add", product)
              .then((response) => {
                console.log(response.data);
              });
            setAdd1((prevState) => false);
            alert("Product has been added successfully");
            setProduct((prevState) => ({
              ...prevState,
              name: "",
              slug: "",
              featured_image: "",
              category: "",
              variants: [],
            }));
            setVariants((prevState) => []);
            image.current.value = ""
          }
        }, [add1]);
      ```

  - **AddImage**

    - This component will responsible for converting the image file into base64 format to be send to backend. This component contains two functions `saveFile1` and `getBase64`.

    - `getBase64` will take `image` file as input. For example : `getBase64(e.target.files[0])` where e takes the data from input field having type file. After that it uses return `Promise` which uses `FileReader` to convert file into base64 format and on resolve give fileInfo object which contains base64 format and data for that file.

      ```js

        const getBase64 = (file) => {
          return new Promise((resolve) => {
            let baseUrl = "";

            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);
            // on reader load something..
            reader.onload = () => {
              // console.log("Called", reader);
              // Make a fileInfo object
              baseUrl = reader.result;
              // console.log(baseUrl);
              resolve(baseUrl);
            };
          });
        };

      ```

    - `saveFile1` function takes two input `e` as event from the input field of type `file` and `callback` function. `callback` function is a `setState` function whose state has value of type file. In this project that is a `file` state in `Form.js`.
    
    - It calls the `getBase64` function and after resolve it sets the fileInfo which it gets from the `getBase64` function to the `state` using callback function.

      ```js

        const saveFile1 = (e, callback) => {
          // setFileName(e.target.files[0].name);
          let file1;
          file1 = e.target.files[0];
          getBase64(file1)
            .then((result) => {
              file1["base64"] = result;
              // console.log("file is", file1);
              callback((prevState) => ({
                ...prevState,
                fileName: file1.name,
                file: file1,
              }));
            })
            .catch((err) => {
              // console.log(err);
            });
        };

      ```

  - **Variant**
  
    - This component renders the `Table` of variants details using Material-Ui `Table` component in the `Form.js` component. This component has one state `open` which uses controls the rendering of modal.

      ```js

        const [open, setOpen] = useState(false)
      ```

    - This table contains `Add Variant` button which has `onClick` event. On click this will change the state `open` from false to true.

    - It uses conditional rendering to render `VariantModal` component and passes props for set the `variants` data.

      ```js

        {open && (
          <Suspense fallback={<div>Modal...</div>}>
            <VariantModal
              variants={props.variants}
              setVariants={props.setVariants}
              setOpen={setOpen}
              open={open}
            />
          </Suspense>
        )}      
      ```

    - On click the button `open` will become true and then `VariantModal` will be dynamically imported and displays the modal. Modal contains the form for adding the variants and on submitting the form it will set the `variant` state with the `formdata`.

    - Table is using `variant` state to display variants data. Every time form in modal will submitted, it updates the `variant` state and data in table will be updated.

  - **VariantModal**

    - This component contains the modal for variant detail form which opens when user click the `Add Variant` button on table. 

    - This form contains TextField for `color`, `size`, `Amount`, `description`, `image`, and Button for `submitting the form.

    - `image` field works same as the image field in `Form.js` component.

    - This form has event `onSubmit` which calls `addVariant` function on submitting the form.

    - `addVariant` function takes event from form as input and set the `variant` state with `formdata` which updates the data in table.


  - Admin Module documentation ends here.

#### User Module

-  This module is responsible for displaying the products with their featured_image, first variant price, and color.

- On first render only 10 products will be fetched and on-scroll when user reaches the end of the page, then next 10 products will be fetched and so-on.

- Products will filter on the basis of name, color, category and price.

- Directory Structure :- 
  ```
    User
    ├── CustomHooks
    │   └── useDidMountEffect.js
    ├── Filter
    │   ├── Blueprint.js
    │   ├── CategoryFilter.js
    │   ├── ColorFilter.js
    │   ├── PriceFilter.js
    │   ├── ProductFilter.js
    │   └── SearchBar.js
    ├── Homepage.js
    └── Images.js

  ```

- This module contains component for different functions which defined below : -

  - **useDidMountEffect**

    - This component responsible for stopping the useEffect rendering on first render.

      ```js
        import React, { useEffect, useRef } from 'react';

        // This hook will stop blueprint.js from initial render.
        const useDidMountEffect = (func, deps) => {
            const didMount = useRef(false);

            useEffect(() => {
                if (didMount.current) func();
                else didMount.current = true;
            }, deps);
        }

        export default useDidMountEffect;
      ```

  - **Homepage** 

    - This component is the main components for the `user` module. All other components will be dynamically imported here.

    - This component contains five states `loading` responsible for rendering message `fetching images`, `productArray` responsible for storing the fetched products,
`lastElement` responsible for storing the `ref` to the last element on page, `productMap` an array responsible for display the image and `filter` responsible for storing the selected filter. This also contains variable `offset` defined using `useRef` hook to store its state.

      ```js
        const [loading, setLoading] = useState(false);
        const [productArray, setProductArray] = useState([]);
        const offset = useRef(0);
        const [lastElement, setLastElement] = useState(null);
        const [productMap, setProductMap] = useState([]);

        const [filter, setFilter] = useState({
          priceFilter: {
            low: "",
            high: "",
          },
          categoryFilter: [],
          colorFilter: [],
          searchFilter : ""
        });

      ```

    - In below element I have set its `ref` to the state `lastElement` to access this element directly from DOM.

      ```js
        {loading && (
          <Typography
            variant="p"
            sx={{ marginLeft: "40%", background: "#DFD3C3" }}
            id="allproduct"
            ref={setLastElement}
          >
            fetching images...
          </Typography>
        )}
      ```

    - This component uses `fetchData` function to fetch the products from the database. This function uses axios `post` request to the url `http://localhost:3001/filter/ + offset`. I've sent offset as a params which will fetch first 10 products according to the offset. This same function will fetch the filtered products.

    - I've send `filter` state to the request as to fetch products according to the filter selected. If not selected it will fetch first 10 products.

      ```js
        const fetchData = () => {
          console.log("filter request", offset.current);
          axios
            .post("http://localhost:3001/filter/" + offset.current, filter)
            .then(async (response) => {
              console.log(filter);
              console.log(response.data.data);
              if (response.data.data.length === 0) {
                console.log("response is empty");
                await setLoading((prevState) => false);
                return;
              } else {
                // setTimeout(() => {
                  setProductArray((prevState) => response.data.data);
                  offset.current =
                    response.data.data[response.data.data.length - 1].id;
                  console.log("after fetching data Offset value : ", offset.current);
                // }, 1000);
                setTimeout(() => {
                  setLoading(true);
                }, 2000);
              }
            });
        };
      ```

    - In backend I've made the controller which is responsible for fetching the products even if its filtered or not if request send to this route. That is `FilterController.js`. 

    - In that controller I've created many conditions according to the `filter` state data. If filter selected then it will fetch filtered products and if not then all products.

    - I've assign the `Products` model to the `products` variable. Now what it do is that on every condition which becomes true it assign the updated model in this variable.
I've explained all conditions in a respected filter components which uses these conditions. 

    - So now what happens is that if I selected multiple filters like for category and color then it will fetch product according to both filters. If not slected any filter then it will fetch all products.

    - For getting the final resulted model I've created a variable named `results` and assugned a result from the simple fetch query on `Products` model with related variants. It will fetch the products from updated model. And sends response to the frontend.

    - I've made the resulted variable `results` which takes the last updated model and fetched all the data in that updated model with related table `Variants` with limits and offset. This `results` variable will be used for every filters and all products.

      ```js
        // It will fetch the last result even one filter is seleted or multiple or not any.
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
      ```
          -      
    - After fetching products it will check if the fetched data is empty or not. If empty it will set the `loading` state `false` and return the function.

    - If data is not empty then it will set the `productArray` state with the response data. And update the offset with last fetched product id, so when on-scrol it will fetch next 10 products. After this it will set the state of loading to true after 2 sec and `Typography` will be render to the front-end.

    - I've used this function in a `useEffect` so that on first render it will fetch the products. And set `filter` state as an dependency array. 

    - On first render it will fetch the first 10 products and change the `productArray` state which is a dependency array for the useEffect in `Images` component. That on every render push the data from`productArray` into state `productMap` which is used to display products using map. I will explain this in Images.js component. 

    - After fetching data it will update the `offset` with the last fetched product id, so if again I want to fetch the produvt with same query then it will fetch next products on scroll.

    - Now on scroll when user reaches the end of the page it will fetch next 10 products from the database. For this functionality I've used `IntersectionObserver`. Now `fetchData` function is also used for fetching the filtered products.

    - `IntersectionObserver` asynchronously observe changes in intersection element (in our case it is the `Typography`) with the top-level document's viewport. To use `IntersectionObserver` we have to make a `observer` which observes when `target` element intersect the viewport and on intersection what it will do. We can also define that on how much percentage of the `target` element occurs on viewport then the expected function will work.

      ```js

        const observer = new IntersectionObserver(
          useCallback(
            (entries) => {
              const first = entries[0];
              console.log(filter);
              if (first.isIntersecting) {
                console.log("observer");
                fetchData();
              }
            },
            [filter]
          )
        );
      ```

      - I've used `useCallback` to retain the current value of filter as in `observer` fiter value will always be the initial value every time observer will observe. Here it is taking a `entries` as a parameter where entries are the elements. Here I've saved in a variable and use `isIntersecting` to check if lastElement is intersecting or not. If intersecting it will again run the `fetchData` function and fetch products with updated offset.

    - Now how will `observer` observe the last element. For this we have to use observe property of observer. I've used it in a `useDidMountEffect` CustomHook which don't run on initial render.

      ```js

        useDidMountEffect(() => {
          const currentElement = lastElement;

          const currentObserver = observer;

          if (currentElement) {
            currentObserver.observe(currentElement);
          }
          return () => {
            if (currentElement) {
              currentObserver.unobserve(currentElement);
            }
          };
        }, [lastElement]);

      ```

      - Here I've saved lastElement state and observer in a variable so if any time I've updated the lastElement it will not effect the cleanup I've used in this useEffect to `unobserve` the target element. I've used `lastElement` as a dependency array so every time it will come into viewport it will call the useEffect which will observe this element. And observer will fetch next products.

      - This component calls another components `ProductFilter` responsible for filters and `Images` responsible for displaying the products and pass props to them.

        ```js
          <ProductFilter
            productMap={productMap}
            offset={offset}
            setLoading={setLoading}
            setProductArray={setProductArray}
            setProductMap={setProductMap}
            filter={filter}
            setFilter={setFilter}
          />
          <Suspense>
            <Images
              loading={loading}
              productArray={productArray}
              setLastElement={setLastElement}
              offset={offset}
              productMap={productMap}
              setProductMap={setProductMap}
            />
          </Suspense>        
        ```

  - **Images**

    - So after fetching data we have to display that data, this component is responsible for displaying the products.

    - This component uses different props pass into them to display the products. This component has `useDidMountEffect` which has dependency array `props.productArray` state which stores fetched data. On every state change this `useDidMountEffect` will run and push `props.productArray` data into `props.productMap` which is used to show the products using `map`. And also there is a condition that when any component empties the `props.productArray` for fetching the new filtered products, `props.productMap` also set to empty value and then again pushed with new updated `props.productArray`.
    
      ```js
        useDidMountEffect(async () => {
          if (props.productArray.length === 0) {
            props.setProductMap([]);
          } else {
            await props.setProductMap((prevState) => [
              ...prevState,
              ...props.productArray,
            ]);
          }
        }, [props.productArray]);
      ```

    - So this single component always shows filtered products and non-filtered products both.

  - **Filter**

    - This is a folder which contains different components for the filter components for filtering the products. These components also uses the same observer and function from `Homepage` component to fetch filtered products and on-scroll fetched next products.

    - These are explained below :- 

      - **ProductFilter**

        - This component used `Material UI` Appbar and Drawer components.

        - In Appbar there is a brand name and `searchbar` which uses `SearchBar` component.

        - In Drawer there is `price` filter with low and high input fields which uses `PriceFilter` component, `category` and `color` filter with accordion which shows different filter values with checkbox with them to select those filter which uses `CategoryFilter` and `ColorFilter` components.

        - I've passed `SearchBar` component with props in Appbar. 
          ```js

            <SearchBar
              sx={{ flexGrow: 2 }}
              offset={props.offset}
              setOffset={props.setOffset}
              setProductArray={props.setProductArray}
              setLoading={props.setLoading}
              setProductMap={props.setProductMap}
              filter={props.filter}
              setFilter={props.setFilter}
            />
          ```

          - I've passed `PriceFilter` , `CategoryFilter` and `ColorFIlter` as an array vaues to the ListItem to show in sidebar as a list. I've also used dynamic imports for them. They are not going to import till the user open the sidebar. They are render using conditional rendering. 

            ```js
              <List>
                {open &&
                  [
                    <Suspense>
                      <PriceFilter
                        setProducts={props.setProducts}
                        offset={props.offset}
                        setLoading={props.setLoading}
                        setProductArray={props.setProductArray}
                        filter={props.filter}
                        setProductMap={props.setProductMap}
                        setFilter={props.setFilter}
                        setOffset={props.setOffset}
                      />
                    </Suspense>,
                    <Suspense>
                      <CategoryFilter
                        offset={props.offset}
                        setLoading={props.setLoading}
                        setProductArray={props.setProductArray}
                        setOffset={props.setOffset}
                        setProductMap={props.setProductMap}
                        productMap={props.productMap}
                        filterState={props.filterState}
                        filter={props.filter}
                        setFilter={props.setFilter}
                      />
                    </Suspense>,
                    <Suspense>
                      <ColorFilter
                        offset={props.offset}
                        setLoading={props.setLoading}
                        setProductArray={props.setProductArray}
                        setOffset={props.setOffset}
                        setProductMap={props.setProductMap}
                        productMap={props.productMap}
                        filterState={props.filterState}
                        filter={props.filter}
                        setFilter={props.setFilter}
                      />
                    </Suspense>,
                  ].map((text, index) => (
                    <ListItem key={index} disablePadding sx={{ padding: "7px" }}>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
              </List>
            ```

      - **SearchBar**
      
        - This component uses `OutinedInput` for showing searchbar which has `onChange` event associated with it which calls the `handleChange` function and uses `IconButton` for showing search button in searchbar which has `onClick` event which calls the `searchProduct` function.

          ```js
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="search_button"
                    edge="end"
                    onClick={searchProduct}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              }
              label="searchInput"
              onChange={(e) => handleChange(e)}
            />
          ```

        - `handleChange` function will get the value from search input and set it to the state `searchInput`.

          ```js
            const [searchInput, setSearchInput] = useState("");

            const handleChange = (e) => {
              e.preventDefault();
              setSearchInput(e.target.value);
            };

          ```

        - `searchProduct` function will set `loading` to false, set empty array to the `props.productMap` so that new products will be shown, set `props.offset.current` to 0 as to fetch products from the start and then set `props.filter` with `searchInput` which changes the `props.filter` and useEffect in `Homepage` with `filter` as a dependency array will trigger and fetch the products and shown to the user. On-scroll will work as defined as it now fetched the last query products with updated offset.

          ```js
            const searchProduct = () => {
              props.setLoading(false)
              props.setProductMap(prevState => [])
              props.offset.current = 0;
              props.setFilter((prevState) => ({
                ...prevState,
                searchFilter: searchInput,
              }));
            };

          ```
        - Now `fetchData` will request url  `"http://localhost:3001/filter/" + offset.current` with updated filter and it will goes to backend and fetch the products.
        
        - In  the backend only one route is responsible for different filters as I've defined conditions to run query.

        - The controller which is responsible for filter is `FilterController.js` with path `backend/controller/user_controller/`. 

          ```js
            if (req.body.searchFilter && req.body.searchFilter !== "") {
              products = products.where("name", "REGEXP", "^" + req.body.searchFilter);
            }
          ```

          - This condition checks if the key `searchFilter` in a `filter` state which we have send with the request url is empty or not. If not then it will run query to fetch the filtered products. Here I've previously assign the `Product` model in a `products` variable. And in this condition I've
again asign the `products` variable with filtered model.

          - As I've explained above in the `Homepage` component that updated model will again run with a query and saved the result in a `results` variable and send response to the user.

      - **PriceFilter**

        - This component uses two TextField for `low` and `high` price and have associated `onChange` event on both of them which calls the `handleChange` function. 

        - `handleChange` function will set `loading` to false, set empty array to the `props.productMap` so that new products will be shown, set `props.offset.current` to 0 as to fetch products from the start and then set `props.filter` key `priceFilter ` with `low` and `high` value which changes the `props.filter` and useEffect in `Homepage` with `filter` as a dependency array will trigger and fetch the products and shown to the user. On-scroll will work as defined as it now fetched the last query products with updated offset.

          ```js
            <TextField
              type="number"
              variant="outlined"
              name="low"
              label="low"
              value={props.filter.priceFilter.low}
              onChange={(e) => {
                props.setFilter((prevState) => ({
                  ...prevState,
                  priceFilter: {
                    ...props.filter.priceFilter,
                    low: e.target.value,
                  },
                }));
                handleChange(e);
              }}
            />

            <TextField
              type="number"
              variant="outlined"
              value={props.filter.priceFilter.high}
              name="high"
              label="high"
              onChange={(e) => {
                props.setFilter((prevState) => ({
                  ...prevState,
                  priceFilter: {
                    ...props.filter.priceFilter,
                    high: e.target.value,
                  },
                }));
                handleChange(e)
              }}
            />
          ```
        - Same controller will fetch the filterd products but the different condition will run as `filter` state is different.

        ```js
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
        ```
        - This condition will return the resulted model for different conditions price `lower than`, `greater than` and `between them`.

        - After that updated model will again run with the query for fetching the products with their variants and assign it to the `results` variable and sent as a response to the user.

      - **CategoryFilter** and **ColorFilter**

        - These components are just responsible for fetching the `category` and `color` names from the database and save in a state `category` and `color`. 

        ```js
          const [category, setCategory] = useState([]);
          useEffect(() => {
            axios.get("http://localhost:3001/products/categories").then((response) => {
              setCategory(response.data);
            });
          }, []);
        ```

        ```js
          const [color, setColor] = useState([]);
          useEffect(() => {
            axios.get("http://localhost:3001/variants/color").then((response) => {
              // console.log(response.data);
              setColor(response.data);
            });
          }, []);
        ```

        - These both components will import the `Blueprint` component with the props.

          - CategoryFilter

          ```js
            <Blueprint
              product={category}
              attribute={"category"}
              setProductArray={props.setProductArray}
              setLoading={props.setLoading}
              offset={props.offset}
              setOffset={props.setOffset}
              setProductMap={props.setProductMap}
              loading={props.loading}
              productMap={props.productMap}
              filterState={props.filterState}
              filter={props.filter}
              setFilter={props.setFilter}
            />
          ```

          - ColorFilter

          ```js
            <Blueprint
              product={color}
              attribute={"color"}
              setProductArray={props.setProductArray}
              setLoading={props.setLoading}
              offset={props.offset}
              setOffset={props.setOffset}
              setProductMap={props.setProductMap}
              loading={props.loading}
              productMap={props.productMap}
              filterState={props.filterState}
              filter={props.filter}
              setFilter={props.setFilter}
            />
          ```

      - **Blueprint**

        - This component responsible for showing the `category` and `color` values in accordion in sidebar list.

        - It uses conditional rendering to render the category and color values. It checks the `props.attribute` from the `categoryFilter` and `colorFilter` components. In sidebar list it simultaneously shows the `Category` and `Color` accordion with their respected values. In accordion there is checkbox with every values. So that user can select these filter values.
          ```js
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>
                  {attribute === "category" ? "Category" : "Color"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {attribute === "category"
                    ? props.product.map((product) => (
                        <FormControlLabel
                          key={product.category}
                          control={
                            <Checkbox
                              checked={Object.values(props.filter)[1].includes(
                                product.category
                              )}
                            />
                          }
                          label={product.category}
                          onChange={(e) =>
                            filterByAttribute(e.target.checked, product.category)
                          }
                        />
                      ))
                    : props.product.map((product) => (
                        <FormControlLabel
                          key={product.color}
                          control={
                            <Checkbox
                              checked={Object.values(props.filter)[2].includes(
                                product.color
                              )}
                            />
                          }
                          label={product.color}
                          onChange={(e) =>
                            filterByAttribute(e.target.checked, product.color)
                          }
                        />
                      ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>

          ```
        - These checkbox have condition to retain the checked values even if the drawer is closed. You can see in above code that there is checked attribute in these checkbox which checks `filter` state keys `categoryFilter` and `colorFilter` includes these values or not. If includes then that value will remain checked, if not then unchecked.

        - These checkbox have `onChange` event on them which calls the `filterByAttribute` function which takes checked box values and checked state that it is checked or not as a parameter.

        - If it is checked it will fetch that filter product. If user uncheck the checkbox then it will remove that product form the display.

          ```js
            const filterByAttribute = async (e, attribute) => {
              // console.log(" ");
              if (e) {
                props.offset.current = 0;
                props.setProductArray(() => []);
                setFilterProduct((prevState) => new Set(prevState).add(attribute));
              } else {
                filterProduct.delete(attribute);
                if (props.attribute === "category") {
                  props.filter.categoryFilter.splice(
                    props.filter.categoryFilter.indexOf(attribute),
                    1
                  );
                  // props.setFilter((prevState) => ({...prevState, categoryFilter : props.filter}))
                } else if (props.attribute === "color") {
                  props.filter.colorFilter.splice(
                    props.filter.colorFilter.indexOf(attribute),
                    1
                  );
                }
                // this will filter the productMap with the attribute
                // and save in another variable
                // then set productMap with that variable
                // So when user deselect the checkbox then that filtered product will
                //  remove and updates the state which is responsible for displaying the images.
                let products =
                  props.attribute === "category"
                    ? props.productMap.filter((product) => product.category !== attribute)
                    : props.attribute === "color" &&
                      props.productMap.filter(
                        (product) => product.variants[0].color !== attribute
                      );
                props.setProductMap(products);

                // This will always run the
                // useDidMountEffect which fetch the first filtered products when it changes
                if(filterProduct.size === 0){
                  props.offset.current = 0
                }
                  if (check) {
                    setCheck(false);
                  } else {
                    setCheck(true);
                  }
              }
            };

          ```
        - `filterByAttribute(e, attribute)` function first check if the value of e is true or not.

          - If true then it will set the `props.offfset.current` to 0 to get the new products from the start,set empty array to the `props.setProductMap` so to emppty the previos results, and add attribute (where attribute is a checked value) in a  `fiterProduct` set. `filterProduct` set is dependency array of `useDidMountEffect` in the same component. I will explain what it do after explaining the false part.

          - If false then it delete the unchecked value that is attribute from the `filterProduct` set. Then after this it removes that unchecked values from the `props.filter` state keys `categoryFilter` and `colorFilter`. 

          - How it checks unchecked value belongs to the categoryFilter or colorFilter keys. For this it checked the `props.attribute` value if it is category then it splice that value from the categoryFilter key or from the colorFilter key.

          - Now you are thinking that `useEffect` in a `Homepage` component will run as filter is the dependency array for that useEffect. It will run but sometimes when I select both category and color filter. And then remove all the color filters it will not fetch data according to the remaining checked category filter. So for this I've made a condition which updates the state `check` on every deselect. 

          - `check` is also a dependency array for the `useDidMountEffect` in this component.

          - So after delete the attributed from `filter` state it will also `delete` from the `props.productMap` using `filter` function in on `props.productMap` and assign result to the let variable products. 

          - Then set these `products` variable to the `props.productMap`.

        - Now I will explain the `useDidMountEffect` in this component.

          ```js
            useDidMountEffect(async () => {
              let attributeArray = Array.from(filterProduct);
              if (filterProduct.size !== 0) {
                props.setLoading(false);
              }
              if (attribute === "category") {
                props.setFilter((prevState) => ({
                  ...prevState,
                  categoryFilter: [...attributeArray],
                }));
              } else if (attribute === "color") {
                props.setFilter((prevState) => ({
                  ...prevState,
                  colorFilter: [...attributeArray],
                }));
              }
            }, [filterProduct, check]);
          ```

          - This function is responsible for fetching the filtered products on the basis of color and category. It first extracts array from the filterByAttribute set and assign it to the local variable `attributeArray` 

          - Then it check if it is empty or not. If not set the `props.loading` to false using `props.setLoading` function.
          - Then it again checks the `attribute` variable which have assigned props.attribute value from the colorFilterand categoryFilter component.

          - Then updates the `filter` state keys. and which triggers the useEffect in `Homepage`. Then it calls the fetchData function which calls axios post request to the url with updated filter. Then it fetches the products and displays to the user.

        - Conditions in controller responsible for fetching products accordingto `color` and `category` filters.

          ```js
            // if the category filter is selected
            if (req.body.categoryFilter && req.body.categoryFilter.length !== 0) {
              products = products.where("category", "IN", req.body.categoryFilter);
            }

            if (req.body.colorFilter && req.body.colorFilter.length !== 0) {
              var ids = await Variants.where(
                "color",
                "IN",
                req.body.colorFilter
              ).fetchAll({ columns: ["products_id"] });
              ids = ids.toJSON().map((a) => a.products_id);

              products = products.where("id", "IN", ids);
            }
          ```

          - After that it will same as the other filter components save the updated mdeel with the fetched query in `results` variable and sent the response to the user.

          - Just one condition in the `results` variable query if colorFilter is selected. It checkes the checked colors value and fetch variants table data which are in selected color values array.

          - As in condition I'm fetching the products_id from variant table according to the color values. Then fetch products from products table using these ids.

          - In the results variable I'm fetching those products again but with variants which fetch all the variants even those which have colors not in the selected color array.

          - So for this I've made condition as to fetch only those variants which have selected colors.
    
    - Now FilterController is even fetch products according to the different filter combination as every checked filter has their condition which fetched the filtered products and save the models and again run query on that filtered model with new filter. In the last it saves the final result in `results` variable.

  With this User Module documentation will finish here.
