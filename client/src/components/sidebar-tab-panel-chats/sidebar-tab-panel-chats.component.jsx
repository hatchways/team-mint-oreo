import React, { useContext } from 'react';

import ProfileAsButton from '../profile/profile-as-button.container';
import { Grid, Button } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';

const SidebarTabPanelChats = ({ chatrooms, userId, clickHandler }) => {
  const {
    state: { activeChatId },
    dispatch,
  } = useContext(directoryStore);

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

  const handleToggle = () => {
    dispatch({
      type: DirectoryActionTypes.TOGGLE_BACKDROP_GPCHAT,
    });
  };

  return (
    <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
      <Grid item>
        <Button color="primary" onClick={handleToggle}>
          + Create a new Group Chat
        </Button>
      </Grid>
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
              handleClick={() => clickHandler(chatId)}
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
