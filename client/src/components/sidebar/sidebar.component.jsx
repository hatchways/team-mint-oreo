import React, { useState, useContext, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import sizeMe from 'react-sizeme';
import { useClientRect } from '../../utils/react-utils';

import { store as userStore } from '../../store/user/user.provider';
import { store as directoryStore } from '../../store/directory/directory.provider';

import Profile from '../../components/profile/profile.component';

import { default as Tabs, TabNames } from '../../components/tabs/tabs.component';
import SidebarTabPanel from '../sidebar-tab-panel/sidebar-tab-panel.component';
import SearchField from '../search-field/search-field.component';
import WithSocket from '../with-socket/with-socket.component';

const Sidebar = ({ size }) => {
  const [upperRect, upperRef] = useClientRect();
  const [height, setHeight] = useState(0);

  const [tab, setTab] = useState(TabNames.CHATS);
  const { state: userState } = useContext(userStore);
  const { state: directoryState } = useContext(directoryStore);

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    const list = [size.height, upperRect !== null ? -upperRect.height : null, -60];
    const sum = list.reduce(
      (accumulator, currentElement) =>
        currentElement !== null && accumulator + Math.round(currentElement),
      0
    );

    setHeight(sum);
  }, [upperRect, size]);

  return (
    <Box p={2} paddingBottom={0} height={'98vh'}>
      <Box paddingBottom={2} ref={upperRef}>
        <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
          <Grid item>
            <Profile {...userState} moreOptions={{ exists: true }} />
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
          profilesList={directoryState.commsList}
        />
        <SidebarTabPanel
          value={tab}
          index={TabNames.CONTACTS}
          profilesList={directoryState.contactsList.map(
            ({ user: { id, name, avatar }, ...otherArgs }) => ({ id, name, avatar, ...otherArgs })
          )}
        />
        <SidebarTabPanel
          value={tab}
          index={TabNames.INVITES}
          profilesList={directoryState.invitesList.map(
            ({ user: { id, name, avatar }, ...otherArgs }) => ({ id, name, avatar, ...otherArgs })
          )}
        />
      </Box>
    </Box>
  );
};

export default WithSocket(sizeMe({ monitorHeight: true })(Sidebar));
