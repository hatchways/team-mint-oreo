import React from 'react';
import io from 'socket.io-client';
import { Box, Grid, Hidden, Container } from '@material-ui/core';
import WithChatStates from '../../components/with-chat-states/with-chat-states.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import ChatFrame from '../../components/chat-frame/chat-frame.component';
import InviteFriendBackdrop from '../../components/invite-friend-backdrop/invite-friend-backdrop.component';
import SidebarDrawer from '../../components/sidebar/sidebar-drawer.container';

const socket = io('http://localhost:3001');

const Dashboard = () => {
  console.log('indashboard');
  return (
    <Box>
      <SidebarDrawer />
      <InviteFriendBackdrop />
      <Box>
        <Grid container spacing={0} alignItems="stretch">
          <Hidden smDown>
            <Grid item>
              <Box minWidth={450} maxWidth={450} minHeight="100vh" bgcolor="grey.200">
                <Sidebar socket={socket} />
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md>
            <ChatFrame socket={socket} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WithChatStates(Dashboard, props => props);
