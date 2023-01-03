import React from "react";
import { Typography, Box, TextField, FormControl } from "@mui/material";
const PriceFilter = (props) => {
  const handleChange = (e) => {
    props.offset.current = 0;
    props.setLoading(prevState => false)
    props.setProductMap(prevState => [])
  };
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
            value={props.filter.priceFilter.low}
            onChange={(e) => {
              props.setFilter((prevState) => ({
                ...prevState,
                priceFilter: {
                  ...props.filter.priceFilter,
                  low: e.target.value,
                },
              }));
              handleChange(e);
            }}
          />
        </FormControl>
        <FormControl sx={{ padding: "10px" }}>
          <TextField
            type="number"
            variant="outlined"
            value={props.filter.priceFilter.high}
            name="high"
            label="high"
            onChange={(e) => {
              props.setFilter((prevState) => ({
                ...prevState,
                priceFilter: {
                  ...props.filter.priceFilter,
                  high: e.target.value,
                },
              }));
              handleChange(e)
            }}
          />
        </FormControl>
      </Box>
    </>
  );
};
export default PriceFilter;
