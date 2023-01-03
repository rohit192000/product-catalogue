import { Typography } from "@mui/material";
import axios from "axios";
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useDidMountEffect from "./CustomHooks/useDidMountEffect";
import ProductFilter from "./Filter/ProductFilter";
const Images = lazy(() => import("./Images"));

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [productArray, setProductArray] = useState([]);
  const offset = useRef(0);
  const [lastElement, setLastElement] = useState(null);
  const [productMap, setProductMap] = useState([]);

  const [filter, setFilter] = useState({
    priceFilter: {
      low: "",
      high: "",
    },
    categoryFilter: [],
    colorFilter: [],
    searchFilter : ""
  });

  const fetchData = () => {
    console.log("filter request", offset.current);
    axios
      .post("http://localhost:3001/filter/" + offset.current, filter)
      .then(async (response) => {
        console.log(filter);
        console.log(response.data.data);
        if (response.data.data.length === 0) {
          console.log("response is empty");
          await setLoading((prevState) => false);
          return;
        } else {
          setTimeout(() => {
            setProductArray((prevState) => response.data.data);
            offset.current =
              response.data.data[response.data.data.length - 1].id;
            console.log("after fetching data Offset value : ", offset.current);
          }, 1000);
          setTimeout(() => {
            setLoading(true);
          }, 2000);
        }
      });
  };

  const observer = new IntersectionObserver(
    useCallback(
      (entries) => {
        const first = entries[0];
        console.log(filter);
        if (first.isIntersecting) {
          console.log("observer");
          fetchData();
        }
      },
      [filter]
    )
  );
  useEffect(() => {
    console.log("Filter Object : ", filter);
    fetchData();
  }, [filter]);
  useDidMountEffect(() => {
    const currentElement = lastElement;

    const currentObserver = observer;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <>
      {/**
       */}
      <ProductFilter
        productMap={productMap}
        offset={offset}
        setLoading={setLoading}
        setProductArray={setProductArray}
        setProductMap={setProductMap}
        filter={filter}
        setFilter={setFilter}
      />
      <Suspense>
        <Images
          loading={loading}
          productArray={productArray}
          setLastElement={setLastElement}
          offset={offset}
          productMap={productMap}
          setProductMap={setProductMap}
        />
      </Suspense>
      {loading && (
        <Typography
          variant="p"
          sx={{ marginLeft: "40%", background: "#DFD3C3" }}
          id="allproduct"
          ref={setLastElement}
        >
          fetching images...
        </Typography>
      )}
    </>
  );
};

export default Homepage;
