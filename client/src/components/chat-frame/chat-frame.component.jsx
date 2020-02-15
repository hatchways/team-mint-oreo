import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid } from '@material-ui/core';
import { store as directoryStore } from '../../store/directory/directory.provider';
import ChatHeader from '../chat-header/chat-header.component';
import MessageField from '../message-field/message-field.component';
import ChatMessages from '../chat-messages/chat-messages.component';

const ChatFrame = ({ socket, userId }) => {
  const {
    state: { currentlyActive: chatId },
  } = useContext(directoryStore);

  const [messages, setMessage] = useState([]);
  const [showOriginalText, setShowOriginalText] = useState(false);

  useEffect(() => {
    // check front end cache for stored conversation
    // if not cached, get messages from db

    // const msgObject = {
    //   userId, // of sender
    //   originalText,
    //   translations: {
    //     'english': 'asdf',
    //     'spanish': 'asdf'
    //   },
    //   timestamp
    // }
    socket.on('receiveMsg', msg => {
      console.log('msg received!', msg);
    });

    console.log('chatid is', chatId);
  }, [chatId]);

  return (
    <Box height="100vh" overflow="hidden">
      <Grid style={{ height: '100%' }} direction="column" spacing={2}>
        <ChatHeader changeText={setShowOriginalText} chatId={chatId} />
        <Grid item style={{ height: '100%' }}>
          <ChatMessages messages={messages} showOriginalText={showOriginalText} userId={userId} />
          <MessageField emit={socket.emit} chatId={chatId} userId={userId} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatFrame;
