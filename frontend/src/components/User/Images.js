import React, { useRef } from "react";
import { ImageList, ImageListItem, ImageListItemBar, Box } from "@mui/material";
import useDidMountEffect from "./CustomHooks/useDidMountEffect";
const Images = (props) => {
  const Images = useRef();
  // const [product, props.setProductMap] = useState([]);
  useDidMountEffect(async () => {
    console.log(" ")
    console.log("hook in which productArray data push into productMap")
    console.log("Image.js ProductArray : ", props.productArray);
    console.log(props.loading)
    if (props.productArray.length === 0) {
      console.log("if conditions where productArray is empty");
      console.log("offset : ", props.offset);
      props.setProductMap([]);
    }else {
      await props.setProductMap((prevState) => [
        ...prevState,
        ...props.productArray,
      ]);
    }
  }, [props.productArray]);
  useDidMountEffect(async () => {
    await console.log("Image.js : ", props.productMap);
  }, [props.productMap]);

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
          ref={Images}
          cols={5}
          id="imageList"
        >
          {props.productMap.map((product, index) => (
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
