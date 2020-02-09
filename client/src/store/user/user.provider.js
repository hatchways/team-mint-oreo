import React, { createContext, useReducer } from 'react';

import { initialState, userReducer } from './user.reducer';

const store = createContext(initialState);
const { Provider } = store;

const UserStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, UserStateProvider };
