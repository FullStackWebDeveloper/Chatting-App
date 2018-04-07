import React, { Component, PropTypes } from "react";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import TextareaAutosize from 'react-autosize-textarea';

import mainStyles from "../../pages/ChatPage/ChatPage.css";
import fontAwesomeStyles from "../../pages/ChatPage/font-awesome/css/font-awesome.css";
import resetStyles from "../../pages/ChatPage/reset.min.css";

let styles = {};
Object.assign(styles, resetStyles,  mainStyles, fontAwesomeStyles);


export class MainArea extends Component {
  constructor(props) {
    super(props);
    this.state = {date: ''};
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.message.value = "";
    this.refs.messagesArea.scrollTop = this.refs.messagesArea.scrollHeight;
    this.state.message.style.height = '40px';
  }

  showChatHistroy() {
    console.log(styles["message-date"])
    let chatHistories = [];
    let date = "";
    this.props.messages.forEach((m, index)=>{
      if(date != new Date(m.created_at).toLocaleDateString()) {
        date = new Date(m.created_at).toLocaleDateString();
        chatHistories.push(
          <li key={index + ' ' + 'date'} className={styles["date-line"]}>
            <span >{date}</span>
          </li>
        );
      }
      chatHistories.push(
        <li key={index} className={(m.author == this.props.username) ? styles.sent : styles.replies}>
          <div className={(m.author == this.props.username) ? styles["message-date"] : styles["message-date"] + ' ' + styles["text-right"]}> {new Date(m.created_at).toLocaleTimeString()} </div>
          <img src="http://emilcarlsson.se/assets/mikeross.png"/>
          <p>
              {m.markdown}
          </p>
        </li>);
    });
    return chatHistories;
  }

  sendMessage = () => {
    if (this.state.message.value) {
      var newMessage = {
        author: this.props.username,
        channel_id: this.props.selectedRoomID,
        markdown: this.state.message.value
      }
      this.props.addMessage(newMessage);
    }
    // const message = this.refs.message;
    // console.log(message.value);
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.sendMessage();
    }
  };

  addPost = () => {
    // const nameRef = this.refs.name;
    // const titleRef = this.refs.title;
    // const contentRef = this.refs.content;
    // if (nameRef.value && titleRef.value && contentRef.value) {
    //   this.props.addMessage(nameRef.value, titleRef.value, contentRef.value);
    //   nameRef.value = titleRef.value = contentRef.value = "";
    // }
  };

  render() {
    return (
      <div className={styles.content}>
        <div className={styles["contact-profile"]}>
          <img src="http://emilcarlsson.se/assets/harveyspecter.png" />
          <p>Harvey Specter</p>
          <div className={styles["social-media"]}>
            <i className={styles.fa + " " + styles["fa-facebook"]} />
            <i className={styles.fa + " " + styles["fa-twitter"]} />
            <i className={styles.fa + " " + styles["fa-instagram"]} />
          </div>
        </div>
        <div className={styles.messages} ref="messagesArea">
          <ul>
            {this.showChatHistroy()}
          </ul>
        </div>
        <div className={styles["message-input"]}>
          <div className={styles.wrap}>
            {/* <input type="text"  placeholder="Write your message..." onKeyPress={this.handleKeyPress} /> */}
            <TextareaAutosize
              className={styles["message-textarea"]}
              innerRef={node => {
                this.state.message = node;
              }}              
              onKeyPress={this.handleKeyPress}
            />
            <i
              className={
                styles.fa +
                " " +
                styles["fa-paperclip"] +
                " " +
                styles.attachment +
                " " +
                styles["attachment-icon"]
              }
            />
            <button className={styles.submit + " " + styles["send-button"]} onClick={this.sendMessage}>
              <i className={styles.fa + " " + styles["fa-paper-plane"]} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

MainArea.propTypes = {
  addMessage: PropTypes.func.isRequired
};

export default injectIntl(MainArea);
