import React, { useState } from 'react';
import Profile from '../profile/profile.component';
import { Menu, MenuItem } from '@material-ui/core';

const UserProfile = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleExpand = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleUnExpand = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleUnExpand}>Profile</MenuItem>
        <MenuItem onClick={handleUnExpand}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserProfile;
