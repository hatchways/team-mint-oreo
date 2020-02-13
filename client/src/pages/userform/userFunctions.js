import axios from 'axios';

export const register = newUser => {
    return axios
        .post('user/register', {
            email: newUser.email,
            password: newUser.password,
            confirmPassword: newUser.confirmPassword,
            language: newUser.language
        })
        .then(response => {
            console.log('Registered');
        });
}

export const login = newUser => {
    return axios
        .post('user/login', {
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
}
