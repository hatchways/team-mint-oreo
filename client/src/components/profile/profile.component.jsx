import React from 'react';
import { Avatar, Box, Grid, Chip, IconButton, Typography } from '@material-ui/core';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

const Profile = (
  { name, secondary = '', notifications = 0, moreOptions = null, avatar: { url, fallback } },
  width = 400
) => {
  return (
    <Box minWidth={width} maxWidth={width}>
      <Box p={2} bgcolor="grey.100">
        <Grid container spacing={2}>
          <Grid item>
            <Avatar {...{ src: url, alt: name }}>{fallback}</Avatar>
          </Grid>
          <Grid item xs>
            {secondary === '' ? (
              <Typography>{name}</Typography>
            ) : (
              <div>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>{name}</Typography>
                  </Grid>
                  <Grid item>{secondary}</Grid>
                </Grid>
              </div>
            )}
          </Grid>
          {notifications > 0 && (
            <Grid item xs={1}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Chip label={notifications} />
                </Grid>
              </Grid>
            </Grid>
          )}
          {moreOptions !== null && (
            <Grid item xs={2}>
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
