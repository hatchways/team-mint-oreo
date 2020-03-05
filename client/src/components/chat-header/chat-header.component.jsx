import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Typography, IconButton, Hidden, Avatar, Tooltip } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Menu from '@material-ui/icons/Menu';
import { store as directoryStore } from '../../store/directory/directory.provider';
import { useStyles, IOSSwitch } from './chat-header.styles';
import languageMap from '../../utils/languageMap';
import AvatarWithBadge from '../AvatarWithBadge/AvatarWithBadge';
import DirectoryActionTypes from '../../store/directory/directory.types';

const renderNames = users => {
  return (
    <Box display="flex" flexDirection="column ">
      {users.map(user => (
        <div>{user.displayName}</div>
      ))}
    </Box>
  );
};
const AvatarGroupComponent = ({ users }) => {
  return (
    <AvatarGroup>
      {users.map((user, i) => {
        if (i <= 4)
          return (
            <Tooltip title={user.displayName} placement="bottom" interactive>
              <Avatar src={user.avatar} />
            </Tooltip>
          );
      })}
      {users.length > 5 ? (
        <Tooltip title={renderNames(users.slice(5))} placement="bottom" arrow interactive>
          <Avatar>+{users.length - 5}</Avatar>
        </Tooltip>
      ) : null}
    </AvatarGroup>
  );
};

const ChatHeader = ({ chatId, toggleText, users = [], userId, language, showOriginal }) => {
  const { dispatch } = useContext(directoryStore);

  const [title, setTitle] = useState('Select a chatroom');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const filteredIds = Object.keys(users).filter(id => id !== userId);
    if (filteredIds.length === 1) {
      const friendId = filteredIds[0];
      const { displayName } = users[friendId];
      setTitle(displayName);
      setUserData([users[friendId]]);
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
            {userData.length === 1 && (
              <AvatarWithBadge src={userData[0].avatar} active={userData[0].isOnline} />
            )}
          </Grid>
          <Grid item>
            <Typography mx={1}>{title}</Typography>
          </Grid>
        </Grid>
      </Grid>
      {userData.length > 1 && (
        <Grid item>
          <AvatarGroupComponent users={userData} />
        </Grid>
      )}

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
              <Grid item>{showOriginal ? 'Original Text' : languageMap[language].name}</Grid>
              <IOSSwitch
                value="checkedA"
                color="primary"
                onClick={() => toggleText({ type: 'TOGGLE_TRANSLATION' })}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ChatHeader;
