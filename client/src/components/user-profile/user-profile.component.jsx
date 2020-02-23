import React, { useState, useContext } from 'react';
import Profile from '../profile/profile.component';
import { Menu, MenuItem } from '@material-ui/core';
import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

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

  return (
    <div>
      <Profile {...user} moreOptions={{ exists: true }} onClick4More={handleExpand} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleUnExpand}
      >
        <MenuItem onClick={handleShowProfile}>Profile</MenuItem>
        <MenuItem onClick={handleUnExpand}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserProfile;
