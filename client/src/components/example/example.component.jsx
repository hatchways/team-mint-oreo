/*
import React, { useContext } from 'react';
import { store } from '../../store/user/user.provider';
import UserActionTypes from '../../store/user/user.types';

import { useCookies } from 'react-cookie';

const Example = () => {
  const userState = useContext(store);
  console.log(userState);

  const [cookies, setCookie] = useCookies(['name']);

  function onChange(newName) {
    setCookie('name', newName, { path: '/' });
    // options in third argument of setCookie includes
    /*
      path (string): cookie path, use / as the path if you want your cookie to be accessible on all pages
      expires (Date): absolute expiration date for the cookie
      maxAge (number): relative max age of the cookie from when the client receives it in seconds
      domain (string): domain for the cookie (sub.domain.com or .allsubdomains.com)
      secure (boolean): Is only accessible through HTTPS?
      httpOnly (boolean): Can only the server access the cookie?
      sameSite (boolean|none|lax|strict): Strict or Lax enforcement
     */
  }

  const { dispatch } = userState;
  const handleChange = () => {
    dispatch({
      type: UserActionTypes.SET_CURRENT_USER,
      payload: 'UserName',
    });
  };
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Enter your name"
          defaultValue={cookies.name}
          onChange={e => onChange(e.target.value)}
        />
      </form>
      <button onClick={handleChange}> change state </button>
    </div>
  );
};

export default Example;
*/