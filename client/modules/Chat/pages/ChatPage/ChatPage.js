import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import io from 'socket.io-client';

// Import Components
import { MainArea } from '../../components/MainArea/MainArea';
import { SideBar } from '../../components/SideBar/SideBar';
import AddContact from "../../components/AddContact/AddContact";

// Import Actions
import { addMessageRequest, fetchMessages, fetchRooms } from '../../ChatActions';

import styles from "./ChatPage.css";
import { getMessages, getRooms } from '../../ChatReducer';
import { getUser } from '../../../User/UserReducer';
const socket = io('http://localhost:8001');

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state ={modalIsOpen: false, rooms: this.props.rooms, messages: this.props.messages, latestMessage: '', selectedRoomID: ''}
    this.props.dispatch(fetchRooms());

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentDidMount() {
    // this.props.dispatch(fetchMessages('cjfg9ys8y000030ui87jffylq'));
    socket.on('new message', message=> {
      if(this.props.user.username != message.author)
      this.setState({rooms: this.state.rooms, messages: [...this.state.messages, message], latestMessage: message.markdown});
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    let latestMessage = nextProps.messages.length > 0 ? nextProps.messages[nextProps.messages.length-1].markdown : '';
    this.setState({rooms: nextProps.rooms, messages: nextProps.messages, latestMessage: latestMessage});
  }

  handleChatPage = (message) => {
    this.props.dispatch(addMessageRequest(message));
  };

  selectRoom = (channel_id) => {
    this.state.selectedRoomID = channel_id;
    this.props.dispatch(fetchMessages(channel_id));
  }

  render() {
    return (
      <div className={styles.frame}>
        <SideBar modalOpen={this.openModal} selectRoom={this.selectRoom} username={this.props.user.username} rooms={this.state.rooms} latestMessage={this.state.latestMessage}/> 
        <MainArea addMessage={this.handleChatPage} username={this.props.user.username} messages={this.state.messages} selectedRoomID = {this.state.selectedRoomID} /> 
        <AddContact isOpen={this.state.modalIsOpen} />
      </div>
    );
  }
}

ChatPage.need = [() => { return fetchRooms(); }];

function mapStateToProps(state) {
  return {
    user: getUser(state),
    rooms: getRooms(state),
    messages: getMessages(state),
  };
}


ChatPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ChatPage);
