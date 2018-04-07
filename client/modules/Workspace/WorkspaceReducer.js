import { ADD_WORKSPACE, ADD_WORKSPACES, DELETE_WORKSPACE } from './WorkspaceActions';

// Initial State
const initialState = { data: [] };

const WorkspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORKSPACE :
      return {
        data: [action.workspace, ...state.data],
      };

    case ADD_WORKSPACES :
      return {
        data: action.workspaces,
      };

    case DELETE_WORKSPACE :
      return {
        data: state.data.filter(workspace => workspace.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all workspaces
export const getWorkspaces = state => state.workspaces.data;

// Get workspace by cuid
export const getWorkspace = (state, display_name) => state.workspaces.data.filter(workspace => workspace.display_name === display_name)[0];

// Export Reducer
export default WorkspaceReducer;
