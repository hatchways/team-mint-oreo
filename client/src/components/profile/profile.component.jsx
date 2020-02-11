import React from 'react';
import { Avatar, Box, Grid, Paper, chip, Chip } from '@material-ui/core';

const Profile = ({ name, secondaryText = '', notifications = 0 }) => {
  return (
    <Box>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar>A</Avatar>
          </Grid>
          <Grid item xs>
            {secondaryText === '' ? (
              name
            ) : (
              <div>
                <Grid container direction="column">
                  <Grid item>{name}</Grid>
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
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
