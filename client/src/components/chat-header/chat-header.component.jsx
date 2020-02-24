import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Typography, IconButton, Hidden } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { store as directoryStore } from '../../store/directory/directory.provider';
import { useStyles, IOSSwitch } from './chat-header.styles';
import Client from '../../utils/HTTPClient';
import DirectoryActionTypes from '../../store/directory/directory.types';

const ChatHeader = ({ chatId, toggleText }) => {
  const { dispatch } = useContext(directoryStore);

  // const [title, setTitle] = useState('Select a chatroom');

  // useEffect(() => {
  //   let isMounted = true;
  //   const getHeaderInfo = async () => {
  //     const data = await Client.request('/');
  //     if (isMounted) setTitle(data.title);
  //   };

  //   // getHeaderInfo();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [chatId]);

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
                <Typography>{chatId}</Typography>
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
