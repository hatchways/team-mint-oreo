import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Avatar, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  chatPaper: {
    backgroundColor: '#86B9FF',
    borderRadius: 12,
  },
  senderPaper: {
    backgroundColor: '#dfdfdf',
    borderRadius: 12,
  },
}));
const ChatMessage = ({ currentUserId, message: { senderId, texts, original, timeStamp } }) => {
  const [isSender, setIsSender] = useState();
  useEffect(() => {
    setIsSender(senderId === currentUserId);
  }, [currentUserId, senderId]);

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
