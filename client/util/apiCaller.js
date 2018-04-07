import fetch from 'isomorphic-fetch';
import Config from '../../server/config';
import cookie from "react-cookie";

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

export default function callApi(endpoint, method = 'get', body, header = { 'content-type': 'application/json' } ) {
  let token = cookie.load("mernAuth") ? cookie.load("mernAuth").t : null;
  if(token) {
    header = {
      "content-type": "application/json", 
      Authorization: token
    }
  }
  return fetch(`${API_URL}/${endpoint}`, {
    headers: header,
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
