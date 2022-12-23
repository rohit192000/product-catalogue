import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, TextField, FormControl } from "@mui/material";
import { getProducts } from "../FetchAll";
const PriceFilter = (props) => {
  const [value, setValue] = useState({
    low: "",
    high: "",
  });

  useEffect(() => {
    console.log(value);
  }, [value]);
  useEffect(() => {
    if (value.length !== 0) {
      axios
        .post("http://localhost:3001/variants/price/filter", {
          price: value,
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
          props.setProducts(item);
          console.log(response.data);
        });
    } else {
      getProducts(props.setProducts);
    }
  }, [value]);
  return (
    <>
      <Typography variant="h6">Price</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <FormControl sx={{ padding: "10px" }}>
          <TextField
            type="number"
            variant="outlined"
            name="low"
            label="low"
            onChange={(e) =>
              setValue((prevSTate) => ({
                ...prevSTate,
                low: e.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl sx={{ padding: "10px" }}>
          <TextField
            type="number"
            variant="outlined"
            name="high"
            label="high"
            onChange={(e) =>
              setValue((prevSTate) => ({
                ...prevSTate,
                high: e.target.value,
              }))
            }
          />
        </FormControl>
      </Box>
    </>
  );
};
export default PriceFilter;
