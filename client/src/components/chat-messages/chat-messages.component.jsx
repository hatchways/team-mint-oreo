import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';

import ChatMessage from '../chat-message/chat-message.component';

const ChatMessages = () => {
  const [messagesList, setMessagesList] = useState([]);
  const {
    state: { currentlyActive },
  } = useContext(directoryStore);

  useEffect(() => {
    //    console.log(messagesList);
  }, [messagesList]);
  return (
    <Box minHeight="73vh" style={{ overflow: 'auto' }}>
      <Box maxWidth="99%">
        <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
          {messagesList.map(message => {
            return (
              <Grid key={message.id} item>
                <Box paddingLeft={2} paddingRight={2}>
                  <ChatMessage message={message} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default ChatMessages;
