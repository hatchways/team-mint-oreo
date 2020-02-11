import React from 'react';
import { Box, Grid, Typography, makeStyles, withStyles } from '@material-ui/core';
import ChatHeader from '../chat-header/chat-header.component';

const ChatFrame = () => {
  return (
    <Box>
      <Grid container direction="column" justify="flex-start" alignItems="stretch">
        <Grid item>
          <ChatHeader />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatFrame;
