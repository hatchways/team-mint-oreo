import React, { useContext } from 'react';
import { store } from '../../store/user/user.provider';
import UserActionTypes from '../../store/user/user.types';

const Example = () => {
  const userState = useContext(store);
  console.log(userState);

  const { dispatch } = userState;
  const handleChange = () => {
    dispatch({
      type: UserActionTypes.SET_CURRENT_USER,
      payload: 'UserName',
    });
  };
  return <button onClick={handleChange}> change </button>;
};

export default Example;
