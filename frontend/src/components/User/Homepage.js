import React, { useEffect, useState } from "react";
import { getProducts } from "./FetchAll";
import { ImageList, ImageListItem, ImageListItemBar, Box } from "@mui/material";
import { padding } from "@mui/system";
const Homepage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts(setProducts);
  }, []);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: "white",
        }}
      >
        <ImageList
          sx={{
            width: "100%",
            height: "30%",
            display: "flex",
            justifyContent : 'center',
            flexFlow : 'row wrap'
          }}
          cols={5}
        >
          {products.map((product) => (
            <ImageListItem key={product.featured_image} sx={{ width: "18%" , padding :'5px'}}>
              <img
                src={`http://localhost:3001/images/${product.featured_image}`}
                alt={product.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={product.name}
                subtitle={<span>{product.category}</span>}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
};

export default Homepage;
