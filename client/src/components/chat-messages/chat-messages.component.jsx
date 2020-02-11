import React from 'react';
import { Box } from '@material-ui/core';

const ChatMessages = ({ heights = [300] }) => {
  return (
    <Box minHeight={combineHeight(heights)} bgcolor="grey.200">
      <Box>text</Box>
    </Box>
  );
};

export default ChatMessages;

const combineHeight = heights =>
  heights.reduce(
    (accumulator, currentElement) =>
      currentElement !== null && accumulator + Math.round(currentElement),
    0
  );
