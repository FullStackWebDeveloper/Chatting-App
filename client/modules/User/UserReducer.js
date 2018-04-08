// Auth Actions
import { REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from './UserActions';
import { UPDATE_USER_INFO_SUCCESS, UPDATE_USER_INFO_FAILURE, LOAD_USER_PROPS, GET_ALL_USERS} from './UserActions';

// Initial State
const initialState = {
  data: null,
  error: null
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
      };
      
    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.err
      };
      
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: {
          user:  action.user,
          username: action.user.username,
          workspace: action.workspace
        },
        error: null,
      };

    case LOGIN_FAILURE:
      return {    
        ...state,
        error: action.err,
      };

    case LOGOUT:
      return {
        ...state,
        data: null,
      };

    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        data: {
          ...data,
          user: action.user
        }
      };
      
    case UPDATE_USER_INFO_FAILURE:
      return {
        ...state,
      };

    case LOAD_USER_PROPS:
      return {
        ...state,
        data: {
          user:  action.user,
          username: action.user.username,
          workspace: action.workspace
        }
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.users,
      }
    default:
      return state;
  }
};

export const getUser = state => state.user.data;
export const getUsers = state => state.user.users;

// Export Reducer
export default UserReducer;