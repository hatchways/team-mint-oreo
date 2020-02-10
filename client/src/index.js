import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { CookiesProvider } from 'react-cookie';
import { UserStateProvider } from './store/user/user.provider';

const app = (
  <CookiesProvider>
    <UserStateProvider>
      <App />
    </UserStateProvider>
  </CookiesProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
