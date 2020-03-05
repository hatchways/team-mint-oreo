import React, { useState } from 'react';
import { Box, InputBase, IconButton } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

import { useStyles } from './email-field.styles';

const EmailField = ({ onAddClick, changeHandler, index, value }) => {
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Box
      component="form"
      className={classes.root}
      onSubmit={handleSubmit}
      borderRadius={6}
      border={1}
    >
      <InputBase
        className={classes.input}
        onChange={e => changeHandler(e, index)}
        placeholder="example@email.com"
        value={value}
        type="email"
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="add email field"
        onClick={onAddClick}
      >
        <Add />
      </IconButton>
    </Box>
  );
};

export default React.memo(EmailField);
