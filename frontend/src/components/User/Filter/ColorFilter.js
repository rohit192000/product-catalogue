import React, { useEffect, useState } from "react";
import axios from "axios";
import Blueprint from "./Blueprint";
const ColorFilter = (props) => {
  const [color, setColor] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/variants/color").then((response) => {
      // console.log(response.data);
      setColor(response.data);
    });
  }, []);
  return (
    <>
      {/**
       */}
      <Blueprint
        product={color}
        setAttribute={setColor}
        attribute={"color"}
        productArray={props.productArray}
        setProductArray={props.setProductArray}
        products={props.products}
        setProducts={props.setProducts}
        setLoading={props.setLoading}
        limit={props.limit}
        setLimit={props.setLimit}      />
    </>
  );
};
export default ColorFilter;
