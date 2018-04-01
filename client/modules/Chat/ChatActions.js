import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const GET_MESSAGES = 'GET_MESSAGES';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export const ADD_ROOM = 'ADD_ROOM';
export const GET_ROOMS = 'GET_ROOMS';
export const DELETE_ROOM = 'DELETE_ROOM';

// Export Actions
export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message,
  };
}

export function addMessageRequest(message) {
  return (dispatch) => {
    return callApi('messages', 'post', {
      message: {
        author: message.author,
        channel_id: message.channel_id,
        markdown: message.markdown,
      },
    }).then(res => dispatch(addMessage(res.chat)));
  };
}

export function getMessages(messages) {
  return {
    type: GET_MESSAGES,
    messages,
  };
}

export function fetchMessages(channel_id) {
  return (dispatch) => {
    return callApi(`messages/${channel_id}`).then(res => {
      dispatch(getMessages(res.posts));
    });
  };
}

export function deleteMessage(message_id) {
  return {
    type: DELETE_MESSAGE,
    message_id,
  };
}

export function deleteMessageRequest(message_id) {
  return (dispatch) => {
    return callApi(`messages/${message_id}`, 'delete').then(() => dispatch(deleteMessage(message_id)));
  };
}

// Rooms

export function addRoom(room) {
  return {
    type: ADD_ROOM,
    room,
  };
}

export function addRoomRequest(room) {
  return (dispatch) => {
    return callApi('rooms', 'post', {
      message: {
        owner: message.owner,
        members: message.members,
        title: message.title,
      },
    }).then(res => dispatch(addRoom(res.chat)));
  };
}

export function getRooms(rooms) {
  return {
    type: GET_ROOMS,
    rooms,
  };
}

export function fetchRooms() {
  return (dispatch) => {
    return callApi(`rooms`).then(res => {
      dispatch(getRooms(res.rooms));
    });
  };
}

export function deleteRoom(channel_id) {
  return {
    type: DELETE_ROOM,
    channel_id,
  };
}

export function deleteRomRequest(channel_id) {
  return (dispatch) => {
    return callApi(`rooms/${channel_id}`, 'delete').then(() => dispatch(deleteRoom(channel_id)));
  };
}

