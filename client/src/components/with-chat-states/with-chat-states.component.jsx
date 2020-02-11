import React from 'react';
import { DirectoryStateProvider } from '../../store/directory/directory.provider';
import { ConversationStateProvider } from '../../store/conversation/conversation.provider';

const WithChatStates = WrappedComponent => props => {
  return (
    <DirectoryStateProvider>
      <ConversationStateProvider>
        <WrappedComponent {...props} />
      </ConversationStateProvider>
    </DirectoryStateProvider>
  );
};

export default WithChatStates;
