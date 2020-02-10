import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import io from 'socket.io-client';

import theme from './themes/theme';
import LandingPage from './pages/Landing';

import './App.css';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('socket connected');
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={LandingPage} />
        <button
          onClick={() => {
            socket.emit('login', { user: 'name', pass: 'pass' });
          }}
        >
          PING SOCKET
        </button>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
