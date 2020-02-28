import React, { useContext, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import { Box, Grid, Hidden } from '@material-ui/core';
import WithChatStates from '../../components/with-chat-states/with-chat-states.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import ChatFrame from '../../components/chat-frame/chat-frame.component';
import InviteFriendBackdrop from '../../components/invite-friend-backdrop/invite-friend-backdrop.component';
import GroupChatBackdrop from '../../components/group-chat-backdrop/group-chat-backdrop.component';
import SidebarDrawer from '../../components/sidebar/sidebar-drawer.container';
import ProfileBackdrop from '../../components/profile-backdrop/profile-backdrop.component';

const socket = io();

const Dashboard = ({ userId }) => {
  useEffect(() => {
    socket.emit('login', { userId });
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const memoSocket = useMemo(() => socket, []);

  return (
    <Box>
      <SidebarDrawer socket={memoSocket} />
      <InviteFriendBackdrop socket={memoSocket} userId={userId} />
      <GroupChatBackdrop socket={memoSocket} userId={userId} />
      <ProfileBackdrop socket={memoSocket} />
      <Box>
        <Grid container spacing={0} alignItems="stretch">
          <Hidden smDown>
            <Grid item>
              <Box minWidth={450} maxWidth={450} minHeight="100vh" bgcolor="grey.200">
                <Sidebar socket={memoSocket} />
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md>
            <ChatFrame socket={memoSocket} userId={userId} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WithChatStates(Dashboard, props => props);
