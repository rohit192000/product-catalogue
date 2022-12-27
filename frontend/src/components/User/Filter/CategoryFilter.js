import React, { useEffect, useState } from "react";
import axios from "axios";
import Blueprint from "./Blueprint";
const CategoryFilter = (props) => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/products/categories").then((response) => {
      setCategory(response.data);
    });
  }, []);
  return (
    <>
      <Blueprint
        product={category}
        setAttribute={setCategory}
        attribute={"category"}
        productArray={props.productArray}
        setProductArray={props.setProductArray}
        products={props.products}
        setProducts={props.setProducts}
        setLoading={props.setLoading}
        limit={props.limit}
        setLimit={props.setLimit}
      />
    </>
  );
};
export default CategoryFilter;
