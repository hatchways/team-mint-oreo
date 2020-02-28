import React, { useState, useEffect } from 'react';
import { Box, Button, InputBase, Divider, IconButton } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { useStyles } from './message-field.styles';
import Client from '../../utils/HTTPClient';
import ImageReader from '../image-reader/image-reader.component';

const MessageField = ({ socket, chatId, userId }) => {
  const [msgContent, setMsgContent] = useState('');

  const prefix = `SavedMessage`;
  const setLocalStorage = value => localStorage.setItem(`${prefix}-${chatId}`, value);
  const clearLocalStorage = () => setLocalStorage('');
  const getLocalStorage = () => localStorage.getItem(`${prefix}-${chatId}`) || '';

  // on change of ChatId, load in the saved message
  useEffect(() => {
    setMsgContent(getLocalStorage);
  }, [chatId]);

  const handleChange = e => {
    const msgContent = e.target.value;
    setMsgContent(msgContent);
    setLocalStorage(msgContent);
  };

  const onSubmit = e => {
    e.preventDefault();
    Client.updateChatActivity(userId, chatId);
    if (chatId) {
      console.log('Sending msg to ', chatId);
      socket.emit('sendMsg', { userId, chatId, originalText: msgContent });
      setMsgContent('');
      clearLocalStorage();
    }
  };

  const onRead = pic => {
    Client.request('/chat/uploadpic', 'POST', pic).then(res => {
      const { pic, success } = res;
      console.log('picture Uploaded', pic);
      Client.updateChatActivity(userId, chatId);
      if (chatId) {
        console.log('Sending msg to ', chatId);
        socket.emit('sendMsg', { userId, chatId, originalText: pic, isPicture: true });
      }
    });
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
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="uploadPicture"
        component="label"
      >
        <ImageReader style={{ display: 'none' }} onRead={onRead} />
        <PhotoLibraryIcon />
      </IconButton>
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
