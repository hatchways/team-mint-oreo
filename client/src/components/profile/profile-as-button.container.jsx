import React, { useContext, useState, useEffect } from 'react';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

import { Card, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Profile from './profile.component';

const useStyles = makeStyles(theme => ({
  unselected: {
    backgroundColor: '#f3f5f3',
  },
  selected: {
    backgroundColor: '#fff',
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
    <Card className={className}>
      <CardActionArea onClick={handleClick} id={id} disableTouchRipple>
        <Profile {...props} id={id} />
      </CardActionArea>
    </Card>
  );
};
export default ProfileAsButton;
