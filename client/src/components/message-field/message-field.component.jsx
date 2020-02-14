import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, InputBase, Divider, IconButton } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '15px 30px',
    margin: '0px 40px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    backgroundColor: '#eee',
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

const MessageField = () => {
  const classes = useStyles();

  const handleChange = e => {
    e.preventDefault();
  };

  return (
    <Box component="form" className={classes.root} onChange={handleChange} onSubmit={handleChange}>
      <InputBase
        className={classes.input}
        placeholder="Type Something ... "
        inputProps={{ 'aria-label': 'search listing' }}
      />
      <IconButton color="primary" className={classes.iconButton} aria-label="emoji">
        <InsertEmoticon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton type="submit" className={classes.iconButton} aria-label="send">
        <Send />
      </IconButton>
    </Box>
  );
};

export default MessageField;
