import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function WebsocketTesting() {
  const [tokenVerified, setTokenVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const isVerified = await (await fetch('/user/verify')).json();
      await setTokenVerified(isVerified);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  const createUser = async () => {
    const data = { email: 'testmail1@example.com', password: '123', displayName: 'brian' };
    const resp = await fetch('/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
    const result = await resp.json();
    console.log(result);
  };

  const login = async () => {
    const data = { email: 'gg@gg.gg', password: 'gggggg' };
    // const data = { email: 'sang.m.lee@mail.mcgill.ca', password: 'dltkdals' }
    const resp = await fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
    const result = await resp.json();
    console.log(result);
  };
  const emitSocket = () => {
    socket.emit('login', {
        userId: '5e459bd631f1035e2811137d',
        // userId: '5e4634be7cd7323b7891381c',
        chatId: '5e45f6f81c9d440000a138fe'
    });
  };
  const sendMessage = (event) => {
      event.preventDefault();
      if(message) {
          socket.emit('sendMsg', {
              userId: '5e459bd631f1035e2811137d',
              // userId: '5e4634be7cd7323b7891381c',
              chatId: '5e45f6f81c9d440000a138fe',
              originalText: message
          });
      }
  };

  const sendFriendReq = event => {
      event.preventDefault();
      socket.emit('friendRequestSent', {
        userId: '5e459bd631f1035e2811137d',
        friendEmail: 'sang.m.lee@mail.mcgill.ca'
        // userId: '5e4634be7cd7323b7891381c',
        // friendEmail: 'gg@gg.gg'
      });
  };

  const acceptFriendReq = event => {
      event.preventDefault();
      socket.emit('friendRequestAccepted', {
        userId: '5e459bd631f1035e2811137d',
        friendId: '5e4634be7cd7323b7891381c',
        invitationId: '5e472c167607676f241d4240'
      });
  }

  return (
    <div>
      {`USER HAS VALID JWT: ${tokenVerified}`}
      <button onClick={createUser}>CREATE USER</button>
      <button onClick={login}>LOGIN</button>

      <button onClick={emitSocket}> SOCKET EMIT</button>
      <button onClick={sendFriendReq}>SEND FRIEND REQUEST</button>
      <br />
      <button onClick={acceptFriendReq}>ACCEPT FRIEND REQUEST</button>
      <input
        type="text"
        placeholder="message test"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
      />
    </div>
  );
}

export default WebsocketTesting;
