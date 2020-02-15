import React, { useContext } from 'react';

import ProfileAsButton from '../profile/profile-as-button.container';
import { Grid, Button } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

const SidebarTabPanelContacts = ({ profilesList }) => {
  const { dispatch } = useContext(directoryStore);

  const handleToggle = () => {
    dispatch({
      type: DirectoryActionTypes.TOGGLE_BACKDROP,
    });
  };

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
            isOnline={true}
            hideStatus={false}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SidebarTabPanelContacts;
