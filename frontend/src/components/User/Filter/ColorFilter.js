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
    </>
  );
};
export default ColorFilter;
