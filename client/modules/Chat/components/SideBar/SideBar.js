import React, { Component, PropTypes } from "react";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";

import mainStyles from "../../pages/ChatPage/ChatPage.css";
import fontAwesomeStyles from "../../pages/ChatPage/font-awesome/css/font-awesome.css";
import resetStyles from "../../pages/ChatPage/reset.min.css";

let styles = {};
Object.assign(styles, resetStyles,  mainStyles, fontAwesomeStyles);


export class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {rooms: this.props.rooms, username: this.props.username, selectedRoom: 'general'};
  }

  onSelectRoom = (channel_id) => {
    this.props.selectRoom(channel_id);
  };

  showChannel() {
    console.log("showChaneel");
    console.log(this.props.rooms);
    let rooms = [];
    this.state.rooms.forEach(room=>{
      rooms.push(
        <li key={room.channel_id} className={styles.contact + ' ' + this.state.selectedRoom == room.channel_id ? styles.active : ''} onClick={this.onSelectRoom(room.channel_id)}>
          <div className={styles.wrap}>
            <span className={styles['contact-status'] + ' ' + styles.online} />
            <img
              src="http://emilcarlsson.se/assets/louislitt.png"
              alt=""
            />
            <div className={styles.meta}>
              <p className={styles.name}>{this.room.title}</p>
              <p className={styles.preview}>You just got LITT up, Mike.</p>
            </div>
          </div>
        </li>);
    });
    return rooms;
  }

  render() {
    return (
      <div className={styles.sidepanel}>
        <div className={styles.profile}>
          <div className={styles.wrap}>
            <img
              className={styles['profile-img']}
              src="http://emilcarlsson.se/assets/mikeross.png"
              className={styles.online}
              alt=""
            />
            <p>Mike Ross</p>
            <i className={styles.fa + ' ' + styles['fa-chevron-down'] + ' ' + styles['expand-button']} />
            <div className={styles['status-options']}>
              <ul>
                <li key={'active'} className={styles['status-online'] + ' ' + styles.active}>
                  <span className={styles['status-circle']} />
                  <p>Online</p>
                </li>
                <li key={'away'} className={styles['status-away']}>
                  <span className={styles['status-circle']} />
                  <p>Away</p>
                </li>
                <li key={'busy'} className={styles['status-busy']}>
                  <span className={styles['status-circle']} />
                  <p>Busy</p>
                </li>
                <li key={'offline'} className={styles['status-offline']}>
                  <span className={styles['status-circle']} />
                  <p>Offline</p>
                </li>
              </ul>
            </div>
            <div className={styles.expanded}>
              <label for="twitter">
                <i className={styles.fa + ' ' + styles['fa-facebook'] + ' ' + styles['fa-fw']} />
              </label>
              <input name="twitter" type="text" value="mikeross" />
              <label for="twitter">
                <i className={styles.fa + ' ' + styles['fa-twitter'] + ' ' + styles['fa-fw']} />
              </label>
              <input name="twitter" type="text" value="ross81" />
              <label for="twitter">
                <i className={styles.fa + ' ' + styles['fa-instagram'] + ' ' + styles['fa-fw']} />
              </label>
              <input name="twitter" type="text" value="mike.ross" />
            </div>
          </div>
        </div>
        <div className={styles.search}>
          <label for="">
            <i className={styles.fa + ' ' + styles['fa-search']} />
          </label>
          <input type="text" placeholder="Search contacts..." />
        </div>
        <div className={styles.contacts}>
          <ul>
            {this.showChannel()}
          </ul>
        </div>
        <div className={styles['bottom-bar']}>
          <button className={styles.addcontact}>
            <i className={styles['fa-fa-user-plus'] + ' ' + styles['fa-fw']} />
            <span>Add contact</span>
          </button>
          <button className={styles.settings}>
            <i className={styles['fa-fa-cog'] + ' ' + styles['fa-fw']} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  selectRoom: PropTypes.func.isRequired
};

export default injectIntl(SideBar);
