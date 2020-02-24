import React, { useState, useContext, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import Client from '../../utils/HTTPClient';
import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';
import Profile from '../profile/profile.component';
import Tabs, { TabNames } from '../tabs/tabs.component';
import SidebarTabPanel from '../sidebar-tab-panel/sidebar-tab-panel.component';
import SearchField from '../search-field/search-field.component';
import SidebarTabPanelChats from '../sidebar-tab-panel-chats/sidebar-tab-panel-chats.component';
import SidebarTabPanelContacts from '../sidebar-tab-panel-contacts/sidebar-tab-panel-contacts.component';
import SidebarTabPanelInvites from '../sidebar-tab-panel-invites/sidebar-tab-panel-invites.component';
// import { tempChatData, tempInvitesList } from './temp_data';

const Sidebar = ({ socket, test }) => {
  const {
    state: { activeChatId },
    dispatch: directoryDispatch,
  } = useContext(directoryStore);
  const [user, setUser] = useState({
    name: 'Ultimate Legend',
    id: 1,
    avatar: {
      url: '',
      fallback: 'L',
    },
  });

  const [tab, setTab] = useState(TabNames.CHATS);
  const [isLoading, setIsLoading] = useState(true);
  const [friendsList, setFriendsList] = useState([]);
  const [chatsList, setChatsList] = useState([]);
  const [invitesList, setInvitesList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchAndSetUserData = async () => {
      const data = await Client.request('/user/data');
      console.log(data);
      const {
        friends = [],
        chatrooms = [],
        invitations = [],
        displayName = '',
        userId = '',
        language,
      } = data;
      if (isMounted) {
        setIsLoading(false);
        setChatsList(chatrooms);
        setUser({ name: displayName, id: userId });
        setFriendsList(friends);
        setInvitesList(invitations);
        directoryDispatch({ type: DirectoryActionTypes.SET_LANGUAGE, payload: language });
      }
    };
    console.log('Fetching user Data....');
    fetchAndSetUserData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const updateChatLocation = msgObject => {
      console.log('received msg in sidebar');
      const { chatId } = msgObject;
      if (chatId === activeChatId) return; // take this out when implementing statusMsg/secondary
      // updates location of chat in chatsList
      const chatroomIndex = chatsList.findIndex(chatroom => chatroom.chatId === chatId);
      if (chatroomIndex < 0) {
        // retrieve chat info from db
      } else {
        const newChatList = [...chatsList];
        newChatList.unshift(...newChatList.splice(chatroomIndex, 1));
        setChatsList(newChatList);
      }
    };

    socket.on('receiveMsg', updateChatLocation);

    return () => {
      socket.off('receiveMsg', updateChatLocation);
    };
  });

  const changeActiveChat = async chatId => {
    if (activeChatId) {
      Client.request('/chat/update/activity', 'POST', { activeChatId, userId: user.id });
    }
    let userDMRoom = chatsList.find(chat => chat.chatId === chatId);
    if (!userDMRoom) {
      userDMRoom = await Client.request(`/chat/${chatId}`);
      setChatsList([...chatsList, userDMRoom]);
    }
    directoryDispatch({
      type: DirectoryActionTypes.SET_CURRENTLY_ACTIVE,
      payload: chatId,
    });
    directoryDispatch({
      type: DirectoryActionTypes.CLOSE_SIDEBAR,
    });
  };

  const onContactClick = async friendDmId => {
    // search for existing chatroom in state
    changeActiveChat(friendDmId);
    setTab(TabNames.CHATS);
  };

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Box p={2} display="flex" flexDirection="column" overflow="hidden" maxHeight="98vh">
      <Box paddingBottom={2} flex="1">
        <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
          <Grid item>
            <Profile {...user} moreOptions={{ exists: true }} />
          </Grid>
          <Grid item>
            <Tabs value={tab} onChange={changeTab} />
          </Grid>
          <Grid item>
            <Box marginTop={1}>
              <SearchField />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box style={{ overflow: 'auto' }} flex="4">
        <SidebarTabPanel value={tab} index={TabNames.CHATS}>
          <SidebarTabPanelChats
            chatrooms={chatsList}
            userId={user.id}
            clickHandler={changeActiveChat}
          />
        </SidebarTabPanel>
        <SidebarTabPanel value={tab} index={TabNames.CONTACTS}>
          <SidebarTabPanelContacts contactList={friendsList} clickHandler={onContactClick} />
        </SidebarTabPanel>
        <SidebarTabPanel value={tab} index={TabNames.INVITES}>
          <SidebarTabPanelInvites
            profilesList={invitesList.map(
              ({ user: { _id, displayName, avatar }, ...otherArgs }) => ({
                id: _id,
                name: displayName,
                avatar,
                ...otherArgs,
              })
            )}
            socket={socket}
            currentUser={user}
          />
          {/* =====THIS IS A TEMPORARY CHANGE TO THE CODE====== */}
          {/*<SidebarTabPanelInvites
            profilesList={ invitesList }
            socket={ socket }
          />*/}
        </SidebarTabPanel>
      </Box>
    </Box>
  );
};

export default Sidebar;
