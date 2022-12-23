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
const ColorFilter = (props) => {
  const [color, setColor] = useState([]);
  const [check, setCheck] = useState(true);
  const [filterColor, setFilterColor] = useState(new Set());
  const filterBycolor = (e, color) => {
    if (e) {
      setFilterColor((prevState) => new Set(prevState).add(color));
    } else {
      filterColor.delete(color);
      console.log(filterColor);
      if (check) {
        setCheck(false);
      } else {
        setCheck(true);
      }
    }
  };
  useEffect(() => {
    console.log(filterColor);
    let colorArray = Array.from(filterColor);
    console.log(colorArray);
    if (filterColor.size !== 0) {
      axios
        .post("http://localhost:3001/variants/color/filter", {
          colors : colorArray,
        })
        .then((response) => {
        let item = [];
        response.data.forEach(data => {
            item.push({
              featured_image : data.products.featured_image,
              variants : [{
                color : data.color,
                price : data.price
              }]
            })
        })
        props.setProducts(item);
        console.log(response.data)
        });
    } else {
      getProducts(props.setProducts);
    }
  }, [filterColor, check]);
  useEffect(() => {
    axios.get("http://localhost:3001/variants/color").then((response) => {
      console.log(response.data);
      setColor(response.data);
    });
  }, []);
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Color</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {color.map((product) => (
              <FormControlLabel
                key={product.color}
                control={<Checkbox />}
                label={product.color}
                onChange={(e) =>
                    filterBycolor(e.target.checked, product.color)
                  }
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default ColorFilter;
