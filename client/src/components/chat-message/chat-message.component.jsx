import React from 'react';
import { Box, Grid, Typography, Avatar, Paper, Card, CardMedia } from '@material-ui/core';
import format from '../../utils/relativeDateFormat';
import { useStyles } from './chat-message.styles';

const ChatMessage = ({
  name,
  message,
  originalText,
  timestamp,
  isSender,
  isPicture,
  isOriginal,
  lastReadBy,
  avatar = '',
}) => {
  const classes = useStyles();
  return (
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
            <Avatar {...{ src: avatar, alt: 'name' }} />
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
          <Box display="flex" alignItems="baseline">
            <Box>{name}</Box>
            <Box className={classes.timestamp}>{format(timestamp)}</Box>
          </Box>
          <Box
            display="flex"
            alignItems="flex-end"
            flexDirection={isSender ? 'row-reverse' : 'row'}
          >
            <Paper className={isSender ? classes.senderPaper : classes.chatPaper}>
              <Box p={2}>
                {isPicture ? (
                  <Card>
                    <CardMedia component="img" alt="PICTURE \o/" image={originalText} />
                  </Card>
                ) : (
                  <Typography>{isOriginal ? originalText : message}</Typography>
                )}
              </Box>
            </Paper>
            <Box>
              {!!lastReadBy &&
                lastReadBy.map(avatarURL => {
                  return (
                    <Avatar
                      className={classes.readAvatar}
                      src={avatarURL}
                      fallback={name[0].toUpperCase()}
                    />
                  );
                })}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(ChatMessage);
