import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid } from '@material-ui/core';

import ChatMessage from '../chat-message/chat-message.component';

const ChatMessages = ({ className, messages, userId, showOriginalText, language, users = {} }) => {
  const [isScrolledToBottom, setIsScrolled] = useState(true);
  const [distanceFromBottom, setDistance] = useState();
  const [activityMap, setActivityMap] = useState({});
  const scrollRef = useRef(null);

  useEffect(() => {
    // create a map of <indexOfLastRead> : [<userId>, <userId>]
    const userActivity = Object.keys(users).reduce((a, friendId) => {
      const { lastActivity } = users[friendId];
      // if user has no activity or is current user move to next user
      if (!lastActivity || userId === friendId) return { ...a };
      // find index of the first message after user's last activity
      let indexOfLastRead = messages.findIndex(
        message => Date.parse(message.createdAt) > lastActivity
      );
      // if user's last read is before the current batch of messages, continue to next user
      if (indexOfLastRead === 0) return { ...a };
      // if user's there are no messages timestamped after user's last activity( ie all messages are read)
      // then the last message is the user's last read
      if (indexOfLastRead === -1) {
        indexOfLastRead = messages.length - 1;
        // otherwise the last read message is the one right before user's last activity
      } else {
        indexOfLastRead -= 1;
      }
      const userAvatar = users[friendId].avatar;
      const avatarArray = a[indexOfLastRead] ? [...a[indexOfLastRead], userAvatar] : [userAvatar];
      return { ...a, [indexOfLastRead]: avatarArray };
    }, {});

    setActivityMap(userActivity);
  }, [users, messages, userId]);

  useEffect(() => {
    const bottomDivLocation = scrollRef.current.getBoundingClientRect().y;
    setDistance(bottomDivLocation);
    // if (!isScrolledToBottom) return;
    scrollRef.current.scrollIntoView();
  }, [scrollRef, messages, isScrolledToBottom]);

  const handleScroll = () => {
    const bottomDiv = scrollRef.current.getBoundingClientRect();
    if (bottomDiv.y === distanceFromBottom) {
      if (!isScrolledToBottom) setIsScrolled(true);
    } else if (isScrolledToBottom) {
      setIsScrolled(false);
    }
  };
  return (
    <Box className={className} onScroll={handleScroll}>
      <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
        {messages.map((message, i) => {
          const isSender = message.userId === userId;
          const { originalText, translations, isPicture } = message;
          const timestamp = Date.parse(message.createdAt);
          const lastReadBy = activityMap[i];
          return (
            <Grid key={message._id} item>
              <Box paddingLeft={2} paddingRight={2}>
                <ChatMessage
                  name={users[message.userId]?.displayName}
                  message={translations[language]}
                  isSender={isSender}
                  isOriginal={showOriginalText}
                  originalText={originalText}
                  timestamp={timestamp}
                  lastReadBy={lastReadBy}
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
