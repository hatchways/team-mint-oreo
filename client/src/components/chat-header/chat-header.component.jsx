import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Switch, Typography, FormControlLabel, IconButton } from '@material-ui/core';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { store as directoryStore } from '../../store/directory/directory.provider';

const ChatHeader = () => {
  const {
    state: { currentlyActive, commsList },
  } = useContext(directoryStore);

  const [title, setTitle] = useState('Group Chat');

  useEffect(() => {
    console.log(commsList);
    if (commsList !== null && currentlyActive != null) {
      console.log(currentlyActive);
      const found = commsList.find(e => e.id == currentlyActive);
      console.log(found);
      setTitle(found.name);
    }
  }, [currentlyActive]);

  return (
    <Box boxShadow={1} py={3} px={5}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
            <Grid item>
              <Typography>{title}</Typography>
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
