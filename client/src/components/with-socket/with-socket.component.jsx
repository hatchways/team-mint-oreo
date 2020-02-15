import React from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const WithSocket = WrappedComponent => props => {
  return <WrappedComponent {...props} />;
};

export default WithSocket;
