import React, { useState, useEffect } from 'react';
import { Box, Grid, Hidden } from '@material-ui/core';
import WithChatStates from '../../components/with-chat-states/with-chat-states.component';
import Client from '../../utils/HTTPClient';
import Sidebar from '../../components/sidebar/sidebar.component';
import ChatFrame from '../../components/chat-frame/chat-frame.component';
import InviteFriendBackdrop from '../../components/invite-friend-backdrop/invite-friend-backdrop.component';

const Dashboard = () => {
  const [tokenVerified, setTokenVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const checkToken = async () => {
      const isVerified = await Client.request('/user/verify');
      // TODO: handle error for isVerified
      if (isMounted) {
        await setTokenVerified(isVerified);
        setIsLoading(false);
      }
    };
    checkToken();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box>
      {!isLoading && tokenVerified && (
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
      )}
    </Box>
  );
};

export default WithChatStates(Dashboard, props => props);
