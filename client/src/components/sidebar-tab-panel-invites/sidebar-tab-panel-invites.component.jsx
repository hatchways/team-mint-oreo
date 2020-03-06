import React, { useContext, useEffect } from 'react';

import ProfileWithBorder from '../profile/profile-with-border.container';
import { Grid, Button } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

const SidebarTabPanelInvites = ({ profilesList, socket, currentUser }) => {
  const { dispatch: directoryDispatch } = useContext(directoryStore);
  const handleToggle = () => {
    directoryDispatch({
      type: DirectoryActionTypes.TOGGLE_BACKDROP_INVITE,
    });
  };

  const handleApproval = (event, profile) => {
    socket.emit('friendRequestAccepted', {
      userId: currentUser.id,
      friendId: profile.user._id,
      invitationId: profile.invitation._id,
    });
    alert('Friend Request Accepted!');
  };

  const handleRejection = (event, profile) => {
    socket.emit('friendRequestRejected', {
      userId: currentUser.id,
      invitationId: profile.invitation._id,
    });

    alert('Friend Request Rejected');
  };

  return (
    <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
      <Grid item>
        <Button color="primary" onClick={handleToggle}>
          + Invite Friends
        </Button>
      </Grid>
      {profilesList.map(profile => (
        <Grid item key={profile.user._id}>
          <ProfileWithBorder
            {...profile.user}
            name={profile.user.displayName}
            handleApproval={event => handleApproval(event, profile)}
            handleRejection={event => handleRejection(event, profile)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SidebarTabPanelInvites;
