import React, { useContext } from 'react';
import { Backdrop, Card, Typography, ClickAwayListener } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

import { useStyles } from './settings-backdrop.styles';

const SettingsBackdrop = () => {
  const classes = useStyles();
  const {
    state: { showProfile },
    dispatch,
  } = useContext(directoryStore);

  const handleClose = () => {
    dispatch({ type: DirectoryActionTypes.CLOSE_PROFILE });
  };

  return (
    <Backdrop className={classes.backdrop} open={showProfile}>
      {showProfile && (
        <ClickAwayListener onClickAway={handleClose}>
          <Card>
            <Typography>Text</Typography>
          </Card>
        </ClickAwayListener>
      )}
    </Backdrop>
  );
};

export default SettingsBackdrop;
