import React, { useContext } from 'react';

import ProfileAsButton from '../profile/profile-as-button.container';
import { Grid, Button } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

import { createChatroom } from '../../utils/axios-utils';

const SidebarTabPanelContacts = ({ profilesList, user }) => {
  const { dispatch } = useContext(directoryStore);

  const handleToggle = () => {
    dispatch({
      type: DirectoryActionTypes.TOGGLE_BACKDROP,
    });
  };

  const handleClick = e => {};

  return (
    <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
      <Grid item>
        <Button color="primary" onClick={handleToggle}>
          + Invite Friends
        </Button>
      </Grid>
      {profilesList.map(profile => (
        <Grid item key={profile.id}>
          <ProfileAsButton
            key={profile.id}
            id={profile.id}
            {...profile}
            isOnline={profile.isOnline}
            hideStatus={false}
            handleClick={e => {
              console.log('clicked', profile, user);
              createChatroom(profile.id, user.id);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SidebarTabPanelContacts;
