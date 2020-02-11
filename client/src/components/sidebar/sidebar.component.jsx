import React, { useState, useContext } from 'react';
import { Box, Grid } from '@material-ui/core';

import { store as userStore } from '../../store/user/user.provider';
import { store as directoryStore } from '../../store/directory/directory.provider';

import Profile from '../../components/profile/profile.component';
import ProfileWithBorder from '../../components/profile/profile-with-border.container';

import { default as Tabs, TabNames } from '../../components/tabs/tabs.component';
import TabPanel from '../tabs-panel/tabs-panel.component';
import SearchField from '../search-field/search-field.component';

const Sidebar = () => {
  const [tab, setTab] = useState(TabNames.CHATS);
  const userState = useContext(userStore);
  console.log(`userState: `, userState);
  const directoryState = useContext(directoryStore);
  console.log(`directoryState: `, directoryState);

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
          <TabPanel value={tab} index={TabNames.CHATS}>
            <ProfileWithBorder name={'name'} secondaryText={'Secondary Text'} notifications={2} />
          </TabPanel>
          <TabPanel value={tab} index={TabNames.CONTACTS}>
            <ProfileWithBorder name={'contact 1'} />
          </TabPanel>
          <TabPanel value={tab} index={TabNames.INVITES}>
            <ProfileWithBorder name={'invite 1'} />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sidebar;
