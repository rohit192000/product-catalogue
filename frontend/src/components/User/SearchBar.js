import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Search } from "@mui/icons-material";
const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const searchProduct = () => {
    props.setLoading(false)
    props.setProductMap(prevState => [])
    props.offset.current = 0;
    props.setFilter((prevState) => ({
      ...prevState,
      searchFilter: searchInput,
    }));
  };
  return (
    <>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Search Here...
        </InputLabel>
        <OutlinedInput
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="search_button"
                edge="end"
                onClick={searchProduct}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          }
          label="searchInput"
          onChange={(e) => handleChange(e)}
        />
      </FormControl>
    </>
  );
};
export default SearchBar;
