import React, { useContext } from 'react';

import ProfileAsButton from '../profile/profile-as-button.container';
import { Grid, Button } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

import { createChatroom } from '../../utils/axios-utils';

const SidebarTabPanelContacts = ({ contactList, user, clickHandler }) => {
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
      {contactList.map(contact => (
        <Grid item key={contact._id}>
          <ProfileAsButton
            {...contact}
            name={contact.displayName}
            hideStatus={false}
            handleClick={() => clickHandler(contact.dmChatId)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SidebarTabPanelContacts;
