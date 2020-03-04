import React from 'react';
import { Box } from '@material-ui/core';

function TypingStatus({ className, users }) {
  const formatText = users => {
    const names = [];

    // aggregates all the display names for users that are typing
    Object.keys(users).forEach(userId => {
      if (users[userId].isTyping) names.push(users[userId].displayName.split(' ')[0]);
    });

    if (!names.length) return '';
    const [name1, name2] = names;
    if (names.length === 1) return `${name1} is typing...`;
    if (names.length === 2) return `${name1} and ${name2} are typing...`;
    return `Multiple people are typing...`;
  };

  return <Box className={className}>{formatText(users)}</Box>;
}

export default React.memo(TypingStatus);
