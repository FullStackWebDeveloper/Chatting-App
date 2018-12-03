import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';
import io from 'socket.io-client';

// Import Components
import { MainArea } from '../../components/MainArea/MainArea';
import { SideBar } from '../../components/SideBar/SideBar';
import AddContact from "../../components/AddContact/AddContact";

// Import Actions
import { addMessageRequest, addNewClientMessageRequest, fetchMessages, fetchRooms, addRoomRequest } from '../../ChatActions';
import { getUser, getUsers } from '../../../User/UserReducer';
import { fetchAllUsers } from '../../../User/UserActions';
import { getMessages, getRooms } from '../../ChatReducer';

import styles from "./ChatPage.css";
const socket = io('http://localhost:8001');

class ChatPage extends Component {
  constructor(props) {
    super(props);
    console.log("-------")
    console.log(this.props)
    this.state ={modalIsOpen: false, rooms: [], messages: this.props.messages, latestMessage: '', selectedRoomID: ''}
    this.props.dispatch(fetchRooms(this.props.params.display_name));
    this.props.dispatch(fetchAllUsers(this.props.params.display_name));
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  addRoom = (data)=> {
    this.props.dispatch(addRoomRequest({...data, workspace_title: this.props.params.display_name}));
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
      console.log("-----------");
      console.log(message.author == this.props.user);
      console.log(this.props.user);
      if(this.props.user.username != message.author && (this.props.selectedRoomID == message.channel_id || this.state.rooms.filter(r => r.channel_id == message.channel_id)[0].type == "general")) {
        console.log("[][][][][][]")
        this.props.dispatch(addNewClientMessageRequest(message));
        // this.setState({modalIsOpen: false, rooms: this.state.rooms, messages: [...this.state.messages, message], latestMessage: message.markdown});
      }
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    if(!this.props.user) {
      browserHistory.push('/');
    } else {
      console.log(JSON.stringify(this.state.rooms) != JSON.stringify(nextProps.rooms))
      if(JSON.stringify(this.state.rooms) != JSON.stringify(nextProps.rooms) || this.state.messages != nextProps.messages) {
        let latestMessage = nextProps.messages.length > 0 ? nextProps.messages[nextProps.messages.length-1].markdown : '';
        this.setState({modalIsOpen: false, rooms: nextProps.rooms, messages: nextProps.messages, latestMessage: latestMessage});
      }
    }
  }

  handleChatPage = (message) => {
    this.props.dispatch(addMessageRequest(message));
  };

  selectRoom = (channel_id) => {
    this.state.selectedRoomID = channel_id;
    console.log(channel_id)
    this.props.dispatch(fetchMessages(channel_id));
  }

  render() {
    return (
      <div className={styles.frame}>
        <SideBar modalOpen={this.openModal} selectRoom={this.selectRoom} username={this.props.user.username} rooms={this.state.rooms} latestMessage={this.state.latestMessage}/> 
        <MainArea addMessage={this.handleChatPage} username={this.props.user.username} messages={this.state.messages} selectedRoomID = {this.state.selectedRoomID} /> 
        <AddContact addRoom={this.addRoom} isOpen={this.state.modalIsOpen} username={this.props.user.username} users={this.props.users} />
      </div>
    );
  }
}

// ChatPage.need = [() => { return fetchRooms(); }];

function mapStateToProps(state) {
  return {
    user: getUser(state),
    users: getUsers(state),
    rooms: getRooms(state),
    messages: getMessages(state),
  };
}


ChatPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ChatPage);
