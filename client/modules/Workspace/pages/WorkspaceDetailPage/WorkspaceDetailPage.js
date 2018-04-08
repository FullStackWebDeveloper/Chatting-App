import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/WorkspaceListItem/WorkspaceListItem.css';

// Import Actions
import { fetchWorkspace } from '../../WorkspaceActions';

// Import Selectors
import { getWorkspace } from '../../WorkspaceReducer';

export function WorkspaceDetailPage(props) {
  console.log(props)
  return (
    <div>
      <Helmet title={props.workspace.display_name} />
      <div className={`${styles['single-workspace']} ${styles['workspace-detail']}`}>
        <h3 className={styles['workspace-title']}>{props.workspace.display_name}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.workspace.full_name}</p>
        <p className={styles['workspace-desc']}>{props.workspace.admin_user}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
// WorkspaceDetailPage.need = [params => {
//   return fetchWorkspace(params.display_name);
// }];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  console.log(props.params.display_name)
  return {
    workspace: getWorkspace(state, props.params.display_name),
  };
}

WorkspaceDetailPage.propTypes = {
  workspace: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
    admin_user: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(WorkspaceDetailPage);
