import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useState, useEffect, useRef } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Redirect, Switch, useLocation } from 'react-router-dom';
import Client from './utils/HTTPClient';
import WebsocketTesting from './websocketTesting';
import theme from './themes/theme';
import Dashboard from './pages/dashboard/dashboard.component';
import Login from './pages/userform/Login';
import Register from './pages/userform/Register';
import SnackbarMessage from './components/snackbar-message/snackbar-message.component'; //

function App(props) {
  const [userId, setUserId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [invitationCode, setInvitationCode] = useState('');
  const [snackbar, setSnackbar] = useState({
    status: undefined,
    message: undefined,
    key: undefined
  });

  useEffect(() => {
    let isMounted = true;
    const checkToken = async () => {
      const { userId = null } = await Client.request('/user/verify');
      if (isMounted) {
        setIsLoading(false);
        setUserId(userId);
      }
    };
    checkToken();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // const pushSnackbar = message => {
  //
  //   queueRef.current.push(message);
  //   if(open) {
  //     setOpen(false);
  //   } else {
  //     processQueue();
  //   }
  // };

  const handleInvitation = props => {
    if (props.match.params) {
      setInvitationCode(props.match.params.code);
    }

    // const createInvitation = async () => {
    //   if(userId && invitationCode) {
    //     const invitationQuery = {
    //       code: invitationCode,
    //       toUserId: userId
    //     }
    //     const invResp = await Client.request('/invite', 'POST', invitationQuery);
    //
    //     return <Redirect to="/dashboard" />;
    //   } else {
    //     return <Redirect to="/login" />;
    //   }
    // }
    // return createInvitation();
    return <Redirect to="/login" />;
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {!isLoading && (
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (userId ? <Redirect to="/dashboard" /> : <Redirect to="/login" />)}
            />
            <Route
              exact
              path="/login"
              render={props => {
                if (props.location.state) {
                  setSnackbar(props.location.state.snackbar)
                }
                return userId ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Login invCode={invitationCode} setId={setUserId} snackbar={snackbar} />
                )
              }}
            />
            <Route
              exact
              path="/dashboard"
              render={props => {
                if (props.location.state) {
                  setUserId(props.location.state.id);
                  setSnackbar(props.location.state.snackbar)
                }
                return userId ? <Dashboard userId={userId} snackbar={snackbar} /> : <Redirect to="/login" />;
              }}
            />
            <Route path="/register" render={() => <Register invCode={invitationCode} />} />
            <Route path="/invitation/:code" render={props => handleInvitation(props)} />
            <Route path="/testing" component={WebsocketTesting} />
          </Switch>
        </BrowserRouter>
      )}
    </MuiThemeProvider>
  );
}

export default App;
