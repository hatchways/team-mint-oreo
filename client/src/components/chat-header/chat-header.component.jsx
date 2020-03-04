import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Typography, IconButton, Hidden } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { store as directoryStore } from '../../store/directory/directory.provider';
import { useStyles, IOSSwitch } from './chat-header.styles';
import Client from '../../utils/HTTPClient';
import DirectoryActionTypes from '../../store/directory/directory.types';

const ChatHeader = ({ chatId, toggleText, users, userId }) => {
  const {
    dispatch,
    state: { chatsList },
  } = useContext(directoryStore);

  const [title, setTitle] = useState('Select a chatroom');

  useEffect(() => {
    console.log('CHAT HEADER', users);
    const userIds = Object.keys(users).filter(id => id !== userId);
    if (userIds.length === 1) {
      const otherUser = userIds[0];
      const { displayName } = users[otherUser];
      setTitle(displayName);
    } else if (userIds.length > 1) {
      setTitle('Group Chat');
    }
  }, [chatId, users, userId]);

  const triggerSidebar = () => {
    dispatch({
      type: DirectoryActionTypes.TOGGLE_SIDEBAR,
    });
  };

  const classes = useStyles();
  return (
    <Box className={`${classes.header} ${classes.bigPadd}`} component="header">
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.lessSpacingOnXS}
          >
            <Hidden mdUp>
              <Box marginRight={1}>
                <IconButton color="primary" onClick={triggerSidebar}>
                  <Menu />
                </IconButton>
              </Box>
            </Hidden>
            <Grid item xs={8} sm>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="baseline"
                spacing={1}
              >
                <Typography>{title}</Typography>
                <Grid item xs={12} sm>
                  Online
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            className={classes.lessSpacingOnXS}
          >
            <Grid item>
              <Grid component="label" container alignItems="center">
                <IOSSwitch
                  value="checkedA"
                  color="primary"
                  onClick={() => toggleText({ type: 'TOGGLE_TRANSLATION' })}
                />
                <Grid item>Off</Grid>
              </Grid>
            </Grid>
            <IconButton>
              <MoreHoriz />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatHeader;
