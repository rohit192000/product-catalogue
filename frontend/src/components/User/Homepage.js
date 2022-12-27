import { Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getProducts } from "./FetchAll";
import Images from "./Images";

import ProductFilter from "./ProductFilter";
const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productArray, setProductArray] = useState([]);
  const [limit, setLimit] = useState(0);
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setTimeout(() => {
          setLimit((prevState) => prevState + 10);
        }, 1000);
      }
    })
  );

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  useEffect(() => {
    // console.log(limit)
    getProducts(setProducts, limit, setLoading);
    setProductArray((prevState) => [
      ...prevState,
      ...products.map((product) => product),
    ]);
    if(!loading){
      // console.log("hi")
      setLimit(0)
    }
    // console.log("Homepage : " , productArray);
  }, [limit]);

  return (
    <>
      {/**
       */}
      <ProductFilter
        products={products}
        setProducts={setProducts}
        limit={limit}
        setLimit={setLimit}
        setLoading={setLoading}
        productArray={productArray}
        setProductArray={setProductArray}
      />
      <Images
        productArray={productArray}
        id="imageList"
        setLastElement={setLastElement}
      />

      {loading && (
        <Typography variant="p" sx={{ marginLeft: "40%" }} ref={setLastElement}>
          fetching images...
        </Typography>
      )}
    </>
  );
};

export default Homepage;
