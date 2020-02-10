import React, { useState } from 'react';
import { Box, Grid, Typography, makeStyles, withStyles } from '@material-ui/core';

import Profile from '../../components/profile/profile.component';
import { default as Tabs } from '../../components/tabs/tabs.component';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const Sidebar = () => {
  const [tab, setTab] = useState('Chats');

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Grid item>
        <Profile />
      </Grid>
      <Grid item>
        <Tabs value={tab} onChange={changeTab}></Tabs>
      </Grid>
      <Grid item>
        <TabPanel value={tab} index={'Chats'}>
          Chats
        </TabPanel>
        <TabPanel value={tab} index={'Contacts'}>
          Contacts
        </TabPanel>
        <TabPanel value={tab} index={'Invites'}>
          Invites
        </TabPanel>
      </Grid>
    </Box>
  );
};

export default Sidebar;
