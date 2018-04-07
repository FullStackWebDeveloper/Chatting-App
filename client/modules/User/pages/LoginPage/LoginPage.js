import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { browserHistory } from "react-router";

// Import Components
import LoginForm from '../../components/LoginForm/LoginForm';

// Import Actions
import { loginRequest } from '../../UserActions';

class LoginPage extends Component {
  handleLogin = (username, password) => {
      this.props.dispatch(loginRequest({ username, password, current_url: this.props.params.display_name }));
  };

  componentWillReceiveProps(nextProps, nextState) {
    if(nextProps.user.data.username) {
      browserHistory.push(`/workspaces/${nextProps.params.display_name}/chat`);
    }
  }

  render() {
    return (
      <LoginForm login={this.handleLogin} user={this.props.user} /> 
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return state;
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(LoginPage);
