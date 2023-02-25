import React, { useEffect, useState } from "react";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { queryProducts, setSearchProducts, useSearchResults } from "../../redux";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = useSearchResults();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      if(searchQuery) {
        dispatch(queryProducts(searchQuery));
      } else {
        dispatch(setSearchProducts());
      }
    }, 1000);
    return () => {clearTimeout(timerId)}
  },[searchQuery]);

  return (
    <Autocomplete
      freeSolo
      sx={{width: 400, background: '#ffffff', boxShadow: "0 0 10px black" }}
      disableClearable
      options={searchResults}
      getOptionLabel={(option) => option.name}
      renderOption={(_, option) => {
        const {_id, name, price, category, image} = option;
        return (
          <Link
            to={`/products/categories/${category}/${name}`}
            key={_id}
            state={{id: _id}}
          >
            <Box>
              <Typography>{name}</Typography>
              <Typography>{price}</Typography>
              <Typography><img alt="" scr={image} width="100%" /></Typography>
            </Box>
          </Link>
        )
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            label="Search"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )
      }}
    />
  )
};
