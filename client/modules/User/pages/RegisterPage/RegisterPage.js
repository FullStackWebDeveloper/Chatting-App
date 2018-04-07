import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import RegisterForm from '../../components/RegisterForm/RegisterForm';

// Import Actions
import { registerRequest } from '../../UserActions';
import { getWorkspace } from '../../../Workspace/WorkspaceReducer';

class RegisterPage extends Component {
  handleRegister = (email, username, password) => {
      this.props.dispatch(registerRequest({email, username, password, workspace_id: this.props.workspace.cuid, current_url: this.props.params.display_name}));
  };
  render() {
    console.log(this.props);
    return (
      <RegisterForm register={this.handleRegister} /> 
    );
  }
}

// Retrieve data from store as props
// function mapStateToProps(state) {
//   return state;
// }
function mapStateToProps(state, props) {
  return {
    workspace: getWorkspace(state, props.params.display_name),
  };
}

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(RegisterPage);
