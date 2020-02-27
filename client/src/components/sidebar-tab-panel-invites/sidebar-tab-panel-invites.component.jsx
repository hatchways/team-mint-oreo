import React, { useContext } from 'react';

import ProfileWithBorder from '../profile/profile-with-border.container';
import { Grid, Button } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

const SidebarTabPanelInvites = ({ profilesList, socket, currentUser }) => {
  const { dispatch } = useContext(directoryStore);

  const handleToggle = () => {
    dispatch({
      type: DirectoryActionTypes.TOGGLE_BACKDROP,
    });
  };

  const handleApproval = (event, profile) => {
      socket.emit('friendRequestAccepted', {
          userId: currentUser.id,
          friendId: profile.id,
          invitationId: profile.invitation._id
      });
      // console.log('profile: ', profile);
      // console.log('currentUser: ', currentUser)
      alert('Friend Request Accepted!');
  }

  return (
    <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
      <Grid item>
        <Button color="primary" onClick={handleToggle}>
          + Invite Friends
        </Button>
      </Grid>
      {profilesList.map(profile => (
        <Grid item key={profile.id}>
          <Grid item key={profile.id}>
            <ProfileWithBorder
              id={profile.id}
              {...profile}
              handleApproval={(event) => handleApproval(event, profile)}
              handleDisapproval={() => {}}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default SidebarTabPanelInvites;
