import "regenerator-runtime/runtime";
import { call, fork, take, put, apply } from "redux-saga/effects";
import { browserHistory } from "react-router";
import {
    ADD_WORKSPACE,           
    ADD_WORKSPACE_REQUEST,
    GET_WORKSPACES_REQUEST,   
    GET_WORKSPACE_REQUEST,
    ADD_WORKSPACES,          
    ADD_WORKSPACES_REQUEST,  
    DELETE_WORKSPACE,        
    DELETE_WORKSPACE_REQUEST
} from "./WorkspaceActions";
import { REGISTER_REQUEST } from "../User/UserActions";

import cookie from "react-cookie";
import { submit } from "../../sagas";
import { ADD_ROOM_REQUEST } from '../Chat/ChatActions';

export function* addWorkspaceFlow() {
  while (true) {
    let request = yield take(ADD_WORKSPACE_REQUEST);
    console.log(request)
    let data = {
      api: "workspaces",
      type: "post",
      body: {
        workspace: request.data.workspace
      }
    };
    let res = yield call(submit, data);
    if (res.workspace) {
      yield put({ type: ADD_WORKSPACE, workspace: res.workspace });
      let userData = {
        username: res.workspace.display_name,
        email: res.workspace.admin_user,
        password: request.data.workspace.password,
        workspace_title: res.workspace.display_name
      }
      yield put({ type: REGISTER_REQUEST, data: userData, workspace_title: request.data.workspace.display_name});

      let generalRoom = {
        owner:  res.workspace.display_name,
        members: [],
        title: 'General',
        type: 'general',
        workspace_title: res.workspace.display_name
      }
      yield put({ type: ADD_ROOM_REQUEST, data: generalRoom });
      
      // browserHistory.push("/workspaces");
      // yield apply(browserHistory, browserHistory.push, [`/workspaces/${request.data.workspace.display_name}/login`])
    } else {
        console.log(res.err);
    //   yield put({ type: ADD_WORKSPACE_FAILURE, err: res.err });
    }
  }
}

export function* fetchWrokspacesFlow() {
    while (true) {
      let request = yield take(GET_WORKSPACES_REQUEST);
  
      let data = {
        api: `workspaces`,
        type: "get",
        body: {}
      };
      let res = yield call(submit, data);
      if (res.workspaces) {
        yield put({ type: ADD_WORKSPACES, workspaces: res.workspaces });
      } else {
        console.log(res.err);
        // yield put({ type: GET_ROOMS_FAILURE, err: res.err });
      }
    }
  }

export function* fetchWrokspaceFlow() {
  while (true) {
    let request = yield take(GET_WORKSPACE_REQUEST);

    let data = {
      api: `workspaces/${reqeust.data}`,
      type: "get",
      body: {}
    };
    let res = yield call(submit, data);
    if (res.workspaces) {
      yield put({ type: ADD_WORKSPACE, workspaces: res.workspace });
    } else {
      console.log(res.err);
      // yield put({ type: GET_ROOMS_FAILURE, err: res.err });
    }
  }
}

  export function* deleteWorkspaceFlow() {
    while (true) {
      let request = yield take(DELETE_WORKSPACE_REQUEST);
  
      let data = {
        api: `workspaces/${request.data}`,
        type: "delete",
        body: {}
      };
      let res = yield call(submit, data);
      if (res) {
        yield put({ type: DELETE_WORKSPACE, cuid: request.data });
      } else {
        console.log(res.err);
        // yield put({ type: DELETE_ROOM_FAILURE, err: res.err });
      }
    }
  }