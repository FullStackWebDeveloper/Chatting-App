// Import Actions
import { TOGGLE_ADD_POST } from './AppActions';

// Initial State
const initialState = {
  showAddWorkspace: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddWorkspace: !state.showAddWorkspace,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddWorkspace
export const getShowAddWorkspace = state => state.app.showAddWorkspace;

// Export Reducer
export default AppReducer;
