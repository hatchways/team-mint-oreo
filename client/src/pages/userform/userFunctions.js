import axios from 'axios';
import Client from '../../utils/HTTPClient';

export const register = async newUser => {
  const response = await Client.request('/user/register', 'POST', newUser);
  console.log(response);
};

export const login = newUser => {
  return axios
    .post('user/login', {
      email: newUser.email,
      password: newUser.password,
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
