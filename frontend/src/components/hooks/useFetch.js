import { useState, useEffect, useCallback } from "react";

import axios from "axios";

const useFetch = (limit) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
        console.log("hi")
      await setLoading(true);
      await setError(false);
      const res = await axios.get(
        "http://localhost:3001/products/limit/" + limit
      );
      await setProducts((prev) => [
        ...new Set([...prev, ...res.data.map((d) => {
            return ({
                featured_image : d.featured_image,
                variants : d.variants
            })
        })])
      ])
      setLoading(false)
    } catch (err) {
      setError(err);
    }
  }, [limit]);


  useEffect(() => {
    sendQuery(limit);
    console.log(products);
  }, [sendQuery]);
  return {loading, error, products};
};
export default useFetch;