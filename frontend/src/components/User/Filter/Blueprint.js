import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";
import useDidMountEffect from "../CustomHooks/useDidMountEffect";
import { AttributeFilter } from "./FilterFunctions/FilterAxiosFunction.js";
import axios from "axios";
const Blueprint = (props) => {
  const [check, setCheck] = useState(true);
  const [filterProduct, setFilterProduct] = useState(new Set());
  const attribute = props.attribute;
  const [filterOffset, setFilterOffset] = useState(0);
  const filterByAttribute = async (e, attribute) => {
    console.log(" ");
    console.log("filterByAttribute is running...");
    if (e) {
      setFilterOffset(() => 0)
      props.setProductArray(() => [])
      setFilterProduct((prevState) => new Set(prevState).add(attribute));
      // props.setCheckedArray((prevState) => new Set(prevState).add(attribute));
    } else {
      filterProduct.delete(attribute);
      props.checkedArray.splice(props.checkedArray.indexOf(attribute), 1);
      // this will filter the productMap with the attribute
      // and save in another variable
      // then set productMap with that variable
      // So when user deselect the checkbox then that filtered product will
      //  remove
      let products =
        props.attribute === "category"
          ? props.productMap.filter((product) => product.category !== attribute)
          : props.attribute === "color" &&
            props.productMap.filter(
              (product) => product.variants[0].color !== attribute
            );
      props.setProductMap(products);

      console.log(check);
      // This will always run the
      // useDidMountEffect when it changes
      if (filterProduct.size === 0) {
        if (check) {
          setCheck(false);
        } else {
          setCheck(true);
        }
      }
    }
  };

  // This is an custom hook which doesn't run on initial render
  useDidMountEffect(async () => {
    let attributeArray = Array.from(filterProduct);
    props.setCheckedArray((prevState) => Array.from(filterProduct));
    console.log("useDidMountEffect in blueprint.js");
    console.log(filterProduct.size);
    if (filterProduct.size !== 0) {
      if (filterProduct.size === 1) {
        props.setProductArray(() => []);
      }
      // props.setLoading(false);
      console.log(props.attribute);
      console.log("filterProduct not empty");
      // await props.setProductMap([])
      // filter products according to category
      if (attribute === "category") {
        AttributeFilter(
          attribute,
          attributeArray,
          setFilterOffset,
          filterOffset,
          props.setProductArray
        );
      }
      // filter products according to color
      else if (attribute === "color") {
        AttributeFilter(
          attribute,
          attributeArray,
          setFilterOffset,
          filterOffset,
          props.setProductArray
        );
      }
    } else {
      console.log("filter Product Empty");
      console.log(props.attribute);
      console.log("Empty the product array");
      props.setProductArray(() => []);
      props.setOffset(() => -10);

      // props.setProductArray([]);
      // props.setLoading(true);
    }
    console.log("useDidMountEffect");
  }, [filterProduct, check]);

  useEffect(() => {
    console.log(Object.values(props.checkedArray));
    for (let key in props.checkedArray) {
      console.log(props.checkedArray[key]);
      setFilterProduct((prevState) => prevState.add(props.checkedArray[key]));
    }
  }, []);

  useDidMountEffect(() => {
    let attributeArray = Array.from(filterProduct);
    var filterUrl =
      attribute === "category"
        ? "/products/category/filter/"
        : "/variants/color/filter/";

    axios
      .post("http://localhost:3001" + filterUrl + filterOffset, {
        attribute: attributeArray,
      })
      .then(async (response) => {
        console.log("After fetching data fetched data", response.data);
        console.log("After fetching data productArray", props.productArray);
        console.log(response.data[response.data.length - 1].id);
        props.setProductArray(() => response.data);
      });
  }, [props.filterState]);
  return (
    <>
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
                        checked={Object.values(props.checkedArray).includes(
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
                    control={<Checkbox />}
                    label={product.color}
                    onChange={(e) =>
                      filterByAttribute(e.target.checked, product.color)
                    }
                  />
                ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default Blueprint;
