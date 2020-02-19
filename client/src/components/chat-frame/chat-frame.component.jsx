import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid } from '@material-ui/core';
import { store as directoryStore } from '../../store/directory/directory.provider';
import ChatHeader from '../chat-header/chat-header.component';
import MessageField from '../message-field/message-field.component';
import ChatMessages from '../chat-messages/chat-messages.component';
import Client from '../../utils/HTTPClient';
import { useStyles } from './chat-frame.styles';

const ChatFrame = ({ socket, userId }) => {
  const classes = useStyles();

  const {
    state: { currentlyActive: chatId, language },
  } = useContext(directoryStore);

  const [messages, setMessages] = useState([]);
  const [showOriginalText, toggleText] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getMessages = async () => {
      // if not cached, get messages from db
      if (!chatId) return;
      const { messages: data = [] } = await Client.request(`/chat/messages/${chatId}`);
      console.log('Chatframe data fetch: ', data);
      setMessages(data);
      setIsLoading(false);
    };

    try {
      getMessages();
    } catch (err) {
      // TODO: handle error
    }
  }, [chatId]);

  useEffect(() => {
    socket.on('receiveMsg', msg => {
      setMessages([...messages, msg]);
    });
  }, [messages, socket]);

  return (
    <Box height="100vh" overflow="hidden">
      {!isLoading && (
        <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
          <Grid item>
            <ChatHeader
              toggleText={() => {
                toggleText(!showOriginalText);
              }}
              chatId={chatId}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
              <ChatMessages
                messages={messages}
                showOriginalText={showOriginalText}
                userId={userId}
                className={classes.messageBoxHeight}
                language={language}
              />
              <MessageField socket={socket} chatId={chatId} userId={userId} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ChatFrame;
