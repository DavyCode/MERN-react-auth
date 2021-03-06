import axios from 'axios'
import {  
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from './types'
import Auth from '../modules/Auth'

const AUTH_URL = "http://localhost:4000";

export const authStart = () => ({
  type: AUTH_START
})

export const authSuccess = (payload) => ({
  type: AUTH_SUCCESS,
  payload
})

export const authFail = (payload) => ({
  type: AUTH_FAIL,
  payload
})

export const authLogout = () => ({
  type: AUTH_LOGOUT,
})

/**********
 * Sign up
 * ****************/
export const authRegister = function (user, history) {
  return async (dispatch) => {
    dispatch(authStart());

    await axios.post(`${AUTH_URL}/register`, user) 
    .then(response => {
      dispatch(authSuccess(response.data))
      history.push('/')
    })
    .catch(error => {
      dispatch(authFail(error.response.data.error))
    });
  }
}

/*********
 * Login
 * ****************/
export const authLogin = (user, history) => {
  return async (dispatch) => {
    dispatch(authStart());

    await axios.post(`${AUTH_URL}/login`, user)
    .then((response) => {
      //add token to local storage
      Auth.authenticateUser(response.data.token)
      dispatch(authSuccess(response.data))
      history.push('/home')
    })
    .catch(err => {
      const errorMessage = {
        name: err.response.data || 'Unauthorized',
        message: 'Make sure you\'re submiting a valid credential'
      }
      dispatch(authFail(errorMessage))
    })
  }
}


export const logout = () => {
  Auth.deauthenticateUser();

  return (dispatch) => {
    dispatch(authLogout())
  };
};







