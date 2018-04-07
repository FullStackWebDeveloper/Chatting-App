/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import workspaces from './modules/Workspace/WorkspaceReducer';
import intl from './modules/Intl/IntlReducer';
import user from './modules/User/UserReducer';
import chat from './modules/Chat/ChatReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  workspaces,
  intl,
  user,
  chat,
});
