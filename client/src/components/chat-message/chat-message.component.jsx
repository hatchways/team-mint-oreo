import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Avatar, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  chatPaper: {
    backgroundColor: '#86B9FF',
  },
}));
const ChatMessage = ({ currentUserId, message: { senderId, texts, original } }) => {
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
        alignItems="center"
        spacing={1}
      >
        {!isSender && (
          <Grid item>
            <Avatar {...{ src: '', alt: 'name' }}>A</Avatar>
          </Grid>
        )}
        <Grid item>
          <Paper className={classes.chatPaper}>
            <Box p={2}>
              <Typography>{texts[original]}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatMessage;
