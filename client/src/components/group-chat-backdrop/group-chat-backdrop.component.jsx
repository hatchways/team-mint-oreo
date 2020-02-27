import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  Box,
  Grid,
  Card,
  Backdrop,
  ClickAwayListener,
  IconButton,
  Checkbox,
  TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Clear from '@material-ui/icons/Clear';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

import EmailField from '../email-field/email-field.component';
import CopyField from '../copy-field/copy-field.component';

import { useStyles } from './group-chat-backdrop.styles';
import Client from '../../utils/HTTPClient';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const GroupChatBackdrop = ({ socket, userId }) => {
  const [friendsList, setFriendsList] = useState([]);

  const classes = useStyles();
  const {
    state: { showBackdropGp },
    dispatch,
  } = useContext(directoryStore);

  const handleClose = () => {
    dispatch({
      type: DirectoryActionTypes.CLOSE_BACKDROP_GPCHAT,
    });
  };

  useEffect(() => {
    let isMounted = true;
    const fetchExistingFriends = async () => {
      const request = await Client.request('/user/data');
      if(isMounted) {
        setFriendsList(request.friends);
      }
    }
    fetchExistingFriends();

    return () => {
      isMounted = false;
    }
  }, []);


  return (
    <Backdrop className={classes.backdrop} open={showBackdropGp}>
      {showBackdropGp && (
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
                    <h1>If it opens, this is working</h1>
                  </Grid>
                  <Grid item>
                    <h3> Search for a friend</h3>
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      options={friendsList}
                      // disableCloseOnSelect
                      getOptionLabel={option => option.displayName}
                      renderOption={(option, { selected }) => (
                        <React.Fragment>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.displayName}
                        </React.Fragment>
                      )}
                      className={classes.autocomplete}
                      renderInput={params => (
                        <TextField {...params} variant="outlined" label="Checkboxes" placeholder="Favorites" />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <h3> </h3>
                    <Button variant="contained" color="primary">
                      Create GroupChat
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

export default GroupChatBackdrop;
