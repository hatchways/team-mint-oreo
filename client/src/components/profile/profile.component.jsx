import React from 'react';
import { Avatar, Box, Grid, Paper } from '@material-ui/core';

const Profile = ({ name, secondaryText = '' }) => {
  return (
    <Box my={4}>
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar>A</Avatar>
          </Grid>
          <Grid item>
            {secondaryText === '' ? (
              name
            ) : (
              <div>
                <Grid container>{name}</Grid>
                <Grid container>secondaryText</Grid>
              </div>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
