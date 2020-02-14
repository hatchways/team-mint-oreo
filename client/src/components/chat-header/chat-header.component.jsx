import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  Switch,
  Typography,
  FormControlLabel,
  IconButton,
  Hidden,
} from '@material-ui/core';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { store as directoryStore } from '../../store/directory/directory.provider';
import Menu from '@material-ui/icons/Menu';
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
    <Box className={classes.header}>
      <Box className={classes.bigPadd}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item xs sm>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              className={classes.lessSpacingOnXS}
            >
              <Hidden mdUp>
                <Grid item>
                  <Box marginRight={1}>
                    <IconButton color="primary" onClick={triggerSidebar}>
                      <Menu />
                    </IconButton>
                  </Box>
                </Grid>
              </Hidden>
              <Grid item xs={8} sm>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <Typography>{title}</Typography>
                  </Grid>
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
                  <Grid item>
                    <IOSSwitch
                      // checked={state.checkedA}
                      // onChange={handleChange('checkedA')}
                      value="checkedA"
                      color="primary"
                    />
                  </Grid>
                  <Grid item>Off</Grid>
                </Grid>
              </Grid>
              <Grid item>
                <IconButton>
                  <MoreHoriz />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ChatHeader;
