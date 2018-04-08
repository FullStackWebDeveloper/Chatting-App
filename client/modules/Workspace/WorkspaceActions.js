import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_WORKSPACE            = 'ADD_WORKSPACE';
export const ADD_WORKSPACE_REQUEST    = 'ADD_WORKSPACE_REQUEST';
export const SEND_EMAIL            = 'SEND_EMAIL';
// export const ADD_WORKSPACE_REQUEST    = 'ADD_WORKSPACE_REQUEST';

export const ADD_WORKSPACES           = 'ADD_WORKSPACES';
export const GET_WORKSPACES_REQUEST   = 'GET_WORKSPACES_REQUEST';
export const GET_WORKSPACE_REQUEST    = 'GET_WORKSPACE_REQUEST';

export const DELETE_WORKSPACE         = 'DELETE_WORKSPACE';
export const DELETE_WORKSPACE_REQUEST = 'DELETE_WORKSPACE_REQUEST';


// Export Actions

export function sendEmail(data) {
  return {
    type: SEND_EMAIL,
    data,
  };
}

export function addWorkspace(workspace) {
  return {
    type: ADD_WORKSPACE,
    workspace,
  };
}

export function addWorkspaceRequest(data) {
  return {
    type: ADD_WORKSPACE_REQUEST,
    data,
  };
  // return (dispatch) => {
  //   return callApi('workspaces', 'post', {
  //     workspace: {
  //       full_name: workspace.full_name,
  //       display_name: workspace.display_name,
  //       admin_user: workspace.admin_user,
  //     },
  //   }).then(res => dispatch(addWorkspace(res.workspace)));
  // };
}

export function addWorkspaces(workspaces) {
  return {
    type: ADD_WORKSPACES,
    workspaces,
  };
}

export function fetchWorkspaces() {
  return {
    type: GET_WORKSPACES_REQUEST,
  };
  // return (dispatch) => {
  //   return callApi('workspaces').then(res => {
  //     dispatch(addWorkspaces(res.workspaces));
  //   });
  // };
}

export function fetchWorkspace(data) {
  return {
    type: GET_WORKSPACE_REQUEST,
    data: data
  };
  // return (dispatch) => {
  //   return callApi(`workspaces/${cuid}`).then(res => dispatch(addWorkspace(res.post)));
  // };
}

export function deleteWorkspace(cuid) {
  return {
    type: DELETE_WORKSPACE,
    cuid,
  };
}

export function deleteWorkspaceRequest(data) {
  return {
    type: DELETE_WORKSPACE_REQUEST,
    data,
  };
  // return (dispatch) => {
  //   return callApi(`workspaces/${cuid}`, 'delete').then(() => dispatch(deleteWorkspace(cuid)));
  // };
}
