import React, { useState, useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import socket from 'socket.io-client';
import WebsocketTesting from './websocketTesting';

import theme from './themes/theme';
import Dashboard from './pages/dashboard/dashboard.component';
import Login from './pages/login/Login';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/testing" component={WebsocketTesting} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
