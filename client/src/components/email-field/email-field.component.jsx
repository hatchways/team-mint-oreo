import React from 'react';
import { Box, InputBase, IconButton } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

import { useStyles } from './email-field.styles';

const EmailField = ({ onAddClick, ...props }) => {
  const classes = useStyles();

  const handleChange = e => {
    e.preventDefault();
  };

  return (
    <Box
      component="form"
      className={classes.root}
      onChange={handleChange}
      onSubmit={handleChange}
      borderRadius={6}
      border={1}
    >
      <InputBase className={classes.input} {...props} type="email" />
      <IconButton
        id={props.id}
        type="submit"
        className={classes.iconButton}
        aria-label="add"
        onClick={onAddClick}
      >
        <Add />
      </IconButton>
    </Box>
  );
};

export default EmailField;
