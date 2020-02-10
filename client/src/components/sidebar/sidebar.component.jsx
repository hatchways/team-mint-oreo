import React, { useState } from 'react';
import { Box, Grid, Typography, makeStyles, withStyles } from '@material-ui/core';

import Profile from '../../components/profile/profile.component';
import { default as Tabs } from '../../components/tabs/tabs.component';
import ProfileWithBorder from '../../components/profile/profile-with-border.container';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Box>
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
        <Profile name={'name'} />
      </Grid>
      <Grid item>
        <Tabs value={tab} onChange={changeTab}></Tabs>
      </Grid>
      <Grid item>
        <TabPanel value={tab} index={'Chats'}>
          Chats
          <ProfileWithBorder name={'name'} secondaryText={'Secondary Text'} />
        </TabPanel>
        <TabPanel value={tab} index={'Contacts'}>
          Contacts
          <ProfileWithBorder name={'name'} />
        </TabPanel>
        <TabPanel value={tab} index={'Invites'}>
          Invites
          <ProfileWithBorder name={'name'} />
        </TabPanel>
      </Grid>
    </Box>
  );
};

export default Sidebar;
