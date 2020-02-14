import React from 'react';
import { Box, InputBase, Divider, IconButton } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import { useStyles } from './message-field.styles';

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
