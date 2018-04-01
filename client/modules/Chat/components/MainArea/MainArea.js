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
    this.state = {messages: this.props.messages, username: this.props.username};
  }

  showChatHistroy() {
    let chatHistories = [];
    this.state.messages.forEach(m=>{
      chatHistories.push(
      <li key={m.message_id} className={(m.author == username) ? styles.sent : styles.replies}>
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
      // this.props.sendMessage(this.state.message.value);
      
    }
    setTimeout(() => {
      this.state.message.value = "";
    }, 10);
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
        <div className={styles.messages}>
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
            <button className={styles.submit + " " + styles["send-button"]}>
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
