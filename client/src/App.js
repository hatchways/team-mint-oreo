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
  const [tokenVerified, setTokenVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const checkToken = async () => {
      const isVerified = await Client.request('/user/verify');
      // TODO: handle error for isVerified
      if (isMounted) {
        setIsLoading(false);
        await setTokenVerified(isVerified);
      }
    };
    checkToken();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      {!isLoading && (
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                tokenVerified ? <Redirect to="/dashboard" /> : <Redirect to="/login" />
              }
            />
            <Route
              exact
              path="/login"
              render={() => (tokenVerified ? <Redirect to="/dashboard" /> : <Login />)}
            />
            <Route
              exact
              path="/dashboard"
              render={() => (tokenVerified ? <Dashboard /> : <Redirect to="/login" />)}
            />
            <Route path="/register" component={Register} />
            <Route path="/testing" component={WebsocketTesting} />
          </Switch>
        </BrowserRouter>
      )}
    </MuiThemeProvider>
  );
}

export default App;
