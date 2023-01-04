import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, TextField, Button, Stack, imageListClasses } from "@mui/material";
import Variant from "./Variant";
const Form = (props) => {
  const [variants, setVariants] = useState([]);
  const image = useRef();
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
    import("./AddImage").then((addImage) => {
      addImage.saveFile1(e, setFile);
      console.log(image.current.value);
    });
    // setFileInputRef(prevState => "")
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
      if (product.name !== "" && file !== "" && variants.length !== 0) {
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
      } else {
        setAdd((prevState) => false);
        alert("Please fill all the fields");
      }
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
      alert("Product has been added successfully");
      setProduct((prevState) => ({
        ...prevState,
        name: "",
        slug: "",
        featured_image: "",
        category: "",
        variants: [],
      }));
      setVariants((prevState) => []);
      image.current.value = ""
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
            value={product.name}
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
            value={product.category}
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
            inputRef={image}
            // ref={(ref) => {
            //   setFileInputRef(ref);
            // }}
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
