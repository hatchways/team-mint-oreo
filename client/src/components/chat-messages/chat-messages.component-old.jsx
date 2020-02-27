/*
import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';
import { store as conversationStore } from '../../store/conversation/conversation.provider';
import { store as userStore } from '../../store/user/user.provider';

import ChatMessage from '../chat-message/chat-message.component';

const ChatMessages = ({ height }) => {
  const [messagesList, setMessagesList] = useState([]);
  const {
    state: { activeChatId },
  } = useContext(directoryStore);

  const {
    state: { id: currentUserId },
  } = useContext(userStore);

  const { state: conversationState } = useContext(conversationStore);

  useEffect(() => {
    if (activeChatId !== null && conversationState[activeChatId] !== undefined)
      setMessagesList(conversationState[activeChatId]);
    else setMessagesList([]);
  }, [activeChatId]);

  useEffect(() => {
    //    console.log(messagesList);
  }, [messagesList]);
  return (
    <Box minHeight={height} maxHeight={height} style={{ overflow: 'auto' }}>
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
*/
