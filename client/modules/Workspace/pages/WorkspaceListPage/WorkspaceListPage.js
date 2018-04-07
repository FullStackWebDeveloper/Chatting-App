import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  ButtonToolbar,
  Modal,
  FormGroup,
  FormControl,
  Tabs,
  Tab
} from "react-bootstrap";
// Import Components
import WorkspaceList from '../../components/WorkspaceList';
import WorkspaceCreateWidget from '../../components/WorkspaceCreateWidget/WorkspaceCreateWidget';

// Import Actions
import { addWorkspaceRequest, fetchWorkspaces, deleteWorkspaceRequest } from '../../WorkspaceActions';
import { toggleAddWorkspace } from '../../../App/AppActions';

// Import Selectors
import { getShowAddWorkspace } from '../../../App/AppReducer';
import { getWorkspaces } from '../../WorkspaceReducer';


class WorkspaceListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchWorkspaces());
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log("-------");
    console.log(nextProps);
    console.log(nextState);
    // let latestMessage = nextProps.messages.length > 0 ? nextProps.messages[nextProps.messages.length-1].markdown : '';
    // this.setState({rooms: nextProps.rooms, messages: nextProps.messages, latestMessage: latestMessage});
  }

  handleDeleteWorkspace = workspace => {
    if (confirm('Do you want to delete this workspace')) { // eslint-disable-line
      this.props.dispatch(deleteWorkspaceRequest(workspace));
    }
  };

  handleAddWorkspace = (workspace) => {
    // this.props.dispatch(toggleAddWorkspace());
    this.props.dispatch(addWorkspaceRequest({ workspace }));
  };

  render() {
    return (
      <div style={{backgroundColor: "white", boxShadow: "0px 2px 27px 11px", borderRadius: "6px", marginTop: "10%", height: "60vh", padding: "30px"}}>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Workstapce List">
            <WorkspaceList handleDeleteWorkspace={this.handleDeleteWorkspace} workspaces={this.props.workspaces} />
          </Tab>
          <Tab eventKey={2} title="Create Workspace">
          <WorkspaceCreateWidget addWorkspace={this.handleAddWorkspace} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
WorkspaceListPage.need = [() => { return fetchWorkspaces(); }];
  
// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddWorkspace: getShowAddWorkspace(state),
    workspaces: getWorkspaces(state),
  };
}

WorkspaceListPage.propTypes = {
  workspaces: PropTypes.arrayOf(PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
    admin_user: PropTypes.string.isRequired,
  })).isRequired,
  showAddWorkspace: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

WorkspaceListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(WorkspaceListPage);
