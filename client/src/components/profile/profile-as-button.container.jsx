import React, { useContext, useState, useEffect } from 'react';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

import { Card, CardActionArea, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Profile from './profile.component';

const useStyles = makeStyles(theme => ({
  unselected: {
    backgroundColor: '#F5F8FA',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  selected: {
    backgroundColor: '#fff',
  },
  rounded: {
    borderRadius: 16,
  },
  padddd: {
    padding: 10,
  },
}));

const ProfileAsButton = ({ id, ...props }) => {
  const classes = useStyles();
  const [className, setClassName] = useState(classes.unselected);
  const { state: directoryState, dispatch } = useContext(directoryStore);

  useEffect(() => {
    if (directoryState.currentlyActive != null && directoryState.currentlyActive == id.toString())
      setClassName(classes.selected);
    else setClassName(classes.unselected);
  }, [directoryState.currentlyActive]);

  const handleClick = event => {
    dispatch({
      type: DirectoryActionTypes.SET_CURRENTLY_ACTIVE,
      payload: event.currentTarget.id,
    });
  };

  return (
    <CardActionArea
      onClick={handleClick}
      id={id}
      disableTouchRipple
      className={` ${classes.rounded}`}
      disableElevation
    >
      <Box className={`${className} ${classes.padddd}  ${classes.rounded}`}>
        <Profile {...props} id={id} />
      </Box>
    </CardActionArea>
  );
};
export default ProfileAsButton;
