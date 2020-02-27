import React, { useEffect, useState } from 'react';
import { Box, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from './search-field.styles';

const SearchField = ({ socket, activeTab, userId, dispatch }) => {
  const classes = useStyles();
  const [searchParam, setSearchParam] = useState('');

  const handleChange = e => {
    setSearchParam(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('searching', { tab: activeTab, searchParam, userId });
  };

  useEffect(() => {
    const updateState = result => {
      const { tab, data } = result;
      console.log('UPDATE STATE', result);
      if (tab === 'Chats') {
        dispatch({ type: 'SET_CHATS', payload: data });
      } else if (tab === 'Contacts') {
        dispatch({ type: 'SET_FRIENDS', payload: data });
      }
    };
    socket.on('searchResult', updateState);

    return () => {
      socket.off('searchResult', updateState);
    };
  }, [socket, activeTab, dispatch]);

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
