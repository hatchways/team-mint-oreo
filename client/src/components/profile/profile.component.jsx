import React from 'react';
import { Avatar, Box, Grid, Paper } from '@material-ui/core';

const Profile = () => {
  return (
    <Box my={4}>
      <Paper>
        <Box m={2}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar>N</Avatar>
            </Grid>
            <Grid item>Name</Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
