import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Grid, Card, Backdrop, ClickAwayListener, TextField } from '@material-ui/core';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

import EmailField from '../email-field/email-field.component';
import CopyField from '../copy-field/copy-field.component';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const InviteFriendBackdrop = () => {
  const placeholder = "Friend's email address";
  const [emailFields, setEmailFields] = useState([
    {
      id: '0',
      value: '',
      placeholder,
    },
  ]);

  const classes = useStyles();
  const {
    state: { showBackdrop },
    dispatch,
  } = useContext(directoryStore);

  const handleClose = () => {
    dispatch({
      type: DirectoryActionTypes.CLOSE_BACKDROP,
    });
  };

  const handleAddFriendField = e => {
    console.log('clicked', e.currentTarget.id);
    const lengthOfFields = emailFields.length;
    setEmailFields([
      ...emailFields,
      {
        id: lengthOfFields + '',
        value: '',
        placeholder,
      },
    ]);
  };

  const recordFieldChanges = e => {
    const id = parseInt(e.currentTarget.id, 10);
    console.log('changed', id, e.currentTarget.value);
    const newList = [
      ...emailFields.splice(0, id),
      {
        id: id + '',
        value: e.currentTarget.value,
        placeholder,
      },
      ...emailFields.splice(id + 1),
    ];

    setEmailFields(newList);
  };

  useEffect(() => {
    console.log(emailFields);
  }, [emailFields]);

  console.log(showBackdrop);
  return (
    <Backdrop className={classes.backdrop} open={showBackdrop}>
      {showBackdrop && (
        <ClickAwayListener onClickAway={handleClose}>
          <Card>
            <Box m={10}>
              <Grid container direction="column" justify="center" alignItems="stretch">
                <Grid item>
                  <h1>Invite friends to messenger</h1>
                </Grid>
                <Grid item>
                  <h3> Send your friends an email</h3>
                  {emailFields.map(field => (
                    <EmailField
                      key={field.id}
                      {...field}
                      onAddClick={handleAddFriendField}
                      onChange={recordFieldChanges}
                    />
                  ))}
                </Grid>
                <Grid item>
                  <h3> Or share referral link:</h3>
                  <CopyField placeholder={'http://localhost:3000/dashboard'} />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </ClickAwayListener>
      )}
    </Backdrop>
  );
};

export default InviteFriendBackdrop;
