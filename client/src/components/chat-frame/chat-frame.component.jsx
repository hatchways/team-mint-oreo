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
    state: { currentlyActive: chatId },
  } = useContext(directoryStore);

  const [messages, setMessage] = useState([]);
  const [showOriginalText, setShowOriginalText] = useState(false);
  useEffect(() => {
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

    const getMessages = async () => {
      // if not cached, get messages from db
      if (!chatId) return;
      let messages;
      const data = await Client.request(`/chat/messages/${chatId}`);
      console.log(data);
    };
    try {
      getMessages();
    } catch (err) { }
    console.log('chatid is', chatId);
  }, [chatId]);

  return (
    <Box height={'100vh'} overflow={'hidden'}>
      <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
        <Grid item>
          <ChatHeader changeText={setShowOriginalText} chatId={chatId} />
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
                <MessageField emit={socket.emit} chatId={chatId} userId={userId} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatFrame;
