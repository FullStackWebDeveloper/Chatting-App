import cookie from 'react-cookie';
import callApi from '../../util/apiCaller';
// import { history } from './_helpers';
import {browserHistory} from 'react-router';


// Export Auth Constants
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST'
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS'
export const UPDATE_USER_INFO_FAILURE = 'UPDATE_USER_INFO_FAILURE'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const LOAD_USER_PROPS = 'LOAD_USER_PROPS';
export const LOAD_USER_PROPS_REQUEST = 'LOAD_USER_PROPS_REQUEST';

export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS = 'GET_ALL_USERS';

export function registerRequest(data) {
  return {
    type: REGISTER_REQUEST,
    data: data
  }
}

export function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    data: data
  }
}

export function logout() {
  cookie.remove('mernAuth', { path: '/' });
  browserHistory.push('/');
  return {
    type: LOGOUT,
  };
}

export function updateUserInfoRequest(data) {
  return {
    type: UPDATE_USER_INFO_REQUEST,
    data: data
  }
}


export function loadUserProps(data) {
  return {
    type: LOAD_USER_PROPS_REQUEST,
    data
  };
}

export function fetchAllUsers(data) {
  return {
    type: GET_ALL_USERS_REQUEST,
    data: data
  }; 
}