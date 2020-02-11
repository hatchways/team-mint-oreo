import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';

import ChatHeader from '../chat-header/chat-header.component';
import MessageField from '../message-field/message-field.component';
import ChatMessages from '../chat-messages/chat-messages.component';

const ChatFrame = () => {
  return (
    <Box height={'100vh'} bgcolor="grey.200" paddingRight={1}>
      <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
        <Grid item>
          <ChatHeader />
        </Grid>
        <Grid item>
          <Grid container direction="column" justify="flex-end" alignItems="stretch" spacing={2}>
            <Grid item>
              <ChatMessages />
            </Grid>
            <Grid item>
              <MessageField />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatFrame;
