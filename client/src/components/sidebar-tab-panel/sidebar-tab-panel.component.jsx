import React, { useContext, useState, useEffect } from 'react';

import TabPanel from '../tabs-panel/tabs-panel.component';
import { TabNames } from '../../components/tabs/tabs.component';
import ProfileWithBorder from '../profile/profile-with-border.container';
import ProfileAsButton from '../profile/profile-as-button.container';
import { Grid, Button, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

const SidebarTabPanel = ({ value, index, profilesList }) => {
  const { dispatch } = useContext(directoryStore);
  const handleToggle = () => {
    dispatch({
      type: DirectoryActionTypes.TOGGLE_BACKDROP,
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
                <ProfileAsButton key={profile.id} id={profile.id} {...profile} />
              </Grid>
            );
          } else
            return (
              <Grid item key={profile.id}>
                <ProfileWithBorder id={profile.id} {...profile} />
              </Grid>
            );
        })}
      </Grid>
    </TabPanel>
  );
};

export default SidebarTabPanel;
