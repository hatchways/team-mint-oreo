import React, { useContext, useEffect, useReducer } from 'react';
import { Box, Grid } from '@material-ui/core';
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

const initialState = {
  isLoading: true,
  user: { name: '', id: '' },
  avatar: { url: '', fallback: 'L' },
  friendsList: [],
  chatsList: [],
  invitesList: [],
  tab: TabNames.CHATS,
};

const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'IS_LOADING':
      return { ...state, isLoading: true };
    case 'DONE_LOADING':
      return { ...state, isLoading: false };
    case 'SET_INITIAL_DATA': {
      const { friends, chatrooms, invitations, displayName, userId, avatar } = payload;
      return {
        ...state,
        friendsList: friends,
        chatsList: chatrooms,
        invitesList: invitations,
        user: { name: displayName, id: userId, avatar },
      };
    }
    case 'SET_USER':
      return { ...state, user: payload };
    case 'SET_FRIENDS':
      return { ...state, friendsList: payload };
    case 'SET_CHATS':
      return { ...state, chatsList: payload };
    case 'SET_INVITES':
      return { ...state, invitesList: payload };
    case 'SET_TAB':
      return { ...state, tab: payload };
    case 'ADD_CHAT_TO_END':
      return { ...state, chatsList: [...state.chatsList, payload] };
    case 'ADD_CHAT_TO_START':
      return { ...state, chatsList: [payload, ...state.chatsList] };
    default:
      throw new Error();
  }
};

const Sidebar = ({ socket }) => {
  const {
    state: { activeChatId },
    dispatch: directoryDispatch,
  } = useContext(directoryStore);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { friendsList, chatsList, invitesList, user, tab } = state;

  useEffect(() => {
    let isMounted = true;
    const fetchAndSetUserData = async () => {
      const data = await Client.request('/user/data');
      console.log(data);
      if (isMounted) {
        dispatch({ type: 'SET_INITIAL_DATA', payload: data });
        directoryDispatch({ type: DirectoryActionTypes.SET_LANGUAGE, payload: data.language });
        dispatch({ type: 'DONE_LOADING' });
      }
    };

    try {
      console.log('Fetching user Data....');
      fetchAndSetUserData();
    } catch (err) {
      // TODO: handle error: 403, 500
      dispatch({ type: 'DONE_LOADING' });
    }
    return () => {
      isMounted = false;
    };
  }, [directoryDispatch]);

  useEffect(() => {
    const updateChatLocation = async msgObject => {
      console.log('received msg in sidebar');
      const { chatId } = msgObject;
      if (chatId === activeChatId) return; // take this out when implementing statusMsg/secondary
      // updates location of chat in chatsList
      const chatroomIndex = chatsList.findIndex(chatroom => chatroom.chatId === chatId);
      if (chatroomIndex < 0) {
        const chatroom = await Client.request(`/chat/data/${chatId}`);
        dispatch({ type: 'ADD_CHAT_TO_END', payload: chatroom });
      } else {
        chatsList[chatroomIndex].unreadMessages += 1;
        const newChatList = [...chatsList];
        newChatList.unshift(...newChatList.splice(chatroomIndex, 1));
        dispatch({ type: 'SET_CHATS', payload: newChatList });
      }
    };

    const updateFriendsProfilePic = msgObject => {
      console.log('updateFriendProfilePic', msgObject);
      const { friendId, profilePic } = msgObject;

      let oldAvatar = '@.-1';
      const newFriendsList = friendsList.map(friend => {
        let avatar = friend.avatar;
        if (friend._id === friendId) {
          oldAvatar = avatar;
          avatar = profilePic;
        }
        return {
          ...friend,
          avatar,
        };
      });
      dispatch({ type: 'SET_FRIENDS', payload: newFriendsList });
      // need to update chatrooms where this specific profile avatar was used
      const newChatroomsList = chatsList.map(room => ({
        ...room,
        avatar: room.avatar === oldAvatar ? profilePic : room.avatar,
      }));
      dispatch({ type: 'SET_CHATS', payload: newChatroomsList });
    };

    const updateUserAvatar = msgObject => {
      console.log('updateOwnProfilePic', msgObject);
      const { profilePic } = msgObject;
      dispatch({ type: 'SET_USER', payload: { ...user, avatar: profilePic } });
    };

    socket.on('receiveMsg', updateChatLocation);
    socket.on('updateOwnProfilePic', updateUserAvatar);
    socket.on('updateFriendProfilePic', updateFriendsProfilePic);

    return () => {
      socket.off('receiveMsg', updateChatLocation);
      socket.off('updateOwnProfilePic', updateUserAvatar);
      socket.off('updateFriendProfilePic', updateFriendsProfilePic);
    };
  }, []);

  const changeActiveChat = async chatId => {
    Client.updateChatActivity(user.id, activeChatId);
    let retrievedChat = chatsList.find(chat => chat.chatId === chatId);
    if (!retrievedChat) {
      retrievedChat = await Client.request(`/chat/data/${chatId}`);
      dispatch({ type: 'ADD_CHAT_TO_END', payload: retrievedChat });
    } else {
      retrievedChat.unreadMessages = 0;
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
    changeActiveChat(friendDmId);
    dispatch({ type: 'SET_TAB', payload: TabNames.CHATS });
  };

  const changeTab = (event, newValue) => {
    dispatch({ type: 'SET_TAB', payload: newValue });
  };

  return (
    <Box p={2} display="flex" flexDirection="column" overflow="hidden" maxHeight="98vh">
      <Box paddingBottom={2} flex="1">
        <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
          <Grid item>
            <UserProfile user={user} />
          </Grid>
          <Grid item>
            <Tabs value={tab} onChange={changeTab} />
          </Grid>
          <Grid item>
            <Box marginTop={1}>
              <SearchField activeTab={tab} socket={socket} userId={user.id} dispatch={dispatch} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box overflow="auto" flex="4">
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

export default React.memo(Sidebar);
