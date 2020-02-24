import React, { useContext, useEffect, useState } from 'react';
import { Backdrop, Card, Grid, ClickAwayListener, Box, Avatar } from '@material-ui/core';
import Client from '../../utils/HTTPClient';
import Uploader from '../uploader/uploader.component';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

import { useStyles } from './profile-backdrop.styles';

const ProfileBackdrop = () => {
  const classes = useStyles();
  const {
    state: { showProfile },
    dispatch,
  } = useContext(directoryStore);

  const handleClose = () => {
    dispatch({ type: DirectoryActionTypes.CLOSE_PROFILE });
  };

  const [avatar, setAvatar] = useState();
  useEffect(() => {
    Client.request(`/user/avatar`)
      .then(res => {
        setAvatar(res);
        console.log(res);
      })
      .catch(err => {
        console.log('Load Avatar Error: ', err);
      });
    // run this only once.
  }, []);

  return (
    <Backdrop className={classes.backdrop} open={showProfile}>
      {showProfile && (
        <ClickAwayListener onClickAway={handleClose}>
          <Card>
            <Box className={classes.padBox}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                  <h1>Profile & settings </h1>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Avatar url={avatar} className={classes.avatarLarge} />
                    </Grid>
                    <Grid xs>
                      <Uploader />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </ClickAwayListener>
      )}
    </Backdrop>
  );
};

export default ProfileBackdrop;
