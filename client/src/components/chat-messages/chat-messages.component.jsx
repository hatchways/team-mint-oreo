import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';

import ChatMessage from '../chat-message/chat-message.component';

const ChatMessages = ({ className, messages, userId, showOriginalText, language, users = [] }) => {
  const [avatars, setAvatars] = useState({});

  useEffect(() => {
    const avatarMap = users.reduce((a, user) => {
      return { ...a, [user._id]: user.avatar };
    }, {});
    setAvatars(avatarMap);
  }, [users]);

  return (
    <Box className={className}>
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
  );
};

export default ChatMessages;
