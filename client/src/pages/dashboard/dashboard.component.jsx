import React, { useState, useContext, useEffect, useMemo, useRef } from 'react';
import io from 'socket.io-client';
import { Box, Grid, Hidden } from '@material-ui/core';
import WithChatStates from '../../components/with-chat-states/with-chat-states.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import ChatFrame from '../../components/chat-frame/chat-frame.component';
import InviteFriendBackdrop from '../../components/invite-friend-backdrop/invite-friend-backdrop.component';
import GroupChatBackdrop from '../../components/group-chat-backdrop/group-chat-backdrop.component';
import SidebarDrawer from '../../components/sidebar/sidebar-drawer.container';
import ProfileBackdrop from '../../components/profile-backdrop/profile-backdrop.component';
import SnackbarMessage from '../../components/snackbar-message/snackbar-message.component';

const socket = io('http://localhost:3001');

const Dashboard = ({ userId, snackbar }) => {
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const queueRef = useRef([]);
  useEffect(() => {
    socket.emit('login', { userId });

    if(snackbar.message) queueRef.current.push(snackbar);
    if(open) {
      setOpen(false);
    } else {
      processQueue();
    }

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const memoSocket = useMemo(() => socket, []);

  const processQueue = () => {
    if(queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleExited = () => {
    processQueue();
  }

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
      <SnackbarMessage
        messageInfo={messageInfo}
        open={open}
        handleExited={handleExited}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default WithChatStates(Dashboard, props => props);
