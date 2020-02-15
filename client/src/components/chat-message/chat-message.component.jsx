import React from 'react';
import { Box, Grid, Typography, Avatar, Paper } from '@material-ui/core';
import format from '../../utils/relativeDateFormat';
import { useStyles } from './chat-message.styles';

const ChatMessage = ({
  message: { translation, originalText, timestamp },
  isSender,
  isOriginal,
}) => {
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
            <Grid item> {format(timestamp)}</Grid>
            <Grid item>
              <Paper className={isSender ? classes.senderPaper : classes.chatPaper}>
                <Box p={2}>
                  <Typography>{isOriginal ? originalText : translation}</Typography>
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
