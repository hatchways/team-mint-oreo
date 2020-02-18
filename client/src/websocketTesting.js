import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Client from './utils/HTTPClient';

const socket = io('http://localhost:3001');

function WebsocketTesting() {
  const [userData, setUserData] = useState(false);
  const [socketEvent, setSocketEvent] = useState({});

  const onChange = e => {
    const { name, value } = e.target;
    setSocketEvent({ ...socketEvent, [name]: value });
  };
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const data = await (await fetch('/user/getUser')).json();
      setUserData(data);
      console.log(data);
    };
    checkToken();
  }, []);

  const createUser = async () => {
    // const data = { email: 'briantest@example.com', password: '123', displayName: 'brian' };
    // const data = { email: 'sangtest@example.com', password: '123', displayName: 'sang' };
    const data = { email: 'jimmytest@example.com', password: '123', displayName: 'jimmy' };
    const result = await fetch('/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
    console.log(result);
  };

  const login = async () => {
    //const data = { email: 'briantest@example.com', password: '123' };
    // const data = { email: 'sang.m.lee@mail.mcgill.ca', password: 'dltkdals' }
    const data = { email: 'jimmytest@example.com', password: '123', displayName: 'jimmy' };
    const result = await Client.request('/user/login', 'POST', data);
    console.log(result);
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
        userId: userData['_id'],
        // userId: '5e4634be7cd7323b7891381c',
        chatId: '5e4817349395a70f90fb6392',
        originalText: message,
      });
    }
  };

  const sendFriendReq = event => {
    event.preventDefault();
    socket.emit('friendRequestSent', {
      fromUser: userData['email'],
      // toUser: 'sang.m.lee@mail.mcgill.ca',
      toUser: 'y7ahfd@hotmail.com',
      // userId: '5e4634be7cd7323b7891381c',
      // friendEmail: 'gg@gg.gg'
    });
  };

  const acceptFriendReq = event => {
    event.preventDefault();
    socket.emit('friendRequestAccepted', {
      userId: userData['_id'],
      friendId: '5e4b0dc85009545cc427991e',
      invitationId: '5e4b75bc20f0a678dcdfc7be',
    });
  };
  const createFakeFriends = () => {
    fetch('/seed/friends');
  };
  const createFakeRooms = () => {
    fetch('/seed/rooms');
  };

  const emitSocket = () => {
    fetch('/user/data');
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>{`USER HAS VALID JWT: ${!!userData}`}</p>
          <p>{`USERID: ${userData['_id']}`}</p>
          <div style={{ display: 'flex' }}>
            <p>Friends: </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {userData.friends &&
                userData.friends.map(friend => (
                  <p>
                    {friend['_id']}: {friend.displayName}
                  </p>
                ))}
            </div>
          </div>
          <p>Chatrooms: </p>
        </div>
        <div>
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
      </div>
    </>
  );
}

export default WebsocketTesting;
