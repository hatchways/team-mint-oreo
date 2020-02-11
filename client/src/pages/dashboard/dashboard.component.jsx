import React from 'react';
import { useTheme, Box, Grid, Typography, Container, Hidden } from '@material-ui/core';

import Sidebar from '../../components/sidebar/sidebar.component';

const Dashboard = () => {
  const theme = useTheme();
  console.log(theme);
  return (
    <Box>
      <Box>
        <Grid container spacing={4} alignItems="stretch">
          <Hidden smDown>
            <Grid item>
              <Box minWidth={450} maxWidth={450} minHeight={'99vh'} bgcolor="grey.200">
                <Sidebar />
              </Box>
            </Grid>
          </Hidden>
          <Grid item md>
            <Box minHeight={'99vh'}>asdf</Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
