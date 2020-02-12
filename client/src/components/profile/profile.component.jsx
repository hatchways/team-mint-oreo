import React from 'react';
import { Avatar, Box, Grid, Chip, IconButton, Typography } from '@material-ui/core';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  chipStyle: {
    backgroundColor: '#3A8DFF',
    color: '#fff',
  },
}));

const Profile = (
  { name, secondary = '', notifications = 0, moreOptions = null, avatar: { url, fallback } },
  width = 400
) => {
  const classes = useStyles();
  return (
    <Box minWidth={width} maxWidth={width}>
      <Box p={2}>
        <Grid container spacing={2} alignItems="center">
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
                  <Chip label={notifications} className={classes.chipStyle} />
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
