import React, { useState } from "react";
import axios from "axios";
import { Typography, Box, TextField, FormControl } from "@mui/material";
import useDidMountEffect from "../CustomHooks/useDidMountEffect";
const PriceFilter = (props) => {
  const [value, setValue] = useState({
    low: "",
    high: "",
  });

  // This is an custom hook which doesn't run on initial render
  useDidMountEffect(() => {
    if (value.low !== "" || value.high !== "") {
      props.setProductArray([]);
      props.setLoading(false);
      console.log(props.offset)
      axios
        .post("http://localhost:3001/variants/price/filter", {
          price: value,
        })
        .then((response) => {
          console.log("Fetched Data : ", response.data);
          console.log("value length: ", value.length)
          props.setProductArray(() => response.data);
        })
    } else {
      console.log(props.offset)
      props.setLoading(true);
      props.setOffset(0)
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
