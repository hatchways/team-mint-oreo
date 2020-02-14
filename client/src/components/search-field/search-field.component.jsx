import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    backgroundColor: '#ddd',
    borderRadius: 16,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

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
