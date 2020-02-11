import React, { useState, useContext } from 'react';
import { Box, Grid } from '@material-ui/core';
import sizeMe from 'react-sizeme';
import { useClientRect } from '../../utils/react-utils';

import { store as userStore } from '../../store/user/user.provider';
import { store as directoryStore } from '../../store/directory/directory.provider';

import Profile from '../../components/profile/profile.component';

import { default as Tabs, TabNames } from '../../components/tabs/tabs.component';
import SidebarTabPanel from '../sidebar-tab-panel/sidebar-tab-panel.component';
import SearchField from '../search-field/search-field.component';

const Sidebar = ({ size }) => {
  const [upperRect, upperRef] = useClientRect();

  const [tab, setTab] = useState(TabNames.CHATS);
  const userState = useContext(userStore);
  console.log(`userState: `, userState);
  const directoryState = useContext(directoryStore);
  console.log(`directoryState: `, directoryState);

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  const calculateHeight = () => {
    const list = [size.height, upperRect !== null ? -upperRect.height : null];
    return list.reduce(
      (accumulator, currentElement) =>
        currentElement !== null && accumulator + Math.round(currentElement),
      0
    );
  };

  return (
    <Box p={2}>
      <Box paddingBottom={2} ref={upperRef}>
        <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
          <Grid item>
            <Profile {...userState.state} moreOptions={{ exists: true }} />
          </Grid>
          <Grid item>
            <Tabs value={tab} onChange={changeTab}></Tabs>
          </Grid>
          <Grid item>
            <Box marginTop={1}>
              <SearchField />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <SidebarTabPanel
        value={tab}
        index={TabNames.CHATS}
        profilesList={directoryState.state.commsList}
        maxHeight={calculateHeight}
      />
      <SidebarTabPanel
        value={tab}
        index={TabNames.CONTACTS}
        profilesList={directoryState.state.contactsList.map(
          ({ user: { id, name, avatar }, ...otherArgs }) => ({ id, name, avatar, ...otherArgs })
        )}
        maxHeight={calculateHeight}
      />
      <SidebarTabPanel
        value={tab}
        index={TabNames.INVITES}
        profilesList={directoryState.state.invitesList.map(
          ({ user: { id, name, avatar }, ...otherArgs }) => ({ id, name, avatar, ...otherArgs })
        )}
        maxHeight={calculateHeight}
      />
    </Box>
  );
};

export default sizeMe({ monitorHeight: true })(Sidebar);
