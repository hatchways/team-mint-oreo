import React from 'react';
import { Box, Grid, Hidden } from '@material-ui/core';
import WithChatStates from '../../components/with-chat-states/with-chat-states.component';

import Sidebar from '../../components/sidebar/sidebar.component';
import ChatFrame from '../../components/chat-frame/chat-frame.component';
import InviteFriendBackdrop from '../../components/invite-friend-backdrop/invite-friend-backdrop.component';

const Dashboard = () => {
  return (
    <Box>
      <InviteFriendBackdrop />
      <Box>
        <Grid container spacing={0} alignItems="stretch">
          <Hidden smDown>
            <Grid item>
              <Box minWidth={450} maxWidth={450} minHeight={'100vh'} bgcolor="grey.200">
                <Sidebar />
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md>
            <Box minHeight={'100vh'}>
              <ChatFrame />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WithChatStates(Dashboard, props => props);
