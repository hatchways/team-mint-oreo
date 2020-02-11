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
import { useEffect } from 'react';

const Sidebar = ({ size }) => {
  const [upperRect, upperRef] = useClientRect();
  const [height, setHeight] = useState(0);

  const [tab, setTab] = useState(TabNames.CHATS);
  const userState = useContext(userStore);
  const directoryState = useContext(directoryStore);

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    const list = [size.height, upperRect !== null ? -upperRect.height : null, -60];
    console.log('list', list);
    const sum = list.reduce(
      (accumulator, currentElement) =>
        currentElement !== null && accumulator + Math.round(currentElement),
      0
    );

    console.log('sum', sum);
    setHeight(sum);
  }, [upperRect, size]);

  return (
    <Box p={2} paddingBottom={0} height={'98vh'}>
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
      <Box minHeight={height} maxHeight={height} style={{ overflow: 'auto' }}>
        <SidebarTabPanel
          value={tab}
          index={TabNames.CHATS}
          profilesList={directoryState.state.commsList}
        />
        <SidebarTabPanel
          value={tab}
          index={TabNames.CONTACTS}
          profilesList={directoryState.state.contactsList.map(
            ({ user: { id, name, avatar }, ...otherArgs }) => ({ id, name, avatar, ...otherArgs })
          )}
        />
        <SidebarTabPanel
          value={tab}
          index={TabNames.INVITES}
          profilesList={directoryState.state.invitesList.map(
            ({ user: { id, name, avatar }, ...otherArgs }) => ({ id, name, avatar, ...otherArgs })
          )}
        />
      </Box>
    </Box>
  );
};

export default sizeMe({ monitorHeight: true })(Sidebar);
