import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Client from './utils/HTTPClient';

const socket = io('http://localhost:3001');

function WebsocketTesting() {
  const [userData, setUserData] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  const onChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        userId: userData._id,
        // userId: '5e4634be7cd7323b7891381c',
        chatId: '5e4def20e79cb155fb6383a2',
        originalText: message,
      });
    }
  };

  const sendFriendReq = event => {
    event.preventDefault();
    socket.emit('friendRequestSent', {
      fromUser: userData.email,
      toUser: 'sang.m.lee@mail.mcgill.ca',
      // toUser: 'y7ahfd@hotmail.com',
      // userId: '5e4634be7cd7323b7891381c',
      // friendEmail: 'gg@gg.gg'
    });
  };

  const acceptFriendReq = event => {
    event.preventDefault();
    socket.emit('friendRequestAccepted', {
      userId: userData._id,
      friendId: '5e4c6c5d90632f9b04ca7c80',
      invitationId: '5e4d70777ca2229258c7f5af',
    });
  };
  const createFakeFriends = () => {
    fetch('/seed/friends');
  };
  const createFakeRooms = () => {
    fetch('/seed/rooms');
  };

  const getUserData = () => {
    fetch('/user/data');
  };

  const addFriendsToChatrooms = () => {
    fetch('/seed/friendsToChat');
  };

  const makeFriends = () => {
    const { recipientId } = formData;
    Client.request('/seed/makeFriends', 'POST', { recipientId });
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>{`USER HAS VALID JWT: ${!!userData}`}</p>
          <p>{`USERID: ${userData?._id}`}</p>
          <div style={{ display: 'flex' }}>
            <p>Friends: </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {userData?.friends &&
                userData.friends.map(friend => (
                  <p>
                    {friend?._id}: {friend.displayName}
                  </p>
                ))}
            </div>
          </div>
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
          <button type="button" onClick={getUserData}>
            GET USER DATA
          </button>
          <button onClick={sendFriendReq}>SEND FRIEND REQUEST</button>
          <button onClick={acceptFriendReq}>ACCEPT FRIEND REQUEST</button>
          <br />
          <label>Make friends with: </label>
          <input
            type="text"
            placeholder="recipient ID"
            value={formData.recipientId}
            name="recipientId"
            onChange={onChange}
          ></input>
          <button onClick={makeFriends}>Make friends and add to chatroom</button>
          <br />
          <label>Send message: </label>
          <input
            type="text"
            placeholder="recipient ID"
            value={formData.recipientId}
            name="recipientId"
            onChange={onChange}
          ></input>
          <input
            type="text"
            placeholder="message"
            name="message"
            value={formData.message}
            onChange={onChange}
            onKeyPress={event => (event.key === 'Enter' ? sendMessage(event) : null)}
          />
          <br />

          <button type="button" onClick={createFakeRooms}>
            SEED CHATROOMS
          </button>
          <button type="button" onClick={createFakeFriends}>
            SEED FRIENDS
          </button>
          <button type="button" onClick={addFriendsToChatrooms}>
            Add Friends to chatroom
          </button>
          <button type="button" onClick={connectedSockets}>
            log connected sockets EMIT
          </button>
          {/* <form style={{ display: 'flex' }}>
            <label>TO USER ID</label>
            <input type="text" onChange={changeInputUser} />
            <label>Message: </label>
            <input type="text" onChange={changeInputUser} />

            <button type="submit"> send message to this user</button>
          </form> */}
        </div>
      </div>
    </>
  );
}

export default WebsocketTesting;
