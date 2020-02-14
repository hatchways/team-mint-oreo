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
import { useStyles } from './chat-header.styles';

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
      <Box px={5} py={3}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
              <Hidden mdUp>
                <Grid item>
                  <IconButton color="primary" onClick={triggerSidebar}>
                    <Menu />
                  </IconButton>
                </Grid>
              </Hidden>
              <Grid item>
                <Typography>{title}</Typography>
              </Grid>
              <Grid item>Online</Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      // checked={state.checkedA}
                      // onChange={handleChange('checkedA')}
                      value="checkedA"
                      color="primary"
                    />
                  }
                  label="Original"
                />
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
