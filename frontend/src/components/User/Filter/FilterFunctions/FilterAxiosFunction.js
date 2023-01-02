import axios from "axios";

const AttributeFilter = async (
  attribute,
  attributeArray,
  callback2,
  filterOffset,
  callback
) => {
  console.log(attributeArray)
  var filterUrl =
    attribute === "category"
      ? "/products/category/filter/"
      : "/variants/color/filter/";
      console.log(attribute)

  axios
    .post("http://localhost:3001" + filterUrl + filterOffset, {
      attribute: attributeArray,
    })
    .then(async (response) => {
      console.log("After fetching data fetched data", response.data);
      console.log(filterOffset)
      let id = response.data[response.data.length - 1].id;
      callback2(prevState => id)
      callback(() => response.data);
    });
};
export { AttributeFilter };
