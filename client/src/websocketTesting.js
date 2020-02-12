import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function WebsocketTesting() {
  const [tokenVerified, setTokenVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkToken = async () => {
      const isVerified = await (await fetch('/user/verify')).json();
      await setTokenVerified(isVerified);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  const createUser = async () => {
    const data = { email: 'testmail1', password: '123', displayName: 'brian' };
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
    const data = { email: 'testmail1', password: '123' };
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
    socket.emit('login', '5e436fa38de8845397022305');
  };
  return (
    <div>
      {`USER HAS VALID JWT: ${tokenVerified}`}
      <button onClick={createUser}>CREATE USER</button>
      <button onClick={login}>LOGIN</button>

      <button onClick={emitSocket}> SOCKET EMIT</button>
    </div>
  );
}

export default WebsocketTesting;
