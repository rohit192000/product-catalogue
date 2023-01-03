import React, { useState } from "react";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import useDidMountEffect from "../CustomHooks/useDidMountEffect";
const Blueprint = (props) => {
  // It will re-render the function when de-select the filter.
  const [check, setCheck] = useState(true);
  // It will save the checked filter options.
  const [filterProduct, setFilterProduct] = useState(new Set());

  // It saves the attribute name. Is it color or category?
  const attribute = props.attribute;

  // This function will get the filter option and value it is selected or not and adds in the
  //  filterProduct set and remove from the filter product set on deselect.
  const filterByAttribute = async (e, attribute) => {
    // console.log(" ");
    if (e) {
      props.offset.current = 0;
      props.setProductArray(() => []);
      setFilterProduct((prevState) => new Set(prevState).add(attribute));
    } else {
      filterProduct.delete(attribute);
      if (props.attribute === "category") {
        props.filter.categoryFilter.splice(
          props.filter.categoryFilter.indexOf(attribute),
          1
        );
        // props.setFilter((prevState) => ({...prevState, categoryFilter : props.filter}))
      } else if (props.attribute === "color") {
        props.filter.colorFilter.splice(
          props.filter.colorFilter.indexOf(attribute),
          1
        );
      }
      // this will filter the productMap with the attribute
      // and save in another variable
      // then set productMap with that variable
      // So when user deselect the checkbox then that filtered product will
      //  remove and updates the state which is responsible for displaying the images.
      let products =
        props.attribute === "category"
          ? props.productMap.filter((product) => product.category !== attribute)
          : props.attribute === "color" &&
            props.productMap.filter(
              (product) => product.variants[0].color !== attribute
            );
      props.setProductMap(products);

      // This will always run the
      // useDidMountEffect which fetch the first filtered products when it changes
      if(filterProduct.size === 0){
        props.offset.current = 0
      }
        if (check) {
          setCheck(false);
        } else {
          setCheck(true);
        }
    }
  };

  // This is an custom hook which doesn't run on initial render
  useDidMountEffect(async () => {
    let attributeArray = Array.from(filterProduct);
    if (filterProduct.size !== 0) {
      props.setLoading(false);
    }
    if (attribute === "category") {
      props.setFilter((prevState) => ({
        ...prevState,
        categoryFilter: [...attributeArray],
      }));
    } else if (attribute === "color") {
      props.setFilter((prevState) => ({
        ...prevState,
        colorFilter: [...attributeArray],
      }));
    }
  }, [filterProduct, check]);

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>
            {attribute === "category" ? "Category" : "Color"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {attribute === "category"
              ? props.product.map((product) => (
                  <FormControlLabel
                    key={product.category}
                    control={
                      <Checkbox
                        checked={Object.values(props.filter)[1].includes(
                          product.category
                        )}
                      />
                    }
                    label={product.category}
                    onChange={(e) =>
                      filterByAttribute(e.target.checked, product.category)
                    }
                  />
                ))
              : props.product.map((product) => (
                  <FormControlLabel
                    key={product.color}
                    control={
                      <Checkbox
                        checked={Object.values(props.filter)[2].includes(
                          product.color
                        )}
                      />
                    }
                    label={product.color}
                    onChange={(e) =>
                      filterByAttribute(e.target.checked, product.color)
                    }
                  />
                ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default Blueprint;
