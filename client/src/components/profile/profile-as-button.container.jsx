import React, { useState, useEffect } from 'react';
import { CardActionArea, Box } from '@material-ui/core';

import Profile from './profile.component';
import { useStyles } from './profile.styles';

const ProfileAsButton = ({ id, handleClick, isActive = false, ...props }) => {
  const classes = useStyles();

  const { selected, unselected } = classes;
  return (
    <CardActionArea onClick={handleClick} disableTouchRipple className={` ${classes.rounded}`}>
      <Box className={`${isActive ? selected : unselected} ${classes.pad10}  ${classes.rounded}`}>
        <Profile {...props} />
      </Box>
    </CardActionArea>
  );
};
export default ProfileAsButton;
