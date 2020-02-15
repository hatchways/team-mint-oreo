import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Client from './utils/HTTPClient';

const socket = io('http://localhost:3001');

function WebsocketTesting() {
  const [tokenVerified, setTokenVerified] = useState(false);
  const [socketEvent, setSocketEvent] = useState({});

  const onChange = e => {
    const { name, value } = e.target;
    setSocketEvent({ ...socketEvent, [name]: value });
  };
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const isVerified = await (await fetch('/user/verify')).json();
      await setTokenVerified(isVerified);
    };
    checkToken();
  }, []);

  const createUser = async () => {
    const data = { email: 'briantest@example.com', password: '123', displayName: 'brian' };
    // const data = { email: 'sangtest@example.com', password: '123', displayName: 'sang' };
    // const data = { email: 'jimmytest@example.com', password: '123', displayName: 'jimmy' };
    const resp = await fetch('/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
    console.log(resp.body);
    const result = await resp.text();
    console.log(result);
  };

  const login = async () => {
    const data = { email: 'briantest@example.com', password: '123' };
    // const data = { email: 'sang.m.lee@mail.mcgill.ca', password: 'dltkdals' }
    const resp = await Client.request('/user/login', 'POST', data);
    console.log(resp.body);
    const result = await resp.text();
    console.log(result);
  };
  const emitSocket = () => {
    socket.emit('login', {
      userId: '5e459bd631f1035e2811137d',
      chatId: '5e45f6f81c9d440000a138fe',
      friendEmail: 'sang.m.lee@mail.mcgill.ca',
    });
  };

  const connectedSockets = () => {
    socket.emit('sendMsg', { body: 'hello' });
  };

  const logout = () => {
    fetch('/user/logout');
  };

  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMsg', {
        userId: '5e459bd631f1035e2811137d',
        // userId: '5e4634be7cd7323b7891381c',
        chatId: '5e45f6f81c9d440000a138fe',
        originalText: message,
      });
    }
  };

  const sendFriendReq = event => {
    event.preventDefault();
    socket.emit('friendRequestSent', {
      userId: '5e459bd631f1035e2811137d',
      friendEmail: 'sang.m.lee@mail.mcgill.ca',
      // userId: '5e4634be7cd7323b7891381c',
      // friendEmail: 'gg@gg.gg'
    });
  };

  const acceptFriendReq = event => {
    event.preventDefault();
    socket.emit('friendRequestAccepted', {
      userId: '5e459bd631f1035e2811137d',
      friendId: '5e4634be7cd7323b7891381c',
      invitationId: '5e472c167607676f241d4240',
    });
  };
  const createFakeFriends = () => {
    fetch('/seed/friends');
  };
  const createFakeRooms = () => {
    fetch('/seed/rooms');
  };

  return (
    <div>
      {`USER HAS VALID JWT: ${tokenVerified}`}
      <button type="button" onClick={createUser}>
        CREATE USER
      </button>
      <button type="button" onClick={login}>
        LOGIN
      </button>
      <button type="button" onClick={logout}>
        LOGOUT
      </button>
      <button type="button" onClick={emitSocket}>
        SOCKET EMIT
      </button>
      <button onClick={sendFriendReq}>SEND FRIEND REQUEST</button>
      <br />
      <button onClick={acceptFriendReq}>ACCEPT FRIEND REQUEST</button>
      <input
        type="text"
        placeholder="message test"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => (event.key === 'Enter' ? sendMessage(event) : null)}
      />

      <button type="button" onClick={createFakeRooms}>
        SEED CHATROOMS
      </button>
      <button type="button" onClick={createFakeFriends}>
        SEED FRIENDS
      </button>

      <button type="button" onClick={connectedSockets}>
        log connected sockets EMIT
      </button>
    </div>
  );
}

export default WebsocketTesting;
