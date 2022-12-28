import React, { useState, useEffect } from "react";
import axios from "axios";
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
const Blueprint = (props) => {
  const [check, setCheck] = useState(true);
  const [filterProduct, setFilterProduct] = useState(new Set());
  const attribute = props.attribute;
  const filterByAttribute = (e, attribute) => {
    props.setLimit(0);
    if (e) {
      setFilterProduct((prevState) => new Set(prevState).add(attribute));
    } else {
      filterProduct.delete(attribute)
      console.log(props.attribute)
      let products = (props.attribute === 'category')
      ?  props.productArray.filter(product => product.category !== attribute)
      :  (props.attribute === 'color') 
      && props.productArray.filter(product => product.variants[0].color !== attribute);
      console.log(products)
      console.log("Filtered attributes : ", filterProduct)
      props.setProductArray(products)
      console.log(check)
      if(filterProduct.size === 0){
        if(check){
          setCheck(false)
        }else{
          setCheck(true)

        }

      }
    }
  };

  useEffect(() => {
    let attributeArray = Array.from(filterProduct);
    // console.log("Blueprint.js After Useeffect : ", props.productArray);
    if (filterProduct.size !== 0) {
      // filter products according to category
      props.setLoading(false);
      if (attribute === "category") {
        axios
          .post("http://localhost:3001/products/category/filter", {
            categories: attributeArray[attributeArray.length - 1],
          })
          .then((response) => {
            console.log("After fetching data fetched data",response.data)
            console.log("After fetching data productArray",props.productArray);
            if (attributeArray.length === 1) {
              props.setProductArray(response.data)
            }else {
              props.setProductArray(prevState => [...prevState, ...response.data]);
            }
            // props.setProductArray(props.products);
          });
      }
      // filter products according to color
      else if (attribute === "color") {
        axios
          .post("http://localhost:3001/variants/color/filter", {
            colors: attributeArray[attributeArray.length - 1],
          })
          .then((response) => {
            console.log("Fetched Data : ", response.data)
            // let item = [];
            // response.data.forEach((data) => {
            //   item.push({
            //     featured_image: data.products.featured_image,
            //     variants: [
            //       {
            //         color: data.color,
            //         price: data.price,
            //       },
            //     ],
            //   });
            // });
            // if (attributeArray.length === 1) {
            //   props.setProductArray(item);
            // }else {
            //   props.setProductArray(prevState => [...prevState, ...item]);
            // }
            if (attributeArray.length === 1) {
              props.setProductArray(response.data)
            }else {
              props.setProductArray(prevState => [...prevState, ...response.data]);
            }
          });
      }
    } else {
      console.log("I've run whwnc changes made")
      props.setProductArray([]);
      props.setLoading(true);
      console.log(props.productArray);
    }
  }, [filterProduct, check]);

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
                    control={<Checkbox />}
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
