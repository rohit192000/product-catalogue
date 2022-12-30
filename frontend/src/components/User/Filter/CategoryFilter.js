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
      {/**
       */}
      <Blueprint
        product={category}
        setAttribute={setCategory}
        attribute={"category"}
        productArray={props.productArray}
        setProductArray={props.setProductArray}
        setLoading={props.setLoading}
        offset={props.offset}
        setOffset={props.setOffset}
        setProductMap={props.setProductMap}
        loading={props.loading}
        checkedArray={props.checkedArray}
        setCheckedArray={props.setCheckedArray}
        productMap={props.productMap}
      />
    </>
  );
};
export default CategoryFilter;
