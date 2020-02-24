import React, { useState, useContext, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import sizeMe from 'react-sizeme';
import { useClientRect } from '../../utils/react-utils';
import Client from '../../utils/HTTPClient';
import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';
import Tabs, { TabNames } from '../tabs/tabs.component';
import SidebarTabPanel from '../sidebar-tab-panel/sidebar-tab-panel.component';
import SearchField from '../search-field/search-field.component';
import SidebarTabPanelChats from '../sidebar-tab-panel-chats/sidebar-tab-panel-chats.component';
import SidebarTabPanelContacts from '../sidebar-tab-panel-contacts/sidebar-tab-panel-contacts.component';
import SidebarTabPanelInvites from '../sidebar-tab-panel-invites/sidebar-tab-panel-invites.component';
import UserProfile from '../user-profile/user-profile.component';
// import { tempChatData, tempInvitesList } from './temp_data';

const Sidebar = ({ size, socket }) => {
  const [upperRect, upperRef] = useClientRect();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const list = [size.height, upperRect !== null ? -upperRect.height : null, -60];
    const sum = list.reduce(
      (accumulator, currentElement) =>
        currentElement !== null && accumulator + Math.round(currentElement),
      0
    );

    setHeight(sum);
  }, [upperRect, size]);

  const { dispatch } = useContext(directoryStore);
  const [user, setUser] = useState({
    name: 'Ultimate Legend',
    id: 1,
    avatar: '',
  });

  const [tab, setTab] = useState(TabNames.CHATS);
  const [isLoading, setIsLoading] = useState(true);
  const [friendsList, setFriendsList] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [chatsList, setChatsList] = useState([]);
  const [invitesList, setInvitesList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchAndSetUserData = async () => {
      console.log('fired');
      const data = await Client.request('/user/data');
      console.log(data);
      const {
        friends = [],
        chatrooms = [],
        invitations = [],
        displayName = '',
        avatar = '',
        userId = '',
        language,
      } = data;
      if (isMounted) {
        setFriendsList(friends);
        setChatsList(generateImagedChatrooms(chatrooms, userId));
        setInvitesList(invitations);
        setIsLoading(false);
        setUser({ name: displayName, id: userId, avatar });
        dispatch({ type: DirectoryActionTypes.SET_LANGUAGE, payload: language });
      }
    };
    console.log('Fetch user Data....');
    fetchAndSetUserData();

    const generateImagedChatrooms = (chatrooms, userId) => {
      return chatrooms.map(room => {
        if (room.isDM)
          return {
            ...room,
            avatar: room.users[0].userId === userId ? room.users[1].avatar : room.users[0].avatar,
          };
        else return room;
      });
    };

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    socket.on('userOnline', userId => {
      setOnlineFriends([...onlineFriends, userId]);
    });
    // socket.on('receiveMsg', incommingMessage => {
    //   const { chatId } = chatId;
    //   // using original text for now. crop to first 16 characters
    //   const msgText = incommingMessage.originalText;
    //   const secondary = msgText.length > 15 ? `${msgText.substring(0, 13)}...` : msgText;
    //   setChatsList([...chatsList], {
    //     ...chatsList.find(chatRoom => chatRoom.id === chatId),
    //     secondary,
    //   });
    // });
  });

  const onContactClick = async friendDmId => {
    console.log(friendDmId);
    // search for existing chatroom in state
    let userDMRoom = chatsList.find(chat => chat.id === friendDmId);
    if (!userDMRoom) {
      userDMRoom = await Client.request('/endpointthatgetsdmroom');
    }

    setTab(TabNames.CHATS);
    dispatch({ type: DirectoryActionTypes.SET_CURRENTLY_ACTIVE, payload: userDMRoom.chatId });
    console.log('USER DM ROOM', userDMRoom);
  };

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box p={2} paddingBottom={0} height={'98vh'}>
      <Box paddingBottom={2} ref={upperRef}>
        <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
          <Grid item>
            <UserProfile user={user} />
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
          <SidebarTabPanelChats chatrooms={chatsList} userId={user.id} />
        </SidebarTabPanel>
        <SidebarTabPanel value={tab} index={TabNames.CONTACTS}>
          <SidebarTabPanelContacts contactList={friendsList} clickHandler={onContactClick} />
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
