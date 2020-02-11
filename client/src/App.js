import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import theme from './themes/theme';
import LandingPage from './pages/Landing';
import Dashboard from './pages/dashboard/dashboard.component';
import Login from './pages/login/Login';

import './App.css';
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={LandingPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
