import React, { useContext, useEffect, useState } from 'react';

import { store as directoryStore } from '../../store/directory/directory.provider';
import DirectoryActionTypes from '../../store/directory/directory.types';

import { Card, CardActionArea } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Profile from './profile.component';

const ProfileAsButton = ({ id, ...props }) => {
  const { state: directoryState, dispatch } = useContext(directoryStore);
  const [theme, setTheme] = useState({
    palette: {
      background: {
        paper: '#ffffff',
        default: '#000',
      },
    },
  });
  useEffect(() => {
    if (
      id !== null &&
      directoryState.currentlyActive !== null &&
      directoryState.currentlyActive === id.toString()
    ) {
      setTheme({
        ...theme,
        palette: {
          background: {
            paper: '#ffffff',
            default: '#000',
          },
        },
      });
    } else {
      setTheme({
        ...theme,
        palette: {
          background: {
            paper: '#f3f5f3',
            default: '#000',
          },
        },
      });
    }
  }, [directoryState.currentlyActive]);

  // we generate a MUI-theme from state's theme object
  const muiTheme = createMuiTheme(theme);

  const handleClick = event => {
    dispatch({
      type: DirectoryActionTypes.SET_CURRENTLY_ACTIVE,
      payload: event.currentTarget.id,
    });
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Card>
        <CardActionArea onClick={handleClick} id={id} disableTouchRipple>
          <Profile {...props} id={id} />
        </CardActionArea>
      </Card>
    </MuiThemeProvider>
  );
};
export default ProfileAsButton;
