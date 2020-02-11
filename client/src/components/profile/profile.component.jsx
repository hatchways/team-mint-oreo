import React from 'react';
import { Avatar, Box, Grid, Chip, IconButton, Typography } from '@material-ui/core';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

const Profile = ({ name, secondaryText = '', notifications = 0, moreOptions = null }) => {
  return (
    <Box>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar>A</Avatar>
          </Grid>
          <Grid item xs>
            {secondaryText === '' ? (
              <Typography>{name}</Typography>
            ) : (
              <div>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>{name}</Typography>
                  </Grid>
                  <Grid item>{secondaryText}</Grid>
                </Grid>
              </div>
            )}
          </Grid>
          {notifications > 0 && (
            <Grid item xs>
              <Grid container justify="flex-end">
                <Grid item>
                  <Chip label={notifications} />
                </Grid>
              </Grid>
            </Grid>
          )}
          {moreOptions !== null && (
            <Grid item xs>
              <Grid container justify="flex-end">
                <Grid item>
                  <IconButton>
                    <MoreHoriz />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
