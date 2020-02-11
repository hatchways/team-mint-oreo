import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';

import Profile from '../../components/profile/profile.component';
import ProfileWithBorder from '../../components/profile/profile-with-border.container';

import { default as Tabs } from '../../components/tabs/tabs.component';
import TabPanel from '../tabs-panel/tabs-panel.component';
import SearchField from '../search-field/search-field.component';

const Sidebar = () => {
  const [tab, setTab] = useState('Chats');

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box p={2}>
      <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
        <Grid item>
          <Profile name={'name'} moreOptions={{ exists: true }} />
        </Grid>
        <Grid item>
          <Tabs value={tab} onChange={changeTab}></Tabs>
        </Grid>
        <Grid item>
          <Box marginTop={1}>
            <SearchField />
          </Box>
        </Grid>
        <Grid item>
          <TabPanel value={tab} index={'Chats'}>
            <ProfileWithBorder name={'name'} secondaryText={'Secondary Text'} notifications={2} />
          </TabPanel>
          <TabPanel value={tab} index={'Contacts'}>
            <ProfileWithBorder name={'contact 1'} />
          </TabPanel>
          <TabPanel value={tab} index={'Invites'}>
            <ProfileWithBorder name={'invite 1'} />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sidebar;
