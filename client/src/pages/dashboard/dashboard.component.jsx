import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { Box, Grid, Hidden } from '@material-ui/core';
import WithChatStates from '../../components/with-chat-states/with-chat-states.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import Client from '../../utils/HTTPClient';
import ChatFrame from '../../components/chat-frame/chat-frame.component';
import InviteFriendBackdrop from '../../components/invite-friend-backdrop/invite-friend-backdrop.component';
import SidebarDrawer from '../../components/sidebar/sidebar-drawer.container';
import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

const socket = io('http://localhost:3001');

const Dashboard = () => {
  const [userId, setUserId] = useState('');
  const { dispatch } = useContext(directoryStore);
  const history = useHistory();
  const handleClick = () => {
    dispatch({
      type: DirectoryActionTypes.CHANGE_ACTIVE_WINDOW,
      // currently hardcoded with my chatId
      payload: '5e471d9929ffd2366a37ea9b',
    });
  };

  useEffect(() => {
    let isMounted = true;
    const checkToken = async () => {
      const { userId: data } = await Client.request('/user/verify');
      if (data.status === 401) throw Error;
      if (isMounted) {
        socket.emit('login', { userId: data });
        setUserId(data);
      }
    };
    try {
      checkToken();
    } catch {
      history.push('/login');
    }

    return () => {
      isMounted = false;
    };
  }, []);

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
            <button onClick={handleClick}>CLICK ME</button>
            <ChatFrame socket={socket} userId={userId} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WithChatStates(Dashboard, props => props);
