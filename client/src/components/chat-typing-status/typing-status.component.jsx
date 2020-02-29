import React from 'react';
import { Box } from '@material-ui/core';

function TypingStatus({ className, users }) {
  const formatText = users => {
    const names = [];
    for (const id in users) {
      if (users[id].isTyping) names.push(users[id].displayName.split(' ')[0]);
    }

    console.log(users, names);

    if (!names.length) return '';
    const [name1, name2] = names;
    if (names.length === 1) return `${name1} is typing...`;
    if (names.length === 2) return `${name1} and ${name2} are typing...`;
    return `Multiple people are typing...`;
  };

  return <Box class={className}>{formatText(users)}</Box>;
}

export default TypingStatus;
