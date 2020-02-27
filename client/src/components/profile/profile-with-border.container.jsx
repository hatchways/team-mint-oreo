import React from 'react';
import { Box } from '@material-ui/core';

import Profile from './profile.component';
import { useStyles } from './profile.styles';

const ProfileWithBorder = ({ ...props }) => {
  const classes = useStyles();
  return (
    <Box className={classes.componentStyle}>
      <Profile {...props} />
    </Box>
  );
};

export default ProfileWithBorder;
