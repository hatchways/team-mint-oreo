import React, { useContext } from 'react';
import { Hidden, Box, SwipeableDrawer } from '@material-ui/core';

import Sidebar from './sidebar.component';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

const SidebarDrawer = () => {
  const {
    state: { showSidebar },
    dispatch,
  } = useContext(directoryStore);

  const toggleSidebar = () => {
    dispatch({
      type: DirectoryActionTypes.TOGGLE_SIDEBAR,
    });
  };

  const hideSidebar = () => {
    dispatch({
      type: DirectoryActionTypes.CLOSE_SIDEBAR,
    });
  };
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <Hidden mdUp>
      <SwipeableDrawer
        open={showSidebar}
        onOpen={toggleSidebar}
        onClose={hideSidebar}
        transitionDuration={0}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Box bgcolor="grey.200">
          <Sidebar />
        </Box>
      </SwipeableDrawer>
    </Hidden>
  );
};

export default SidebarDrawer;
