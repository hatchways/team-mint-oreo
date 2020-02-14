import React, { useContext, useState, useEffect } from 'react';

import TabPanel from '../tabs-panel/tabs-panel.component';
import { TabNames } from '../../components/tabs/tabs.component';
import ProfileWithBorder from '../profile/profile-with-border.container';
import ProfileAsButton from '../profile/profile-as-button.container';
import { Grid, Button } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

const SidebarTabPanel = ({ value, index, profilesList }) => {
  const { state: directoryState, dispatch } = useContext(directoryStore);
  const handleToggle = () => {
    dispatch({
      type: DirectoryActionTypes.TOGGLE_BACKDROP,
    });
  };

  const { currentlyActive } = directoryState;

  const handleClick = event => {
    dispatch({
      type: DirectoryActionTypes.SET_CURRENTLY_ACTIVE,
      payload: event.currentTarget.id,
    });
    hideSidebar();
  };

  const hideSidebar = () => {
    dispatch({
      type: DirectoryActionTypes.CLOSE_SIDEBAR,
    });
  };

  return (
    <TabPanel {...{ value, index }} p={1} paddingBottom={0}>
      <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
        {(value === TabNames.CONTACTS || value === TabNames.INVITES) && (
          <Grid item>
            <Button color="primary" onClick={handleToggle}>
              + Invite Friends
            </Button>
          </Grid>
        )}
        {profilesList.map(profile => {
          /*
        profileFormat: {
          id: string/integer, 
          name: string, 
          secondary: string, 
          avatar: Object, 
          ...others
        }
        */

          if (value === TabNames.CHATS) {
            return (
              <Grid item key={profile.id}>
                <ProfileAsButton
                  key={profile.id}
                  id={profile.id}
                  {...profile}
                  handleClick={handleClick}
                  isActive={currentlyActive != null && currentlyActive == profile.id.toString()}
                />
              </Grid>
            );
          } else if (value === TabNames.CONTACTS) {
            return (
              <Grid item key={profile.id}>
                <ProfileAsButton key={profile.id} id={profile.id} {...profile} />
              </Grid>
            );
          } else if (value === TabNames.INVITES)
            return (
              <Grid item key={profile.id}>
                <ProfileWithBorder
                  id={profile.id}
                  {...profile}
                  handleApproval={() => {}}
                  handleDisapproval={() => {}}
                />
              </Grid>
            );
        })}
      </Grid>
    </TabPanel>
  );
};

export default SidebarTabPanel;
