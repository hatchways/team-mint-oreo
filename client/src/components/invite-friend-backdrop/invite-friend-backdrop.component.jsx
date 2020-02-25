import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  Box,
  Grid,
  Card,
  Backdrop,
  ClickAwayListener,
  IconButton,
} from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

import EmailField from '../email-field/email-field.component';
import CopyField from '../copy-field/copy-field.component';

import { useStyles } from './invite-friend-backdrop.styles';
import Client from '../../utils/HTTPClient';

const InviteFriendBackdrop = ({ socket, userId }) => {
  const placeholder = "Friend's email address";
  const [emailFields, setEmailFields] = useState([
    {
      id: '0',
      value: '',
      placeholder,
    },
  ]);
  const [urlField, setUrlField] = useState("");

  const classes = useStyles();
  const {
    state: { showBackdrop },
    dispatch,
  } = useContext(directoryStore);

  useEffect(() => {
    let isMounted = true;
    const fetchAndSetUrl = async () => {
      const request = await Client.request('/user/getUser');
      console.log('the request is: ', request);

      if(isMounted) {
        setUrlField('http://localhost:3000/invitation/' + request.inviteCode);
      }
    }
    fetchAndSetUrl();

    return () => {
      isMounted = false;
    };
  }, []);
  // const setInvitationLink = async () => {
  //     const request = await Client.request('/user/getUser');
  //     console.log('http://localhost:3000/user/invitation/' + request.inviteCode)
  //     return 'http://localhost:3000/user/invitation/' + request.inviteCode;
  // }

  const handleClose = () => {
    dispatch({
      type: DirectoryActionTypes.CLOSE_BACKDROP,
    });
  };

  const handleAddFriendField = e => {
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

  const composeEmails = async () => {
    const emailList = emailFields.map(field => field.value);
    console.log(emailList);
    const userData = await Client.request('/user/data');
    socket.emit('friendRequestSent', { fromUser: userData.email, toUser: emailList[0] });
    alert('Friend Request Sent!');
  };

  useEffect(() => {
    //    console.log(emailFields);
  }, [emailFields]);

  return (
    <Backdrop className={classes.backdrop} open={showBackdrop}>
      {showBackdrop && (
        <ClickAwayListener onClickAway={handleClose}>
          <Card>
            <Box marginRight={3} marginLeft={10} marginBottom={10} marginTop={3}>
              <Grid container direction="column" justify="center" alignItems="flex-end">
                <Grid item>
                  <IconButton padding={10} onClick={handleClose}>
                    <Clear />
                  </IconButton>
                </Grid>
              </Grid>
              <Box marginRight={7}>
                <Grid container direction="column" justify="center" alignItems="center">
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
                    <CopyField placeholder={urlField} />
                  </Grid>
                  <Grid item>
                    <h3> </h3>
                    <Button variant="contained" color="primary" onClick={composeEmails}>
                      Send Invite
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        </ClickAwayListener>
      )}
    </Backdrop>
  );
};

export default InviteFriendBackdrop;
