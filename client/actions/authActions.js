import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SET_CURRENT_USER } from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('api/auth', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    })
  }
}