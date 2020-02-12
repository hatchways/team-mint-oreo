import React, { useContext } from 'react';
import { Box, Grid, Hidden, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import WithChatStates from '../../components/with-chat-states/with-chat-states.component';

import Sidebar from '../../components/sidebar/sidebar.component';
import ChatFrame from '../../components/chat-frame/chat-frame.component';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 999,
    color: '#fff',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const {
    state: { showBackdrop },
    dispatch,
  } = useContext(directoryStore);

  const handleClose = () => {
    dispatch({
      type: DirectoryActionTypes.TOGGLE_BACKDROP,
    });
  };
  return (
    <Box>
      <Backdrop className={classes.backdrop} open={showBackdrop} onClick={handleClose}>
        BACK DROP
      </Backdrop>
      <Box>
        <Grid container spacing={0} alignItems="stretch">
          <Hidden smDown>
            <Grid item>
              <Box minWidth={450} maxWidth={450} minHeight={'100vh'} bgcolor="grey.200">
                <Sidebar />
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md>
            <Box minHeight={'100vh'}>
              <ChatFrame />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WithChatStates(Dashboard, props => props);
