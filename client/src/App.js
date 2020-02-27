import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useState, useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Client from './utils/HTTPClient';
import WebsocketTesting from './websocketTesting';
import theme from './themes/theme';
import Dashboard from './pages/dashboard/dashboard.component';
import Login from './pages/userform/Login';
import Register from './pages/userform/Register';

function App() {
  const [userId, setUserId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [invitationCode, setInvitationCode] = useState('');

  useEffect(() => {
    let isMounted = true;
    const checkToken = async () => {
      const { userId = null } = await Client.request('/user/verify');
      if (isMounted) {
        setIsLoading(false);
        setUserId(userId);
      }
      console.log();
    };
    checkToken();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleInvitation = props => {
    if (props.match.params) {
      setInvitationCode(props.match.params.code);
    }

    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
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
              render={props =>
                userId ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Login invCode={invitationCode} setId={setUserId} />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={props => {
                if (props.location.state) setUserId(props.location.state.id);
                return userId ? <Dashboard userId={userId} /> : <Redirect to="/login" />;
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
