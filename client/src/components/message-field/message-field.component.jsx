import React, { useState, useEffect } from 'react';
import { Box, InputBase, Divider, IconButton } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import { useStyles } from './message-field.styles';

const MessageField = ({ emit, chatId, userId }) => {
  const [msgObject, setMsgObject] = useState({ chatId: '', userId: '', originalText: '' });

  const handleChange = e => {
    setMsgObject({ ...msgObject, originalText: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    emit('sendMsg', msgObject);
  };

  useEffect(() => {
    setMsgObject({ chatId, userId, originalText: '' });
  }, [chatId, userId]);

  const classes = useStyles();
  return (
    <Box component="form" className={classes.root} onChange={handleChange} onSubmit={onSubmit}>
      <InputBase
        className={classes.input}
        placeholder="Type Something ... "
        inputProps={{ 'aria-label': 'search listing' }}
        // value={msgObject.originalText}
        // onChange={handleChange}
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

export default React.memo(MessageField);
