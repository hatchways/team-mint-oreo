import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';

const ChatMessage = ({ isSender, ...chatInfo }) => {
  return (
    <Box>
      <Grid
        container
        direction="row"
        justify={isSender ? 'flex-right' : 'flex-left'}
        alignItems="center"
      >
        <Typography>{JSON.stringify(chatInfo)}</Typography>
      </Grid>{' '}
    </Box>
  );
};

export default ChatMessage;
