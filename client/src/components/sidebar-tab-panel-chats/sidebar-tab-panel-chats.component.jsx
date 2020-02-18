import React, { useContext, useState, useEffect } from 'react';

import ProfileAsButton from '../profile/profile-as-button.container';
import { Grid } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

const SidebarTabPanelChats = ({ profilesList }) => {
  const { state: directoryState, dispatch } = useContext(directoryStore);

  const { currentlyActive } = directoryState;

  const hideSidebar = () => {
    dispatch({
      type: DirectoryActionTypes.CLOSE_SIDEBAR,
    });
  };
  const handleClick = event => {
    dispatch({
      type: DirectoryActionTypes.SET_CURRENTLY_ACTIVE,
      payload: event.currentTarget.id,
    });
    hideSidebar();
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

      profilesList.map(profile => (
        <Grid item key={profile.id}>
          <ProfileAsButton
            key={profile.id}
            id={profile.id}
            {...profile}
            handleClick={handleClick}
            isActive={currentlyActive !== null && currentlyActive === profile.id.toString()}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SidebarTabPanelChats;
