import { call, fork, take, put } from 'redux-saga/effects';
import callApi from "./util/apiCaller";
import { loadUserFlow, loginFlow, updateUserInfoFlow, registerFlow,fetchAllUsersFlow } from './modules/User/UserSagas';
import { addMessageFlow, fetchMessagesFlow, deleteMessageFlow, addRoomFlow, fetchRoomsFlow, deleteRoomFlow } from './modules/Chat/ChatSagas';
import { addWorkspaceFlow, fetchWrokspacesFlow, deleteWorkspaceFlow, sendEmailFlow  } from "./modules/Workspace/WorkspaceSaga";

export function submit(data) {
  if(data.type == "get") {    
    return callApi(data.api)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  } else {
    return callApi(data.api, data.type, data.body)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  }
}

export default function *rootSaga() {
  yield fork(loadUserFlow);
  yield fork(loginFlow);
  yield fork(updateUserInfoFlow);
  yield fork(registerFlow);
  yield fork(fetchAllUsersFlow);
  yield fork(addMessageFlow);
  yield fork(fetchMessagesFlow);
  yield fork(deleteMessageFlow);
  yield fork(addRoomFlow);
  yield fork(fetchRoomsFlow);
  yield fork(deleteRoomFlow);
  yield fork(addWorkspaceFlow);
  yield fork(fetchWrokspacesFlow);
  yield fork(deleteWorkspaceFlow);
  yield fork(sendEmailFlow);
  return true;
}
