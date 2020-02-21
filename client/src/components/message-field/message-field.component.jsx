import React, { useState, useEffect } from 'react';
import { Box, InputBase, Divider, IconButton } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import { useStyles } from './message-field.styles';

const MessageField = ({ socket, chatId, userId }) => {
  const [msgContent, setMsgContent] = useState('');

  const handleChange = e => {
    setMsgContent(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (chatId) {
      console.log('Sending msg to ', chatId);
      socket.emit('sendMsg', { userId, chatId, originalText: msgContent });
      setMsgContent('');
    }
  };

  const classes = useStyles();
  return (
    <Box component="form" className={classes.root} onSubmit={onSubmit}>
      <InputBase
        className={classes.input}
        placeholder={chatId ? 'Type Something ... ' : 'Select a chat'}
        inputProps={{ 'aria-label': 'search listing' }}
        onChange={handleChange}
        value={msgContent}
        disabled={!chatId}
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
