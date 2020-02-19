import React, { useContext } from 'react';

import ProfileAsButton from '../profile/profile-as-button.container';
import { Grid } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

const SidebarTabPanelChats = ({ chatrooms, userId }) => {
  const { state: directoryState, dispatch } = useContext(directoryStore);

  const hideSidebar = () => {
    dispatch({
      type: DirectoryActionTypes.CLOSE_SIDEBAR,
    });
  };
  const handleClick = chatId => {
    dispatch({
      type: DirectoryActionTypes.SET_CURRENTLY_ACTIVE,
      payload: chatId,
    });
    hideSidebar();
  };

  const filterSelf = chatroom => chatroom.users.filter(user => user._id !== userId);

  const checkIfAnyOnline = chatroom => {
    filterSelf(chatroom).some(user => user.isOnline);
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
              isOnline={checkIfAnyOnline(chatroom)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SidebarTabPanelChats;
