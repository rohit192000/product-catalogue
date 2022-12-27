import React, { useState, useEffect, useContext } from "react";
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
import { getProducts } from "../FetchAll";
const Blueprint = (props) => {
  const [check, setCheck] = useState(true);
  const [filterProduct, setFilterProduct] = useState(new Set());
  const attribute = props.attribute;
  const filterByAttribute = (e, attribute) => {
    props.setLimit(0);
    if (e) {
      props.setProductArray([]);
      setFilterProduct((prevState) => new Set(prevState).add(attribute));
    } else {
      filterProduct.delete(attribute);
      console.log(filterProduct);
      if (check) {
        setCheck(false);
      } else {
        setCheck(true);
      }
    }
  };

  useEffect(() => {
    let attributeArray = Array.from(filterProduct);
    if (filterProduct.size !== 0) {
      // filter products according to category
      props.setLoading(false);
      if (attribute === "category") {
        axios
          .post("http://localhost:3001/products/category/filter", {
            categories: attributeArray,
          })
          .then((response) => {
            props.setProductArray(response.data);
            // props.setProductArray(props.products);
          });
      }
      // filter products according to color
      else if (attribute === "color") {
        axios
          .post("http://localhost:3001/variants/color/filter", {
            colors: attributeArray,
          })
          .then((response) => {
            let item = [];
            response.data.forEach((data) => {
              item.push({
                featured_image: data.products.featured_image,
                variants: [
                  {
                    color: data.color,
                    price: data.price,
                  },
                ],
              });
            });
            props.setProductArray(item);
          });
      }
    } else {
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
