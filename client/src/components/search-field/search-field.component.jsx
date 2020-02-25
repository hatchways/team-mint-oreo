import React, { useEffect, useState } from 'react';
import { Box, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from './search-field.styles';

const SearchField = ({ socket }) => {
  const classes = useStyles();
  const [searchParam, setSearchParam] = useState('');

  const handleChange = e => {
    setSearchParam(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('searching', searchParam);
  };

  return (
    <Box component="form" className={classes.root} onSubmit={handleSubmit}>
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        onChange={handleChange}
        className={classes.input}
        placeholder="Search"
        value={searchParam}
        inputProps={{ 'aria-label': 'search listing' }}
      />
    </Box>
  );
};

export default SearchField;
