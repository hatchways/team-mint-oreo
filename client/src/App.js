import React, { useState, useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Client from './utils/HTTPClient';
import WebsocketTesting from './websocketTesting';
import theme from './themes/theme';
import Dashboard from './pages/dashboard/dashboard.component';
import Login from './pages/userform/Login';
import Register from './pages/userform/Register';
import Uploader from './pages/uploader/uploader.component';

function App() {
  const [userId, setUserId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const checkToken = async () => {
      const { userId = null } = await Client.request('/user/verify');
      if (isMounted) {
        setIsLoading(false);
        await setUserId(userId);
      }
    };
    checkToken();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return (
    <MuiThemeProvider theme={theme}>
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
              render={() => (userId ? <Redirect to="/dashboard" /> : <Login setId={setUserId} />)}
            />
            <Route
              exact
              path="/dashboard"
              render={props => {
                if (props.location.state) setUserId(props.location.state.id);
                return userId ? <Dashboard userId={userId} /> : <Redirect to="/login" />;
              }}
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
