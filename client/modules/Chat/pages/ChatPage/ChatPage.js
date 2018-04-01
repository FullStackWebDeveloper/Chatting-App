import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// Import Components
import { MainArea } from '../../components/MainArea/MainArea';
import { SideBar } from '../../components/SideBar/SideBar';

// Import Actions
import { addMessageRequest, fetchMessages, fetchRooms } from '../../ChatActions';

import styles from "./ChatPage.css";
import { getMessages, getRooms } from '../../ChatReducer';
import { getUser } from '../../../User/UserReducer';


class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchRooms());
    console.log(this.props)
    // this.state = {selectedRoom: this.props.rooms[0].channel_id};
  }

  componentDidMount() {
    
  }

  handleChatPage = (message) => {
    this.props.dispatch(addMessageRequest(message));
  };

  selectRoom = (channel_id) => {
    this.props.dispatch(fetchMessages(channel_id));
  }

  render() {
    console.log(this.props)
    return (
      <div className={styles.frame}>
        <SideBar selectRoom={this.selectRoom} user={this.props.user} rooms={this.props.rooms}/> 
        <MainArea addMessage={this.handleChatPage} user={this.props.user} messages={this.props.messages}  /> 
        {/* channel={this.props.user} */}
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
