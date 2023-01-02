import { Typography } from "@mui/material";
import React, {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const [lastElement2, setLastElement2] = useState(null);
  const [productMap, setProductMap] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [filterState, setFilterState] = useState(false);

  // const handleObserver = (entries) => {
  //   console.log(" ");
  //   console.log("Observer Function running..");
  //   // console.log(entries)
  //   const first = entries[0];
  //   console.log(first.target.id);

  //   if (first.isIntersecting) {
  //     setTimeout(() => {
  //       if (first.target.id === "allproduct") {
  //         setOffset((prevState) => prevState + 10);
  //         console.log("InterSection Observer updates the offset by 10");
  //       }
  //       if (first.target.id === "filter") {
  //         setFilterState((prevState) => prevState + 1);
  //         console.log("InterSection Observer updates the filteroffset by 10");
  //       }
  //       // setOffset((prevState) => prevState + 10);
  //     }, 1000);
  //   }
  // };
  // const handleObserver2 = useCallback(
  //   (entries) => {
  //     console.log(" ");
  //     console.log("Observer Function running..");
  //     // console.log(entries)
  //     const first = entries[0];
  //     if (first.isIntersecting) {
  //       setTimeout(() => {
  //         // setFilterOffset((prevState) => prevState + 10);
  //       }, 1000);
  //     }
  //   },
  //   [checkedArray]
  // );
  const observer = useRef(
    new IntersectionObserver((entries) => {
      console.log(" ");
      console.log("Observer Function running..");
      // console.log(entries)
      const first = entries[0];
      console.log(first.target.id);

      if (first.isIntersecting) {
        setTimeout(() => {
          if (first.target.id === "allproduct") {
            setOffset((prevState) => prevState + 10);
            console.log("InterSection Observer updates the offset by 10");
          }
          if (first.target.id === "filter") {
            setFilterState((prevState) => prevState + 1);
            console.log("InterSection Observer updates the filterState by 1");
          }
          // setOffset((prevState) => prevState + 10);
        }, 1000);
      }
    })
  );
  // const observer2 = useRef(
  //   new IntersectionObserver((entries) => handleObserver2(entries))
  // );

  useDidMountEffect(() => {
    console.log("Checked Array : ", checkedArray);
  }, [checkedArray]);
  useDidMountEffect(() => {
    const currentElement = lastElement;
    // const currentElement2 = lastElement2;

    const currentObserver = observer.current;
    // const currentObserver2 = observer2.current;

    if (currentElement && Object.keys(checkedArray).length === 0) {
      currentObserver.observe(currentElement);
    }
    // if (currentElement2) {
    //   currentObserver2.observe(currentElement2);
    // }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
      // if (currentElement2) {
      //   currentObserver2.unobserve(currentElement2);
      // }
    };
  }, [lastElement]);

  useEffect(() => {
    console.log(" ");
    console.log("useEffect with offset");
    console.log("if conditions with loading as true/false");
    if (Object.keys(checkedArray).length === 0) {
      getProducts(setProductArray, offset, setLoading);
    }
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
        filterState={filterState}
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

      {loading ? (
        <Typography
          variant="p"
          sx={{ marginLeft: "40%", background: "#DFD3C3" }}
          id="allproduct"
          ref={setLastElement}
        >
          fetching images...
        </Typography>
      ) : (
        Object.keys(checkedArray).length !== 0 && (
          <Typography
            variant="p"
            id="filter"
            sx={{ marginLeft: "40%", background: "#DFD3C3" }}
            ref={setLastElement}
          >
            fetching filtered images...
          </Typography>
        )
      )}
    </>
  );
};

export default Homepage;
