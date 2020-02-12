import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, InputBase, IconButton } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
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

const EmailField = ({ values, onAddClick, ...props }) => {
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
      <InputBase className={classes.input} {...props} />
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
