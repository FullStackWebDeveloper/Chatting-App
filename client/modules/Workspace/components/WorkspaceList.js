import React, { PropTypes } from 'react';

// Import Components
import WorkspaceListItem from './WorkspaceListItem/WorkspaceListItem';

function WorkspaceList(props) {
  return (
    <div style={{overflowY: 'auto', height: '420px'}}>
      {
        props.workspaces.map(workspace => (
          <WorkspaceListItem
            workspace={workspace}
            key={workspace.cuid}
            onDelete={() => props.handleDeleteWorkspace(workspace.cuid)}
          />
        ))
      }
    </div>
  );
}

WorkspaceList.propTypes = {
  workspaces: PropTypes.arrayOf(PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
    admin_user: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteWorkspace: PropTypes.func.isRequired,
};

export default WorkspaceList;
