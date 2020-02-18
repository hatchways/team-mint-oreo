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

  const [messages, setMessage] = useState([]);
  const [showOriginalText, toggleText] = useState(false);
  useEffect(() => {
    // const msgObject = {
    //   userId, // of sender
    //   originalText,
    //   translations: {
    //     'id1': 'asdf',
    //     'id2': 'asdf'
    //   },
    //   timestamp
    // }
    socket.on('receiveMsg', msg => {
      console.log('msg received!', msg);
      setMessage([...messages]);
    });

    const getMessages = async () => {
      // if not cached, get messages from db
      if (!chatId) return;
      let messages;
      const data = await Client.request(`/chat/messages/${chatId}`);
      console.log('chatFrame getMessages', data);
    };

    try {
      getMessages();
    } catch (err) {
      // TODO: handle error
    }
  }, [chatId]);

  return (
    <Box height={'100vh'} overflow={'hidden'}>
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
          <Box paddingLeft={1}>
            <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
              <Grid item>
                <ChatMessages
                  messages={messages}
                  showOriginalText={showOriginalText}
                  userId={userId}
                  className={classes.messageBoxHeight}
                />
              </Grid>
              <Grid item>
                <MessageField socket={socket} chatId={chatId} userId={userId} language={language} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatFrame;
