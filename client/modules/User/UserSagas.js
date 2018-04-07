import "regenerator-runtime/runtime";
import { call, fork, take, put, apply } from "redux-saga/effects";
import { browserHistory } from "react-router";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILURE
} from "./UserActions";
import cookie from "react-cookie";
import { submit } from "../../sagas";

export function *loginFlow() {
  while (true) {
    let request = yield take(LOGIN_REQUEST);
    // let {username, password} = request.data
    let data = {
      api: "login",
      type: "post",
      body: {
        user: {
          username: request.data.username,
          password: request.data.password
        }
      }
    };
    let response = yield call(submit, data);
    if (response.user) {
      cookie.save(
        "mernAuth",
        {
          u: response.user.username,
          t: response.token
        },
        {
          maxAge: 31536e3,
          path: "/"
        }
      );
      yield put({ type: LOGIN_SUCCESS, user: response.user });
      // browserHistory.push(`/workspaces/'${request.current_url}'chat`);
      // yield apply(browserHistory, browserHistory.push, [`/workspaces/${request.current_url}/chat`])
    } else {
      yield put({ type: LOGIN_FAILURE, err: response.err });
    }
  }
}

export function *updateUserInfoFlow() {
  while (true) {
    let request = yield take(UPDATE_USER_INFO_REQUEST);

    let data = {
      api: "users/update",
      type: "post",
      body: request.data
    };
    let response = yield call(submit, data);
    if (response.user) {
      yield put({ type: UPDATE_USER_INFO_SUCCESS, user: response.user });
    } else {
      yield put({ type: UPDATE_USER_INFO_FAILURE });
    }
  }
}

export function *registerFlow() {
    while (true) {
      let request = yield take(REGISTER_REQUEST);
  
      let data = {
        api: "register",
        type: "post",
        body: {user: request.data}
      };
      let response = yield call(submit, data);
      if (response.user) {
        yield put({ type: REGISTER_SUCCESS });
        yield apply(browserHistory, browserHistory.push, [`/workspaces/${request.current_url}/login`])
      } else {
          console.log(response.err)
        yield put({ type: REGISTER_FAILURE, err: response.err });
      }
    }
  }
