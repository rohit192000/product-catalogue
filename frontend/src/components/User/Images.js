import React from "react";
import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Box,
  } from "@mui/material";
const Images = (props) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          background: "white",
        }}
      >
        <ImageList
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexFlow: "row wrap",
          }}
          cols={5}
          id="imageList"
        >
          {props.productArray.map((product, index) => (
            <ImageListItem
              key={product.featured_image + Math.random()}
              sx={{ width: "18%", padding: "15px", marginBottom: "30px" }}
            >
              <img
                src={`http://localhost:3001/images/${product.featured_image}`}
                alt={product.name}
                // loading="lazy"
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
export default Images;
