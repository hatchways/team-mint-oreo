import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Typography, IconButton, Hidden, Avatar, Badge } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { store as directoryStore } from '../../store/directory/directory.provider';
import { useStyles, IOSSwitch, AvatarWithBadge } from './chat-header.styles';
import languageMap from '../../utils/languageMap';

import DirectoryActionTypes from '../../store/directory/directory.types';

const ChatHeader = ({ chatId, toggleText, users, userId, language, showOriginal }) => {
  const {
    dispatch,
    state: { chatsList },
  } = useContext(directoryStore);

  const [title, setTitle] = useState('Select a chatroom');
  const [userData, setUserData] = useState();

  useEffect(() => {
    console.log('CHAT HEADER', users);
    const filteredIds = Object.keys(users).filter(id => id !== userId);
    if (filteredIds.length === 1) {
      const friendId = filteredIds[0];
      const { displayName } = users[friendId];
      setTitle(displayName);
      setUserData(users[friendId]);
    } else if (filteredIds.length > 1) {
      setTitle('Group Chat');
      const _userData = Object.keys(users).map(userId => users[userId]);
      setUserData(_userData);
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
      <Grid
        container
        direction="row"
        spacing={1}
        alignItems="center"
        className={classes.lessSpacingOnXS}
      >
        <Grid item container spacing={2} alignItems="center">
          <Hidden mdUp>
            <IconButton color="primary" onClick={triggerSidebar} mr={1}>
              <Menu />
            </IconButton>
          </Hidden>

          <Grid item>
            {userData && <AvatarWithBadge src={userData.avatar} isonline={userData.isOnline} />}
          </Grid>
          <Grid item>
            <Typography mx={1}>{title}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        item
        direction="row"
        justify="flex-end"
        alignItems="center"
        className={classes.lessSpacingOnXS}
      >
        {chatId && (
          <Grid item>
            <Grid component="label" container alignItems="center">
              <IOSSwitch
                value="checkedA"
                color="primary"
                onClick={() => toggleText({ type: 'TOGGLE_TRANSLATION' })}
              />
              <Grid item>{showOriginal ? 'Original Text' : languageMap[language].name}</Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ChatHeader;
