import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid } from '@material-ui/core';

import ChatMessage from '../chat-message/chat-message.component';

const ChatMessages = ({ className, messages, userId, showOriginalText, language, users = [] }) => {
  const [isScrolledToBottom, setIsScrolled] = useState(true);
  const [distanceFromBottom, setDistance] = useState();
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollIntoView();
    const bottomDivLocation = scrollRef.current.getBoundingClientRect().y;
    setDistance(bottomDivLocation);
  }, [scrollRef, messages]);

  const handleScroll = () => {
    const bottomDiv = scrollRef.current.getBoundingClientRect();
    if (bottomDiv.y === distanceFromBottom) {
      if (!isScrolledToBottom) setIsScrolled(true);
    }
    if (isScrolledToBottom) setIsScrolled(false);
  };

  return (
    <Box className={className} onScroll={handleScroll}>
      <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
        {messages.map(message => {
          const isSender = message.userId === userId;
          const { originalText, translations, isPicture } = message;
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
                  isPicture={isPicture}
                  avatar={users[message.userId]?.avatar || ''}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <div ref={scrollRef} />
    </Box>
  );
};

export default React.memo(ChatMessages);
