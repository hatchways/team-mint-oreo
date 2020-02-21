import React, { useContext } from 'react';

import ProfileAsButton from '../profile/profile-as-button.container';
import { Grid } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';
import Client from '../../utils/HTTPClient';

const SidebarTabPanelChats = ({ chatrooms, userId }) => {
  const {
    state: { activeChatId },
    dispatch,
  } = useContext(directoryStore);

  const hideSidebar = () => {
    dispatch({
      type: DirectoryActionTypes.CLOSE_SIDEBAR,
    });
  };
  const handleClick = chatId => {
    console.log('ACTIVE CHAT ID, SIDEBAR CHATS', activeChatId);
    try {
      Client.request('/chat/update/activity', 'POST', { chatId, userId });
    } catch (err) {
      console.log(err);
    }
    dispatch({
      type: DirectoryActionTypes.SET_CURRENTLY_ACTIVE,
      payload: chatId,
    });
    hideSidebar();
  };

  const filterSelf = chatroom => chatroom.users.filter(user => user._id !== userId);

  const checkIfAnyOnline = chatroom => {
    return filterSelf(chatroom).some(user => user.isOnline);
  };

  const generateNames = chatroom => {
    const filteredRoom = filterSelf(chatroom);
    if (filteredRoom.length === 1) return filteredRoom[0].displayName;
    const names = filteredRoom.reduce((a, b) => {
      return `${a}, ${b}`;
    }, '');
    return names.slice(0, 15);
  };

  return (
    <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
      {/*
        profileFormat: {
          id: string/integer, 
          name: string, 
          secondary: string, 
          avatar: Object, 
          ...others
        }
        */

      chatrooms.map(chatroom => {
        const { chatId } = chatroom;
        return (
          <Grid item key={chatId}>
            <ProfileAsButton
              name={generateNames(chatroom)}
              {...chatroom}
              handleClick={() => handleClick(chatId)}
              hideStatus={false}
              isOnline={checkIfAnyOnline(chatroom)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default React.memo(SidebarTabPanelChats);
