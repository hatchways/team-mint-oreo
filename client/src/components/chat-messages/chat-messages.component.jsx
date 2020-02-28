import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import Client from '../../utils/HTTPClient';

import ChatMessage from '../chat-message/chat-message.component';

const ChatMessages = ({ className, messages, userId, showOriginalText, language }) => {
  const [avatars, setAvatars] = useState({});
  useEffect(() => {
    // on messages change get avatars
    messages.map(message => {
      if (avatars[message.userId] === undefined) {
        avatars[message.userId] = ''; // this line is important, prevents making a ton of requests.
        Client.request(`/user/avatar/${message.userId}`).then(({ avatar }) => {
          const newAvatars = { ...avatars, [message.userId]: avatar };
          setAvatars(newAvatars);
        });
      }
    });
  }, [messages]);

  return (
    <Box className={className} style={{ overflow: 'auto' }}>
      <Box maxWidth="98%">
        <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
          {messages.map(message => {
            const isSender = message.userId === userId;
            const { originalText, translations } = message;
            const timestamp = message?.timestamp || Date.parse(message.createdAt);
            const isPicture = message.isPicture;
            return (
              <Grid key={message._id} item>
                <Box paddingLeft={2} paddingRight={2}>
                  <ChatMessage
                    message={translations[language]}
                    isSender={isSender}
                    isOriginal={showOriginalText}
                    originalText={originalText}
                    timestamp={timestamp}
                    isPicture={isPicture}
                    avatar={avatars[message.userId]}
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
