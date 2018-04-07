import { ADD_MESSAGE, GET_MESSAGES, DELETE_MESSAGE, ADD_ROOM, GET_ROOMS, DELETE_ROOM } from './ChatActions';

// Initial State
const initialState = { data: {rooms: [], messages: []} };

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE :
      return {
        data: {
          rooms: state.data.rooms,
          messages: [...state.data.messages, action.message]
        },
      };

    case GET_MESSAGES :
      return {
        data: {
          rooms: state.data.rooms,
          messages: action.messages
        },
      };

    case DELETE_MESSAGE :
      return {
        data: {
          rooms: state.data.rooms,
          messages: state.data.messages.filter(message => message.message_id !== action.message_id)
        }
      };

    case ADD_ROOM :
      return {
        data: {
          rooms: [action.room, ...state.data.rooms],
          messages: state.data.messages
        }
      };

    case GET_ROOMS :
      return {
        data: {
          rooms: action.rooms,
          messages: state.data.messages
        }
      };

    case DELETE_ROOM :
      return {
        data: {
          rooms: state.data.rooms.filter(room => room.channel_id !== action.channel_id),
          messages: state.data.messages
        }
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all chats
// export const getMessages = state => state.messages.data;

// Get all Messages
export const getMessages = state => state.chat.data.messages;

// Get all Rooms
export const getRooms = state => state.chat.data.rooms;

// Export Reducer
export default ChatReducer;
