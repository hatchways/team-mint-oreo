import React from 'react';
import { Box, Typography } from '@material-ui/core';

const ChatMessages = ({ height }) => {
  return (
    <Box minHeight={height} maxHeight={height} style={{ overflow: 'auto' }}>
      <Box>
        {list.map(item => (
          <Typography key={item}>text</Typography>
        ))}
      </Box>
    </Box>
  );
};

export default ChatMessages;

const list = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];
