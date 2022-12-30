import axios from "axios";
const getProducts = async (callback, limit, callback2) => {
  axios
    .get("http://localhost:3001/products/limit/" + limit)
    .then(async (response) => {
      console.log(" ");
      console.log("getProducts function running..");
      console.log("Get all products function");
      console.log("Fetchall Offset : ", limit);
      if (response.data === " ") {
        console.log("FetchAll.js if condition response is empty");
        await callback2(false);
        limit = 0;
        return;
      } else {
        console.log("overwrite product array with response data");
        setTimeout(() => {
          callback2(true);
        }, 1000);

        await callback(response.data);
      }
    });
};

export { getProducts };
