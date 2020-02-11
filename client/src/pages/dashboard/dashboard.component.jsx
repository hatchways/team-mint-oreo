import React from 'react';
import { useTheme, Box, Grid, Typography, Container, Hidden } from '@material-ui/core';

import Sidebar from '../../components/sidebar/sidebar.component';

const Dashboard = () => {
  const theme = useTheme();
  console.log(theme);
  return (
    <Box height="100vh">
      <Box mx={2} py={2}>
        <Grid container spacing={4}>
          <Hidden smDown>
            <Grid item>
              <Box minWidth={400} maxWidth={400}>
                <Sidebar />
              </Box>
            </Grid>
          </Hidden>
          <Grid item md>
            // chat
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;