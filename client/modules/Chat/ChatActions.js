import callApi from '../../util/apiCaller';
import io from 'socket.io-client';
const socket = io('http://localhost:8001');
// Export Constants
export const ADD_MESSAGE_REQUEST    = 'ADD_MESSAGE_REQUEST';
export const ADD_MESSAGE            = 'ADD_MESSAGE';
export const GET_MESSAGES_REQUEST   = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES           = 'GET_MESSAGES';
export const DELETE_MESSAGE_REQUEST = 'DELETE_MESSAGE_REQUEST';
export const DELETE_MESSAGE         = 'DELETE_MESSAGE';
export const ADD_ROOM_REQUEST       = 'ADD_ROOM_REQUEST';
export const ADD_ROOM               = 'ADD_ROOM';
export const GET_ROOMS_REQUEST      = 'GET_ROOMS_REQUEST';
export const GET_ROOMS              = 'GET_ROOMS';
export const DELETE_ROOM_REQUEST    = 'DELETE_ROOM_REQUEST';
export const DELETE_ROOM            = 'DELETE_ROOM';

// Export Actions
export function addMessage(message) {
  // socket.emit('add message', res.message);
  return {
    type: ADD_MESSAGE,
    message,
  };
}

export function addMessageRequest(data) {
  return {
    type: ADD_MESSAGE_REQUEST,
    data,
  };
  // return (dispatch) => {
  //   return callApi('messages', 'post', {
  //     message: {
  //       author: message.author,
  //       channel_id: message.channel_id,
  //       markdown: message.markdown,
  //     },
  //   }).then(res => {
  //     socket.emit('new message', res.message);
  //     dispatch(addMessage(res.message));
  //   });
  // };
}

export function getMessages(messages) {
  return {
    type: GET_MESSAGES,
    messages,
  };
}

export function fetchMessages(data) {
  return {
    type: GET_MESSAGES_REQUEST,
    data,
  };
  // return (dispatch) => {
  //   return callApi(`messages:${channel_id}`).then(res => {
  //     dispatch(getMessages(res.messages));
  //   });
  // };
}

export function deleteMessage(message_id) {
  return {
    type: DELETE_MESSAGE,
    message_id,
  };
}

export function deleteMessageRequest(data) {
  return {
    type: DELETE_MESSAGE_REQUEST,
    data,
  };
  // return (dispatch) => {
  //   return callApi(`messages/${message_id}`, 'delete').then(() => dispatch(deleteMessage(message_id)));
  // };
}

// Rooms

export function addRoom(room) {
  return {
    type: ADD_ROOM,
    room,
  };
}

export function addRoomRequest(data) {
  return {
    type: ADD_ROOM_REQUEST,
    data,
  };
  // return (dispatch) => {
  //   return callApi('rooms', 'post', {
  //     message: {
  //       owner: message.owner,
  //       members: message.members,
  //       title: message.title,
  //     },
  //   }).then(res => dispatch(addRoom(res.room)));
  // };
}

export function getRooms(rooms) {
  return {
    type: GET_ROOMS,
    rooms,
  };
}

export function fetchRooms(data) {
  return {
    type: GET_ROOMS_REQUEST,
    data,
  };
  // return (dispatch) => {
  //   return callApi(`rooms`).then(res => {
  //     dispatch(getRooms(res.rooms));
  //   });
  // };
}

export function deleteRoom(channel_id) {
  return {
    type: DELETE_ROOM,
    channel_id,
  };
}

export function deleteRomRequest(data) {
  return {
    type: DELETE_ROOM_REQUEST,
    data,
  };
  // return (dispatch) => {
  //   return callApi(`rooms/${channel_id}`, 'delete').then(() => dispatch(deleteRoom(channel_id)));
  // };
}

