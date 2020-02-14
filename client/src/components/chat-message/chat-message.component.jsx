import React from 'react';
import { Box, Grid, Typography, Avatar, Paper } from '@material-ui/core';
import { useStyles } from './chat-message.styles';

const ChatMessage = ({ message: { isSender, texts, original, timeStamp } }) => {
  const classes = useStyles();
  return (
    <Box>
      <Grid
        container
        direction="row"
        justify={isSender ? 'flex-end' : 'flex-start'}
        alignItems="flex-start"
        spacing={1}
      >
        {!isSender && (
          <Grid item>
            <Box paddingTop={3}>
              <Avatar {...{ src: '', alt: 'name' }}>A</Avatar>
            </Box>
          </Grid>
        )}
        <Grid item xs>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems={isSender ? 'flex-end' : 'flex-start'}
          >
            <Grid item> {timeStamp}</Grid>
            <Grid item>
              <Paper className={isSender ? classes.senderPaper : classes.chatPaper}>
                <Box p={2}>
                  <Typography>{texts[original]}</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatMessage;
