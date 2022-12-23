import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Select,
  Checkbox,
  MenuItem,
  FormControlLabel,
  InputLabel,
  Menu,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormGroup,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { getProducts } from "../FetchAll";
const CategoryFilter = (props) => {
  const [category, setCategory] = useState([]);
  const [check, setCheck] = useState(true);
  const [filterCategory, setFilterCategory] = useState(new Set());
  const filterByCategory = (e, category) => {
    if (e) {
      setFilterCategory((prevState) => new Set(prevState).add(category));
    } else {
      filterCategory.delete(category);
      console.log(filterCategory);
      if(check){
        setCheck(false)
      }else{
        setCheck(true)
      }
    }
  };
  useEffect(() => {
    axios.get("http://localhost:3001/products/category").then((response) => {
      console.log(response.data);
      setCategory(response.data)
    });
  }, []);
  useEffect(() => {
    console.log(filterCategory);
    let categoryArray = Array.from(filterCategory);
    console.log(categoryArray);
    if (filterCategory.size !== 0) {
      axios
        .post("http://localhost:3001/products/category/filter", {
          categories: categoryArray,
        })
        .then((response) => {
          props.setProducts(response.data);
        });
    }else{
        getProducts(props.setProducts)
    }
  }, [filterCategory, check]);
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {category.map((product) => (
              <FormControlLabel
                key={product.category}
                control={<Checkbox />}
                label={product.category}
                onChange={(e) =>
                  filterByCategory(e.target.checked, product.category)
                }
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default CategoryFilter;
