import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';

import ChatMessage from '../chat-message/chat-message.component';

const ChatMessages = ({ messages, userId, showOriginalText }) => {
  return (
    <Box minHeight="73vh" style={{ overflow: 'auto' }}>
      <Box maxWidth="99%">
        <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
          {messages.map(message => {
            const isSender = message.userId === userId;
            return (
              <Grid key={message.id} item>
                <Box paddingLeft={2} paddingRight={2}>
                  <ChatMessage
                    message={message}
                    isSender={isSender}
                    isOriginal={showOriginalText}
                  />
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
