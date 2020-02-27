import React from 'react';
import { DirectoryStateProvider } from '../../store/directory/directory.provider';

const WithChatStates = WrappedComponent => props => {
  return (
    <DirectoryStateProvider>
      <WrappedComponent {...props} />
    </DirectoryStateProvider>
  );
};

export default WithChatStates;
