import React from 'react';
import { Box, Grid } from '@material-ui/core';

import ChatMessage from '../chat-message/chat-message.component';

const ChatMessages = ({ className, messages, userId, showOriginalText, language }) => {
  return (
    <Box className={className} style={{ overflow: 'auto' }}>
      <Box maxWidth="99%">
        <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
          {messages.map(message => {
            const isSender = message.userId === userId;
            const { originalText, translations } = message;
            const timestamp = message?.timestamp || Date.parse(message.createdAt);
            return (
              <Grid key={message._id} item>
                <Box paddingLeft={2} paddingRight={2}>
                  <ChatMessage
                    message={translations[language]}
                    isSender={isSender}
                    isOriginal={showOriginalText}
                    originalText={originalText}
                    timestamp={timestamp}
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
