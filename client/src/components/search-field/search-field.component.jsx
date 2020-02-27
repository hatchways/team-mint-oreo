import React from 'react';
import { Box, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from './search-field.styles';

const SearchField = () => {
  const classes = useStyles();

  const handleChange = e => {
    e.preventDefault();
  };

  return (
    <Box component="form" className={classes.root} onChange={handleChange} onSubmit={handleChange}>
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search listing' }}
      />
    </Box>
  );
};

export default SearchField;
