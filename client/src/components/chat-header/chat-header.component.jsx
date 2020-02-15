import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Typography, IconButton, Hidden } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { store as directoryStore } from '../../store/directory/directory.provider';
import { useStyles, IOSSwitch } from './chat-header.styles';

import DirectoryActionTypes from '../../store/directory/directory.types';

const ChatHeader = () => {
  const classes = useStyles();
  const {
    state: { currentlyActive, commsList },
    dispatch,
  } = useContext(directoryStore);

  const [title, setTitle] = useState('Group Chat');

  useEffect(() => {
    if (commsList !== null && currentlyActive != null) {
      const found = commsList.find(e => e.id == currentlyActive);
      setTitle(found.name);
    }
  }, [currentlyActive]);

  const triggerSidebar = () => {
    dispatch({
      type: DirectoryActionTypes.TOGGLE_SIDEBAR,
    });
  };

  return (
    <Box className={`${classes.header} ${classes.bigPadd}`}>
      <Grid container direction="row" justify="space-between" alignItems="center">
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
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
              <Grid item>
                <Typography>{title}</Typography>
              </Grid>
              <Grid item xs={12} sm>
                Online
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className={classes.lessSpacingOnXS}
        >
          <Grid item>
            <Grid component="label" container alignItems="center">
              <IOSSwitch value="checkedA" color="primary" />

              <Grid item>Off</Grid>
            </Grid>
          </Grid>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatHeader;
