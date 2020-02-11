import React from 'react';
import { Box, Grid, Switch, Typography, FormControlLabel, IconButton } from '@material-ui/core';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

const ChatHeader = ({ getChildRect }) => {
  // get child bound used by parnt to pass a ref down
  return (
    <Box boxShadow={1} py={3} px={5} ref={getChildRect}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
            <Grid item>
              <Typography>UserName</Typography>
            </Grid>
            <Grid item>Online</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    // checked={state.checkedA}
                    // onChange={handleChange('checkedA')}
                    value="checkedA"
                  />
                }
                label="Original"
              />
            </Grid>
            <Grid item>
              <IconButton>
                <MoreHoriz />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatHeader;
