import "regenerator-runtime/runtime";
import { call, fork, take, put } from "redux-saga/effects";
import { browserHistory } from "react-router";
import io from "socket.io-client";
const socket = io("http://localhost:8001");

import {
  ADD_MESSAGE_REQUEST,
  ADD_MESSAGE,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE,
  ADD_ROOM_REQUEST,
  ADD_ROOM,
  GET_ROOMS_REQUEST,
  GET_ROOMS,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM
} from "./ChatActions";
import cookie from "react-cookie";
import { submit } from "../../sagas";

export function *addMessageFlow() {
  while (true) {
    let request = yield take(ADD_MESSAGE_REQUEST);
    let data = {
      api: "messages",
      type: "post",
      body: {
        message: {
          author: request.data.author,
          channel_id: request.data.channel_id,
          markdown: request.data.markdown
        }
      }
    };
    let res = yield call(submit, data);
    if (res.message) {
      socket.emit("new message", res.message);
      yield put({ type: ADD_MESSAGE, message: res.message });
    } else {
      console.log(res.err);
      // yield put({ type: ADD_MESSAGE_FAILURE, err: res.err });
    }
  }
}

export function *fetchMessagesFlow() {
  while (true) {
    let request = yield take(GET_MESSAGES_REQUEST);

    let data = {
      api: `messages?channel_id=${request.data}`,
      type: "get",
      body: {}
    };
    let res = yield call(submit, data);
    if (res.messages) {
      console.log(res.messages)
      yield put({ type: GET_MESSAGES, messages: res.messages });
    } else {
      console.log(res.err);
      // yield put({ type: GET_MESSAGES_FAILURE, err: res.err });
    }
  }
}

export function *deleteMessageFlow() {
  while (true) {
    let request = yield take(DELETE_MESSAGE_REQUEST);

    let data = {
      api: `messages/${request.data}`,
      type: "delete",
      body: {}
    };
    let res = yield call(submit, data);
    if (res) {
      yield put({ type: DELETE_MESSAGE, message_id: request.data });
    } else {
      console.log(res.err);
      // yield put({ type: DELETE_MESSAGES_FAILURE, err: res.err });
    }
  }
}

export function *addRoomFlow() {
  while (true) {
    let request = yield take(ADD_ROOM_REQUEST);
    console.log("-=-=-=-=")
    console.log(request)  
    let data = {
      api: "rooms",
      type: "post",
      body: {
        room: {
          owner: request.data.owner,
          members: request.data.members,
          title: request.data.title,
          type: request.data.type,
          workspace_title: request.data.workspace_title
        }
      }
    };
    let res = yield call(submit, data);
    if (res.room) {
      yield put({ type: ADD_ROOM, room: res.room });
    } else {
      console.log(res.err);
      // yield put({ type: ADD_ROOM_FAILURE, err: res.err });
    }
  }
}

export function *fetchRoomsFlow() {
  while (true) {
    let request = yield take(GET_ROOMS_REQUEST);
    console.log(request)
    let data = {
      api: `rooms?workspace_title=${request.data}`,
      type: "get",
      body: {}
    };
    let res = yield call(submit, data);
    if (res.rooms) {
      yield put({ type: GET_ROOMS, rooms: res.rooms });
    } else {
      console.log(res.err);
      // yield put({ type: GET_ROOMS_FAILURE, err: res.err });
    }
  }
}

export function *deleteRoomFlow() {
  while (true) {
    let request = yield take(DELETE_ROOM_REQUEST);

    let data = {
      api: `rooms/${channel_id}`,
      type: "delete",
      body: {}
    };
    let res = yield call(submit, data);
    if (res) {
      yield put({ type: DELETE_ROOM, channel_id: request.data });
    } else {
      console.log(res.err);
      // yield put({ type: DELETE_ROOM_FAILURE, err: res.err });
    }
  }
}