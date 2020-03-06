import React, { useState, useContext } from 'react';
import Profile from '../profile/profile.component';
import { Menu, MenuItem } from '@material-ui/core';
import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';
import Client from '../../utils/HTTPClient';

const UserProfile = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleExpand = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleUnExpand = () => {
    setAnchorEl(null);
  };

  const { dispatch } = useContext(directoryStore);

  const handleShowProfile = () => {
    dispatch({ type: DirectoryActionTypes.TOGGLE_PROFILE });
    handleUnExpand();
  };

  const handleLogout = () => {
    handleUnExpand();
    Client.request('/auth/logout').then(res => {
      console.log('logging out...', res);
      // force reload is the only way that will work
      // tried using history.push()
      // something in the router is preventing it working
      window.location.reload();
    });
  };

  return (
    <div>
      <Profile {...user} isOnline moreOptions={{ exists: true }} onClick4More={handleExpand} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleUnExpand}
      >
        <MenuItem onClick={handleShowProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserProfile;
