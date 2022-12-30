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
        setLoading={props.setLoading}
        offset={props.offset}
        setOffset={props.setOffset}
        setProductMap={props.setProductMap}
        loading={props.loading}
        productMap={props.productMap}
        checkedArray={props.checkedArray}
        setCheckedArray={props.setCheckedArray}
      />
    </>
  );
};
export default ColorFilter;
