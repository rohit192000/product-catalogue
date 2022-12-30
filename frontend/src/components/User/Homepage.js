import { Typography } from "@mui/material";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import useDidMountEffect from "./CustomHooks/useDidMountEffect";
import { getProducts } from "./FetchAll";
import ProductFilter from "./Filter/ProductFilter";
const Images = lazy(() => import("./Images"));

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  // const [products, setProducts] = useState([]);
  const [productArray, setProductArray] = useState([]);
  const [offset, setOffset] = useState(0);
  const [lastElement, setLastElement] = useState(null);
  const [productMap, setProductMap] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [filterState, setFilterState] = useState(false);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      console.log(" ");
      console.log("Observer Function running..");
      // console.log(entries)
      const first = entries[0];
      console.log("type of checked array : ", typeof(checkedArray))
      if (Object.keys(checkedArray).length !== 0) {
        console.log("Hit the filter api with new offset");
      } else {
        // do this
        if (first.isIntersecting) {
          setTimeout(() => {
            console.log("InterSection Observer updates the offset by 10");
            setOffset((prevState) => prevState + 10);
          }, 1000);
        }
      }
    })
  );
  useDidMountEffect(() => {
    console.log("Checked Array : ", checkedArray);
  }, [checkedArray]);
  useDidMountEffect(() => {
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
    console.log(" ");
    console.log("useEffect with offset");
    console.log("if conditions with loading as true/false");
    getProducts(setProductArray, offset, setLoading);
    console.log(loading);
    if (!loading) {
      setOffset(0);
    }
  }, [offset]);

  return (
    <>
      {/**
       */}
      <ProductFilter
        loading={loading}
        productMap={productMap}
        offset={offset}
        setOffset={setOffset}
        setLoading={setLoading}
        productArray={productArray}
        setProductArray={setProductArray}
        setProductMap={setProductMap}
        checkedArray={checkedArray}
        setCheckedArray={setCheckedArray}
      />
      <Suspense>
        <Images
          loading={loading}
          productArray={productArray}
          id="imageList"
          setLastElement={setLastElement}
          offset={offset}
          productMap={productMap}
          setProductMap={setProductMap}
        />
      </Suspense>

      {loading && (
        <Typography variant="p" sx={{ marginLeft: "40%" }} ref={setLastElement}>
          fetching images...
        </Typography>
      )}
    </>
  );
};

export default Homepage;
