import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Col } from "react-bootstrap";
// Import Style
import styles from './WorkspaceListItem.css';

function WorkspaceListItem(props) {
  return (
    <div className={styles['single-workspace']}>
      <Col sm={3} style={{textAlign: "left"}}>
        <h5 className={styles['workspace-title']}>
            {props.workspace.full_name}
          {/* <Link to={`/workspaces/${props.workspace.display_name}`} >
          </Link> */}
        </h5>
      </Col>
      <Col sm={9} style={{textAlign: "left"}}>
        <h5 className={styles['workspace-title']}>
          <Link to={`/workspaces/${props.workspace.display_name}`} >
          {'http://localhost:8000/' + props.workspace.display_name}
          </Link>
        </h5>
      </Col>
      <Col sm={12}>
        <Col sm={3}>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {props.workspace.admin_user}</p>
        </Col>
        <Col sm={3}>
          <p className={styles['workspace-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteWorkspace" /></a></p>
        </Col>
        <hr className={styles.divider} />
      </Col>
    </div>
  );
}

WorkspaceListItem.propTypes = {
  workspace: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
    admin_user: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default WorkspaceListItem;
