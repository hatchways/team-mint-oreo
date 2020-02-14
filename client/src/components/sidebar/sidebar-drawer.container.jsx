import React, { useContext } from 'react';
import { Hidden, Drawer, ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Sidebar from './sidebar.component';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

const SidebarDrawer = () => {
  const {
    state: { showSidebar },
    dispatch,
  } = useContext(directoryStore);

  const hideSidebar = () => {
    dispatch({
      type: DirectoryActionTypes.CLOSE_SIDEBAR,
    });
  };

  return (
    <Hidden mdUp>
      <Drawer open={showSidebar}>
        <ClickAwayListener onClickAway={hideSidebar}>
          <Sidebar />
        </ClickAwayListener>
      </Drawer>
    </Hidden>
  );
};

export default SidebarDrawer;
