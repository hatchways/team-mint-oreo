import React, { useState, useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import theme from './themes/theme';
import Dashboard from './pages/dashboard/dashboard.component';
import Login from './pages/login/Login';

function App() {
  const [tokenVerified, setTokenVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const isVerified = await (await fetch('/user/verify')).json();
      await setTokenVerified(isVerified);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      {!isLoading && (
        <BrowserRouter>
          <Redirect to={tokenVerified ? '/dashboard' : '/login'} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
        </BrowserRouter>
      )}
      <div>{`TOKEN IS VERFIED: ${tokenVerified}`}</div>
    </MuiThemeProvider>
  );
}

export default App;
