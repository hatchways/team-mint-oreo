import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
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
import SnackbarMessage from '../snackbar-message/snackbar-message.component';

const InviteFriendBackdrop = ({ socket }) => {
  const [urlField, setUrlField] = useState('');
  const [open, setOpen] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState(undefined);
  const [emails, setEmails] = useState({ 0: '' });
  const queueRef = useRef([]);

  const classes = useStyles();
  const {
    state: { showBackdropInv },
    dispatch,
  } = useContext(directoryStore);

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setSnackbarInfo(queueRef.current.shift());
      setOpen(true);
    }
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    processQueue();
  };

  useEffect(() => {
    let isMounted = true;
    const fetchAndSetUrl = async () => {
      const request = await Client.request('/user/getUser');
      if (isMounted) {
        setUrlField(`${process.env.REACT_APP_HOST_NAME}/invitation/` + request.inviteCode);
      }
    };
    fetchAndSetUrl();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleClose = () => {
    dispatch({
      type: DirectoryActionTypes.CLOSE_BACKDROP_INVITE,
    });
  };

  const composeEmails = async () => {
    const emailList = Object.keys(emails).map(index => emails[index]);
    console.log(emails);
    const userData = await Client.request('/user/data');
    socket.emit('friendRequestSent', { fromUser: userData.email, toUser: emailList[0] });

    queueRef.current.push({
      message: 'Email Sent Successfully!',
      key: Date.now(),
    });
    if (open) {
      setOpen(false);
    } else {
      processQueue();
    }
  };

  const changeHandler = (e, index) => {
    setEmails({ ...emails, [index]: e.target.value });
  };

  const handleAddFriendField = () => {
    const emailGroupLength = Object.keys(emails).length;
    setEmails({ ...emails, [emailGroupLength]: '' });
  };

  return (
    <Backdrop className={classes.backdrop} open={showBackdropInv}>
      {showBackdropInv && (
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
                <Box display="flex" flexDirection="column" justify="center" alignItems="center">
                  <h1>Invite friends to Babl</h1>
                  <Box>
                    <h3> Send your friends an email</h3>
                    {Object.keys(emails).map((field, i) => (
                      <EmailField
                        // eslint-disable-next-line react/no-array-index-key
                        key={`emailField-${i}`}
                        onAddClick={handleAddFriendField}
                        changeHandler={changeHandler}
                        value={emails[i]}
                        index={i}
                      />
                    ))}
                  </Box>
                  <Box>
                    <h3> Or share referral link:</h3>
                    <CopyField placeholder={urlField} />
                  </Box>
                  <Box mt={3.5}>
                    <Button variant="contained" color="primary" onClick={composeEmails}>
                      Send Invite
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </ClickAwayListener>
      )}
      <SnackbarMessage
        messageInfo={snackbarInfo}
        open={open}
        handleExited={handleExited}
        handleClose={handleCloseSnack}
      />
    </Backdrop>
  );
};

export default React.memo(InviteFriendBackdrop);
