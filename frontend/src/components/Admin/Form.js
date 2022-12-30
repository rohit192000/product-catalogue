import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button, Stack } from "@mui/material";
import Variant from "./Variant";
const Form = (props) => {
  const [variants, setVariants] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    slug: "",
    featured_image: "",
    category: "",
    variants: [],
  });

  const [file, setFile] = useState({
    fileName: "",
    file: "",
  });

  const addFile = (e) => {
    import('./AddImage').then(addImage => {
      addImage.saveFile1(e, setFile);
    })
  };

  const [add, setAdd] = useState(false);
  const [add1, setAdd1] = useState(false);

  const addProduct = (e) => {
    setAdd((prevState) => true);
    // console.log(product);
  };

  useEffect(() => {
    // console.log(add);
    if (add) {
      setProduct((prevState) => ({
        ...prevState,
        slug: product.name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
        featured_image: file,
        variants: variants,
      }));
      setAdd((prevState) => false);
      setAdd1((prevState) => true);
    }
  }, [add]);

  useEffect(() => {
    if (add1) {
      // console.log(product);
      axios
        .post("http://localhost:3001/products/add", product)
        .then((response) => {
          console.log(response.data);
        });
      setAdd1((prevState) => false);
    }
  }, [add1]);

  return (
    <>
      <form id="saveForm" action="/post/dispatch/save" method="post"></form>
      <form id="deleteForm" action="/post/dispatch/delete" method="post"></form>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "125ch" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
          flexDirection: "row",
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={3}>
          <TextField
            id="standard-basic"
            label="Product Name"
            variant="standard"
            type="text"
            name="product_name"
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          <TextField
            id="standard-basic"
            label="Product Category"
            variant="standard"
            type="text"
            name="product_category"
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                category: e.target.value,
              }))
            }
          />
          <TextField
            id="standard-basic"
            variant="outlined"
            type="file"
            sx={{ bgcolor: "ButtonHighlight" }}
            onChange={addFile}
          />
          <Variant variants={variants} setVariants={setVariants} />
          <Button
            type="button"
            variant="outlined"
            color="success"
            onClick={addProduct}
          >
            Add Product
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Form;
