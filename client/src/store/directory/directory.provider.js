import React, { createContext, useReducer } from 'react';

import { initialState, directoryReducer } from './directory.reducer';

const store = createContext(initialState);
const { Provider } = store;

const DirectoryStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(directoryReducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, DirectoryStateProvider };
