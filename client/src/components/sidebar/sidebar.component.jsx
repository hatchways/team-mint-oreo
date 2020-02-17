import React, { useState, useContext, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import sizeMe from 'react-sizeme';
import { useClientRect } from '../../utils/react-utils';

import { store as directoryStore } from '../../store/directory/directory.provider';

import Profile from '../../components/profile/profile.component';

import { default as Tabs, TabNames } from '../../components/tabs/tabs.component';
import SidebarTabPanel from '../sidebar-tab-panel/sidebar-tab-panel.component';
import SearchField from '../search-field/search-field.component';
import SidebarTabPanelChats from '../sidebar-tab-panel-chats/sidebar-tab-panel-chats.component';
import SidebarTabPanelContacts from '../sidebar-tab-panel-contacts/sidebar-tab-panel-contacts.component';
import SidebarTabPanelInvites from '../sidebar-tab-panel-invites/sidebar-tab-panel-invites.component';
import { tempChatData, tempInvitesList } from './temp_data';

const Sidebar = ({ size, socket }) => {
  const [upperRect, upperRef] = useClientRect();
  const [height, setHeight] = useState(0);

  const [tab, setTab] = useState(TabNames.CHATS);
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

  const [user, setUser] = useState({
    name: 'Ultimate Legend',
    id: 1,
    avatar: {
      url: '',
      fallback: 'L',
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [friendsList, setFriendsList] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [chatsList, setChatsList] = useState(tempChatData);
  const [invitesList, setInvitesList] = useState(tempInvitesList);

  const fetchUserData = async () => {
    const response = await fetch('user/data');
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    // mounting point.
    console.log('Fetching user Data....');
    fetchUserData().then(data => {
      console.log(data);
      setFriendsList(data.friends.friends);
      // TODO: replace placeholder later
      setChatsList([...chatsList, ...data.chats]);
      setIsLoading(false);
      console.log('friendsLIst', data.friends.friends);
      setUser({
        ...user,
        id: data.id,
      });
      console.log('user', {
        ...user,
        id: data.id,
      });
    });
    socket.on('userOnline', userId => {
      setOnlineFriends([...onlineFriends, userId]);
    });
    socket.on('receiveMsg', incommingMessage => {
      const chatId = incommingMessage.chatId;
      // using original text for now. crop to first 16 characters
      const msgText = incommingMessage.originalText;
      const secondary = msgText.length > 15 ? `${msgText.subString(0, 13)}...` : msgText;
      setChatsList([...chatsList], {
        ...chatsList.find(chatRoom => chatRoom.id === chatId),
        secondary,
      });
    });
  }, []);

  return (
    <Box p={2} paddingBottom={0} height={'98vh'}>
      <Box paddingBottom={2} ref={upperRef}>
        <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
          <Grid item>
            <Profile {...user} moreOptions={{ exists: true }} />
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
        <SidebarTabPanel value={tab} index={TabNames.CHATS}>
          <SidebarTabPanelChats profilesList={chatsList} />
        </SidebarTabPanel>
        <SidebarTabPanel value={tab} index={TabNames.CONTACTS}>
          <SidebarTabPanelContacts
            user={user}
            profilesList={
              !isLoading &&
              friendsList.map(({ _id, displayName }) => ({
                id: _id,
                name: displayName,
                avatar: {
                  url: '',
                  fallback: displayName[0].toUpperCase(),
                },
                isOnline: onlineFriends.includes(_id),
              }))
            }
          />
        </SidebarTabPanel>
        <SidebarTabPanel value={tab} index={TabNames.INVITES}>
          <SidebarTabPanelInvites
            profilesList={invitesList.map(({ user: { id, name, avatar }, ...otherArgs }) => ({
              id,
              name,
              avatar,
              ...otherArgs,
            }))}
          />
        </SidebarTabPanel>
      </Box>
    </Box>
  );
};

export default sizeMe({ monitorHeight: true })(Sidebar);
