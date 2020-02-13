import React from 'react';
import { Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Profile from './profile.component';

const useStyles = makeStyles(theme => ({
  componentStyle: {
    borderRadius: 16,
    backgroundColor: 'white',
  },
}));

const ProfileWithBorder = ({ ...props }) => {
  const classes = useStyles();
  return (
    <Box className={classes.componentStyle}>
      <Profile {...props} />
    </Box>
  );
};

export default ProfileWithBorder;
