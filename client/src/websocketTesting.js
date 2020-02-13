import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function WebsocketTesting() {
  const [tokenVerified, setTokenVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [socketEvent, setSocketEvent] = useState({});

  const onChange = e => {
    const { name, value } = e.target;
    setSocketEvent({ ...socketEvent, [name]: value });
  };

  useEffect(() => {
    const checkToken = async () => {
      const isVerified = await (await fetch('/user/verify')).json();
      await setTokenVerified(isVerified);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  const createUser = async () => {
    const data = { email: 'testmail231@example.com', password: '123', displayName: 'brian' };
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
    const data = { email: 'testmail1@example.com', password: '123' };
    const resp = await fetch('/user/login', {
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
  const emitSocket = () => {
    socket.emit('login', '5e436fa38de8845397022305');
  };

  const connectedSockets = () => {
    socket.emit(socketEvent.event, socketEvent.body);
  };

  const logout = () => {
    fetch('/user/logout');
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
      <input placeholder="event name" name="event" type="text" onChange={onChange} />
      <input placeholder="body content" name="body" type="text" onChange={onChange} />
      <button type="button" onClick={emitSocket}>
        {' '}
        SOCKET EMIT
      </button>
      <button type="button" onClick={connectedSockets}>
        {' '}
        log connected sockets EMIT
      </button>
    </div>
  );
}

export default WebsocketTesting;
