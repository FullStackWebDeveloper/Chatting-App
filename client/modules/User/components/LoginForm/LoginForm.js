import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './LoginForm.css';

export class LoginForm extends Component {
  onLogin = () => {
    const usernameRef = this.refs.username;
    const passwordRef = this.refs.password;
    if (usernameRef.value && passwordRef.value) {
      this.props.login(usernameRef.value, passwordRef.value);
      passwordRef.value = '';
    }
  };

  render() {
    return (
      <div className={styles['form-content']}>
        { 
          this.props.user.error &&
          <div className={styles['error-message']} >
            <span>{this.props.user.error}</span>
          </div>
        }
        <h2 className={styles['form-title']}><FormattedMessage id="loginTitle" /></h2>
        <input placeholder={this.props.intl.messages.username} className={styles['form-field']} ref="username" />
        <input placeholder={this.props.intl.messages.password} className={styles['form-field']} ref="password" type="password"  />
        <a className={styles['submit-button']} onClick={this.onLogin}><FormattedMessage id="submit" /></a>
      </div>
    );
  }
  componentWillMount() {
    console.log('Component WILL MOUNT!')
 }
 componentDidMount() {
   if(!this.props.user.error) {
     
   }
    console.log('Component DID MOUNT!')
 }
 componentWillReceiveProps(newProps) {    
    console.log('Component WILL RECIEVE PROPS!')
 }
 shouldComponentUpdate(newProps, newState) {
    return true;
 }
 componentWillUpdate(nextProps, nextState) {
    console.log('Component WILL UPDATE!');
 }
 componentDidUpdate(prevProps, prevState) {
    console.log('Component DID UPDATE!')
 }
 componentWillUnmount() {
    console.log('Component WILL UNMOUNT!')
 }
  componentWillReceiveProps(nextProps, nextState) {
    console.log(nextProps);
    console.log(nextState);
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(LoginForm);
