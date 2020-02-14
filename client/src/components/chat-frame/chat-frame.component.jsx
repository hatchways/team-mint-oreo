import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid } from '@material-ui/core';
import { store as directoryStore } from '../../store/directory/directory.provider';
import ChatHeader from '../chat-header/chat-header.component';
import MessageField from '../message-field/message-field.component';
import ChatMessages from '../chat-messages/chat-messages.component';

const ChatFrame = () => {
  const {
    state: { currentlyActive: chatId },
  } = useContext(directoryStore);

  const [messages, setMessage] = useState([]);

  console.log('chatid is', chatId);

  useEffect(() => {}, []);

  return (
    <Box height="100vh" overflow={'hidden'} border="1px solid black">
      <Grid style={{ height: '100%' }} direction="column" spacing={2}>
        <Grid item>
          <ChatHeader />
        </Grid>
        <Grid item style={{ height: '100%' }}>
          <ChatMessages messages={messages} />
          <MessageField />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatFrame;
