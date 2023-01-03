import React, { useRef } from "react";
import { ImageList, ImageListItem, ImageListItemBar, Box } from "@mui/material";
import useDidMountEffect from "./CustomHooks/useDidMountEffect";
const Images = (props) => {
  const Images = useRef();
  // const [product, props.setProductMap] = useState([]);
  useDidMountEffect(async () => {
    // console.log(" ");
    // console.log("hook in which productArray data push into productMap");
    // console.log("Image.js ProductArray : ", props.productArray);
    // console.log(props.loading);
    if (props.productArray.length === 0) {
      // console.log("if conditions where productArray is empty");
      // console.log("offset : ", props.offset);
      props.setProductMap([]);
    } else {
      await props.setProductMap((prevState) => [
        ...prevState,
        ...props.productArray,
      ]);
    }
  }, [props.productArray]);
  useDidMountEffect(async () => {
    // await console.log("Image.js : ", props.productMap);
  }, [props.productMap]);

  return (
    <>
      <Box
      >
        <ImageList
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexFlow: "row wrap",
            boxSizing: "content-box",
            background : '#DFD3C3',
            marginTop : "15px"
          }}
          ref={Images}
          gap={18}
          id="imageList"
        >
          {props.productMap.map((product, index) => (
            <ImageListItem
              key={product.featured_image + Math.random()}
              sx={{
                width: "11%",
                padding: "0px 50px",
                marginBottom: "30px",
                background : '#DFD3C3'
              }}
            >
              <img
                src={`http://localhost:3001/images/${product.featured_image}`}
                alt={product.name}
                // loading="lazy"
                style={{
                  border: "2px solid white",
                  borderRadius : '5px',
                  boxShadow : '3px -2px 2px #F8EDE3'
                }}
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
