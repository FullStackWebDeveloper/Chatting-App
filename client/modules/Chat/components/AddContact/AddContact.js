import React, { Component, PropTypes } from "react";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import styles from "./AddContact.css";
import {
  Button,
  ButtonToolbar,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";
import Select from "react-select";
import "react-select/dist/react-select.css";

export class AddContact extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);

    this.state = this.getInitialState();
  }

  getInitialState = () => {
    let users = [];
    if(this.props.users)
    this.props.users.forEach(user => {
      if(user.username != this.props.username) {
        users.push({
          label: user.username,
          value: user.username
        });
      }
    });
      return {
        show: false,
        selectedOption: [""],
        value: null,
        title: null,
        users: users
      }
  }

  getValidationState = () => {
    if (this.state.title == null) return null;
    const length = this.state.title.length;
    if (length > 0) {
      this.validForm++;
      return "success";
    }
    return "error";
  };

  getValidationSelect = () => {
    if (this.state.value == null) return null;
    const length = this.state.value.length;
    if (length > 0) {
      this.validForm++;
      return "success";
    }
    return "error";
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ ...this.getInitialState(), show: nextProps.isOpen });
  }

  addContact = () => {
    if (this.state.value && this.state.title) {
      this.props.addRoom({
        members: this.state.value.split(','),
        owner: this.props.username,
        title: this.state.title,
        type: "rooms"
      });
    } else {
        console.log("wrong valid");
        this.setState({value: this.state.value == null? '' : this.state.value, title: this.state.title == null? '': this.state.title})
    }
  };

  handleHide() {
    this.setState({ show: false });
  }

  handleSelectChange = value => {
    this.setState({ value });
  };

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    return (
      <div className={styles["modal-container"]} style={{ height: 200 }}>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Add Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Please insert your Room Title</ControlLabel>
              <FormControl
                type="text"
                value={this.state.title}
                placeholder="Enter text"
                onChange={this.handleChange}
              />
              <FormControl.Feedback style={{ top: "17px" }} />
            </FormGroup>

            <FormGroup
              controlId="formBasicSelect"
              validationState={this.getValidationSelect()}
              ref="formGroup"
            >
              <ControlLabel>Please select your friend(s)</ControlLabel>
              <Select
                closeOnSelect={true}
                disabled={false}
                multi
                onChange={this.handleSelectChange}
                options={this.state.users}
                placeholder="Select your friend(s)"
                simpleValue
                value={this.state.value}
                style={{ paddingRight: "22px" }}
              />
              <FormControl.Feedback style={{ top: "17px" }} />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.addContact}>Add Contact</Button>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

AddContact.propTypes = {
  addRoom: PropTypes.func.isRequired
};

export default injectIntl(AddContact);
