import React, { useEffect, useState } from "react";
import { getProducts } from "./FetchAll";
import { ImageList, ImageListItem, ImageListItemBar, Box } from "@mui/material";
import ProductFilter from "./ProductFilter";
const Homepage = () => {
  const [products, setProducts] = useState([]);
  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    console.log("Fetch more list items!");
  }
  useEffect(() => {
    getProducts(setProducts);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        <ProductFilter setProducts={setProducts} />
        <ImageList
          sx={{
            width: "100%",
            height: "30%",
            display: "flex",
            justifyContent: "center",
            flexFlow: "row wrap",
          }}
          cols={5}
        >
          {products.map((product) => (
            <ImageListItem
              key={product.featured_image}
              sx={{ width: "18%", padding: "5px" }}
            >
              <img
                src={`http://localhost:3001/images/${product.featured_image}`}
                alt={product.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={<span>Color : {product.variants[0].color}</span>}
                subtitle={<span>Price : $ {product.variants[0].price}</span>}
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
